'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { NoteSummary } from '@/lib/notes';
import { formatDate } from '@/lib/notes';

// The contents list — a hand-set TOC with leader dots. Filters by tag.
// Transitions throughout: opacity + color only, 350–600ms ease-out-expo.
// No lifts, no scale, no spring.

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function NotesIndex({
  notes,
  tags,
}: {
  notes: NoteSummary[];
  tags: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (active ? notes.filter((n) => n.tags.includes(active)) : notes),
    [notes, active],
  );

  const tot = String(notes.length).padStart(2, '0');

  return (
    <div>
      {/* tag filter row */}
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-2 md:mb-14">
          <span
            className="mr-2 font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            filed under ·
          </span>
          <TagButton
            label="all"
            count={notes.length}
            selected={active === null}
            onClick={() => setActive(null)}
          />
          {tags.map((t) => {
            const count = notes.filter((n) => n.tags.includes(t)).length;
            return (
              <TagButton
                key={t}
                label={t}
                count={count}
                selected={active === t}
                onClick={() => setActive(active === t ? null : t)}
              />
            );
          })}
        </div>
      )}

      {/* contents heading */}
      <div className="mb-6 flex items-baseline justify-between">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ contents
        </p>
        <p
          className="font-mono text-[11px] uppercase tracking-[0.24em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          {String(visible.length).padStart(2, '0')} / {tot}
        </p>
      </div>

      <ol className="list-none" style={{ borderTop: `1px solid rgba(196, 138, 58, 0.35)` }}>
        {visible.map((note, idx) => (
          <ContentsRow key={note.slug} note={note} index={idx} />
        ))}
        {visible.length === 0 && (
          <li
            className="px-2 py-10 text-center font-serif text-[18px] italic"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            no notes filed under this tag yet.
          </li>
        )}
      </ol>
    </div>
  );
}

function TagButton({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] lowercase tracking-[0.14em]"
      style={{
        borderColor: selected
          ? 'var(--color-accent)'
          : 'rgba(44, 29, 18, 0.18)',
        background: selected ? 'var(--color-accent)' : 'transparent',
        color: selected ? 'var(--color-bg)' : 'var(--color-ink-muted)',
        transition: `color 450ms ${EASE}, background-color 450ms ${EASE}, border-color 450ms ${EASE}`,
      }}
    >
      {label}
      <span
        className="font-mono text-[10px]"
        style={{
          color: selected
            ? 'rgba(245, 236, 217, 0.72)'
            : 'var(--color-gold-dim)',
          transition: `color 450ms ${EASE}`,
        }}
      >
        {String(count).padStart(2, '0')}
      </span>
    </button>
  );
}

function ContentsRow({ note, index }: { note: NoteSummary; index: number }) {
  const d = formatDate(note.date);
  const num = String(index + 1).padStart(2, '0');

  return (
    <li
      className="relative"
      style={{ borderBottom: `1px solid rgba(196, 138, 58, 0.35)` }}
    >
      <Link
        href={`/notes/${note.slug}`}
        className="contents-row group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 px-1 py-7 md:gap-8 md:py-9"
      >
        {/* accent bar — fades in on hover (subtle, no translate) */}
        <span
          aria-hidden
          className="contents-row__bar pointer-events-none absolute left-0 top-0 h-full w-[3px]"
          style={{
            background: 'var(--color-accent)',
            opacity: 0,
            transition: `opacity 600ms ${EASE}`,
          }}
        />

        {/* number */}
        <span
          className="font-serif text-[20px] font-medium leading-none md:text-[24px]"
          style={{
            color: 'var(--color-accent)',
            transition: `color 500ms ${EASE}`,
          }}
        >
          {num}
        </span>

        {/* title + description column */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className="contents-row__title font-serif text-[22px] font-medium leading-[1.12] tracking-[-0.015em] md:text-[28px]"
              style={{
                color: 'var(--color-ink)',
                transition: `color 500ms ${EASE}`,
              }}
            >
              {note.title}
            </h3>
            {/* leader dots — marches from faded dotted into a solid rule on hover */}
            <span
              aria-hidden
              className="contents-row__leader hidden h-[1px] flex-1 self-center md:inline-block"
              style={{
                background:
                  'repeating-linear-gradient(to right, var(--color-gold-dim) 0 2px, transparent 2px 6px)',
                opacity: 0.55,
                transition: `opacity 600ms ${EASE}, background 600ms ${EASE}`,
              }}
            />
          </div>
          {note.description ? (
            <p
              className="mt-3 max-w-[60ch] font-serif text-[16px] italic leading-[1.5] md:text-[17px]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {note.description}
            </p>
          ) : null}
          {note.tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-3">
              {note.tags.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: 'var(--color-gold-dim)' }}
                >
                  · {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* right-hand meta — date + reading time */}
        <div className="hidden text-right md:block">
          <div
            className="font-mono text-[12px] tracking-[0.1em]"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {d.dotted}
          </div>
          <div
            className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            {note.readingMinutes} min read
          </div>
        </div>

        {/* mobile-only meta footer */}
        <div className="col-span-2 col-start-2 mt-3 flex items-baseline justify-between md:hidden">
          <span
            className="font-mono text-[11px]"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {d.dotted}
          </span>
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            {note.readingMinutes} min
          </span>
        </div>
      </Link>

      <style>{`
        .contents-row:hover .contents-row__bar { opacity: 1; }
        .contents-row:hover .contents-row__title { color: var(--color-accent); }
        .contents-row:hover .contents-row__leader {
          opacity: 0.9;
          background: linear-gradient(to right, var(--color-gold) 0 100%);
        }
      `}</style>
    </li>
  );
}
