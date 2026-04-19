'use client';

import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MouseEvent } from 'react';
import type { AppEntry } from '@/lib/apps';

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  app: AppEntry;
  index: number;
  total: number;
};

export function AppCard({ app, index, total }: Props) {
  return (
    <motion.li
      id={app.slug}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay: 0.05 }}
      className="group relative border-t py-14 first:border-t-0 md:py-24"
      style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
    >
      {/* soft accent wash that fades in with the card */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 opacity-0"
        style={{
          background: `radial-gradient(60% 80% at 20% 0%, ${app.accent}14, transparent 70%)`,
        }}
      />

      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-24">
        <CopyColumn app={app} index={index} total={total} />
        <PhoneTray app={app} />
      </div>
    </motion.li>
  );
}

/* ────────────────────────────────────────────────────────── */
/* LEFT — copy column with staggered reveals + hover on title  */
/* ────────────────────────────────────────────────────────── */
function CopyColumn({
  app,
  index,
  total,
}: {
  app: AppEntry;
  index: number;
  total: number;
}) {
  const stagger = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease, delay: 0.1 + i * 0.07 },
    }),
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        custom={0}
        className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
      >
        <span className="font-mono text-[11px]" style={{ color: 'var(--color-accent)' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span
          className="inline-block h-px w-10"
          style={{ background: 'var(--color-gold)' }}
        />
        <span>{app.subtitle}</span>
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        custom={1}
        whileHover={{ x: 4 }}
        transition={{ x: { duration: 0.3, ease } }}
        className="mt-4 font-serif text-[42px] font-medium leading-[1.0] tracking-[-0.02em] md:text-[72px]"
      >
        {app.name}
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        custom={2}
        className="mt-8 space-y-6"
      >
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-accent)' }}
          >
            The problem
          </p>
          <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.6] text-ink md:text-[17px]">
            {app.problem}
          </p>
        </div>
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            The app
          </p>
          <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.6] text-ink-muted md:text-[17px]">
            {app.solution}
          </p>
        </div>
      </motion.div>

      <ul className="mt-8 space-y-2.5">
        {app.features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.55, ease, delay: 0.35 + i * 0.07 }}
            className="flex gap-3 text-[14px] leading-[1.55] text-ink md:text-[15px]"
          >
            <span
              aria-hidden
              className="mt-[9px] inline-block h-1 w-3 flex-none"
              style={{ background: 'var(--color-accent)' }}
            />
            <span>{f}</span>
          </motion.li>
        ))}
      </ul>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        custom={6}
        className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
      >
        <span style={{ color: 'var(--color-gold-dim)' }}>For — </span>
        {app.audience}
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        variants={stagger}
        custom={7}
        className="mt-8"
      >
        <StoreBadges app={app} />
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* RIGHT — phone tray with mouse-tilt + floating idle animation */
/* ────────────────────────────────────────────────────────── */
function PhoneTray({ app }: { app: AppEntry }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: 1200, rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease, delay: 0.15 }}
        className="relative flex items-end justify-center gap-3 rounded-3xl p-6 md:p-8"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'var(--color-bg-deep)',
            boxShadow:
              '0 1px 0 rgba(122, 91, 63, 0.08), 0 30px 60px -36px rgba(44, 29, 18, 0.35)',
          }}
        />

        {(
          ['left-3 top-3 border-l border-t',
            'right-3 top-3 border-r border-t',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r'] as const
        ).map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute h-3 w-3 ${pos}`}
            style={{ borderColor: 'var(--color-gold)' }}
          />
        ))}

        {app.shots.map((src, idx) => {
          // offsets: left leans out, middle lifts + floats, right leans out the other way
          const baseRotate = idx === 1 ? 0 : idx === 0 ? -2.5 : 2.5;
          const baseY = idx === 1 ? -14 : 0;
          return (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: baseY }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.9,
                ease,
                delay: 0.25 + idx * 0.1,
              }}
              whileHover={{ y: baseY - 8, scale: 1.03 }}
              className="relative z-10 w-1/3"
              style={{
                rotate: baseRotate,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* gentle idle bob on the middle phone */}
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : idx === 1
                      ? { y: [0, -4, 0] }
                      : idx === 0
                        ? { rotate: [-2.5, -2, -2.5] }
                        : { rotate: [2.5, 2, 2.5] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 6 + idx * 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                data-testid="app-phone-screen"
                className="overflow-hidden rounded-[26px] border"
                style={{
                  borderColor: 'rgba(44, 29, 18, 0.12)',
                  background: 'var(--color-bg)',
                  aspectRatio: '9 / 19.5',
                  boxShadow:
                    '0 20px 40px -24px rgba(44, 29, 18, 0.35), inset 0 0 0 1px rgba(44, 29, 18, 0.04)',
                }}
              >
                <Image
                  src={src}
                  alt={`${app.name} screenshot ${idx + 1}`}
                  width={400}
                  height={866}
                  sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 33vw"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'var(--color-gold-dim)' }}
      >
        {app.name.toLowerCase()} · in the wild
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Store badges — unchanged visually, now animated on hover    */
/* ────────────────────────────────────────────────────────── */
function StoreBadges({ app }: { app: AppEntry }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {app.appStore && (
        <motion.a
          href={app.appStore}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          style={{ borderColor: 'rgba(44, 29, 18, 0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          App Store
          <span aria-hidden>↗</span>
        </motion.a>
      )}
      {app.playStore && (
        <motion.a
          href={app.playStore}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          style={{ borderColor: 'rgba(44, 29, 18, 0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3.6 2.3C3.2 2.6 3 3 3 3.7v16.6c0 .7.2 1.1.6 1.4l9.2-9.7L3.6 2.3zm10.8 10.4l2.7 2.8-10.2 5.9 7.5-8.7zm4.6-2.3l-2.6 1.5-3-3.2 3-3.1 2.6 1.5c1 .6 1 1.7 0 2.3zM5.2 2l10 5.8-2.7 2.8L5.2 2z" />
          </svg>
          Google Play
          <span aria-hidden>↗</span>
        </motion.a>
      )}
      {app.web && (
        <motion.a
          href={app.web}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2, x: 2 }}
          transition={{ duration: 0.2, ease }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
        >
          visit site
          <span aria-hidden>→</span>
        </motion.a>
      )}
    </div>
  );
}
