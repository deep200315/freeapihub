import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Discover Free API Keys & Tiers`,
    template: `%s | ${SITE_NAME}`,
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
    title: `${SITE_NAME} — Discover Free API Keys & Tiers`,
    description:
      "Find and compare free API keys from top providers. Detailed rate limits, signup guides, and hidden limitations.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Discover Free API Keys & Tiers`,
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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J074DTES1S"
        />
        {/* Popunder temporarily disabled */}
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-J074DTES1S');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface text-text-primary`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Script
          src="https://pl29051845.profitablecpmratenetwork.com/07/68/f0/0768f030edf59c43227bdb3a8a5714b8.js"
        />
      </body>
    </html>
  );
}
