'use client';

import { motion, useReducedMotion } from 'motion/react';

export function WebsitesPreview({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-fg/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.4))]">
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* floating "browser" wireframes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            y: reduced ? 0 : active ? [0, -4, 0] : 0,
          }}
          transition={{
            duration: 3.2 + i * 0.4,
            repeat: active && !reduced ? Infinity : 0,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
          className="absolute overflow-hidden rounded-md border border-fg/10 bg-bg/80 backdrop-blur-sm"
          style={{
            left: `${8 + i * 12}%`,
            top: `${22 + i * 18}%`,
            width: `${52 - i * 6}%`,
            aspectRatio: '16 / 10',
            zIndex: 3 - i,
          }}
        >
          <div className="flex h-3 items-center gap-1 border-b border-fg/10 bg-white/[0.02] px-2">
            <span className="h-1 w-1 rounded-full bg-fg/25" />
            <span className="h-1 w-1 rounded-full bg-fg/25" />
            <span className="h-1 w-1 rounded-full bg-fg/25" />
          </div>
          <div className="flex flex-col gap-1 p-2">
            <span className="h-1 w-2/3 rounded-full bg-fg/20" />
            <span className="h-1 w-1/2 rounded-full bg-fg/10" />
            <span className="mt-1 h-6 w-full rounded-sm bg-fg/5" />
          </div>
        </motion.div>
      ))}

      {/* status chip */}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
        <span className="h-1 w-1 rounded-full bg-accent" />
        in progress
      </div>
    </div>
  );
}
