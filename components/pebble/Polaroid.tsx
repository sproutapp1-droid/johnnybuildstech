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
    <div className="relative h-full w-full" style={{ padding: '18px 14px 14px 22px' }}>
      {/* hand-drawn left margin rule */}
      <svg
        aria-hidden
        viewBox="0 0 2 200"
        preserveAspectRatio="none"
        className="absolute"
        style={{ left: 14, top: 14, bottom: 14, width: 1.5, color: 'var(--pebble-terracotta)' }}
      >
        <path d="M1 2 C 0.6 50, 1.4 110, 1 198" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.55" />
      </svg>

      {/* top bar */}
      <div className="flex items-center justify-between" style={{ fontSize: 10 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span style={{ color: 'var(--pebble-ink-muted)', letterSpacing: '0.02em' }}>today</span>
        <span
          style={{
            color: 'var(--pebble-terracotta)',
            fontSize: 9,
            fontStyle: 'italic',
          }}
        >
          brief
        </span>
      </div>

      {/* date */}
      <div className="mt-4">
        <p
          className="pebble-hand"
          style={{ fontSize: 13, color: 'var(--pebble-ink)', lineHeight: 1 }}
        >
          Tuesday · may 16
        </p>
        <svg viewBox="0 0 200 4" className="mt-1 h-1 w-1/2" preserveAspectRatio="none">
          <path
            d="M2 2 C 60 1, 120 3, 198 2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      <p
        className="mt-3"
        style={{ fontSize: 9, color: 'var(--pebble-ink)' }}
      >
        how are you, really?
      </p>

      {/* three sliders */}
      <div className="mt-3 space-y-3">
        <Slider label="energy" pos={32} value="4" />
        <Slider label="pain" pos={68} value="6" />
        <MoodSliderRow pos={74} value="7" />
      </div>

      {/* notebook rows */}
      <div className="mt-3 space-y-1.5">
        <NotebookSketchRow label="symptoms" summary="1 today" />
        <NotebookSketchRow label="today's meds" summary="3 of 4" />
        <NotebookSketchRow label="cycle" summary="day 1" />
        <p
          className="pebble-hand"
          style={{ fontSize: 9, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
        >
          + more to add
        </p>
      </div>

      {/* done stamp */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <svg width="76" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <p className="pebble-hand" style={{ fontSize: 12, marginTop: 1, lineHeight: 1 }}>
          done · 14s
        </p>
        <svg width="76" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* pebble in corner */}
      <div className="absolute bottom-2 right-2">
        <Pebble size={18} />
      </div>
    </div>
  );
}

function MoodSliderRow({ pos, value }: { pos: number; value: string }) {
  return (
    <div>
      <Slider label="mood" pos={pos} value={value} emoji="🙂" />
      <div
        aria-hidden
        className="flex justify-between"
        style={{
          fontSize: 7,
          marginLeft: 40,
          marginRight: 14,
          marginTop: 1,
          opacity: 0.55,
          filter: 'saturate(0.85)',
        }}
      >
        <span>😴</span>
        <span>😔</span>
        <span>😐</span>
        <span>🙂</span>
        <span>😄</span>
      </div>
    </div>
  );
}

function NotebookSketchRow({ label, summary }: { label: string; summary: string }) {
  return (
    <div
      className="flex items-baseline gap-1.5"
      style={{ fontSize: 9, color: 'var(--pebble-ink)' }}
    >
      <span style={{ color: 'var(--pebble-ink-muted)', fontSize: 7 }}>✕</span>
      <span>{label}</span>
      <span className="flex-1" aria-hidden>
        <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="block h-px w-full">
          <path
            d="M2 1 C 25 0.6, 75 1.4, 98 1"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
            opacity="0.35"
          />
        </svg>
      </span>
      <span style={{ color: 'var(--pebble-ink-muted)', fontSize: 8 }}>{summary}</span>
      <span style={{ color: 'var(--pebble-ink-muted)', fontSize: 8 }}>→</span>
    </div>
  );
}

function Slider({
  label,
  pos,
  value,
  emoji,
}: {
  label: string;
  pos: number;
  value: string;
  emoji?: string;
}) {
  return (
    <div className="flex items-center gap-2" style={{ fontSize: 9 }}>
      <span style={{ width: 32, color: 'var(--pebble-ink)' }}>{label}</span>
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
        {emoji ? (
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `calc(${pos}% - 7px)`,
              fontSize: 11,
              lineHeight: 1,
              filter: 'saturate(0.85)',
            }}
          >
            {emoji}
          </span>
        ) : (
          <span
            className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
            style={{
              left: `calc(${pos}% - 4px)`,
              background: 'var(--pebble-terracotta)',
            }}
          />
        )}
      </div>
      <span style={{ width: 10, textAlign: 'right', color: 'var(--pebble-ink-muted)' }}>{value}</span>
    </div>
  );
}

export function BriefSketch() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ padding: '18px 12px 14px 22px' }}>
      {/* hand-drawn left margin rule */}
      <svg
        aria-hidden
        viewBox="0 0 2 200"
        preserveAspectRatio="none"
        className="absolute"
        style={{ left: 14, top: 14, bottom: 14, width: 1.5, color: 'var(--pebble-terracotta)' }}
      >
        <path d="M1 2 C 0.6 50, 1.4 110, 1 198" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.55" />
      </svg>

      {/* top bar */}
      <div className="flex items-center justify-between" style={{ fontSize: 10 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>brief</span>
        <span style={{ width: 12 }} />
      </div>

      {/* hand title */}
      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <p className="pebble-hand" style={{ fontSize: 16, lineHeight: 1, color: 'var(--pebble-ink)' }}>
            brief
          </p>
          <span
            style={{ fontSize: 8, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
          >
            · may 11 – may 17
          </span>
        </div>
        <svg viewBox="0 0 200 4" className="mt-1 h-1 w-1/3" preserveAspectRatio="none">
          <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* receipt body */}
      <p
        className="pebble-mono mt-4"
        style={{ fontSize: 6.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--pebble-terracotta)' }}
      >
        the pattern
      </p>
      <p className="pebble-mono mt-1" style={{ fontSize: 7, lineHeight: 1.5, color: 'var(--pebble-ink)' }}>
        energy averaged 4/10 this week,
        <br />down from 6. pain peaked 8/10
        <br />wednesday, after 4h sleep.
      </p>

      <p
        className="pebble-mono mt-3"
        style={{ fontSize: 6.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--pebble-terracotta)' }}
      >
        what may have contributed
      </p>
      <p className="pebble-mono mt-1" style={{ fontSize: 7, lineHeight: 1.5, color: 'var(--pebble-ink)' }}>
        · skipped mestinon (3x)
        <br />· 4h sleep average
        <br />· period day 1
      </p>

      <p
        className="pebble-mono mt-3"
        style={{ fontSize: 6.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--pebble-terracotta)' }}
      >
        what's changed
      </p>
      <p className="pebble-mono mt-1" style={{ fontSize: 7, lineHeight: 1.5, color: 'var(--pebble-ink)' }}>
        new symptom: brain fog (4 days).
      </p>

      {/* quiet action buttons */}
      <div
        className="absolute left-0 right-0 flex justify-center gap-3"
        style={{ bottom: 14, fontSize: 7, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
      >
        <span>copy text</span>
        <span>pdf</span>
        <span>share</span>
      </div>

      {/* pebble corner */}
      <div className="absolute bottom-2 right-2">
        <Pebble size={16} />
      </div>
    </div>
  );
}

export function HistorySketch() {
  const rows = [
    { date: 'tue · may 16', note: 'fatigue, brain fog', e: 40, p: 60, m: 70, period: true, dots: 2 as const },
    { date: 'mon · may 15', note: 'fatigue, joints', e: 30, p: 70, m: 40, period: false, dots: 2 as const },
    { date: 'sun · may 14', note: '—', e: 60, p: 30, m: 70, period: false, dots: 1 as const },
    { date: 'sat · may 13', note: 'nausea', e: 50, p: 50, m: 60, period: false, dots: 2 as const },
    { date: 'fri · may 12', note: 'fatigue, pain', e: 20, p: 80, m: 30, period: false, dots: 0 as const },
    { date: 'thu · may 11', note: 'headache', e: 30, p: 60, m: 50, period: false, dots: 1 as const },
  ];
  return (
    <div className="relative h-full w-full" style={{ padding: '18px 12px 14px 22px' }}>
      {/* margin rule */}
      <svg
        aria-hidden
        viewBox="0 0 2 200"
        preserveAspectRatio="none"
        className="absolute"
        style={{ left: 14, top: 14, bottom: 14, width: 1.5, color: 'var(--pebble-terracotta)' }}
      >
        <path d="M1 2 C 0.6 50, 1.4 110, 1 198" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.55" />
      </svg>

      <div className="flex items-center justify-between" style={{ fontSize: 10 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>history</span>
        <span style={{ width: 12 }} />
      </div>

      <p className="pebble-hand mt-3" style={{ fontSize: 14, lineHeight: 1, color: 'var(--pebble-ink)' }}>
        history
      </p>
      <svg viewBox="0 0 200 4" className="mt-1 h-1 w-1/3" preserveAspectRatio="none">
        <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>

      <div className="mt-3">
        {rows.map((r, i) => (
          <div
            key={r.date}
            className="flex items-start gap-2 py-1.5"
            style={{
              borderBottom:
                i === rows.length - 1
                  ? undefined
                  : '0.5px dashed rgba(28,26,24,0.18)',
            }}
          >
            <div style={{ width: 54, flexShrink: 0 }}>
              <p style={{ fontSize: 8, color: 'var(--pebble-ink)', lineHeight: 1.1 }}>{r.date}</p>
              <p style={{ fontSize: 6.5, color: 'var(--pebble-ink-muted)', lineHeight: 1.2, marginTop: 1 }}>
                {r.note}
              </p>
            </div>
            <div className="flex flex-col gap-0.5 pt-0.5">
              <HorizonBar value={r.e} />
              <HorizonBar value={r.p} />
              <HorizonBar value={r.m} />
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 pt-1">
              <ConfidenceDot state={r.dots} />
              <ConfidenceDot state={r.dots === 2 ? 2 : r.dots === 0 ? 0 : 1} />
              {r.period && (
                <span style={{ color: 'var(--pebble-terracotta)', fontSize: 7, fontStyle: 'italic' }}>P</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizonBar({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 40 6" className="h-1 w-10" preserveAspectRatio="none">
      <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line
        x1="0"
        y1="3"
        x2={(value / 100) * 40}
        y2="3"
        stroke="var(--pebble-terracotta)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConfidenceDot({ state }: { state: 0 | 1 | 2 }) {
  // 0 = empty ring, 1 = half, 2 = filled
  const fill =
    state === 2 ? 'var(--pebble-terracotta)' : state === 1 ? 'rgba(196,138,58,0.45)' : 'transparent';
  return (
    <span
      aria-hidden
      style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: fill,
        border: '0.6px solid var(--pebble-terracotta)',
        opacity: 0.85,
        display: 'inline-block',
      }}
    />
  );
}
