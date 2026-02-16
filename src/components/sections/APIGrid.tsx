"use client";

import { useSearchParams } from "next/navigation";
import { filterProviders } from "@/lib/data";
import { APICard } from "@/components/cards/APICard";
import { PackageOpen } from "lucide-react";

export function APIGrid() {
  const searchParams = useSearchParams();

  const providers = filterProviders({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    creditCardRequired:
      searchParams.get("creditCard") === "false" ? false : undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") ?? undefined,
  });

  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen size={48} className="text-text-muted mb-4" />
        <h3 className="text-lg font-semibold text-text-secondary mb-2">
          No APIs found
        </h3>
        <p className="text-sm text-text-muted max-w-md">
          Try adjusting your filters or search terms to find what you&apos;re
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {providers.map((provider, index) => (
        <APICard key={provider.id} provider={provider} index={index} />
      ))}
    </div>
  );
}
