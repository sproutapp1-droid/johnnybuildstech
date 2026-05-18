/* Hand-drawn ink primitives. Each path has a hairline irregularity
 * (~3-5% deviation from geometric) to read as "drawn" without
 * tipping into "wonky". SVG paths are deterministic — no Math.random
 * at render time, so SSR + client match. */

type Common = { className?: string; style?: React.CSSProperties };

export function MarginRule({ className, style }: Common) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 4 1000"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <path
        d="M2 0 C2.4 120, 1.6 240, 2 360 S2.5 600, 1.8 760 S2.2 920, 2 1000"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

export function SectionRule({ className, style, delay = 0 }: Common & { delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 6"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <path
        d="M2 3 C 60 2, 120 4, 180 3 S 280 2, 340 3 S 396 4, 398 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        className="ink-stroke"
        style={
          {
            '--len': 410,
            '--delay': `${delay}ms`,
          } as React.CSSProperties
        }
      />
      <path
        d="M4 5 C 90 4.6, 160 5.4, 220 5 S 320 4.7, 396 5"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.18"
      />
    </svg>
  );
}

export function HandUnderline({ className, style, delay = 200 }: Common & { delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={className}
      style={style}
    >
      <path
        d="M2 8 C 30 5, 60 9, 100 7 S 160 6, 198 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="ink-stroke"
        style={
          {
            '--len': 210,
            '--delay': `${delay}ms`,
          } as React.CSSProperties
        }
      />
    </svg>
  );
}

export function Tick({ className, style, size = 18 }: Common & { size?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
    >
      <path
        d="M4 13.5 C 6 14, 8 15.5, 10 17 C 12 14, 15 9, 20 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="ink-stroke"
        style={{ '--len': 28 } as React.CSSProperties}
      />
    </svg>
  );
}

export function InkCross({ className, style, size = 14 }: Common & { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M5 5 C 9 9, 14 14, 19 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M19 5 C 15 9, 10 14, 5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function InkPlus({ className, style, size = 16 }: Common & { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <path d="M12 4 L 12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12 L 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function InkArrow({ className, style, size = 16 }: Common & { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M4 12 C 9 12.2, 15 11.8, 20 12 M 14 7 C 16 9, 18 11, 20 12 C 18 13, 16 15, 14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function InkBlot({ className, style, size = 14 }: Common & { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M12 4 C 16 4.5, 19 7, 19.5 11 C 20 14.5, 17.5 18, 14 19.5 C 10.5 20.5, 6.5 19, 5 16 C 3.5 12.5, 5 8, 8.5 5.5 C 9.8 4.6, 11 4.1, 12 4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ConfidenceDots({ filled }: { filled: 1 | 2 | 3 }) {
  const dot = (i: number) => {
    const state = i < filled ? 'full' : i === filled - 0.5 ? 'half' : 'empty';
    return (
      <span
        key={i}
        aria-hidden
        className="inline-block h-[10px] w-[10px] rounded-full"
        style={{
          background:
            state === 'full'
              ? 'var(--pebble-terracotta)'
              : 'transparent',
          border:
            state === 'full'
              ? 'none'
              : '1.5px solid var(--pebble-ink)',
          opacity: state === 'full' ? 1 : 0.6,
        }}
      />
    );
  };
  return <span className="inline-flex items-center gap-1.5">{[0, 1, 2].map(dot)}</span>;
}
