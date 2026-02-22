"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Home,
  Brain,
  Cloud,
  MessageSquare,
  Wrench,
  Database,
  Shield,
  Map,
  Film,
  Search as SearchIcon,
  GitCompare,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Active categories (have APIs in data/apis.json)
const activeCategories = [
  { name: "AI & Machine Learning", icon: Brain, emoji: "🤖", count: 11 },
  { name: "Cloud & Infrastructure", icon: Cloud, emoji: "☁️", count: 3 },
  { name: "Communication", icon: MessageSquare, emoji: "💬", count: 1 },
];

// Inactive categories (0 APIs - commented out for future expansion)
const inactiveCategories: { name: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [];
// TODO: Uncomment and add APIs when available:
// - DevTools
// - Data & Analytics
// - Authentication
// - Maps & Geolocation
// - Media & Entertainment
// - Storage
// - Search

export function Sidebar({ 
  collapsed = false, 
  onToggle 
}: { 
  collapsed?: boolean; 
  onToggle?: () => void 
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 glass border-r border-border z-50 transition-all duration-300 ease-in-out",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      {/* Logo & Collapse Toggle */}
      <div className={cn(
        "flex items-center h-16 border-b border-border transition-all duration-300",
        collapsed ? "justify-center px-2" : "justify-between px-6"
      )}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">
              FreeAPIHub
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-lg hover:bg-surface-overlay text-text-muted hover:text-text-primary transition-all duration-200",
            collapsed && "absolute right-1"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-4 space-y-1 transition-all duration-300",
        collapsed ? "px-1" : "px-3"
      )}>
        {/* Main links */}
        <SidebarLink href="/" icon={Home} active={!activeCategory} collapsed={collapsed}>
          {collapsed ? "" : "All APIs"}
        </SidebarLink>
        <SidebarLink href="/compare" icon={GitCompare} collapsed={collapsed}>
          {collapsed ? "" : "Compare"}
        </SidebarLink>
        <SidebarLink href="/?sortBy=rating&sortOrder=desc" icon={Star} collapsed={collapsed}>
          {collapsed ? "" : "Top Rated"}
        </SidebarLink>

        {/* Categories */}
        <div className={cn(
          "pt-4 mt-4 border-t border-border",
          collapsed && "border-t-0"
        )}>
          {!collapsed && (
            <p className="text-xs text-text-muted uppercase tracking-wider mb-3 px-3">
              Categories
            </p>
          )}
          {activeCategories.map((cat) => (
            <SidebarLink
              key={cat.name}
              href={`/?category=${encodeURIComponent(cat.name)}`}
              icon={cat.icon}
              active={activeCategory === cat.name}
              collapsed={collapsed}
              badge={cat.count}
            >
              {collapsed ? "" : cat.name}
            </SidebarLink>
          ))}
          
          {/* Inactive categories - shown as disabled when collapsed */}
          {inactiveCategories.length > 0 && !collapsed && (
            <>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3 px-3 mt-4">
                Coming Soon
              </p>
              {inactiveCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-muted opacity-50 cursor-not-allowed"
                  title={`Coming soon: ${cat.name}`}
                >
                  <cat.icon size={16} />
                  <span className="truncate">{cat.name}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Quick filters */}
        <div className={cn(
          "pt-4 mt-4 border-t border-border",
          collapsed && "border-t-0"
        )}>
          {!collapsed && (
            <p className="text-xs text-text-muted uppercase tracking-wider mb-3 px-3">
              Quick Filters
            </p>
          )}
          <SidebarLink href="/?creditCard=false" icon={Shield} collapsed={collapsed}>
            {collapsed ? "" : "No Credit Card"}
          </SidebarLink>
          <SidebarLink href="/?sortBy=rpm&sortOrder=desc" icon={Zap} collapsed={collapsed}>
            {collapsed ? "" : "Highest RPM"}
          </SidebarLink>
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-border transition-all duration-300",
        collapsed && "p-2"
      )}>
        {!collapsed && (
          <p className="text-xs text-text-muted text-center">
            © 2026 FreeAPIHub
          </p>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <span className="text-xs text-text-muted">©</span>
          </div>
        )}
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  children,
  active = false,
  collapsed = false,
  badge,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg text-sm transition-all duration-200 group relative",
        active
          ? "bg-primary/10 text-primary-light border border-primary/20"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-overlay",
        collapsed ? "justify-center p-2" : "px-3 py-2"
      )}
      title={collapsed && children ? (children as string) : undefined}
    >
      <Icon size={16} className={active ? "text-primary-light shrink-0" : "shrink-0"} />
      {!collapsed && (
        <>
          <span className="truncate flex-1">{children}</span>
          {badge !== undefined && (
            <span className="text-xs bg-surface-overlay px-2 py-0.5 rounded-full text-text-muted">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge !== undefined && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary/20 text-primary-light text-[10px] rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
