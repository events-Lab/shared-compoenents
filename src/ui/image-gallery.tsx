"use client";

import { useEffect, useState } from "react";
import { cx } from "../lib/cx";

export type ImageGalleryProps = {
  images: string[];
  alt: string;
  emptyLabel?: string;
  aspectClassName?: string;
};

export function ImageGallery({
  images,
  alt,
  emptyLabel = "No images",
  aspectClassName = "aspect-[4/3]",
}: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const signature = images.join("\u0000");

  useEffect(() => {
    setActive(0);
  }, [signature]);

  if (images.length === 0) {
    return (
      <div
        className={cx(
          "grid place-items-center rounded-2xl border border-secondary-200 bg-secondary-100 px-4 text-center text-sm font-semibold text-secondary-600",
          aspectClassName,
        )}
      >
        {emptyLabel}
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-secondary-200 bg-secondary-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={alt}
          className={cx("w-full object-cover", aspectClassName)}
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={`${index}-${src.slice(-32)}`}
              type="button"
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={index === Math.min(active, images.length - 1)}
              onClick={() => setActive(index)}
              className={cx(
                "size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-secondary-100 p-0",
                index === Math.min(active, images.length - 1)
                  ? "border-primary"
                  : "border-secondary-200",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
