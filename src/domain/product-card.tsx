"use client";

import { getProductAvailability } from "../lib/availability";
import { mediaUrls } from "../lib/media";
import { toEgpLabel } from "../lib/money";
import type { ProductItem } from "../lib/types";
import { AvailabilityBadge } from "../marketplace/availability-badge";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export type ProductCardProps = {
  product: ProductItem;
  ctaLabel?: string;
  onAddToCart?: (product: ProductItem) => void;
  onOpen?: (product: ProductItem) => void;
  compact?: boolean;
};

export function ProductCard({
  product,
  ctaLabel = "Add to cart",
  onAddToCart,
  onOpen,
  compact = false,
}: ProductCardProps) {
  const rating =
    typeof product.rating === "number" ? product.rating.toFixed(1) : null;
  const stock = getProductAvailability(product);
  const cover = mediaUrls(product)[0];

  return (
    <Card
      footer={
        onAddToCart || onOpen ? (
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 text-base font-semibold text-secondary-900">
              {toEgpLabel(product.priceLabel)}
            </p>
            <div className="flex gap-2">
              {onOpen ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onOpen(product)}
                >
                  View
                </Button>
              ) : null}
              {onAddToCart ? (
                <Button type="button" onClick={() => onAddToCart(product)}>
                  {ctaLabel}
                </Button>
              ) : null}
            </div>
          </div>
        ) : undefined
      }
    >
      <div
        className={
          onOpen
            ? "flex cursor-pointer flex-col gap-2"
            : "flex flex-col gap-2"
        }
        onClick={onOpen ? () => onOpen(product) : undefined}
        onKeyDown={
          onOpen
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpen(product);
                }
              }
            : undefined
        }
        role={onOpen ? "link" : undefined}
        tabIndex={onOpen ? 0 : undefined}
      >
        <div
          className={`overflow-hidden rounded-[12px] bg-secondary-100 text-sm font-semibold text-secondary-600 ${
            compact ? "h-28" : "h-36"
          }`}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="block size-full object-cover" />
          ) : (
            <span className="grid size-full place-items-center" aria-hidden="true">
              {product.imageLabel ?? product.category ?? "Padel"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {product.category ? (
            <Badge tone="neutral">{product.category}</Badge>
          ) : null}
          {product.brand ? (
            <span className="text-xs font-semibold text-secondary-500">
              {product.brand}
            </span>
          ) : null}
        </div>
        <h3 className="m-0 text-base font-semibold tracking-tight">
          {product.name}
        </h3>
        {rating ? (
          <p className="m-0 text-xs font-semibold text-secondary-600">
            ★ {rating}
            {product.reviewCount != null
              ? ` · ${product.reviewCount} ratings`
              : ""}
          </p>
        ) : null}
        {!compact ? (
          <p className="m-0 text-sm leading-normal text-secondary-500">
            {product.blurb}
          </p>
        ) : null}
        <AvailabilityBadge
          available={stock.available}
          soldOut={stock.soldOut}
          kind="items"
        />
        {!onAddToCart && !onOpen ? (
          <p className="m-0 pt-1 text-sm font-semibold text-secondary-700">
            {toEgpLabel(product.priceLabel)}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
