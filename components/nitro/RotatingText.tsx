'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

type RotatingTextProps = {
  phrases: string[];
  interval?: number;
  className?: string;
};

export function RotatingText({
  phrases,
  interval = 2600,
  className = '',
}: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [phrases.length, interval, reduced]);

  const current = phrases[index];

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ overflow: 'hidden', lineHeight: 0.9, verticalAlign: 'baseline' }}
    >
      {/* invisible sizer keeps width of longest phrase so layout doesn't jump */}
      <span aria-hidden className="invisible block whitespace-nowrap">
        {phrases.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
