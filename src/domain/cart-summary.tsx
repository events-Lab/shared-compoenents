"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { formatEgp, toEgpLabel } from "../lib/money";
import type { CartLine } from "../lib/types";

export const CART_DELIVERY_FEE = 15;
export const CART_PROMO_RATE = 0.2;
export const CART_PROMO_STORAGE_KEY = "events-lab-promo";

export type CartTotals = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  subtotalLabel: string;
  discountLabel: string;
  deliveryLabel: string;
  totalLabel: string;
  promoApplied: boolean;
};

export type CartSummaryProps = {
  lines: CartLine[];
  checkoutLabel?: string;
  onCheckout?: (totalLabel: string) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  emptyAction?: ReactNode;
};

export function getCartTotals(lines: CartLine[], promoCode = ""): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + lineAmount(line), 0);
  const promoApplied = promoCode.trim().length >= 3;
  const discount = promoApplied ? roundMoney(subtotal * CART_PROMO_RATE) : 0;
  const delivery = lines.length > 0 ? CART_DELIVERY_FEE : 0;
  const total = roundMoney(Math.max(subtotal - discount + delivery, 0));

  return {
    subtotal,
    discount,
    delivery,
    total,
    subtotalLabel: formatMoney(subtotal),
    discountLabel: formatMoney(-discount),
    deliveryLabel: formatMoney(delivery),
    totalLabel: formatMoney(total),
    promoApplied,
  };
}

export function CartSummary({
  lines,
  checkoutLabel = "Go to Checkout",
  onCheckout,
  onQuantityChange,
  onRemove,
  emptyAction,
}: CartSummaryProps) {
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(CART_PROMO_STORAGE_KEY);
    if (!saved) return;
    setAppliedCode(saved);
    setCode(saved);
  }, []);

  const totals = getCartTotals(lines, appliedCode);

  function applyPromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = code.trim();
    if (next.length < 3) {
      setAppliedCode("");
      setPromoError("Enter a valid promo code.");
      window.localStorage.removeItem(CART_PROMO_STORAGE_KEY);
      return;
    }
    const normalized = next.toUpperCase();
    setAppliedCode(normalized);
    setPromoError("");
    window.localStorage.setItem(CART_PROMO_STORAGE_KEY, normalized);
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.78fr)]">
      <section className="rounded-[20px] border border-[#eceae4] bg-white px-5 py-5 sm:px-6">
        {lines.length === 0 ? (
          <div className="flex flex-col items-start gap-3 py-6">
            <h2 className="m-0 text-lg font-semibold tracking-tight">
              Your cart is empty
            </h2>
            <p className="m-0 max-w-md text-sm leading-normal text-[#8a8a8a]">
              Add a paid event ticket or a padel product to continue.
            </p>
            {emptyAction ? <div className="pt-1">{emptyAction}</div> : null}
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {lines.map((line, index) => (
              <li
                key={line.id}
                className={
                  index > 0 ? "mt-5 border-t border-[#eeeae6] pt-5" : undefined
                }
              >
                <CartRow
                  line={line}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="rounded-[20px] border border-[#eceae4] bg-white px-5 py-5 sm:px-6 lg:sticky lg:top-24">
        <h2 className="m-0 text-xl font-semibold tracking-tight">
          Order Summary
        </h2>
        <dl className="m-0 mt-5 flex flex-col gap-3.5 text-[15px]">
          <SummaryRow label="Subtotal" value={totals.subtotalLabel} />
          {appliedCode ? (
            <SummaryRow
              label={`Discount (-${Math.round(CART_PROMO_RATE * 100)}%)`}
              value={totals.discountLabel}
              tone="discount"
            />
          ) : null}
          <SummaryRow label="Delivery Fee" value={totals.deliveryLabel} />
        </dl>
        <div className="mt-4 border-t border-[#eeeae6] pt-4">
          <SummaryRow label="Total" value={totals.totalLabel} emphasis />
        </div>

        <form className="mt-5" onSubmit={applyPromo}>
          <div className="flex items-center gap-2">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Promo code</span>
              <TagIcon />
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Add promo code"
                autoComplete="off"
                className="h-12 w-full rounded-full border-0 bg-[#f3f3f3] pr-4 pl-11 text-sm text-[#141414] outline-none placeholder:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-[#141414]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 cursor-pointer items-center rounded-full bg-[#111] px-5 text-sm font-medium text-white transition hover:bg-black"
            >
              Apply
            </button>
          </div>
          {promoError ? (
            <p className="m-0 mt-2 text-xs text-[#ff3b30]" role="alert">
              {promoError}
            </p>
          ) : null}
          {appliedCode ? (
            <p className="m-0 mt-2 text-xs font-medium text-[#0f6e56]">
              {appliedCode} applied
            </p>
          ) : null}
        </form>

        {onCheckout ? (
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={() => onCheckout(totals.totalLabel)}
            className="mt-3 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111] text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {checkoutLabel}
            <ArrowIcon />
          </button>
        ) : null}
      </aside>
    </div>
  );
}

function CartRow({
  line,
  onQuantityChange,
  onRemove,
}: {
  line: CartLine;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}) {
  const max = line.maxQuantity;
  const atMin = line.quantity <= 1;
  const atMax = max != null && line.quantity >= max;
  const specs =
    line.specs && line.specs.length > 0
      ? line.specs
      : line.detail
        ? [{ label: "Details", value: line.detail }]
        : [];

  return (
    <div className="flex gap-4">
      <LineImage line={line} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="m-0 text-[15px] font-semibold tracking-tight text-[#141414] sm:text-base">
            {line.label}
          </p>
          {onRemove ? (
            <button
              type="button"
              aria-label={`Remove ${line.label}`}
              onClick={() => onRemove(line.id)}
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-[#ff3b30] transition hover:bg-[#fff1f0]"
            >
              <TrashIcon />
            </button>
          ) : null}
        </div>
        {specs.length > 0 ? (
          <div className="mt-1 flex flex-col gap-0.5">
            {specs.map((spec) => (
              <p key={spec.label} className="m-0 text-[13px] text-[#8d8d8d]">
                <span>{spec.label}:</span> {spec.value}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="m-0 text-lg font-bold tracking-tight text-[#141414]">
            {toEgpLabel(line.priceLabel)}
          </p>
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-medium text-[#8d8d8d]">
              {line.kind === "event" ? "Seats" : "Qty"}
            </span>
            <div className="inline-flex items-center rounded-full border border-[#ececec] bg-white px-1 py-1 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <button
                type="button"
                aria-label={`Decrease ${line.kind === "event" ? "seats" : "quantity"} of ${line.label}`}
                disabled={atMin || !onQuantityChange}
                onClick={() => onQuantityChange?.(line.id, line.quantity - 1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-lg leading-none text-[#141414] transition hover:bg-[#f6f6f6] disabled:cursor-not-allowed disabled:opacity-35"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm font-medium">
                {line.quantity}
              </span>
              <button
                type="button"
                aria-label={`Increase ${line.kind === "event" ? "seats" : "quantity"} of ${line.label}`}
                disabled={atMax || !onQuantityChange}
                onClick={() => onQuantityChange?.(line.id, line.quantity + 1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-lg leading-none text-[#141414] transition hover:bg-[#f6f6f6] disabled:cursor-not-allowed disabled:opacity-35"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineImage({ line }: { line: CartLine }) {
  if (line.imageUrl) {
    return (
      // Product photos come from the catalog as remote URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={line.imageUrl}
        alt=""
        className="size-[84px] shrink-0 rounded-xl bg-[#f3f1ec] object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="grid size-[84px] shrink-0 place-items-center rounded-xl bg-[#f3f1ec] text-lg font-semibold text-[#9a9a9a]"
    >
      {line.label.slice(0, 1)}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  tone,
  emphasis,
}: {
  label: string;
  value: string;
  tone?: "discount";
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt
        className={
          emphasis
            ? "text-base font-medium text-[#141414]"
            : "font-normal text-[#3a3a3a]"
        }
      >
        {label}
      </dt>
      <dd
        className={
          emphasis
            ? "m-0 text-xl font-bold tracking-tight text-[#141414]"
            : tone === "discount"
              ? "m-0 font-medium text-[#ff3b30]"
              : "m-0 font-medium text-[#141414]"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function lineAmount(line: CartLine) {
  const amount = Number(line.priceLabel.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(amount)) return 0;
  return amount * line.quantity;
}

function roundMoney(amount: number) {
  return Math.round(amount * 100) / 100;
}

function formatMoney(amount: number) {
  return formatEgp(roundMoney(amount));
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 .9h6a1 1 0 0 0 1-.9l1-12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9a9a9a]"
    >
      <path
        d="M3 12.5V5.8A1.8 1.8 0 0 1 4.8 4H11.5a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8l-5.5 5.5a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="8.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
