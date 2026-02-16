"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  CreditCard,
  Globe,
  Clock,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Shield,
  Zap,
  BookOpen,
  TestTube,
  GitCompare,
  Share2,
} from "lucide-react";
import type { APIProvider } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { RateLimitBar } from "@/components/ui/RateLimitBar";
import { useCompare } from "@/components/compare/CompareContext";

interface Props {
  provider: APIProvider;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function APIDetailClient({ provider }: Props) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(provider.id);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Back link */}
      <motion.div variants={fadeInUp}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft size={14} />
          Back to all APIs
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        {/* Mobile: stack vertically, Desktop: side by side */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center text-xl sm:text-2xl font-bold text-primary-light shrink-0">
              {provider.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">{provider.name}</h1>
              <p className="text-xs sm:text-sm text-text-muted">
                {provider.category}
                {provider.subcategory && ` · ${provider.subcategory}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm bg-surface-overlay text-text-muted hover:text-text-secondary border border-border transition-all"
            >
              {shared ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
              <span className="hidden sm:inline">{shared ? "Copied!" : "Share"}</span>
            </button>
            <button
              onClick={() =>
                inCompare
                  ? removeFromCompare(provider.id)
                  : addToCompare(provider)
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                inCompare
                  ? "bg-primary/20 text-primary-light border border-primary/30"
                  : "bg-surface-overlay text-text-muted hover:text-text-secondary border border-border"
              }`}
            >
              <GitCompare size={14} />
              <span className="hidden sm:inline">{inCompare ? "In Compare" : "Compare"}</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text-secondary mb-4">{provider.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {provider.badges.map((badge) => (
            <Badge key={badge.label} badge={badge} size="md" />
          ))}
        </div>

        {/* Quick stats — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <QuickStat
            icon={<Clock size={14} />}
            label="Duration"
            value={provider.freeTier.duration}
          />
          <QuickStat
            icon={<CreditCard size={14} />}
            label="Credit Card"
            value={provider.creditCardRequired ? "Required" : "Not Required"}
            highlight={!provider.creditCardRequired}
          />
          <QuickStat
            icon={<Star size={14} className="text-warning" />}
            label="Rating"
            value={
              provider.communityRating
                ? `${provider.communityRating}/5 (${provider.reviewCount})`
                : "No ratings"
            }
          />
          <QuickStat
            icon={<Globe size={14} />}
            label="Geo Restrictions"
            value={
              provider.geoRestrictions.length > 0
                ? `${provider.geoRestrictions.length} regions`
                : "None"
            }
            highlight={provider.geoRestrictions.length === 0}
          />
        </div>
      </motion.div>

      {/* Rate Limits */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <Zap size={18} className="text-primary-light" />
          Rate Limits
        </h2>
        <div className="space-y-3">
          {provider.rateLimits.rpm !== undefined && (
            <RateLimitBar
              label="Requests per Minute"
              value={provider.rateLimits.rpm}
              max={60}
              unit="RPM"
              color="bg-primary"
            />
          )}
          {provider.rateLimits.rpd !== undefined && (
            <RateLimitBar
              label="Requests per Day"
              value={provider.rateLimits.rpd}
              max={10000}
              unit="RPD"
              color="bg-accent"
            />
          )}
          {provider.rateLimits.tpm !== undefined && (
            <RateLimitBar
              label="Tokens per Minute"
              value={provider.rateLimits.tpm}
              max={1000000}
              unit="TPM"
              color="bg-purple-500"
            />
          )}
          {provider.rateLimits.tpd !== undefined && (
            <RateLimitBar
              label="Tokens per Day"
              value={provider.rateLimits.tpd}
              max={10000000}
              unit="TPD"
              color="bg-orange-500"
            />
          )}
          {provider.rateLimits.bandwidth && (
            <div className="text-sm text-text-secondary">
              <span className="text-text-muted">Bandwidth:</span>{" "}
              {provider.rateLimits.bandwidth}
            </div>
          )}
          {provider.rateLimits.custom && (
            <div className="text-sm text-text-secondary">
              <span className="text-text-muted">Other:</span>{" "}
              {provider.rateLimits.custom}
            </div>
          )}
        </div>
      </motion.div>

      {/* Free Tier Details */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <Shield size={18} className="text-success" />
          Free Tier Details
        </h2>

        {provider.freeTier.freeCredits && (
          <p className="text-sm text-text-secondary mb-3">
            <span className="text-success font-semibold">
              ${provider.freeTier.freeCredits}
            </span>{" "}
            in free credits
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
              ✅ Included
            </p>
            <ul className="space-y-1.5">
              {provider.freeTier.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <Check size={14} className="text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
              ❌ Not Included
            </p>
            <ul className="space-y-1.5">
              {provider.freeTier.excludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-text-muted"
                >
                  <span className="mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {provider.freeTier.autoUpgrade && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-xl text-sm text-warning flex items-start gap-2">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>Auto-upgrade is enabled — you may be charged if you exceed free limits.</span>
          </div>
        )}
      </motion.div>

      {/* Signup Steps */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-accent" />
          How to Get Your Free API Key
        </h2>
        <div className="space-y-3">
          {provider.signupSteps.map((step) => (
            <StepCard key={step.order} step={step} type="signup" />
          ))}
        </div>
      </motion.div>

      {/* Testing Steps */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <TestTube size={18} className="text-purple-400" />
          How to Test Your Key
        </h2>
        <div className="space-y-3">
          {provider.testingSteps.map((step) => (
            <TestStepCard key={step.order} step={step} />
          ))}
        </div>
      </motion.div>

      {/* Hidden Limitations */}
      {provider.hiddenLimitations.length > 0 && (
        <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-warning" />
            Hidden Limitations
          </h2>
          <ul className="space-y-2">
            {provider.hiddenLimitations.map((limitation) => (
              <li
                key={limitation}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <AlertTriangle
                  size={14}
                  className="text-warning mt-0.5 shrink-0"
                />
                {limitation}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Geo Restrictions */}
      {provider.geoRestrictions.length > 0 && (
        <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <Globe size={18} className="text-danger" />
            Geographic Restrictions
          </h2>
          <div className="flex flex-wrap gap-2">
            {provider.geoRestrictions.map((region) => (
              <span
                key={region}
                className="px-3 py-1 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger"
              >
                {region}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Links */}
      <motion.div variants={fadeInUp} className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Official Links</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <ExternalLinkButton href={provider.docsUrl} label="Documentation" />
          <ExternalLinkButton href={provider.pricingUrl} label="Pricing" />
          {provider.dashboardUrl && (
            <ExternalLinkButton href={provider.dashboardUrl} label="Dashboard" />
          )}
          <ExternalLinkButton href={provider.website} label="Website" />
        </div>
      </motion.div>

      {/* Last updated */}
      <motion.p variants={fadeInUp} className="text-xs text-text-muted text-center pb-4">
        Last verified: {provider.lastVerified} · Last updated:{" "}
        {provider.lastUpdated}
      </motion.p>
    </motion.div>
  );
}

function QuickStat({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="p-2.5 sm:p-3 bg-surface-overlay rounded-xl">
      <div className="flex items-center gap-1.5 text-text-muted mb-1">
        {icon}
        <span className="text-[10px] sm:text-xs">{label}</span>
      </div>
      <p
        className={`text-xs sm:text-sm font-medium leading-tight ${highlight ? "text-success" : "text-text-primary"}`}
      >
        {value}
      </p>
    </div>
  );
}

function StepCard({
  step,
}: {
  step: { order: number; title: string; description: string; url?: string; warning?: string };
  type: string;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-surface-overlay transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/15 text-primary-light text-xs font-bold flex items-center justify-center shrink-0">
            {step.order}
          </span>
          <span className="text-sm font-medium text-text-primary text-left truncate">
            {step.title}
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-text-muted shrink-0 ml-2" />
        ) : (
          <ChevronDown size={14} className="text-text-muted shrink-0 ml-2" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pl-10 sm:px-4 sm:pb-4 sm:pl-14">
              <p className="text-sm text-text-secondary">{step.description}</p>
              {step.url && (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-primary-light hover:underline break-all"
                >
                  <ExternalLink size={12} className="shrink-0" />
                  <span className="truncate">{step.url}</span>
                </a>
              )}
              {step.warning && (
                <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded-lg text-xs text-warning flex items-start gap-1.5">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                  {step.warning}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TestStepCard({
  step,
}: {
  step: {
    order: number;
    title: string;
    command?: string;
    description: string;
    expectedResult?: string;
  };
}) {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    if (step.command) {
      navigator.clipboard.writeText(step.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-surface-overlay transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-500/15 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0">
            {step.order}
          </span>
          <span className="text-sm font-medium text-text-primary text-left truncate">
            {step.title}
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={14} className="text-text-muted shrink-0 ml-2" />
        ) : (
          <ChevronDown size={14} className="text-text-muted shrink-0 ml-2" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pl-10 sm:px-4 sm:pb-4 sm:pl-14 space-y-2">
              <p className="text-sm text-text-secondary">{step.description}</p>
              {step.command && (
                <div className="relative">
                  <pre className="p-3 bg-surface rounded-lg text-xs text-text-secondary overflow-x-auto border border-border max-w-full">
                    <code className="break-all whitespace-pre-wrap">{step.command}</code>
                  </pre>
                  <button
                    onClick={copyCommand}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-surface-overlay hover:bg-border transition-colors"
                    title="Copy command"
                  >
                    {copied ? (
                      <Check size={12} className="text-success" />
                    ) : (
                      <Copy size={12} className="text-text-muted" />
                    )}
                  </button>
                </div>
              )}
              {step.expectedResult && (
                <p className="text-xs text-text-muted">
                  <span className="text-success">Expected:</span>{" "}
                  {step.expectedResult}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExternalLinkButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-surface-overlay border border-border rounded-xl text-xs sm:text-sm text-text-secondary hover:text-text-primary hover:border-border-light transition-all"
    >
      <ExternalLink size={14} />
      {label}
    </a>
  );
}
