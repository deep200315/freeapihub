import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { SearchFilters } from "@/components/search/SearchFilters";
import { APIGrid } from "@/components/sections/APIGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>

        <div className="mt-6">
          <Suspense fallback={<GridSkeleton />}>
            <APIGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function SearchFiltersSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-10 bg-surface-raised rounded-xl animate-pulse" />
      <div className="w-24 h-10 bg-surface-raised rounded-xl animate-pulse" />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 bg-surface-raised rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );
}
