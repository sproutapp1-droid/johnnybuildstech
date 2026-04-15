'use client';

import { motion, useReducedMotion } from 'motion/react';

const PANELS = [
  { label: 'sprout', bg: '#2f7a3a', fg: '#f5fbe9' },
  { label: 'payoff', bg: '#f4ece0', fg: '#143226' },
  { label: 'skip or buy', bg: '#8cf0b6', fg: '#0a0a0a' },
  { label: 'tidywell', bg: '#e9e2cf', fg: '#2e3a27' },
  { label: 'lapsed', bg: '#0e1220', fg: '#ff6b4a' },
];

export function StackedMini({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {PANELS.map((panel, i) => {
        const depth = i;
        const top = depth * 14;
        return (
          <motion.div
            key={panel.label}
            initial={false}
            animate={{
              y: reduced ? 0 : active ? 0 : 6,
              scale: active ? 1 : 0.985,
            }}
            transition={{
              delay: i * 0.04,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-x-2 flex flex-col overflow-hidden border-t border-black/10 shadow-[0_-8px_20px_rgba(0,0,0,0.35)]"
            style={{
              top: `${top}px`,
              bottom: `${(PANELS.length - 1 - i) * 0}px`,
              background: panel.bg,
              color: panel.fg,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              zIndex: i + 1,
            }}
          >
            <div className="flex items-center justify-between px-3 pt-2 font-mono text-[8px] uppercase tracking-[0.2em] opacity-70">
              <span>2025</span>
              <span>0{i + 1}</span>
            </div>
            <div className="flex items-end justify-between px-3 pb-2.5">
              <span className="font-display text-[15px] font-semibold leading-none tracking-tight">
                {panel.label}
              </span>
              <span aria-hidden className="text-[12px]">→</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
