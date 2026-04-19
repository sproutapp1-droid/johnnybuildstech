import Link from 'next/link';
import type { Note, NoteSummary } from '@/lib/notes';
import { formatDate } from '@/lib/notes';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// Prev / Next navigation + closing CTA. Fully static.
// Hover states are colour-only — no translate, no scale.

export function NoteFooter({
  prev,
  next,
}: {
  prev?: Note | NoteSummary;
  next?: Note | NoteSummary;
}) {
  return (
    <footer className="mt-24 md:mt-32">
      {/* ornament divider */}
      <div className="mb-12 flex items-center justify-center" aria-hidden>
        <span
          className="inline-block h-px w-10"
          style={{ background: 'var(--color-gold)' }}
        />
        <span
          className="mx-4 font-mono text-[10.5px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          end of note
        </span>
        <span
          className="inline-block h-px w-10"
          style={{ background: 'var(--color-gold)' }}
        />
      </div>

      {(prev || next) && (
        <div className="mb-16 grid gap-4 md:grid-cols-2 md:gap-6">
          <PrevNextCard label="previous note" note={prev} direction="prev" />
          <PrevNextCard label="next note" note={next} direction="next" />
        </div>
      )}

      {/* CTA */}
      <div
        className="rounded-[20px] p-8 md:p-12"
        style={{
          background: 'var(--color-bg-deep)',
          boxShadow:
            'inset 0 0 0 1px rgba(196, 138, 58, 0.38), 0 14px 36px -22px rgba(44, 29, 18, 0.3)',
        }}
      >
        <p
          className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ from the studio
        </p>
        <p
          className="mt-5 max-w-[38ch] font-serif leading-[1.25] tracking-[-0.01em]"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(26px, 3.6vw, 38px)',
          }}
        >
          If the note spoke to you,
          <span className="italic" style={{ color: 'var(--color-ink-muted)' }}>
            {' '}
            the conversation usually follows.
          </span>
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{
              background: 'var(--color-ink)',
              color: 'var(--color-bg)',
              transition: `opacity 400ms ${EASE}`,
            }}
          >
            start a project
            <span aria-hidden>→</span>
          </Link>
          <a
            href="mailto:jonathanlai928@gmail.com?subject=hello%20from%20the%20notes&body=hi%20jonathan%2C%20"
            className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[color:var(--color-gold)] decoration-2 underline-offset-[6px]"
            style={{
              color: 'var(--color-ink-muted)',
              transition: `color 400ms ${EASE}`,
            }}
          >
            or email me →
          </a>
          <Link
            href="/notes"
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{
              color: 'var(--color-gold-dim)',
              transition: `color 400ms ${EASE}`,
            }}
          >
            ← back to all notes
          </Link>
        </div>
      </div>
    </footer>
  );
}

function PrevNextCard({
  label,
  note,
  direction,
}: {
  label: string;
  note?: Note | NoteSummary;
  direction: 'prev' | 'next';
}) {
  if (!note) {
    return (
      <div
        className="min-h-[132px] rounded-[14px] p-6"
        style={{
          border: '1px dashed rgba(122, 91, 63, 0.3)',
          color: 'var(--color-gold-dim)',
        }}
      >
        <p className="font-mono text-[10.5px] uppercase tracking-[0.28em]">
          {label}
        </p>
        <p className="mt-4 font-serif text-[18px] italic">
          {direction === 'prev' ? 'first note in the edition.' : 'latest note.'}
        </p>
      </div>
    );
  }
  const d = formatDate(note.date);
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="prevnext group relative block rounded-[14px] p-6 md:p-7"
      style={{
        background: 'var(--color-bg)',
        boxShadow:
          'inset 0 0 0 1px rgba(196, 138, 58, 0.38), 0 8px 22px -20px rgba(44, 29, 18, 0.3)',
        transition: `box-shadow 500ms ${EASE}`,
      }}
    >
      <div
        className={`flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.28em]`}
        style={{ color: 'var(--color-gold-dim)' }}
      >
        <span>
          {direction === 'prev' ? '← ' : ''}
          {label}
          {direction === 'next' ? ' →' : ''}
        </span>
        <span style={{ color: 'var(--color-ink-muted)' }}>{d.dotted}</span>
      </div>
      <h4
        className="prevnext__title mt-4 font-serif text-[20px] font-medium leading-[1.18] tracking-[-0.01em] md:text-[22px]"
        style={{
          color: 'var(--color-ink)',
          transition: `color 500ms ${EASE}`,
        }}
      >
        {note.title}
      </h4>
      <style>{`
        .prevnext:hover { box-shadow: inset 0 0 0 1px var(--color-accent), 0 10px 26px -20px rgba(184, 66, 31, 0.3); }
        .prevnext:hover .prevnext__title { color: var(--color-accent); }
      `}</style>
    </Link>
  );
}
