'use client';

import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  '5 apps shipped',
  'ios + android',
  'designed + built solo',
  'problem-first, always',
];

export function AppsHero() {
  return (
    <section
      aria-label="Apps intro"
      className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48"
    >
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
          the stable
        </span>
        <span className="inline-flex items-center gap-2">
          five shipped apps · ios + android
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-gold)' }}
          />
        </span>
      </motion.div>

      <h1
        className="mt-14 max-w-[20ch] font-serif font-medium leading-[0.94] tracking-[-0.03em] text-ink md:mt-20"
        style={{ fontSize: 'clamp(44px, 9vw, 128px)' }}
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="inline-block"
        >
          small apps.{' '}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, rotate: -10, y: 8 }}
          animate={{ opacity: 1, rotate: -4, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
          className="font-hand font-normal"
          style={{
            color: 'var(--color-accent)',
            fontSize: '0.78em',
            display: 'inline-block',
            transformOrigin: 'left center',
          }}
        >
          real
        </motion.span>{' '}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="inline-block"
        >
          problems.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.65 }}
        className="mt-10 max-w-[62ch] text-[17px] leading-[1.65] text-ink-muted md:mt-14 md:text-[20px]"
      >
        Every app here started as a problem I actually had — a brain that
        wouldn&rsquo;t stick to a to-do list, a debt that wouldn&rsquo;t shrink,
        a jacket I didn&rsquo;t need. I couldn&rsquo;t find an app that solved
        it kindly, so I built one. Five of them, now.{' '}
        <span className="text-ink">
          Each one is small, focused, and built to be used on the days you
          don&rsquo;t feel like using an app.
        </span>
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mt-16 grid grid-cols-2 gap-y-6 border-t pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:mt-24 md:grid-cols-4 md:gap-0"
        style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
      >
        {STATS.map((s) => (
          <motion.span
            key={s}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
            className="flex items-center gap-2"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
            {s}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
