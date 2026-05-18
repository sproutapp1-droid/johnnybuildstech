/* Pebble the mascot. Single source of truth: the app's iOS icon
 * (icon.png) — chosen by the product owner as the canonical mark
 * everywhere on the marketing site. The `state` prop is retained
 * for API stability but no longer swaps the image.
 *
 * `glow` adds the terracotta brief-printing wash beneath the mascot. */

import Image from 'next/image';

type State = 'idle' | 'printing' | 'flare' | 'vacation' | 'onboarding' | 'logging';

type Props = {
  size?: number;
  /** Retained for API stability — does not currently change the image. */
  state?: State;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export function Pebble({
  size = 64,
  glow = false,
  className,
  style,
  priority = false,
}: Props) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: size,
        height: size,
        ...style,
      }}
    >
      {glow && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: `-${size * 0.5}px`,
            background:
              'radial-gradient(circle at center, rgba(198, 106, 78, 0.45) 0%, rgba(198, 106, 78, 0) 65%)',
            animation: 'pebble-pulse 2.4s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      <Image
        src="/apps/pebble/icon.png"
        alt="Pebble app icon"
        width={size * 2}
        height={size * 2}
        priority={priority}
        sizes={`${size}px`}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <style>{`
        @keyframes pebble-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*='pebble-pulse'] { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
