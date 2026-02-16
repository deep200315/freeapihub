"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary-light">
            <Zap size={12} />
            Updated daily with the latest free API tiers
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Discover{" "}
            <span className="gradient-text">Free API Keys</span>
            <br />
            from Top Providers
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Compare rate limits, find hidden limitations, and get step-by-step
            guides to obtain free API keys for AI, Cloud, DevTools, and more.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-6 sm:gap-10"
        >
          <Stat icon={<Zap size={16} className="text-primary-light" />} value="15+" label="Free APIs" />
          <Stat icon={<TrendingUp size={16} className="text-accent" />} value="Daily" label="Updates" />
          <Stat icon={<Shield size={16} className="text-success" />} value="100%" label="Free to Use" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="text-left">
        <p className="text-sm font-bold text-text-primary">{value}</p>
        <p className="text-xs text-text-muted">{label}</p>
      </div>
    </div>
  );
}
