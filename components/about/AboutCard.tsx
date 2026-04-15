'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const ROWS: [string, string][] = [
  ['Based', 'United Kingdom'],
  ['Started with', 'Sprout, for my wife'],
  ['Works in', 'Next.js · Vercel'],
  ['Shipped', '5 apps · client sites'],
  ['Loves most', 'the iteration'],
  ['Replies to', 'every email personally'],
];

export function AboutCard() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="At a glance"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36"
    >
      <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:items-start md:gap-24">
        {/* LEFT — the library card */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease }}
          whileHover={reduce ? undefined : { rotate: 0, transition: { duration: 0.5, ease } }}
          className="relative mx-auto w-full max-w-[540px] md:mx-0"
          style={{ transformOrigin: 'top left' }}
        >
          <div
            className="relative overflow-hidden px-7 pb-10 pt-16 md:px-9 md:pb-12 md:pt-20"
            style={{
              background: 'var(--color-bg-deep)',
              boxShadow:
                '0 1px 0 rgba(122, 91, 63, 0.1), 0 30px 60px -36px rgba(44, 29, 18, 0.35), inset 0 0 0 1px rgba(196, 138, 58, 0.45)',
            }}
          >
            {/* punch-hole top */}
            <span
              aria-hidden
              className="absolute left-1/2 top-4 h-3 w-7 -translate-x-1/2 rounded-full"
              style={{
                background: 'var(--color-bg)',
                boxShadow:
                  'inset 0 1px 2px rgba(44, 29, 18, 0.4), 0 0 0 1px rgba(196, 138, 58, 0.3)',
              }}
            />

            {/* header strip */}
            <div
              className="absolute inset-x-7 top-9 flex items-baseline justify-between border-b pb-3 md:inset-x-9"
              style={{ borderColor: 'rgba(196, 138, 58, 0.4)' }}
            >
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--color-gold-dim)' }}
              >
                ─ the card
              </span>
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--color-gold-dim)' }}
              >
                index no. 01
              </span>
            </div>

            {/* rust INDEX stamp, corner */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-5 top-14 select-none font-mono text-[9px] uppercase tracking-[0.3em] md:right-8"
              style={{
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent)',
                padding: '3px 8px',
                borderRadius: '2px',
                transform: 'rotate(-8deg)',
                opacity: 0.75,
              }}
            >
              on file
            </span>

            {/* rows with dotted leaders */}
            <dl className="mt-8 space-y-3 md:space-y-3.5">
              {ROWS.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={reduce ? undefined : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.06 }}
                  className="flex items-baseline gap-3"
                >
                  <dt
                    className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.24em]"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {k}
                  </dt>
                  <span
                    aria-hidden
                    className="min-w-0 flex-1 translate-y-[-4px] opacity-70"
                    style={{
                      borderBottom:
                        '1px dotted rgba(122, 91, 63, 0.55)',
                    }}
                  />
                  <dd className="shrink-0 text-right font-serif text-[17px] tracking-tight text-ink md:text-[18px]">
                    {v}
                  </dd>
                </motion.div>
              ))}
            </dl>

            {/* card footer */}
            <div
              className="mt-10 flex items-baseline justify-between border-t pt-4 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{
                borderColor: 'rgba(196, 138, 58, 0.4)',
                color: 'var(--color-gold-dim)',
              }}
            >
              <span>filed · 2026</span>
              <span>johnnybuildstech · sole prop.</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — hand-written ask + CTAs */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative"
        >
          <p
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ and if you&rsquo;d like
          </p>

          <h3
            className="mt-4 font-serif font-medium leading-[0.98] tracking-[-0.02em] text-ink"
            style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
          >
            to build{' '}
            <span className="italic text-ink-muted">
              something small,
            </span>{' '}
            together &mdash;
          </h3>

          <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.65] text-ink-muted md:text-[19px]">
            I take on a handful of website projects a year with founders,
            clinicians and service-business owners I click with. Kind briefs,
            real problems, the appetite to iterate.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-4 font-mono text-[12px] uppercase tracking-[0.2em] transition-transform duration-200 hover:translate-y-[-1px]"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
                boxShadow:
                  '0 1px 0 rgba(149, 53, 25, 0.4), 0 16px 28px -12px rgba(184, 66, 31, 0.55)',
              }}
            >
              say hello
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full border px-5 py-4 font-mono text-[12px] uppercase tracking-[0.2em]"
              style={{
                borderColor: 'var(--color-ink)',
                color: 'var(--color-ink)',
              }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              see the work
            </Link>
          </div>

          {/* a small ps. in the handwritten script */}
          <div
            className="mt-14 flex items-baseline gap-3 font-hand"
            style={{
              color: 'var(--color-ink-muted)',
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              transform: 'rotate(-0.8deg)',
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              p.s.
            </span>
            every first reply is from me, personally. not a form.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
