'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { RotatingPill } from './RotatingPill';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      aria-label="Intro"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-48"
    >
      {/* top meta strip: gallery placard energy */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
      >
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-gold)' }}
          />
          est. 2026 · no.01
        </span>
        <span className="hidden md:inline">the work</span>
        <span className="inline-flex items-center gap-2">
          handcrafted sites
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-gold)' }}
          />
        </span>
      </motion.div>

      {/* main headline */}
      <h1 className="mt-14 md:mt-20">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="block font-serif font-medium leading-[0.92] tracking-[-0.03em] text-ink"
          style={{ fontSize: 'clamp(52px, 10.5vw, 148px)' }}
        >
          building websites
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mt-1 block font-serif font-medium leading-[0.92] tracking-[-0.03em] text-ink"
          style={{ fontSize: 'clamp(52px, 10.5vw, 148px)' }}
        >
          that feel{' '}
          <motion.span
            initial={{ opacity: 0, rotate: -12, y: 10 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.7 }}
            className="relative inline-block font-hand font-normal"
            style={{
              color: 'var(--color-accent)',
              fontSize: '0.78em',
              transform: 'rotate(-4deg) translateY(-0.04em)',
              marginLeft: '0.06em',
            }}
          >
            alive
            <motion.span
              aria-hidden
              className="alive-smudge"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.32 }}
              transition={{ duration: 0.7, ease, delay: 1.25 }}
              style={{ transformOrigin: 'left center' }}
            />
          </motion.span>
        </motion.span>
      </h1>

      {/* sub / rotating pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.55 }}
        className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 md:mt-14"
      >
        <span
          className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-muted"
          aria-hidden
        >
          →
        </span>
        <span
          className="font-serif italic text-ink"
          style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}
        >
          highly personalised, hand-built for
        </span>
        <RotatingPill />
      </motion.div>

      {/* body line */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.75 }}
        className="mt-8 max-w-[56ch] text-[17px] leading-[1.55] text-ink-muted md:text-[19px]"
      >
        I design and build bespoke websites that sound like you, not like a
        template. Every pixel hand-coded, every word considered.{' '}
        <span className="text-ink">Let's make something you're proud to send.</span>{' '}
        Tell me about your project — I reply to every email personally.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.9 }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-transform duration-200 hover:translate-y-[-1px]"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            boxShadow:
              '0 1px 0 rgba(149, 53, 25, 0.35), 0 14px 26px -10px rgba(184, 66, 31, 0.55)',
          }}
        >
          start a project
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <a
          href="#gallery"
          className="group inline-flex items-center gap-3 rounded-full border px-5 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-200"
          style={{
            borderColor: 'var(--color-ink)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: 'var(--color-gold)' }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
          see the work
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </a>
      </motion.div>

    </section>
  );
}
