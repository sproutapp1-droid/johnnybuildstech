/* Polaroid — a notebook-page placeholder for a phone screenshot.
 * Drawn in the notebook idiom: cream paper, hand-drawn rule below
 * a hand-lettered title, pencil-line sliders, a tiny Pebble in the
 * corner. Looks intentional, not "image missing". */

import { Pebble } from './Pebble';

/* Seeded RNG so waveform/receipt geometry is identical between SSR
 * and the client (no hydration mismatch). */
function makeSeeded(seed: number) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/* Single continuous ink-stroke waveform — mirrors InkWaveform /
 * ReceiptWaveform in design-canvas/lib/marks.jsx. */
function buildWaveformPath(
  width: number,
  height: number,
  segs: number,
  seed: number,
  envFreq: number,
  tPhase: number,
) {
  const rng = makeSeeded(seed);
  let d = `M 0 ${(height / 2).toFixed(2)}`;
  for (let i = 1; i <= segs; i++) {
    const x = (i / segs) * width;
    const env = Math.sin((i / segs) * Math.PI * envFreq + tPhase * 0.04) * 0.6 + 0.4;
    const y = height / 2 + (rng() - 0.5) * height * 0.8 * env;
    const cx = ((i - 0.5) / segs) * width;
    const cy = height / 2 + (rng() - 0.5) * height * 0.7 * env;
    d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

const WAVE_FRAMES_RECORD = Array.from({ length: 6 }, (_, k) =>
  buildWaveformPath(200, 56, 60, 17 + k * 13, 3, k * 6),
);
const WAVE_PATH_RECEIPT = buildWaveformPath(180, 14, 50, 7, 2.5, 0);

type Variant =
  | 'today'
  | 'brief'
  | 'history'
  | 'brief-voice'
  | 'voice-recording'
  | 'day-detail-moments'
  | 'symptom-picker';

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
  if (variant === 'brief-voice') return <BriefVoiceSketch />;
  if (variant === 'voice-recording') return <VoiceRecordingSketch />;
  if (variant === 'day-detail-moments') return <DayDetailMomentsSketch />;
  if (variant === 'symptom-picker') return <SymptomPickerSketch />;
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

/* ─── Margin rule helper (re-used by new sketches) ─────────────── */
function MarginRule() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 2 200"
      preserveAspectRatio="none"
      className="absolute"
      style={{ left: 14, top: 14, bottom: 14, width: 1.5, color: 'var(--pebble-terracotta)' }}
    >
      <path d="M1 2 C 0.6 50, 1.4 110, 1 198" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.55" />
    </svg>
  );
}

/* ─── 04a Voice recording ─────────────────────────────────────── */
export function VoiceRecordingSketch() {
  return (
    <div className="relative h-full w-full" style={{ padding: '18px 14px 14px 22px' }}>
      <MarginRule />

      <div className="flex items-center justify-between" style={{ fontSize: 10 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>today</span>
        <span style={{ color: 'var(--pebble-terracotta)', fontSize: 9, fontStyle: 'italic' }}>brief</span>
      </div>

      <p className="pebble-hand mt-3" style={{ fontSize: 14, lineHeight: 1, color: 'var(--pebble-ink)' }}>
        recording
      </p>
      <svg viewBox="0 0 200 4" className="mt-1 h-1 w-1/3" preserveAspectRatio="none">
        <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>

      <p
        className="mt-3"
        style={{ fontSize: 8, color: 'var(--pebble-ink-muted)', fontStyle: 'italic', lineHeight: 1.3, maxWidth: 130 }}
      >
        say what&apos;s on your mind.<br />nothing is uploaded.
      </p>

      {/* Animated single-stroke ink waveform — mirrors canvas InkWaveform */}
      <div className="mt-6">
        <svg viewBox="0 0 200 56" className="block w-full" style={{ height: 56 }} preserveAspectRatio="none">
          <path
            d={WAVE_FRAMES_RECORD[0]}
            fill="none"
            stroke="var(--pebble-ink)"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          >
            <animate
              attributeName="d"
              values={[...WAVE_FRAMES_RECORD, WAVE_FRAMES_RECORD[0]].join(';')}
              dur="1.2s"
              repeatCount="indefinite"
              calcMode="discrete"
            />
          </path>
        </svg>
      </div>

      {/* Elapsed counter */}
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className="pebble-mono"
          style={{ fontSize: 13, color: 'var(--pebble-terracotta)', letterSpacing: '0.04em' }}
        >
          0:14
        </span>
        <span
          style={{ fontSize: 8, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
        >
          · listening
        </span>
      </div>

      {/* Pulsing stop button */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ bottom: 28 }}>
        <svg viewBox="-20 -20 40 40" width="36" height="36" style={{ overflow: 'visible' }}>
          <circle cx="0" cy="0" r="16" fill="none" stroke="var(--pebble-ink)" strokeWidth="0.8" opacity="0.55">
            <animate attributeName="r" values="16;18;16" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="7" fill="var(--pebble-terracotta)">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
        <p
          className="pebble-hand"
          style={{ fontSize: 9, color: 'var(--pebble-ink-muted)', marginTop: 2, fontStyle: 'italic' }}
        >
          tap to stop
        </p>
      </div>

      <div className="absolute bottom-2 right-2">
        <Pebble size={18} />
      </div>
    </div>
  );
}

/* ─── m4 Day detail · with moments timeline ───────────────────── */
export function DayDetailMomentsSketch() {
  const moments = [
    { t: '9:30a', mood: 6, tag: 'waking' },
    { t: '2:47p', mood: 4, tag: 'work' },
    { t: '3:30p', mood: 3, tag: 'meeting ran over' },
    { t: '9:10p', mood: 7, tag: 'post-exercise' },
  ];
  return (
    <div className="relative h-full w-full" style={{ padding: '18px 12px 14px 22px' }}>
      <MarginRule />

      <div className="flex items-center justify-between" style={{ fontSize: 9 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>← history</span>
        <span style={{ width: 12 }} />
      </div>

      <p className="pebble-hand mt-2" style={{ fontSize: 13, lineHeight: 1, color: 'var(--pebble-ink)' }}>
        Tuesday · may 21
      </p>
      <svg viewBox="0 0 200 4" className="mt-1 h-1 w-1/2" preserveAspectRatio="none">
        <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
      <p
        style={{ fontSize: 7.5, color: 'var(--pebble-ink-muted)', fontStyle: 'italic', marginTop: 2 }}
      >
        logged at 9:42pm
      </p>

      {/* read-only sliders */}
      <p
        className="mt-3"
        style={{ fontSize: 8, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
      >
        how you were
      </p>
      <div className="mt-2 space-y-1.5">
        <Slider label="energy" pos={56} value="6" />
        <Slider label="pain" pos={48} value="5" />
        <Slider label="mood" pos={48} value="5" />
      </div>

      {/* moments section */}
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="pebble-hand" style={{ fontSize: 11, color: 'var(--pebble-ink)' }}>
          moments
        </span>
        <span style={{ fontSize: 7.5, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}>· 4</span>
      </div>
      <svg viewBox="0 0 200 4" className="h-0.5 w-1/4" preserveAspectRatio="none">
        <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>

      <div className="mt-1.5">
        {moments.map((m, i) => (
          <div
            key={m.t}
            className="flex items-baseline gap-1.5 py-0.5"
            style={{
              fontSize: 7.5,
              borderBottom:
                i === moments.length - 1 ? undefined : '0.5px dashed rgba(28,26,24,0.18)',
            }}
          >
            <span
              style={{ width: 22, color: 'var(--pebble-ink-muted)', fontStyle: 'italic', flexShrink: 0 }}
            >
              {m.t}
            </span>
            <span style={{ color: 'var(--pebble-ink)' }}>mood {m.mood}</span>
            <span
              style={{ color: 'var(--pebble-ink-muted)', fontStyle: 'italic', flex: 1, minWidth: 0 }}
            >
              · {m.tag}
            </span>
          </div>
        ))}
      </div>

      {/* tiny moments strip echo */}
      <div className="mt-2">
        <svg viewBox="0 0 200 18" className="block w-full" style={{ height: 16 }} preserveAspectRatio="none">
          <line x1="2" y1="9" x2="198" y2="9" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
          {[
            { x: 18, y: 6 },
            { x: 80, y: 10 },
            { x: 120, y: 12 },
            { x: 178, y: 4 },
          ].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--pebble-terracotta)" />
          ))}
          <path
            d="M18 6 C 40 8, 60 9, 80 10 S 110 13, 120 12 S 160 6, 178 4"
            stroke="var(--pebble-terracotta)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>

      <p
        className="mt-1"
        style={{ fontSize: 7, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
      >
        symptoms · headache, fatigue
      </p>

      <div className="absolute bottom-2 right-2">
        <Pebble size={16} />
      </div>
    </div>
  );
}

/* ─── 01b Symptom picker sheet ────────────────────────────────── */
export function SymptomPickerSketch() {
  const chips = [
    { l: 'fatigue', on: true },
    { l: 'brain fog', on: true },
    { l: 'joint pain', on: false },
    { l: 'headache', on: false },
    { l: 'nausea', on: false },
    { l: 'dizziness', on: false },
    { l: 'PEM', on: false },
    { l: 'muscle ache', on: false },
    { l: 'tingling', on: false },
    { l: 'tinnitus', on: false },
    { l: 'anxiety', on: false },
    { l: 'low mood', on: false },
    { l: '+ make new', on: false },
  ];
  return (
    <div className="relative h-full w-full" style={{ padding: '18px 14px 14px 22px' }}>
      <MarginRule />

      <div className="flex items-center justify-between" style={{ fontSize: 10 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>≡</span>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>today</span>
        <span style={{ color: 'var(--pebble-terracotta)', fontSize: 9, fontStyle: 'italic' }}>brief</span>
      </div>

      {/* Dimmed faux Today behind the sheet */}
      <div
        aria-hidden
        className="absolute"
        style={{
          left: 22,
          right: 14,
          top: 36,
          bottom: 0,
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 200 4" className="h-1 w-1/2" preserveAspectRatio="none">
          <path d="M2 2 C 60 1, 120 3, 198 2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <div className="mt-2 space-y-1">
          <Slider label="energy" pos={32} value="4" />
          <Slider label="pain" pos={68} value="6" />
        </div>
      </div>

      {/* Bottom sheet */}
      <div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          background: '#F8F3E9',
          borderTop: '1px solid rgba(28,26,24,0.16)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: '10px 12px 12px 18px',
          height: '70%',
          boxShadow: '0 -12px 24px -12px rgba(28,26,24,0.25)',
        }}
      >
        {/* grabber */}
        <div
          aria-hidden
          className="mx-auto"
          style={{ width: 32, height: 3, borderRadius: 2, background: 'rgba(28,26,24,0.22)' }}
        />

        <p
          className="pebble-hand mt-2"
          style={{ fontSize: 13, lineHeight: 1, color: 'var(--pebble-ink)' }}
        >
          what&apos;s going on?
        </p>

        {/* search */}
        <div className="mt-2">
          <p style={{ fontSize: 8, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}>search</p>
          <svg viewBox="0 0 200 3" className="h-0.5 w-full" preserveAspectRatio="none">
            <path
              d="M2 1.5 C 50 1, 120 2, 198 1.5"
              stroke="var(--pebble-ink)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* chip grid */}
        <div className="mt-2 flex flex-wrap" style={{ gap: 3 }}>
          {chips.map((c) => (
            <span
              key={c.l}
              style={{
                fontSize: 7.5,
                padding: '2px 5px',
                color: c.on ? 'var(--pebble-paper)' : 'var(--pebble-ink)',
                background: c.on ? 'var(--pebble-terracotta)' : 'transparent',
                border: '0.6px solid var(--pebble-terracotta)',
                borderRadius: 8,
                fontStyle: c.l.startsWith('+') ? 'italic' : 'normal',
                opacity: c.l.startsWith('+') ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {c.l}
            </span>
          ))}
        </div>

        {/* done stamp */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ bottom: 10 }}>
          <svg width="76" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
            <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <p className="pebble-hand" style={{ fontSize: 11, marginTop: 1, lineHeight: 1 }}>
            add to today
          </p>
          <svg width="76" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
            <path d="M2 2 C 30 1, 70 2.5, 98 2" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Brief receipt with voice memo block ─────────────────────── */
export function BriefVoiceSketch() {
  const monoLabel = {
    fontFamily: 'var(--font-mono, ui-monospace, "SFMono-Regular", monospace)',
    fontSize: 5.5,
    letterSpacing: '0.10em',
    color: 'var(--pebble-ink)',
  } as React.CSSProperties;
  const monoBody = {
    fontFamily: 'var(--font-mono, ui-monospace, "SFMono-Regular", monospace)',
    fontSize: 6,
    lineHeight: 1.45,
    color: 'var(--pebble-ink)',
  } as React.CSSProperties;

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ padding: '14px 8px 10px 14px' }}>
      <MarginRule />

      <div className="flex items-center justify-between" style={{ fontSize: 9 }}>
        <span style={{ color: 'var(--pebble-ink-muted)' }}>brief</span>
        <span style={{ width: 12 }} />
      </div>

      <div className="mt-1">
        <p className="pebble-hand" style={{ fontSize: 12, lineHeight: 1, color: 'var(--pebble-ink)' }}>
          brief <span style={{ fontSize: 7, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}>· may 11 – 17</span>
        </p>
      </div>

      {/* Receipt artifact — cream rectangle with perforated edges */}
      <div
        className="relative mx-auto mt-2"
        style={{
          width: '94%',
          background: '#F8F3E9',
          padding: '8px 10px 12px',
          boxShadow:
            '0 1px 0 rgba(28,26,24,0.04), 0 4px 10px rgba(28,26,24,0.08), 0 16px 28px -12px rgba(28,26,24,0.18)',
        }}
      >
        {/* perforated top edge */}
        <span
          aria-hidden
          className="absolute left-0 right-0"
          style={{
            top: -3,
            height: 6,
            background:
              'radial-gradient(circle at 3px 6px, var(--pebble-paper) 2px, transparent 2.2px) repeat-x',
            backgroundSize: '6px 6px',
          }}
        />
        {/* perforated bottom edge */}
        <span
          aria-hidden
          className="absolute left-0 right-0"
          style={{
            bottom: -3,
            height: 6,
            background:
              'radial-gradient(circle at 3px 0, var(--pebble-paper) 2px, transparent 2.2px) repeat-x',
            backgroundSize: '6px 6px',
          }}
        />

        <div style={monoLabel}>PATIENT-GENERATED</div>
        <div style={monoLabel}>SYMPTOM SUMMARY</div>
        <div style={{ height: 4 }} />
        <div style={monoLabel}>May 11 – May 17, 2026</div>
        <div
          style={{
            borderTop: '0.6px dashed var(--pebble-ink)',
            opacity: 0.4,
            margin: '4px 0',
          }}
        />

        <div style={{ ...monoLabel, marginTop: 3, color: 'var(--pebble-terracotta)' }}>THE PATTERN</div>
        <div style={{ ...monoBody, marginTop: 2 }}>
          Energy averaged 4/10 this week,
          <br />down from 6/10. Pain peaked
          <br />8/10 Wednesday morning.
        </div>

        <div style={{ ...monoLabel, marginTop: 6, color: 'var(--pebble-terracotta)' }}>
          SYMPTOMS LOGGED
        </div>
        <div style={{ ...monoBody, marginTop: 2 }}>
          · fatigue (6 days)
          <br />· brain fog (4 days)
          <br />· joint pain (3 days)
          <br />· headache (Wed, Fri)
          <br />· nausea (Sat)
        </div>

        <div style={{ ...monoLabel, marginTop: 6, color: 'var(--pebble-terracotta)' }}>
          VOICE MEMO · TUE 4:32pm
        </div>
        {/* continuous ink-stroke waveform */}
        <svg
          viewBox="0 0 180 14"
          className="mt-1 block w-full"
          style={{ height: 11 }}
          preserveAspectRatio="none"
        >
          <path
            d={WAVE_PATH_RECEIPT}
            fill="none"
            stroke="var(--pebble-ink)"
            strokeWidth={0.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.8}
          />
        </svg>
        <div style={{ ...monoBody, fontStyle: 'italic', opacity: 0.88, marginTop: 1 }}>
          &ldquo;the morning crash is
          <br />different from my usual pain.&rdquo;
        </div>

        <div style={{ ...monoLabel, marginTop: 6, color: 'var(--pebble-terracotta)' }}>
          A NOTE I ADDED FOR YOU
        </div>
        <div style={{ ...monoBody, fontStyle: 'italic', marginTop: 2 }}>
          &ldquo;i want to ask about the
          <br />morning crashes.&rdquo;
        </div>

        <div
          style={{
            borderTop: '0.6px dashed var(--pebble-ink)',
            opacity: 0.4,
            margin: '6px 0 3px',
          }}
        />
        <div style={{ ...monoBody, fontSize: 5.5, opacity: 0.7 }}>
          Generated locally on iPhone.
          <br />Your symptom data never
          <br />leaves this device.
        </div>
      </div>

      {/* quiet action buttons under the receipt */}
      <div
        className="mt-2 flex justify-center gap-3"
        style={{ fontSize: 6.5, color: 'var(--pebble-ink-muted)', fontStyle: 'italic' }}
      >
        <span>copy text</span>
        <span>pdf</span>
        <span>share</span>
      </div>

      <div className="absolute bottom-2 right-2">
        <Pebble size={14} />
      </div>
    </div>
  );
}
