"use client";

import { getEventAvailability } from "../lib/availability";
import { mediaUrls } from "../lib/media";
import { toEgpLabel } from "../lib/money";
import type { EventItem } from "../lib/types";
import { AvailabilityBadge } from "./availability-badge";

export type MarketEventCardProps = {
  event: EventItem;
  onOpen?: (event: EventItem) => void;
  onAction?: (event: EventItem) => void;
};

export function MarketEventCard({
  event,
  onOpen,
  onAction,
}: MarketEventCardProps) {
  const isFree = event.pricing === "free";
  const seats = getEventAvailability(event);
  const canAct = Boolean(onAction) && !seats.soldOut;

  return (
    <article className="overflow-hidden rounded-[18px] border border-primary-100 bg-white shadow-[0_12px_28px_rgba(91,33,182,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(249,115,22,0.16)]">
      <div className="relative">
        <button
          type="button"
          className="m-0 block w-full cursor-pointer border-0 bg-transparent p-0"
          onClick={() => onOpen?.(event)}
          aria-label={`Open ${event.title}`}
        >
          <span className="block aspect-[16/11] overflow-hidden bg-secondary-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                mediaUrls(event)[0] ??
                "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80"
              }
              alt=""
              className="size-full object-cover transition duration-500 hover:scale-105"
            />
          </span>
        </button>
        <span className="absolute top-3 left-3 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-[0_6px_14px_rgba(249,115,22,0.35)]">
          {event.badgeLabel ?? (isFree ? "Free event" : "Paid event")}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 pt-3.5 pb-4">
        <h3 className="m-0 text-[15px] leading-snug font-semibold tracking-tight text-secondary-950">
          {event.title}
        </h3>
        <p className="m-0 text-xs text-secondary-500">{event.dateLabel}</p>
        <p className="m-0 text-xs text-secondary-500">{event.venue}</p>
        <AvailabilityBadge
          available={seats.available}
          soldOut={seats.soldOut}
          kind="seats"
        />
        <p className="m-0 text-xs text-secondary-500">
          {seats.booked}/{seats.capacity} booked · {seats.label}
        </p>
        <p className="m-0 text-[15px] font-semibold text-secondary-950">
          {isFree ? "Free" : toEgpLabel(event.priceLabel)}
        </p>
        <button
          type="button"
          className="mt-2 inline-flex min-h-9 cursor-pointer items-center justify-center rounded-[10px] border-0 bg-primary px-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          disabled={!canAct}
          onClick={() => onAction?.(event)}
        >
          {seats.soldOut
            ? "Sold out"
            : isFree
              ? "Join free"
              : "Buy ticket"}
        </button>
      </div>
    </article>
  );
}
