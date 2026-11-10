"use client";

import { mediaUrls } from "../lib/media";
import type { CategoryItem } from "../lib/types";

export type CategoryCardProps = {
  category: CategoryItem;
  onOpen?: (category: CategoryItem) => void;
};

export function CategoryCard({ category, onOpen }: CategoryCardProps) {
  const cover = mediaUrls(category)[0] ?? category.imageUrl;

  return (
    <button
      type="button"
      className="group m-0 flex w-full cursor-pointer flex-col items-center gap-3 border-0 bg-transparent p-0 font-[inherit] text-secondary-900"
      onClick={() => onOpen?.(category)}
    >
      <span className="relative block size-[148px] overflow-hidden rounded-full border border-primary-100 bg-primary-50 shadow-[0_10px_30px_rgba(91,33,182,0.12)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_rgba(249,115,22,0.2)] max-[700px]:size-[120px]">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="size-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="grid size-full place-items-center text-sm font-semibold text-primary">
            {category.label.slice(0, 1)}
          </span>
        )}
      </span>
      <span className="flex flex-col items-center gap-1">
        <span className="text-[15px] font-semibold tracking-tight">
          {category.label}
        </span>
        <span className="text-xs font-semibold text-accent transition duration-200 group-hover:tracking-wide">
          {category.ctaLabel ?? "Shop Now"} →
        </span>
      </span>
    </button>
  );
}
