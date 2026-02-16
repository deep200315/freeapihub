"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  CreditCard,
  Clock,
  Zap,
  GitCompare,
  Check,
} from "lucide-react";
import type { APIProvider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { RateLimitBar } from "@/components/ui/RateLimitBar";
import { useCompare } from "@/components/compare/CompareContext";

interface APICardProps {
  provider: APIProvider;
  index: number;
}

export function APICard({ provider, index }: APICardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(provider.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group glass glass-hover glow-hover rounded-2xl overflow-hidden transition-all duration-300"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center text-lg font-bold text-primary-light">
              {provider.name.charAt(0)}
            </div>
            <div>
              <Link
                href={`/providers/${provider.slug}`}
                className="font-semibold text-text-primary hover:text-primary-light transition-colors"
              >
                {provider.name}
              </Link>
              <p className="text-xs text-text-muted">{provider.category}</p>
            </div>
          </div>

          {/* Compare button */}
          <button
            onClick={() =>
              inCompare
                ? removeFromCompare(provider.id)
                : addToCompare(provider)
            }
            className={`p-2 rounded-lg transition-all duration-200 ${
              inCompare
                ? "bg-primary/20 text-primary-light border border-primary/30"
                : "text-text-muted hover:text-text-secondary hover:bg-surface-overlay"
            }`}
            title={inCompare ? "Remove from compare" : "Add to compare"}
          >
            {inCompare ? <Check size={14} /> : <GitCompare size={14} />}
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {provider.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {provider.badges.map((badge) => (
            <Badge key={badge.label} badge={badge} />
          ))}
          {!provider.creditCardRequired && (
            <Badge
              badge={{ label: "No Credit Card", color: "green" }}
            />
          )}
        </div>

        {/* Rate Limits */}
        <div className="space-y-2 mb-4">
          {provider.rateLimits.rpm !== undefined && (
            <RateLimitBar
              label="Requests/min"
              value={provider.rateLimits.rpm}
              max={60}
              unit="RPM"
              color="bg-primary"
            />
          )}
          {provider.rateLimits.rpd !== undefined && (
            <RateLimitBar
              label="Requests/day"
              value={provider.rateLimits.rpd}
              max={10000}
              unit="RPD"
              color="bg-accent"
            />
          )}
          {provider.rateLimits.tpm !== undefined && (
            <RateLimitBar
              label="Tokens/min"
              value={provider.rateLimits.tpm}
              max={1000000}
              unit="TPM"
              color="bg-purple-500"
            />
          )}
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {provider.freeTier.duration}
          </span>
          {provider.creditCardRequired && (
            <span className="flex items-center gap-1 text-warning">
              <CreditCard size={12} />
              Card Required
            </span>
          )}
          {provider.communityRating && (
            <span className="flex items-center gap-1">
              <Star size={12} className="text-warning" />
              {provider.communityRating} ({provider.reviewCount})
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/providers/${provider.slug}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm text-primary-light hover:bg-primary/20 transition-all duration-200"
          >
            <Zap size={14} />
            View Details
          </Link>
          <a
            href={provider.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 border border-border rounded-xl text-text-muted hover:text-text-secondary hover:border-border-light transition-all duration-200"
            title="Official Docs"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
