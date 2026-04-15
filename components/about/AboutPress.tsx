'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

type Clipping = {
  outlet: string;
  headline: string;
  strap: string;
  href: string;
  meta: string;
  /** resting rotation in degrees */
  tilt: number;
  /** which side the washi tape sits */
  tape: 'left' | 'right' | 'center';
};

const CLIPPINGS: Clipping[] = [
  {
    outlet: 'University of East Anglia',
    headline:
      'Built for his wife, loved by thousands — the ADHD app created by UEA graduates',
    strap:
      'The UEA alumni feature on Sprout, the task app that started it all.',
    href: 'https://www.uea.ac.uk/about/news/article/built-for-his-wife-loved-by-thousands-the-adhd-app-created-by-uea-graduates',
    meta: 'feature · 2025',
    tilt: -1.8,
    tape: 'left',
  },
  {
    outlet: 'LinkedIn · founder post',
    headline:
      'Sprout\u2019s founding story — an ADHD app born from a home-brew fix for a real problem',
    strap:
      'The post that introduced Sprout publicly for the first time.',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7415147512162045952',
    meta: 'founder note · 2025',
    tilt: 1.9,
    tape: 'right',
  },
];

export function AboutPress() {
  return (
    <section
      aria-label="Press"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-36 md:px-10 md:pb-48"
    >
      {/* sectional mast */}
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ clippings from the wall
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-4 max-w-[22ch] font-serif font-medium leading-[0.96] tracking-[-0.02em] text-ink"
          style={{ fontSize: 'clamp(34px, 5.2vw, 64px)' }}
        >
          built for my wife,
          <br />
          <span className="italic text-ink-muted">loved by thousands.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-6 max-w-[52ch] font-serif italic text-[17px] leading-[1.55] text-ink-muted md:text-[19px]"
        >
          Two cuttings that keep the receipts. The feature, and the original
          founder note.
        </motion.p>
      </div>

      {/* the wall */}
      <ul className="mt-20 grid gap-y-16 md:mt-24 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
        {CLIPPINGS.map((c, i) => (
          <PressClipping key={c.href} clipping={c} delay={i * 0.08} />
        ))}
      </ul>
    </section>
  );
}

function PressClipping({
  clipping,
  delay,
}: {
  clipping: Clipping;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const { outlet, headline, strap, href, meta, tilt, tape } = clipping;

  return (
    <motion.li
      initial={reduce ? undefined : { opacity: 0, y: 30, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.1, ease, delay }}
      className="relative mx-auto w-full max-w-[560px]"
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={reduce ? undefined : { rotate: 0, y: -4, transition: { duration: 0.4, ease } }}
        className="group relative block px-7 pb-10 pt-9 md:px-9 md:pb-12 md:pt-11"
        style={{
          background: 'var(--color-bg-deep)',
          boxShadow:
            '0 1px 0 rgba(122, 91, 63, 0.1), 0 30px 60px -36px rgba(44, 29, 18, 0.4), 0 6px 14px -10px rgba(44, 29, 18, 0.15), inset 0 0 0 1px rgba(196, 138, 58, 0.4)',
        }}
      >
        {/* paper grain overlay */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.11 0 0 0 0 0.07 0 0 0 0.28 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '220px',
          }}
        />

        {/* washi tape */}
        <Tape side={tape} />

        {/* rule + outlet masthead */}
        <div className="relative flex items-baseline justify-between gap-4 pb-3">
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            {outlet}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.26em]"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {meta}
          </span>
        </div>
        <span
          aria-hidden
          className="relative block h-px w-full opacity-70"
          style={{ background: 'var(--color-gold)' }}
        />

        {/* newsprint-style headline with drop cap */}
        <h3
          className="relative mt-7 font-serif font-semibold leading-[1.12] tracking-[-0.012em] text-ink"
          style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}
        >
          <span
            aria-hidden
            className="float-left mr-2 mt-[0.06em] font-serif italic leading-[0.8]"
            style={{
              color: 'var(--color-accent)',
              fontSize: '1.9em',
              letterSpacing: '-0.04em',
            }}
          >
            {headline.charAt(0)}
          </span>
          <span>{headline.slice(1)}</span>
        </h3>

        <p
          className="relative mt-5 font-serif italic text-[15px] leading-[1.55] md:text-[16px]"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          &mdash; {strap}
        </p>

        {/* footer byline */}
        <div
          className="relative mt-8 flex items-center justify-between border-t pt-4 font-mono text-[10.5px] uppercase tracking-[0.26em]"
          style={{ borderColor: 'rgba(196, 138, 58, 0.38)' }}
        >
          <span style={{ color: 'var(--color-ink-muted)' }}>
            clipping · filed
          </span>
          <span
            className="inline-flex items-center gap-2 transition-transform"
            style={{ color: 'var(--color-accent)' }}
          >
            read the piece
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </span>
        </div>
      </motion.a>
    </motion.li>
  );
}

function Tape({ side }: { side: 'left' | 'right' | 'center' }) {
  const base =
    'pointer-events-none absolute block h-[24px] w-[92px] mix-blend-multiply';
  const placement =
    side === 'left'
      ? 'left-[-12px] top-[-12px] origin-left'
      : side === 'right'
        ? 'right-[-14px] top-[-10px] origin-right'
        : 'left-1/2 top-[-10px] -translate-x-1/2';
  const rotate =
    side === 'left' ? -8 : side === 'right' ? 7 : -2;
  return (
    <span
      aria-hidden
      className={`${base} ${placement}`}
      style={{
        background:
          'linear-gradient(180deg, rgba(184, 66, 31, 0.72) 0%, rgba(184, 66, 31, 0.55) 100%)',
        transform: `rotate(${rotate}deg)`,
        boxShadow:
          '0 3px 6px -3px rgba(44, 29, 18, 0.35), inset 0 0 0 1px rgba(149, 53, 25, 0.2)',
      }}
    />
  );
}
