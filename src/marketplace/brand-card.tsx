"use client";

export type BrandCardProps = {
  name: string;
  subtitle: string;
  mark?: string;
  onOpen?: () => void;
};

export function BrandCard({
  name,
  subtitle,
  mark,
  onOpen,
}: BrandCardProps) {
  return (
    <button
      type="button"
      className="m-0 flex min-h-[132px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border border-primary-100 bg-white px-4 py-5 text-center font-[inherit] shadow-[0_10px_24px_rgba(91,33,182,0.08)] transition duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-[0_16px_32px_rgba(249,115,22,0.16)]"
      onClick={onOpen}
    >
      <span
        className="grid size-11 place-items-center rounded-full bg-accent-100 text-sm font-bold text-accent-700"
        aria-hidden="true"
      >
        {mark ?? name.slice(0, 1)}
      </span>
      <span className="text-base font-semibold tracking-tight text-secondary-950">
        {name}
      </span>
      <span className="text-xs text-secondary-500">{subtitle}</span>
    </button>
  );
}
