"use client";

import type { SelectHTMLAttributes } from "react";
import { cx } from "../lib/cx";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  options: SelectOption[];
};

export function SelectField({
  label,
  hint,
  id,
  className,
  options,
  ...props
}: SelectFieldProps) {
  const fieldId =
    id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <label className="flex flex-col gap-1.5" htmlFor={fieldId}>
      <span className="text-[13px] font-semibold">{label}</span>
      <span className="relative">
        <select
          id={fieldId}
          className={cx(
            "min-h-[42px] w-full appearance-none rounded-[10px] border border-secondary-300 bg-white bg-none py-2 pr-12 pl-3 font-[inherit] text-sm text-secondary-900 focus:border-primary focus:outline-3 focus:outline-primary/18",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-secondary-700"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {hint ? <span className="text-xs text-secondary-500">{hint}</span> : null}
    </label>
  );
}
