'use client';

/* Client-only motion islands used by the landing page server component.
 * Keeps the main page.tsx mostly static-renderable, isolates Motion
 * imports to where they're needed. */

import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { InkPlus } from '@/components/pebble/InkMarks';

const ease = [0.16, 1, 0.3, 1] as const;

/* ──────────────────────────────────────────────────────────── */
/* Hero — orchestrated page-load reveal with staggered children */
/* ──────────────────────────────────────────────────────────── */
export function HeroReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : 'hidden'}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.14,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {/* Wrap every direct child in a fade-rise variant by cloning */}
      <Child>{children}</Child>
    </motion.div>
  );
}

function Child({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const arr = Array.isArray(children) ? children : [children];
  return (
    <>
      {arr.map((node, i) => (
        <motion.div
          key={i}
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease },
                  },
                }
          }
        >
          {node}
        </motion.div>
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* ScrollIn — section that fades + rises into view              */
/* ──────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────── */
/* FAQ item — hand-drawn +/× toggle, smooth accordion           */
/* ──────────────────────────────────────────────────────────── */
export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      className="border-b"
      style={{ borderColor: 'var(--pebble-rule)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-baseline justify-between gap-6 py-7 text-left"
      >
        <span
          className="pebble-serif text-[20px] font-medium leading-[1.3] md:text-[24px]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          {q}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="flex-none"
          style={{ color: 'var(--pebble-terracotta)' }}
        >
          <InkPlus size={22} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pebble-serif max-w-[68ch] pb-8 pr-10 text-[17px] leading-[1.65]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
