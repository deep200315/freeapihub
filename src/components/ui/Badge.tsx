import { cn } from "@/lib/utils";
import type { Badge as BadgeType } from "@/lib/types";

const colorMap: Record<BadgeType["color"], string> = {
  green: "bg-success/10 text-success border-success/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  red: "bg-danger/10 text-danger border-danger/20",
  yellow: "bg-warning/10 text-warning border-warning/20",
};

export function Badge({
  badge,
  size = "sm",
}: {
  badge: BadgeType;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border rounded-full font-medium",
        colorMap[badge.color],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {badge.label}
    </span>
  );
}
