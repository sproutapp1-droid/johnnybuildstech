'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutMasthead() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="About"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44"
    >
      {/* ─── meta strip ───────────────────────────────────── */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted"
      >
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-gold)' }}
          />
          a letter from the studio
        </span>
        <span className="hidden md:inline">
          folio no.02 · the person behind the work
        </span>
        <span className="inline-flex items-center gap-2">
          est. 2026
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-gold)' }}
          />
        </span>
      </motion.div>

      {/* ─── masthead grid: portrait + greeting ───────────── */}
      <div className="mt-14 grid gap-y-16 md:mt-20 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-x-20 lg:gap-x-28">
        <Portrait reduce={!!reduce} />

        <div className="relative">
          {/* overline */}
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ hello,
          </motion.p>

          {/* headline: "I'm Jonathan" + handwritten salutation */}
          <h1 className="mt-5 font-serif font-medium leading-[0.92] tracking-[-0.035em] text-ink">
            <motion.span
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.35 }}
              className="block"
              style={{ fontSize: 'clamp(48px, 8.4vw, 132px)' }}
            >
              I&rsquo;m
            </motion.span>
            <motion.span
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.5 }}
              className="block italic"
              style={{ fontSize: 'clamp(56px, 10vw, 156px)' }}
            >
              Jonathan.
            </motion.span>
          </h1>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, rotate: -14, y: 10 }}
            whileInView={{ opacity: 1, rotate: -4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-6 origin-left font-hand font-normal"
            style={{
              color: 'var(--color-accent)',
              fontSize: 'clamp(26px, 3.2vw, 42px)',
              lineHeight: 1.1,
              display: 'inline-block',
            }}
          >
            nice to meet you.
          </motion.div>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 1.1 }}
            className="mt-10 max-w-[44ch] font-serif italic text-[18px] leading-[1.55] text-ink-muted md:text-[20px]"
          >
            Pull up a chair. This is the bit where I tell you how{' '}
            <span className="not-italic text-ink">johnnybuildstech</span>{' '}
            started, why I still do it, and what you&rsquo;re actually getting
            when you hire me.
          </motion.p>
        </div>
      </div>

      {/* ─── the letter body ─────────────────────────────── */}
      <Letter reduce={!!reduce} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Portrait — paper mat + washi tape + handwritten caption     */
/* ─────────────────────────────────────────────────────────── */
function Portrait({ reduce }: { reduce: boolean }) {
  return (
    <motion.figure
      initial={reduce ? undefined : { opacity: 0, y: 24, rotate: -5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.8 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease, delay: 0.2 }}
      whileHover={reduce ? undefined : { rotate: 0, transition: { duration: 0.6, ease } }}
      className="relative mx-auto w-full max-w-[460px] md:mx-0"
      style={{ transformOrigin: 'top left' }}
    >
      {/* paper mat — the passe-partout */}
      <div
        className="relative p-5 md:p-6"
        style={{
          background: 'var(--color-bg-deep)',
          boxShadow:
            '0 1px 0 rgba(122, 91, 63, 0.12), 0 40px 70px -38px rgba(44, 29, 18, 0.4), 0 10px 18px -10px rgba(44, 29, 18, 0.12), inset 0 0 0 1px rgba(196, 138, 58, 0.35)',
        }}
      >
        {/* paper-grain inside the mat */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.1 0 0 0 0 0.06 0 0 0 0.22 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '200px',
          }}
        />

        {/* index stamp top-right */}
        <span
          className="absolute right-3 top-3 z-10 select-none font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          no.01 · print
        </span>

        {/* the photograph itself, tucked inside an inner frame */}
        <div
          className="relative overflow-hidden"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(44, 29, 18, 0.22), 0 6px 14px -8px rgba(44, 29, 18, 0.3)',
          }}
        >
          <Image
            src="/about/johnny.jpg"
            alt="Jonathan, founder of johnnybuildstech, in front of a brick wall"
            width={900}
            height={1200}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="block h-auto w-full"
          />
          {/* gentle vignette */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(110% 80% at 50% 40%, rgba(0,0,0,0) 55%, rgba(44, 29, 18, 0.18) 100%)',
            }}
          />
        </div>

        {/* gold corner marks on the mat */}
        {(
          [
            'top-3 left-3 border-t border-l',
            'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r',
          ] as const
        ).map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute h-3 w-3 ${pos}`}
            style={{ borderColor: 'var(--color-gold)' }}
          />
        ))}
      </div>

      {/* washi tape — top-left, rust, semi-transparent, rotated */}
      <motion.span
        aria-hidden
        initial={reduce ? undefined : { opacity: 0, scaleX: 0.6, y: -10 }}
        whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 1 }}
        className="absolute left-[-14px] top-[-10px] block h-[26px] w-[92px] origin-left"
        style={{
          background:
            'linear-gradient(180deg, rgba(184, 66, 31, 0.75) 0%, rgba(184, 66, 31, 0.6) 100%)',
          transform: 'rotate(-8deg)',
          boxShadow:
            '0 3px 6px -3px rgba(44, 29, 18, 0.35), inset 0 0 0 1px rgba(149, 53, 25, 0.25)',
        }}
      />
      {/* washi tape — top-right, gold-ish, semi-transparent */}
      <motion.span
        aria-hidden
        initial={reduce ? undefined : { opacity: 0, scaleX: 0.6, y: -10 }}
        whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 1.1 }}
        className="absolute right-[-18px] top-[-6px] block h-[22px] w-[78px] origin-right"
        style={{
          background:
            'linear-gradient(180deg, rgba(196, 138, 58, 0.7) 0%, rgba(196, 138, 58, 0.55) 100%)',
          transform: 'rotate(6deg)',
          boxShadow: '0 3px 6px -3px rgba(44, 29, 18, 0.3)',
        }}
      />

      {/* handwritten caption */}
      <motion.figcaption
        initial={reduce ? undefined : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 1.2 }}
        className="mt-6 flex items-baseline justify-between gap-4 px-2 md:px-3"
      >
        <span
          className="font-hand"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            transform: 'rotate(-1deg)',
            display: 'inline-block',
          }}
        >
          the start of it all.
        </span>
        <span
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          norwich · 2024
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Letter — editorial story with drop cap + pull-quote + sign  */
/* ─────────────────────────────────────────────────────────── */
function Letter({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mt-24 grid gap-14 md:mt-32 md:grid-cols-[1fr_0.35fr] md:gap-16 lg:gap-24">
      <article className="relative max-w-[64ch]">
        {/* "Dear reader" header */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ the story
        </motion.p>

        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="mt-4 font-serif font-medium leading-[1.0] tracking-[-0.02em] text-ink"
          style={{ fontSize: 'clamp(28px, 3.2vw, 44px)' }}
        >
          It started with a small green app,{' '}
          <span className="italic text-ink-muted">and one person.</span>
        </motion.h2>

        {/* drop cap paragraph */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mt-10 text-[17px] leading-[1.7] text-ink md:text-[19px]"
          style={{ hyphens: 'auto' }}
        >
          <span
            aria-hidden
            className="float-left mr-3 mt-[0.08em] font-serif font-medium italic leading-[0.78]"
            style={{
              color: 'var(--color-accent)',
              fontSize: 'clamp(72px, 8vw, 112px)',
              letterSpacing: '-0.04em',
            }}
          >
            I
          </span>
          t started with{' '}
          <a
            href="https://www.sproutapp.tech/our-story"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-[6px]"
          >
            Sprout
          </a>{' '}
          — a mobile app I built for my wife. An ADHD-friendly task app that
          didn&rsquo;t punish her for having an ADHD brain. Somewhere between
          her first brain-dump and our hundredth sketch, I fell for the whole
          thing.
        </motion.p>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-7 text-[17px] leading-[1.7] text-ink-muted md:text-[19px]"
        >
          Not the shipping — the{' '}
          <span className="text-ink">iterating</span>. Moving a button three
          pixels because it finally felt right. Rewriting a line of copy at
          11pm because the old one was lying a little. The quiet craft of
          making something feel{' '}
          <span className="text-ink">alive</span> instead of generic.
        </motion.p>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mt-7 text-[17px] leading-[1.7] text-ink-muted md:text-[19px]"
        >
          Five apps later — Sprout, Payoff, Tidywell, Lapsed, Skip or Buy —
          and a handful of client sites in consulting, medical-ed and ADHD
          coaching, I&rsquo;m still chasing that same thing. Bespoke,
          hand-coded, small, and built for a real human with a real problem.{' '}
          <span className="text-ink">
            Hosted on Vercel, so it costs you £0/mo forever. And I reply to
            every email myself — from this address, in a chair somewhere in
            the UK.
          </span>
        </motion.p>

        {/* signature block */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mt-16 flex flex-wrap items-end justify-between gap-10 border-t pt-10"
          style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
        >
          <div>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              yours, truly,
            </span>
            <div
              className="mt-2 font-hand"
              style={{
                color: 'var(--color-accent)',
                fontSize: 'clamp(40px, 4.8vw, 64px)',
                lineHeight: 1,
                transform: 'rotate(-3deg)',
                transformOrigin: 'left center',
                display: 'inline-block',
              }}
            >
              Jonathan
            </div>
            <p
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              jonathan · founder &amp; sole builder
            </p>
          </div>

          <WaxSeal />
        </motion.div>
      </article>

      {/* right-side margin pull-quote — desktop only */}
      <aside className="relative hidden md:block">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1, ease, delay: 0.25 }}
          className="sticky top-32"
        >
          <span
            aria-hidden
            className="block h-px w-12"
            style={{ background: 'var(--color-accent)' }}
          />
          <blockquote
            className="mt-6 font-serif italic leading-[1.2] tracking-[-0.01em] text-ink"
            style={{ fontSize: 'clamp(22px, 1.9vw, 28px)' }}
          >
            &ldquo;The craft of making something feel{' '}
            <span className="not-italic font-hand" style={{ color: 'var(--color-accent)' }}>
              alive
            </span>{' '}
            instead of generic.&rdquo;
          </blockquote>
          <p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ marginalia, pg.02
          </p>
        </motion.div>
      </aside>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Wax Seal — rust circle with cream "jbt" + embossed feel     */
/* ─────────────────────────────────────────────────────────── */
function WaxSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease, delay: 0.55 }}
      className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full md:h-[96px] md:w-[96px]"
      style={{
        background:
          'radial-gradient(60% 60% at 35% 30%, #D15B35 0%, #B8421F 45%, #8E2E13 100%)',
        boxShadow:
          '0 10px 24px -14px rgba(142, 46, 19, 0.8), inset 0 2px 4px rgba(255, 220, 200, 0.2), inset 0 -3px 6px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* inner ring */}
      <span
        aria-hidden
        className="absolute inset-[6px] rounded-full"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(245, 236, 217, 0.35)',
        }}
      />
      {/* noise for wax texture */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <span
        className="relative select-none font-serif italic"
        style={{
          color: 'var(--color-bg)',
          fontSize: '28px',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
        }}
      >
        jbt
      </span>
    </motion.div>
  );
}
