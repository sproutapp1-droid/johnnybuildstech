'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const PHRASES = [
  'ADHD brains',
  'solo founders',
  'clinicians',
  'service businesses',
  'people who hate templates',
  'consultants',
  'therapists',
  'indie founders',
];

export function RotatingPill({ intervalMs = 2800 }: { intervalMs?: number }) {
  const [i, setI] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % PHRASES.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reducedMotion]);

  const phrase = PHRASES[i];

  // `layout` on the outer motion.span animates the pill's width smoothly
  // as the inner word's length changes, instead of snapping.
  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
      className="relative inline-flex items-center overflow-hidden rounded-full px-4 py-1.5 font-mono text-[13px] lowercase tracking-[0.02em] md:text-[14px]"
      style={{
        background: 'var(--color-accent)',
        color: 'var(--color-bg)',
        boxShadow:
          '0 1px 0 rgba(149, 53, 25, 0.35), 0 8px 18px -8px rgba(184, 66, 31, 0.55)',
        minHeight: '1.9em',
        width: 'max-content',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrase}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap"
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
