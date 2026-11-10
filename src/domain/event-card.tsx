"use client";

import { getEventAvailability } from "../lib/availability";
import { toEgpLabel } from "../lib/money";
import type { EventItem } from "../lib/types";
import { AvailabilityBadge } from "../marketplace/availability-badge";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { EventStatusBadge } from "./event-status-badge";

export type EventCardProps = {
  event: EventItem;
  ctaLabel?: string;
  onAction?: (event: EventItem) => void;
  showStatus?: boolean;
  showFooter?: boolean;
};

export function EventCard({
  event,
  ctaLabel,
  onAction,
  showStatus = false,
  showFooter,
}: EventCardProps) {
  const isFree = event.pricing === "free";
  const seats = getEventAvailability(event);
  const defaultCta = seats.soldOut
    ? "Sold out"
    : isFree
      ? "Join free"
      : "Buy ticket";
  const renderFooter = showFooter ?? Boolean(onAction || ctaLabel);
  const canAct = Boolean(onAction) && !seats.soldOut;

  return (
    <Card
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={isFree ? "info" : "success"}>
            {isFree ? "Free" : "Paid"}
          </Badge>
          <AvailabilityBadge
            available={seats.available}
            soldOut={seats.soldOut}
            kind="seats"
          />
          {showStatus && event.status ? (
            <EventStatusBadge status={event.status} />
          ) : null}
        </div>
      }
      footer={
        renderFooter ? (
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 text-sm font-semibold text-secondary-700">
              {isFree ? "Free entry" : toEgpLabel(event.priceLabel)}
            </p>
            <Button
              type="button"
              disabled={!canAct}
              onClick={() => onAction?.(event)}
            >
              {ctaLabel ?? defaultCta}
            </Button>
          </div>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-lg font-semibold tracking-tight">{event.title}</h3>
        {event.description ? (
          <p className="m-0 text-sm leading-normal text-secondary-500">
            {event.description}
          </p>
        ) : null}
        <dl className="m-0 grid gap-1.5 text-sm text-secondary-600">
          <div className="flex gap-2">
            <dt className="font-semibold text-secondary-800">When</dt>
            <dd className="m-0">{event.dateLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-secondary-800">Venue</dt>
            <dd className="m-0">{event.venue}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-secondary-800">Seats</dt>
            <dd className="m-0">
              {seats.available} available · {seats.booked}/{seats.capacity}{" "}
              booked
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
