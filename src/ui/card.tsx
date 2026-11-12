import type { ReactNode } from "react";

export type CardProps = {
  title?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function Card({ title, actions, footer, children }: CardProps) {
  const hasHeader = Boolean(title || actions);

  return (
    <section className="rounded-2xl border border-primary-100 bg-primary-50">
      {hasHeader ? (
        <div className="flex items-start justify-between gap-3 px-[18px] pt-[18px]">
          {title ? (
            <h2 className="m-0 text-base font-semibold tracking-tight">{title}</h2>
          ) : (
            <span />
          )}
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      ) : null}
      <div className="p-[18px]">{children}</div>
      {footer ? (
        <div className="border-t border-secondary-200 px-[18px] py-3.5">{footer}</div>
      ) : null}
    </section>
  );
}
