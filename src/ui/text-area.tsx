"use client";

import type { TextareaHTMLAttributes } from "react";
import { cx } from "../lib/cx";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function TextArea({
  label,
  hint,
  id,
  className,
  rows = 4,
  ...props
}: TextAreaProps) {
  const fieldId =
    id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <label className="flex flex-col gap-1.5" htmlFor={fieldId}>
      <span className="text-[13px] font-semibold">{label}</span>
      <textarea
        id={fieldId}
        rows={rows}
        className={cx(
          "w-full resize-y rounded-[10px] border border-secondary-300 bg-white px-3 py-2.5 font-[inherit] text-sm text-secondary-900 focus:border-primary focus:outline-3 focus:outline-primary/18",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-secondary-500">{hint}</span> : null}
    </label>
  );
}
