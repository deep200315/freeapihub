"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, X, GitCompare, Check, Minus } from "lucide-react";
import { useCompare } from "@/components/compare/CompareContext";
import { Badge } from "@/components/ui/Badge";

export function CompareClient() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to all APIs
        </Link>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <GitCompare size={48} className="text-text-muted mb-4" />
          <h2 className="text-xl font-semibold mb-2">No APIs to compare</h2>
          <p className="text-sm text-text-muted max-w-md mb-6">
            Add APIs to compare by clicking the compare button on any API card.
            You can compare up to 4 APIs side-by-side.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm text-primary-light hover:bg-primary/20 transition-all"
          >
            Browse APIs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            Back to all APIs
          </Link>
          <h1 className="text-2xl font-bold">Compare APIs</h1>
        </div>
        <button
          onClick={clearCompare}
          className="text-sm text-text-muted hover:text-danger transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm text-text-muted font-medium w-48">
                  Feature
                </th>
                {compareItems.map((item) => (
                  <th key={item.id} className="p-4 text-center min-w-[200px]">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center text-sm font-bold text-primary-light">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-sm">{item.name}</span>
                      <button
                        onClick={() => removeFromCompare(item.id)}
                        className="p-1 rounded hover:bg-surface-overlay text-text-muted hover:text-danger transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Category">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm text-text-secondary">
                    {item.category}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Free Duration">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm text-text-secondary">
                    {item.freeTier.duration}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Free Credits">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm">
                    {item.freeTier.freeCredits ? (
                      <span className="text-success font-medium">
                        ${item.freeTier.freeCredits}
                      </span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="RPM">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm font-mono">
                    {item.rateLimits.rpm !== undefined ? (
                      <span className="text-primary-light">{item.rateLimits.rpm.toLocaleString()}</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="RPD">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm font-mono">
                    {item.rateLimits.rpd !== undefined ? (
                      <span className="text-accent">{item.rateLimits.rpd.toLocaleString()}</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="TPM">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm font-mono">
                    {item.rateLimits.tpm !== undefined ? (
                      <span className="text-purple-400">{item.rateLimits.tpm.toLocaleString()}</span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Credit Card">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center">
                    {item.creditCardRequired ? (
                      <span className="inline-flex items-center gap-1 text-warning text-sm">
                        <Minus size={14} /> Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-success text-sm">
                        <Check size={14} /> Not Required
                      </span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Verification">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm text-text-secondary">
                    {item.verificationRequired.join(", ") || "None"}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Geo Restrictions">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm">
                    {item.geoRestrictions.length > 0 ? (
                      <span className="text-warning">
                        {item.geoRestrictions.length} regions
                      </span>
                    ) : (
                      <span className="text-success">None</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Auto-Upgrade">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center">
                    {item.freeTier.autoUpgrade ? (
                      <span className="text-warning text-sm">⚠️ Yes</span>
                    ) : (
                      <span className="text-success text-sm">No</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Rating">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-sm">
                    {item.communityRating ? (
                      <span className="text-warning">
                        ⭐ {item.communityRating}/5
                      </span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Badges">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {item.badges.map((badge) => (
                        <Badge key={badge.label} badge={badge} />
                      ))}
                    </div>
                  </td>
                ))}
              </CompareRow>

              <CompareRow label="Hidden Limitations">
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center text-xs text-text-muted">
                    {item.hiddenLimitations.length} known issues
                  </td>
                ))}
              </CompareRow>

              {/* Actions row */}
              <tr className="border-t border-border">
                <td className="p-4" />
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 text-center">
                    <Link
                      href={`/providers/${item.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-sm text-primary-light hover:bg-primary/20 transition-all"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function CompareRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-border/50 hover:bg-surface-overlay/30 transition-colors">
      <td className="p-4 text-sm text-text-muted font-medium">{label}</td>
      {children}
    </tr>
  );
}
