"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { APIProvider } from "@/lib/types";

interface CompareContextType {
  compareItems: APIProvider[];
  addToCompare: (provider: APIProvider) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

const MAX_COMPARE = 4;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<APIProvider[]>([]);

  const addToCompare = useCallback((provider: APIProvider) => {
    setCompareItems((prev) => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.some((p) => p.id === provider.id)) return prev;
      return [...prev, provider];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareItems.some((p) => p.id === id),
    [compareItems]
  );

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{ compareItems, addToCompare, removeFromCompare, isInCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
