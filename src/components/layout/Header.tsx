"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, GitCompare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/components/compare/CompareContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { compareItems } = useCompare();

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-overlay transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo (mobile) */}
        <Link href="/" className="lg:hidden font-bold text-lg gradient-text">
          FreeAPIHub
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search APIs, providers, categories..."
              className="w-full pl-10 pr-4 py-2 bg-surface-overlay border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {compareItems.length > 0 && (
            <Link
              href="/compare"
              className="relative flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm text-primary-light hover:bg-primary/20 transition-colors"
            >
              <GitCompare size={16} />
              <span className="hidden sm:inline">Compare</span>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                {compareItems.length}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <nav className="p-4 space-y-2">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                🏠 Home
              </MobileNavLink>
              <MobileNavLink href="/compare" onClick={() => setMobileMenuOpen(false)}>
                ⚖️ Compare APIs
              </MobileNavLink>
              <div className="pt-2 mt-2 border-t border-border">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2 px-3">
                  Categories
                </p>
                <MobileNavLink href="/?category=AI+%26+Machine+Learning" onClick={() => setMobileMenuOpen(false)}>
                  🤖 AI & ML
                </MobileNavLink>
                <MobileNavLink href="/?category=Cloud+%26+Infrastructure" onClick={() => setMobileMenuOpen(false)}>
                  ☁️ Cloud
                </MobileNavLink>
                <MobileNavLink href="/?category=Communication" onClick={() => setMobileMenuOpen(false)}>
                  💬 Communication
                </MobileNavLink>
                <MobileNavLink href="/?category=DevTools" onClick={() => setMobileMenuOpen(false)}>
                  🛠️ DevTools
                </MobileNavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
    >
      {children}
    </Link>
  );
}
