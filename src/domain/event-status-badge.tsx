import type { EventLifecycleStatus } from "../lib/types";
import { Badge } from "../ui/badge";

const labels: Record<EventLifecycleStatus, string> = {
  draft: "Draft",
  published: "Published",
  live: "Live",
  completed: "Completed",
};

const tones: Record<EventLifecycleStatus, "neutral" | "info" | "success" | "warning"> = {
  draft: "neutral",
  published: "info",
  live: "success",
  completed: "warning",
};

export type EventStatusBadgeProps = {
  status: EventLifecycleStatus;
};

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  return <Badge tone={tones[status]}>{labels[status]}</Badge>;
}
