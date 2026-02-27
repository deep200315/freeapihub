"use client";

import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function SidebarSkeleton({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 glass border-r border-border z-50 transition-all duration-300 ease-in-out",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      {/* Logo Skeleton */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-border transition-all duration-300",
          collapsed ? "justify-center px-2" : "justify-between px-6"
        )}
      >
        {collapsed ? (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div className="h-5 w-28 bg-surface-overlay rounded animate-pulse" />
          </div>
        )}
        <div className="w-7 h-7 bg-surface-overlay rounded-lg animate-pulse" />
      </div>

      {/* Navigation Skeleton */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto py-4 space-y-1 transition-all duration-300",
          collapsed ? "px-1" : "px-3"
        )}
      >
        {/* Main links skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-lg animate-pulse",
              collapsed ? "justify-center p-2" : "px-3 py-2"
            )}
          >
            <div className="w-4 h-4 bg-surface-overlay rounded" />
            {!collapsed && <div className="h-4 w-20 bg-surface-overlay rounded" />}
          </div>
        ))}

        {/* Categories skeleton */}
        <div
          className={cn(
            "pt-4 mt-4 border-t border-border",
            collapsed && "border-t-0"
          )}
        >
          {!collapsed && (
            <div className="h-3 w-20 bg-surface-overlay rounded mb-3 mx-3 animate-pulse" />
          )}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-lg animate-pulse",
                collapsed ? "justify-center p-2" : "px-3 py-2"
              )}
            >
              <div className="w-4 h-4 bg-surface-overlay rounded" />
              {!collapsed && <div className="h-4 flex-1 bg-surface-overlay rounded" />}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer Skeleton */}
      <div
        className={cn(
          "p-4 border-t border-border transition-all duration-300",
          collapsed && "p-2"
        )}
      >
        {!collapsed ? (
          <div className="h-3 w-16 bg-surface-overlay rounded mx-auto animate-pulse" />
        ) : (
          <div className="flex justify-center">
            <div className="h-3 w-3 bg-surface-overlay rounded animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
