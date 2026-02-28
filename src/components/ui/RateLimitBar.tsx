"use client";

import { cn } from "@/lib/utils";

interface RateLimitBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color?: string;
}

export function RateLimitBar({
  label,
  value,
  max,
  unit,
  color = "bg-primary",
}: RateLimitBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-secondary font-mono">
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-1.5 bg-surface-overlay rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
