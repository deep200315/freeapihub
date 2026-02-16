import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Compare Free APIs",
  description:
    "Compare free API tiers side-by-side. Rate limits, features, requirements, and hidden limitations.",
};

export default function ComparePage() {
  return <CompareClient />;
}
