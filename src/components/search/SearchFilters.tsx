"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "@/lib/data";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  const categories = getCategories();
  const activeCategory = searchParams.get("category");
  const noCreditCard = searchParams.get("creditCard") === "false";
  const sortBy = searchParams.get("sortBy") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchValue || null });
  };

  const clearAllFilters = () => {
    setSearchValue("");
    router.push("/");
  };

  const hasActiveFilters = activeCategory || noCreditCard || sortBy || searchValue;

  return (
    <div className="space-y-4">
      {/* Search + Filter Toggle */}
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search APIs, providers, categories..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-raised border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </form>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all duration-200 ${
            showFilters || hasActiveFilters
              ? "bg-primary/10 border-primary/30 text-primary-light"
              : "bg-surface-raised border-border text-text-secondary hover:border-border-light"
          }`}
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-4 space-y-4">
              {/* Categories */}
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={!activeCategory}
                    onClick={() => updateParams({ category: null })}
                  >
                    All
                  </FilterChip>
                  {categories.map((cat) => (
                    <FilterChip
                      key={cat}
                      active={activeCategory === cat}
                      onClick={() => updateParams({ category: cat })}
                    >
                      {cat}
                    </FilterChip>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Requirements
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    active={noCreditCard}
                    onClick={() =>
                      updateParams({
                        creditCard: noCreditCard ? null : "false",
                      })
                    }
                  >
                    💳 No Credit Card
                  </FilterChip>
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Sort By
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "", label: "Default" },
                    { value: "rpm", label: "Highest RPM" },
                    { value: "rpd", label: "Highest RPD" },
                    { value: "rating", label: "Top Rated" },
                    { value: "name", label: "Name A-Z" },
                  ].map((opt) => (
                    <FilterChip
                      key={opt.value}
                      active={sortBy === opt.value || (!sortBy && opt.value === "")}
                      onClick={() =>
                        updateParams({
                          sortBy: opt.value || null,
                          sortOrder: opt.value ? "desc" : null,
                        })
                      }
                    >
                      {opt.label}
                    </FilterChip>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-danger transition-colors"
                >
                  <X size={12} />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-primary/15 text-primary-light border border-primary/30"
          : "bg-surface-overlay text-text-muted border border-transparent hover:text-text-secondary hover:border-border"
      }`}
    >
      {children}
    </button>
  );
}
