"use client";

import { useState, Suspense } from "react";
import Script from "next/script";
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
          <div className="px-4 lg:px-8 py-6">
            <div className="glass rounded-2xl border border-border p-4 flex flex-col items-center gap-3">
              <div className="w-full flex justify-center overflow-x-auto">
                <Script id="banner-468x60-config">
                  {`atOptions = {
  'key' : '25f539099ca67255e81b2b282e96d827',
  'format' : 'iframe',
  'height' : 60,
  'width' : 468,
  'params' : {}
};`}
                </Script>
                <Script src="https://www.highperformanceformat.com/25f539099ca67255e81b2b282e96d827/invoke.js" />
              </div>
              <a
                href="https://www.profitablecpmratenetwork.com/nauuz48ed?key=957828b093d5bb2eb62387add8a95e48"
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-sm text-primary-light hover:text-primary transition-colors"
              >
                Sponsored link
              </a>
            </div>
          </div>
        </div>
      </div>
    </CompareProvider>
  );
}
