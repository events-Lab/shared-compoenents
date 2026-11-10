import type { ReactNode } from "react";
import { Card } from "./card";

export type DetailField = {
  label: string;
  value: ReactNode;
};

export type DetailListProps = {
  title?: string;
  fields: DetailField[];
  columns?: 1 | 2;
};

export function DetailList({
  title,
  fields,
  columns = 2,
}: DetailListProps) {
  return (
    <Card title={title}>
      <dl
        className={
          columns === 2
            ? "m-0 grid grid-cols-2 gap-x-6 gap-y-4 max-[700px]:grid-cols-1"
            : "m-0 grid grid-cols-1 gap-4"
        }
      >
        {fields.map((field) => (
          <div key={field.label} className="min-w-0">
            <dt className="m-0 text-xs font-semibold tracking-wide text-secondary-500 uppercase">
              {field.label}
            </dt>
            <dd className="m-0 mt-1.5 text-sm leading-normal text-secondary-900 break-words">
              {field.value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
