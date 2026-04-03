import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J074DTES1S"
        />
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
      </body>
    </html>
  );
}
