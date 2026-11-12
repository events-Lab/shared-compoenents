"use client";

import { getProductAvailability } from "../lib/availability";
import { mediaUrls } from "../lib/media";
import { toEgpLabel } from "../lib/money";
import type { ProductItem } from "../lib/types";
import { AvailabilityBadge } from "./availability-badge";

export type MarketProductCardProps = {
  product: ProductItem;
  wishlisted?: boolean;
  onOpen?: (product: ProductItem) => void;
  onToggleWish?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
};

export function MarketProductCard({
  product,
  wishlisted = false,
  onOpen,
  onToggleWish,
  onAddToCart,
}: MarketProductCardProps) {
  const stock = getProductAvailability(product);
  const canAdd = Boolean(onAddToCart) && !stock.soldOut;

  return (
    <article className="overflow-hidden rounded-[18px] border border-primary-100 bg-primary-50 shadow-[0_12px_28px_rgba(16,42,67,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(22,119,255,0.16)]">
      <div className="relative">
        <button
          type="button"
          className="m-0 block w-full cursor-pointer border-0 bg-transparent p-0"
          onClick={() => onOpen?.(product)}
          aria-label={`Open ${product.name}`}
        >
          <span className="block aspect-[4/5] overflow-hidden bg-secondary-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                mediaUrls(product)[0] ??
                "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80"
              }
              alt=""
              className="size-full object-cover transition duration-500 hover:scale-105"
            />
          </span>
        </button>
        {product.badgeLabel ? (
          <span className="absolute top-3 left-3 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-950 uppercase shadow-[0_6px_14px_rgba(85,199,243,0.45)]">
            {product.badgeLabel}
          </span>
        ) : null}
        {onToggleWish ? (
          <button
            type="button"
            className={`absolute top-3 right-3 grid size-9 place-items-center rounded-full border-0 bg-white/95 text-base shadow-sm transition duration-200 hover:scale-110 ${wishlisted ? "text-accent" : "text-secondary-800"}`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => onToggleWish(product)}
          >
            {wishlisted ? "♥" : "♡"}
          </button>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 pt-3.5 pb-4">
        <button
          type="button"
          className="m-0 cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit]"
          onClick={() => onOpen?.(product)}
        >
          <h3 className="m-0 text-[15px] leading-snug font-semibold tracking-tight text-secondary-950">
            {product.name}
          </h3>
        </button>
        <p className="m-0 text-xs text-secondary-500">
          By {product.brand ?? "Events Lab"}
        </p>
        <AvailabilityBadge
          available={stock.available}
          soldOut={stock.soldOut}
          kind="items"
        />
        <p className="m-0 text-[15px] font-semibold text-secondary-950">
          {toEgpLabel(product.priceLabel)}
        </p>
        {product.rating != null ? (
          <p className="m-0 text-xs font-semibold text-secondary-600">
            ★ {product.rating.toFixed(1)}
            {product.reviewCount != null ? ` · ${product.reviewCount}` : ""}
          </p>
        ) : null}
        <button
          type="button"
          className="mt-2 inline-flex min-h-9 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-primary px-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          disabled={!canAdd}
          onClick={() => onAddToCart?.(product)}
        >
          {stock.soldOut ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
