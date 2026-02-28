"use client";

import { useState, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CompareProvider } from "@/components/compare/CompareContext";
import { SidebarSkeleton } from "./SidebarSkeleton";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <CompareProvider>
      <div className="flex min-h-screen">
        <Suspense fallback={<SidebarSkeleton collapsed={sidebarCollapsed} />}>
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </Suspense>
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </CompareProvider>
  );
}
