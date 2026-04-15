'use client';

import { motion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

type NitroHeroProps = {
  kicker: string;
  headline: React.ReactNode;
  viewTransitionName: string;
  count?: string;
};

export function NitroHero({ kicker, headline, viewTransitionName, count }: NitroHeroProps) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
      {/* faint vertical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: 'calc(100% / 12) 100%',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 70%, transparent)',
        }}
      />

      <div className="flex items-start justify-between">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted"
        >
          {kicker}
        </motion.p>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-available"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-available opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-available" />
          </span>
          available for new projects
        </motion.span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        style={{ viewTransitionName }}
        className="mt-20 font-display text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.02em] md:mt-32"
      >
        {headline}
      </motion.h1>

      {count && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-12 flex items-center justify-between border-t border-fg/10 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
        >
          <span>{count}</span>
          <span className="flex items-center gap-3">
            scroll to stack
            <span aria-hidden>↓</span>
          </span>
        </motion.div>
      )}
    </section>
  );
}
