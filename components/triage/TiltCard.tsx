'use client';

import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { navigateWithTransition } from '@/lib/navigate';

type TiltCardProps = {
  number: string;
  title: string;
  subtitle: string;
  meta: string;
  href: string;
  transitionName: string;
  children: ReactNode;
};

export function TiltCard({
  number,
  title,
  subtitle,
  meta,
  href,
  transitionName,
  children,
}: TiltCardProps) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 140,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 140,
    damping: 16,
  });
  const lift = useSpring(0, { stiffness: 200, damping: 22 });

  const handleMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleEnter = () => {
    setActive(true);
    lift.set(-8);
  };

  const handleLeave = () => {
    setActive(false);
    lift.set(0);
    mx.set(0);
    my.set(0);
  };

  const handleClick = () => {
    navigateWithTransition(router, href);
  };

  return (
    <div
      className="group/tilt relative"
      style={{ perspective: 1400 }}
    >
      {/* glow halo */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: active ? 0.55 : 0.12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(255,222,33,0.35), rgba(255,222,33,0) 70%)',
        }}
      />

      <motion.button
        ref={ref}
        type="button"
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        data-cursor="hover"
        aria-label={`Enter ${title}`}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          y: reduced ? 0 : lift,
          transformStyle: 'preserve-3d',
          viewTransitionName: transitionName,
        }}
        className="relative block w-full select-none overflow-hidden rounded-[1.4rem] border border-fg/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 text-left outline-none transition-colors duration-200 hover:border-accent/50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 md:p-7"
      >
        {/* inner shine */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--mx, 50%) var(--my, 0%), rgba(255,222,33,0.08), transparent 40%)',
          }}
        />

        {/* header row */}
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">{number}</span>
            <span className="h-px w-6 bg-fg/20" />
            <span>{meta}</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 group-hover/tilt:border-accent group-hover/tilt:text-accent">
            <motion.span
              aria-hidden
              animate={{ x: active ? 2 : 0, y: active ? -2 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-sm"
            >
              ↗
            </motion.span>
          </div>
        </div>

        {/* title + subtitle */}
        <div className="relative mt-10 md:mt-12">
          <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[34ch] text-sm text-muted md:text-base">
            {subtitle}
          </p>
        </div>

        {/* preview surface */}
        <div
          className="relative mt-7 aspect-[16/9] w-full md:mt-10"
          style={{ transform: 'translateZ(40px)' }}
        >
          {children}
        </div>

        {/* footer cta */}
        <div className="relative mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
          <span className="text-muted">press to enter</span>
          <span className="inline-flex items-center gap-2 text-fg">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            enter {title.toLowerCase()}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
