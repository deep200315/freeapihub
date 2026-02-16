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
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "AI & Machine Learning", icon: Brain, emoji: "🤖" },
  { name: "Cloud & Infrastructure", icon: Cloud, emoji: "☁️" },
  { name: "Communication", icon: MessageSquare, emoji: "💬" },
  { name: "DevTools", icon: Wrench, emoji: "🛠️" },
  { name: "Data & Analytics", icon: Database, emoji: "📊" },
  { name: "Authentication", icon: Shield, emoji: "🔐" },
  { name: "Maps & Geolocation", icon: Map, emoji: "🗺️" },
  { name: "Media & Entertainment", icon: Film, emoji: "🎬" },
  { name: "Storage", icon: Database, emoji: "💾" },
  { name: "Search", icon: SearchIcon, emoji: "🔍" },
];

export function Sidebar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 glass border-r border-border z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-6 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <Link href="/" className="font-bold text-xl gradient-text">
          FreeAPIHub
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Main links */}
        <SidebarLink href="/" icon={Home} active={!activeCategory}>
          All APIs
        </SidebarLink>
        <SidebarLink href="/compare" icon={GitCompare}>
          Compare
        </SidebarLink>
        <SidebarLink href="/?sortBy=rating&sortOrder=desc" icon={Star}>
          Top Rated
        </SidebarLink>

        {/* Categories */}
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3 px-3">
            Categories
          </p>
          {categories.map((cat) => (
            <SidebarLink
              key={cat.name}
              href={`/?category=${encodeURIComponent(cat.name)}`}
              icon={cat.icon}
              active={activeCategory === cat.name}
            >
              {cat.name}
            </SidebarLink>
          ))}
        </div>

        {/* Quick filters */}
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3 px-3">
            Quick Filters
          </p>
          <SidebarLink href="/?creditCard=false" icon={Shield}>
            No Credit Card
          </SidebarLink>
          <SidebarLink href="/?sortBy=rpm&sortOrder=desc" icon={Zap}>
            Highest RPM
          </SidebarLink>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-muted text-center">
          © 2026 FreeAPIHub
        </p>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  children,
  active = false,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
        active
          ? "bg-primary/10 text-primary-light border border-primary/20"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-overlay"
      )}
    >
      <Icon size={16} className={active ? "text-primary-light" : ""} />
      <span className="truncate">{children}</span>
    </Link>
  );
}
