import type { EventItem, ProductItem } from "./types";

export type EventAvailability = {
  booked: number;
  capacity: number;
  available: number;
  soldOut: boolean;
  label: string;
};

export type ProductAvailability = {
  available: number;
  soldOut: boolean;
  label: string;
};

export function getEventAvailability(event: EventItem): EventAvailability {
  const booked = event.booked ?? 0;
  const capacity = event.capacity;
  const available = Math.max(capacity - booked, 0);
  const soldOut = available <= 0;
  return {
    booked,
    capacity,
    available,
    soldOut,
    label: soldOut
      ? "No seats left"
      : `${available} seat${available === 1 ? "" : "s"} left`,
  };
}

export function getProductAvailability(
  product: ProductItem,
): ProductAvailability {
  const available = Math.max(product.stock ?? 0, 0);
  const soldOut = available <= 0 || product.status === "out_of_stock";
  return {
    available,
    soldOut,
    label: soldOut
      ? "Out of stock"
      : `${available} item${available === 1 ? "" : "s"} left`,
  };
}
