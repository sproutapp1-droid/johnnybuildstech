'use client';

import { motion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function EmptyStatePanel() {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 md:px-10 md:pb-32">
      <div
        className="relative overflow-hidden rounded-2xl border border-accent/30 bg-black"
        style={{
          background:
            'radial-gradient(80% 80% at 50% 0%, rgba(255,222,33,0.12), rgba(0,0,0,1) 70%)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative grid gap-12 px-6 py-14 md:grid-cols-12 md:px-12 md:py-24">
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
            >
              · in progress
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="mt-6 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.02em]"
            >
              website case studies <br />
              are <span className="text-accent">coming soon</span>.
            </motion.h2>
            <p className="mt-6 max-w-[54ch] text-base text-muted md:text-lg">
              This page will mirror the apps deck — the same stacked-panel scroll,
              different stories. I'm shipping the first three in Q3 2026.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="mailto:bitebuddy2@gmail.com?subject=websites%20waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-bg transition-colors duration-200 hover:bg-accent-dim"
              >
                notify me
                <span aria-hidden>→</span>
              </a>
              <a
                href="/apps"
                className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                see apps instead
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl border border-fg/10 bg-bg/40 md:min-h-[400px]">
              {/* grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,222,33,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,222,33,0.06) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.12 }}
                  className="absolute overflow-hidden rounded-md border border-accent/20 bg-bg/80 backdrop-blur"
                  style={{
                    left: `${6 + i * 10}%`,
                    top: `${14 + i * 16}%`,
                    width: `${58 - i * 6}%`,
                    aspectRatio: '16 / 10',
                    zIndex: 3 - i,
                  }}
                >
                  <div className="flex h-3 items-center gap-1 border-b border-fg/10 bg-white/[0.03] px-2">
                    <span className="h-1 w-1 rounded-full bg-fg/25" />
                    <span className="h-1 w-1 rounded-full bg-fg/25" />
                    <span className="h-1 w-1 rounded-full bg-fg/25" />
                    <span className="ml-2 h-1 w-16 rounded-full bg-fg/10" />
                  </div>
                  <div className="flex flex-col gap-1.5 p-2.5">
                    <span className="h-1.5 w-2/3 rounded-full bg-fg/20" />
                    <span className="h-1.5 w-1/2 rounded-full bg-fg/10" />
                    <span className="mt-1 h-8 w-full rounded-sm bg-accent/10" />
                  </div>
                </motion.div>
              ))}
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                <span className="h-1 w-1 rounded-full bg-accent" />
                drafts · 03
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
