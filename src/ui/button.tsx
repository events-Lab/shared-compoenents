"use client";

import type { ButtonHTMLAttributes } from "react";
import { cx } from "../lib/cx";

type Variant = "primary" | "secondary" | "ghost" | "accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_18px_rgba(109,40,217,0.22)] transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-primary-700",
  secondary:
    "border-secondary-300 bg-secondary text-secondary-900 transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-secondary-200",
  ghost:
    "bg-transparent text-primary transition duration-200 enabled:hover:bg-primary/8",
  accent:
    "bg-accent text-white shadow-[0_8px_18px_rgba(249,115,22,0.28)] transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-accent-600",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[10px] border border-transparent px-3.5 font-[inherit] text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-[0.45]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
