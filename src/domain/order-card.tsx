import { toEgpLabel } from "../lib/money";
import type { OrderItem, OrderStatus } from "../lib/types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const statusTone: Record<OrderStatus, "success" | "warning" | "danger" | "neutral"> = {
  Paid: "success",
  Pending: "warning",
  Failed: "danger",
  Refunded: "neutral",
};

export type OrderCardProps = {
  order: OrderItem;
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card
      actions={<Badge tone={statusTone[order.status]}>{order.status}</Badge>}
    >
      <div>
        <h3 className="m-0 text-base font-semibold tracking-tight">{order.label}</h3>
        <p className="m-0 mt-1 text-sm text-secondary-500">
          Order {order.id} · {toEgpLabel(order.amount)}
        </p>
      </div>
    </Card>
  );
}
