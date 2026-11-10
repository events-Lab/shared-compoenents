import type { ReactNode } from "react";

export type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1.5 text-xs font-semibold tracking-[0.08em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="m-0 text-[32px] leading-none font-semibold tracking-tight max-[800px]:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-[46rem] text-[15px] leading-normal text-secondary-500">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
