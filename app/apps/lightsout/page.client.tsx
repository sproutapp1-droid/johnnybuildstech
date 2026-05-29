'use client';

/* Client-only motion islands for the Lights Out landing server
 * component. Calm fade-rise reveals (no bounce), and a quiet FAQ
 * accordion with a rotating +. Reduced-motion collapses to static. */

import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const arr = Array.isArray(children) ? children : [children];
  return (
    <motion.div
      initial={reduce ? undefined : 'hidden'}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
    >
      {arr.map((node, i) => (
        <motion.div
          key={i}
          variants={
            reduce
              ? undefined
              : { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }
          }
        >
          {node}
        </motion.div>
      ))}
    </motion.div>
  );
}

type ScrollInProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export function ScrollIn({ children, className, id, style }: ScrollInProps) {
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.95, ease }}
    >
      {children}
    </motion.section>
  );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li style={{ borderBottom: '1px solid var(--hairline)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 24,
          padding: '22px 4px',
          textAlign: 'left',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
        }}
      >
        <span
          className="serif"
          style={{ fontSize: 21, color: 'var(--text-high)', lineHeight: 1.3 }}
        >
          {q}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease }}
          style={{ color: 'var(--sand)', fontFamily: 'var(--mono)', fontSize: 20, flex: 'none' }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="c"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                maxWidth: '66ch',
                padding: '0 40px 24px 4px',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--text-med)',
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
