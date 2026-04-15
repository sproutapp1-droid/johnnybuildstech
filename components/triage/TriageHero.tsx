'use client';

import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { StackedMini } from './StackedMini';
import { WebsitesPreview } from './WebsitesPreview';

const EASE = [0.16, 1, 0.3, 1] as const;

export function TriageHero() {
  return (
    <main className="relative z-10">
      {/* ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-[-20vh] h-[80vh] w-[80vh] -translate-x-1/2 rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,222,33,0.10), rgba(0,0,0,0) 70%)',
          }}
        />
        <div
          className="absolute bottom-[-30vh] right-[-15vw] h-[70vh] w-[70vh] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,222,33,0.06), rgba(0,0,0,0) 70%)',
          }}
        />
      </div>

      <section className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
        {/* intro */}
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted"
            >
              Hey, I'm Johnny<span className="text-accent"> —</span> a product builder
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
              className="mt-6 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.02em]"
            >
              apps &amp; websites <br />
              that <span className="italic text-muted">feel</span>{' '}
              <span className="text-accent">alive</span>.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:justify-self-end"
          >
            <p className="max-w-[32ch] font-display text-sm leading-relaxed text-muted md:text-base">
              A portfolio of five shipped apps and the websites that house them.
              Pick a path below — the stack of work inside scrolls like a deck of
              colored cards.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-accent" />
              pick your path
              <span aria-hidden>↓</span>
            </div>
          </motion.div>
        </div>

        {/* cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-8"
        >
          <TiltCard
            number="01"
            title="apps."
            subtitle="Five shipped mobile products — ADHD task flow, debt payoff coaching, value-per-use, household routines, time-since tracking."
            meta="5 products · ios + android"
            href="/apps"
            transitionName="triage-apps"
          >
            <StackedMini active />
          </TiltCard>

          <TiltCard
            number="02"
            title="websites."
            subtitle="Case studies of the marketing sites behind the apps, plus bespoke client work landing here soon."
            meta="case studies · in progress"
            href="/websites"
            transitionName="triage-websites"
          >
            <WebsitesPreview active />
          </TiltCard>
        </motion.div>

        {/* caption ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          className="mt-12 flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:mt-20 md:flex-row md:items-center"
        >
          <span>
            N51.5 <span className="text-fg/40">·</span> W0.1 <span className="text-fg/40">·</span> 24 /7 workshop
          </span>
          <span className="flex items-center gap-3">
            <span className="hidden md:inline">scroll ↓ or pick a card</span>
            <span className="h-px w-10 bg-fg/15" />
            <span className="text-accent">v0.1 · apr 2026</span>
          </span>
        </motion.div>
      </section>
    </main>
  );
}
