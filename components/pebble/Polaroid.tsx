/* Polaroid — a notebook-page placeholder for a phone screenshot.
 * Drawn in the notebook idiom: cream paper, hand-drawn rule below
 * a hand-lettered title, pencil-line sliders, a tiny Pebble in the
 * corner. Looks intentional, not "image missing".
 *
 * Pass `variant` to swap which mock screen is sketched:
 *   - 'today'  → the daily home with three sliders
 *   - 'brief'  → the receipt artifact peeking out
 *   - 'history'→ a list of past days */

import { Pebble } from './Pebble';

type Variant = 'today' | 'brief' | 'history';

type Props = {
  variant: Variant;
  rotation?: number;
  caption?: string;
};

export function Polaroid({ variant, rotation = 0, caption }: Props) {
  return (
    <figure
      className="polaroid relative inline-block"
      style={
        {
          '--rot': `${rotation}deg`,
          transform: `rotate(${rotation}deg)`,
          width: 232,
          padding: '14px 14px 18px',
          background: '#F8F3E9',
          boxShadow:
            '0 1px 0 rgba(28,26,24,0.04), 0 2px 6px rgba(28,26,24,0.06), 0 24px 40px -20px rgba(28,26,24,0.28)',
        } as React.CSSProperties
      }
    >
      {/* tape strip */}
      <span
        aria-hidden
        className="absolute"
        style={{
          left: '50%',
          top: -12,
          transform: 'translateX(-50%) rotate(-2deg)',
          width: 72,
          height: 18,
          background: 'rgba(196, 138, 58, 0.32)',
          boxShadow: 'inset 0 0 0 1px rgba(160, 110, 50, 0.18)',
        }}
      />

      {/* phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '9 / 19',
          background: 'var(--pebble-paper)',
          border: '1.5px solid rgba(28,26,24,0.16)',
          borderRadius: 22,
        }}
      >
        <PhoneSketch variant={variant} />

        {/* faint dot grid inside */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(28,26,24,0.08) 1px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        />
      </div>

      {caption && (
        <figcaption
          className="pebble-hand mt-3 text-center"
          style={{ color: 'var(--pebble-ink-muted)', fontSize: 18, lineHeight: 1.1 }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────── */

function PhoneSketch({ variant }: { variant: Variant }) {
  if (variant === 'today') return <TodaySketch />;
  if (variant === 'brief') return <BriefSketch />;
  return <HistorySketch />;
}

export function TodaySketch() {
  return (
    <div className="relative h-full w-full" style={{ padding: '20px 16px' }}>
      {/* top bar */}
      <div className="flex items-center justify-between" style={{ fontSize: 11 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span className="pebble-hand" style={{ fontSize: 18, color: 'var(--pebble-ink)' }}>
          today
        </span>
        <span
          style={{
            color: 'var(--pebble-terracotta)',
            fontSize: 10,
            textTransform: 'lowercase',
          }}
        >
          brief
        </span>
      </div>

      {/* date */}
      <div className="mt-5">
        <p
          className="pebble-hand"
          style={{ fontSize: 14, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
        >
          Tuesday · may 16
        </p>
        <svg viewBox="0 0 200 4" className="mt-1 h-1 w-2/3" preserveAspectRatio="none">
          <path
            d="M2 2 C 60 1, 120 3, 198 2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <p className="mt-4" style={{ fontSize: 10, color: 'var(--pebble-ink-muted)' }}>
        how are you, really?
      </p>

      {/* three sliders */}
      <div className="mt-4 space-y-4">
        <Slider label="energy" pos={28} value="4" />
        <Slider label="pain" pos={62} value="6" />
        <Slider label="mood" pos={78} value="7" />
      </div>

      {/* rows */}
      <div className="mt-5 space-y-2" style={{ fontSize: 9, color: 'var(--pebble-ink-muted)' }}>
        <p>+ symptoms</p>
        <p>+ today's meds</p>
        <p>+ today's factors</p>
      </div>

      {/* done stamp */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
        <svg width="100" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <p className="pebble-hand" style={{ fontSize: 14, marginTop: 2 }}>
          done · 14s
        </p>
        <svg width="100" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* pebble in corner */}
      <div className="absolute bottom-3 right-3">
        <Pebble size={20} />
      </div>
    </div>
  );
}

function Slider({ label, pos, value }: { label: string; pos: number; value: string }) {
  return (
    <div className="flex items-center gap-2" style={{ fontSize: 10 }}>
      <span style={{ width: 38, color: 'var(--pebble-ink)' }}>{label}</span>
      <div className="relative flex-1">
        <svg viewBox="0 0 100 4" className="h-1 w-full" preserveAspectRatio="none">
          <path
            d={`M2 2 C 20 1.6, 50 2.4, 98 2`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d={`M2 2 C ${pos / 3} 1.7, ${pos * 0.7} 2.3, ${pos} 2`}
            stroke="var(--pebble-terracotta)"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
        <span
          className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
          style={{
            left: `calc(${pos}% - 4px)`,
            background: 'var(--pebble-terracotta)',
          }}
        />
      </div>
      <span style={{ width: 12, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export function BriefSketch() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ padding: '20px 12px' }}>
      <p
        className="text-center pebble-mono"
        style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase' }}
      >
        patient-generated
        <br />
        symptom summary
      </p>
      <svg viewBox="0 0 200 2" className="my-2 h-px w-full" preserveAspectRatio="none">
        <line x1="0" y1="1" x2="200" y2="1" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <p
        className="pebble-mono mt-3"
        style={{ fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        the pattern
      </p>
      <p className="pebble-mono mt-1" style={{ fontSize: 7, lineHeight: 1.5 }}>
        energy averaged 4/10 this week,
        down from 6/10. pain peaked at
        8/10 wednesday, correlated with
        poor sleep the night before.
      </p>

      <p
        className="pebble-mono mt-3"
        style={{ fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        what may have contributed
      </p>
      <p className="pebble-mono mt-1" style={{ fontSize: 7, lineHeight: 1.5 }}>
        • skipped mestinon (3x)
        <br />• 4h sleep average
        <br />• period day 1
      </p>

      {/* perforated edge bottom */}
      <div
        className="absolute bottom-2 left-0 right-0 text-center"
        style={{ fontSize: 9, letterSpacing: '0.4em', color: 'var(--pebble-ink-muted)' }}
      >
        · · · · · · · ·
      </div>
    </div>
  );
}

export function HistorySketch() {
  const rows = [
    { date: 'may 16', e: 40, p: 60, m: 70 },
    { date: 'may 15', e: 60, p: 30, m: 70 },
    { date: 'may 14', e: 30, p: 80, m: 40 },
    { date: 'may 13', e: 50, p: 50, m: 60 },
    { date: 'may 12', e: 70, p: 20, m: 80 },
  ];
  return (
    <div className="relative h-full w-full" style={{ padding: '20px 16px' }}>
      <p className="pebble-hand" style={{ fontSize: 18 }}>
        history
      </p>
      <svg viewBox="0 0 200 4" className="mt-1 h-1 w-2/3" preserveAspectRatio="none">
        <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>

      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.date} style={{ fontSize: 9 }}>
            <p style={{ color: 'var(--pebble-ink-muted)' }}>{r.date}</p>
            <div className="mt-1 flex gap-2">
              <HorizonBar value={r.e} />
              <HorizonBar value={r.p} />
              <HorizonBar value={r.m} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizonBar({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 40 6" className="h-1.5 w-12" preserveAspectRatio="none">
      <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line
        x1="0"
        y1="3"
        x2={(value / 100) * 40}
        y2="3"
        stroke="var(--pebble-terracotta)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
