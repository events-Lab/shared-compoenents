export type EventLifecycleStatus = "draft" | "published" | "live" | "completed";

export type EventAttendee = {
  id: string;
  name: string;
  email: string;
  ticketStatus: "confirmed" | "pending" | "cancelled";
  paidAmount?: string;
};

export type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  venue: string;
  capacity: number;
  booked?: number;
  pricing: "free" | "paid";
  priceLabel?: string;
  status?: EventLifecycleStatus;
  description?: string;
  coach?: string;
  court?: string;
  skillLevel?: string;
  duration?: string;
  revenueLabel?: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
  attendees?: EventAttendee[];
  imageUrl?: string;
  images?: string[];
  badgeLabel?: string;
};

export type ProductStatus = "active" | "draft" | "out_of_stock" | "archived";

export type ProductItem = {
  id: string;
  name: string;
  blurb: string;
  priceLabel: string;
  stockHint?: string;
  sku?: string;
  category?: string;
  brand?: string;
  stock?: number;
  status?: ProductStatus;
  rating?: number;
  reviewCount?: number;
  description?: string;
  imageLabel?: string;
  imageUrl?: string;
  images?: string[];
  badgeLabel?: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
};

export type CategoryItem = {
  id: string;
  label: string;
  href: string;
  imageUrl: string;
  images?: string[];
  ctaLabel?: string;
};

export type OrderStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type OrderItem = {
  id: string;
  label: string;
  amount: string;
  status: OrderStatus;
};

export type CartLineKind = "event" | "product";

export type CartLineSpec = {
  label: string;
  value: string;
};

export type CartLine = {
  id: string;
  label: string;
  detail?: string;
  priceLabel: string;
  quantity: number;
  kind?: CartLineKind;
  sourceId?: string;
  maxQuantity?: number;
  imageUrl?: string;
  specs?: CartLineSpec[];
};
