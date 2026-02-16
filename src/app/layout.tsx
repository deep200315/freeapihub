import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CompareProvider } from "@/components/compare/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    description:
      "Find and compare free API keys from top providers.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface text-text-primary`}
      >
        <CompareProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col lg:ml-64">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </CompareProvider>
      </body>
    </html>
  );
}
