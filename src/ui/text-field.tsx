"use client";

import type { InputHTMLAttributes } from "react";
import { cx } from "../lib/cx";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextField({ label, hint, id, className, ...props }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <label className="flex flex-col gap-1.5" htmlFor={fieldId}>
      <span className="text-[13px] font-semibold">{label}</span>
      <input
        id={fieldId}
        className={cx(
          "min-h-[42px] w-full rounded-[10px] border border-secondary-300 bg-white px-3 font-[inherit] text-sm text-secondary-900 focus:border-primary focus:outline-3 focus:outline-primary/18",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-secondary-500">{hint}</span> : null}
    </label>
  );
}
