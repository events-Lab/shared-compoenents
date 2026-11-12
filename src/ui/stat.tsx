import type { ReactNode } from "react";
import { cx } from "../lib/cx";

export type StatProps = {
  label: string;
  value: string;
  detail?: string;
};

export function Stat({ label, value, detail }: StatProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 shadow-[0_10px_24px_rgba(16,42,67,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(16,42,67,0.1)]">
      <div className="h-1 bg-linear-to-r from-primary to-accent" />
      <div className="px-[18px] pt-3.5 pb-4">
      <p className="m-0 text-[13px] font-semibold text-secondary-500">{label}</p>
      <p className="m-0 mt-2.5 text-[28px] leading-none font-semibold tracking-tight">
        {value}
      </p>
      {detail ? (
        <p className="m-0 mt-2.5 text-[13px] leading-snug text-secondary-500">{detail}</p>
      ) : null}
      </div>
    </article>
  );
}

export function StatGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("grid grid-cols-3 gap-4 max-[800px]:grid-cols-1", className)}>
      {children}
    </div>
  );
}
