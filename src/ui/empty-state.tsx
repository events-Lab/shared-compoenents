import type { ReactNode } from "react";
import { Card } from "./card";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <div className="flex flex-col items-start gap-3 py-4">
        <h2 className="m-0 text-base font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="m-0 max-w-[36rem] text-sm leading-normal text-secondary-500">
            {description}
          </p>
        ) : null}
        {action ? <div className="pt-1">{action}</div> : null}
      </div>
    </Card>
  );
}
