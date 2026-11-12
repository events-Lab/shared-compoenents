"use client";

import { useSyncExternalStore } from "react";
import { cx } from "../lib/cx";

export type ToastTone = "success" | "info" | "warning" | "danger";

export type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
};

type ToastRecord = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  duration: number;
};

const DEFAULT_DURATION = 4200;
const MAX_TOASTS = 4;
const EMPTY: ToastRecord[] = [];

let records: ToastRecord[] = EMPTY;
const listeners = new Set<() => void>();
const timers = new Map<string, number>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return records;
}

function getServerSnapshot() {
  return EMPTY;
}

function clearTimer(id: string) {
  const timer = timers.get(id);
  if (timer === undefined) return;
  window.clearTimeout(timer);
  timers.delete(id);
}

export function dismissToast(id: string) {
  clearTimer(id);
  if (!records.some((item) => item.id === id)) return;
  records = records.filter((item) => item.id !== id);
  emit();
}

function schedule(record: ToastRecord) {
  if (record.duration <= 0 || typeof window === "undefined") return;
  clearTimer(record.id);
  timers.set(
    record.id,
    window.setTimeout(() => dismissToast(record.id), record.duration),
  );
}

export function toast(input: ToastInput | string) {
  const options = typeof input === "string" ? { title: input } : input;
  const record: ToastRecord = {
    id: `toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    title: options.title,
    description: options.description,
    tone: options.tone ?? "success",
    duration: options.duration ?? DEFAULT_DURATION,
  };

  const next = [...records, record];
  const overflow = next.length - MAX_TOASTS;
  if (overflow > 0) {
    for (const dropped of next.splice(0, overflow)) clearTimer(dropped.id);
  }
  records = next;
  emit();
  schedule(record);
  return record.id;
}

const tones: Record<ToastTone, { bar: string; icon: string }> = {
  success: { bar: "bg-[#0f6e46]", icon: "text-[#0f6e46]" },
  info: { bar: "bg-[#1d4f91]", icon: "text-[#1d4f91]" },
  warning: { bar: "bg-[#8a5a10]", icon: "text-[#8a5a10]" },
  danger: { bar: "bg-[#9b1c1c]", icon: "text-[#9b1c1c]" },
};

function ToastIcon({ tone }: { tone: ToastTone }) {
  const className = cx("size-5 shrink-0", tones[tone].icon);

  if (tone === "success") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M6.5 10.2 8.8 12.5 13.5 7.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (tone === "danger") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M7.4 7.4 12.6 12.6M12.6 7.4 7.4 12.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (tone === "warning") {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
        <path
          d="M10 3.2 17.2 16H2.8L10 3.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 8.2v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="13.6" r="0.7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.6" r="0.7" fill="currentColor" />
    </svg>
  );
}

function ToastCard({ item }: { item: ToastRecord }) {
  return (
    <div
      className="toast-enter pointer-events-auto flex w-full max-w-sm overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-[0_16px_40px_rgba(30,41,59,0.16)]"
      role={item.tone === "danger" ? "alert" : "status"}
      onMouseEnter={() => clearTimer(item.id)}
      onMouseLeave={() => schedule(item)}
    >
      <span className={cx("w-1 shrink-0", tones[item.tone].bar)} />
      <div className="flex min-w-0 flex-1 items-start gap-3 px-3.5 py-3">
        <ToastIcon tone={item.tone} />
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="m-0 text-sm font-semibold tracking-tight text-secondary-900">
            {item.title}
          </p>
          {item.description ? (
            <p className="m-0 mt-0.5 text-sm leading-snug text-secondary-600">
              {item.description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg text-secondary-500 transition hover:bg-secondary-100 hover:text-secondary-900"
          onClick={() => dismissToast(item.id)}
        >
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true" fill="none">
            <path
              d="M6 6 14 14M14 6 6 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function Toaster() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className="pointer-events-none fixed top-5 right-4 left-4 z-[70] flex flex-col items-end gap-2 sm:left-auto sm:w-[22rem]"
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>
  );
}
