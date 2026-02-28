import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { CompareProvider } from "@/components/compare/CompareContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://freeapihub.com"),
  title: {
    default: "FreeAPIHub — Discover Free API Keys & Tiers",
    template: "%s | FreeAPIHub",
  },
  description:
    "Find and compare free API keys from top providers. Detailed rate limits, signup guides, and hidden limitations for AI, Cloud, DevTools, and more.",
  keywords: [
    "free API keys",
    "free API tier",
    "API rate limits",
    "free AI API",
    "no credit card API",
    "developer tools",
    "API comparison",
  ],
  openGraph: {
    title: "FreeAPIHub — Discover Free API Keys & Tiers",
    description:
      "Find and compare free API keys from top providers. Detailed rate limits, signup guides, and hidden limitations.",
    type: "website",
    locale: "en_US",
    siteName: "FreeAPIHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeAPIHub — Discover Free API Keys & Tiers",
    description: "Find and compare free API keys from top providers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-surface text-text-primary`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
