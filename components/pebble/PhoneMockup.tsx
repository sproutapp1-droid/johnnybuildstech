/* PhoneMockup: a realistic iPhone-style frame containing one of the
 * sketched Pebble screens (or a splash with the icon centered). Used
 * for the hero double-phone composition and the small "this is what
 * you log" anchor in the receipt section.
 *
 * Dark warm-ink bezel + notch + side button silhouettes. Floats with
 * a subtle Y bob unless prefers-reduced-motion is on. */

'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { TodaySketch, BriefSketch, HistorySketch } from './Polaroid';

type Variant = 'splash' | 'today' | 'brief' | 'history';
type Size = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<Size, { width: number; borderRadius: number; notchWidth: number }> = {
  sm: { width: 180, borderRadius: 28, notchWidth: 60 },
  md: { width: 232, borderRadius: 36, notchWidth: 78 },
  lg: { width: 280, borderRadius: 42, notchWidth: 92 },
};

type Props = {
  variant?: Variant;
  size?: Size;
  rotation?: number;
  bob?: boolean;
  bobDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** When true, the bob animation rotates around the rotation prop instead of resetting. */
  pinnedRotation?: boolean;
};

export function PhoneMockup({
  variant = 'splash',
  size = 'md',
  rotation = 0,
  bob = true,
  bobDelay = 0,
  className,
  style,
  pinnedRotation = true,
}: Props) {
  const reduce = useReducedMotion();
  const dims = SIZE_MAP[size];

  return (
    <motion.div
      animate={
        reduce || !bob
          ? undefined
          : pinnedRotation
            ? { y: [0, -8, 0], rotate: [rotation, rotation - 0.4, rotation] }
            : { y: [0, -8, 0] }
      }
      transition={
        reduce || !bob
          ? undefined
          : {
              duration: 5.6,
              delay: bobDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      className={`relative ${className ?? ''}`}
      style={{
        width: dims.width,
        aspectRatio: '9 / 19.5',
        background: '#1C1A18',
        borderRadius: dims.borderRadius,
        padding: 6,
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 60px -22px rgba(28,26,24,0.45)',
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    >
      {/* inner screen */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: 'var(--pebble-paper)',
          borderRadius: dims.borderRadius - 6,
        }}
      >
        {/* notch */}
        <span
          aria-hidden
          className="absolute"
          style={{
            left: '50%',
            top: 10,
            transform: 'translateX(-50%)',
            width: dims.notchWidth,
            height: 22,
            background: '#1C1A18',
            borderRadius: 14,
            zIndex: 10,
          }}
        />

        {variant === 'splash' && <SplashScreen size={size} />}
        {variant === 'today' && (
          <div className="h-full w-full">
            <TodaySketch />
          </div>
        )}
        {variant === 'brief' && (
          <div className="h-full w-full">
            <BriefSketch />
          </div>
        )}
        {variant === 'history' && (
          <div className="h-full w-full">
            <HistorySketch />
          </div>
        )}
      </div>

      {/* side button silhouettes */}
      <span
        aria-hidden
        className="absolute"
        style={{
          left: -2,
          top: '22%',
          width: 3,
          height: 36,
          background: '#1C1A18',
          borderRadius: 2,
        }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{
          right: -2,
          top: '24%',
          width: 3,
          height: 60,
          background: '#1C1A18',
          borderRadius: 2,
        }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────── */
/* Splash — icon centered, like the app's launch screen */
/* ──────────────────────────────────────────────────── */
function SplashScreen({ size }: { size: Size }) {
  const iconSize = size === 'lg' ? 120 : size === 'md' ? 100 : 80;
  const titleSize = size === 'lg' ? 28 : size === 'md' ? 22 : 18;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {/* faint dot grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(28,26,24,0.08) 1px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          pointerEvents: 'none',
          opacity: 0.55,
        }}
      />
      <Image
        src="/apps/pebble/icon.png"
        alt="Pebble app icon"
        width={iconSize * 2}
        height={iconSize * 2}
        sizes={`${iconSize}px`}
        style={{ width: iconSize, height: iconSize }}
        priority={false}
      />
      <p
        className="pebble-hand mt-4"
        style={{
          color: 'var(--pebble-ink)',
          fontSize: titleSize,
          lineHeight: 1,
        }}
      >
        pebble
      </p>
      <p
        className="pebble-serif mt-1 italic"
        style={{ color: 'var(--pebble-ink-muted)', fontSize: 11 }}
      >
        a quiet symptom tracker
      </p>
    </div>
  );
}
