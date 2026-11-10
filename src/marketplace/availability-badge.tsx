import { Badge } from "../ui/badge";

export type AvailabilityBadgeProps = {
  available: number;
  soldOut: boolean;
  kind: "seats" | "items";
};

export function AvailabilityBadge({
  available,
  soldOut,
  kind,
}: AvailabilityBadgeProps) {
  if (soldOut) {
    return <Badge tone="danger">{kind === "seats" ? "Sold out" : "Out of stock"}</Badge>;
  }

  if (available <= 3) {
    return (
      <Badge tone="warning">
        Only {available} {kind === "seats" ? "seat" : "item"}
        {available === 1 ? "" : "s"} left
      </Badge>
    );
  }

  return (
    <Badge tone="success">
      {available} {kind === "seats" ? "seats" : "items"} available
    </Badge>
  );
}
