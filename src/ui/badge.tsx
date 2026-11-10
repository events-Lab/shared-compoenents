import type { ReactNode } from "react";

const tones = {
  neutral: "bg-[#eef2f1] text-[#3d4f4a]",
  success: "bg-[#e5f5ef] text-[#0f6e46]",
  warning: "bg-[#fff4df] text-[#8a5a10]",
  danger: "bg-[#fdeceb] text-[#9b1c1c]",
  info: "bg-[#e8f1fb] text-[#1d4f91]",
};

export type BadgeProps = {
  tone?: keyof typeof tones;
  children: ReactNode;
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold leading-none whitespace-nowrap ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
