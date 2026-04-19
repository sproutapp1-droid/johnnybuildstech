import Link from 'next/link';
import type { Note } from '@/lib/notes';
import { formatDate } from '@/lib/notes';

export function NoteHeader({
  note,
  index,
  total,
}: {
  note: Note;
  index: number;
  total: number;
}) {
  const d = formatDate(note.date);
  const num = String(index + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');

  return (
    <header className="mb-14 md:mb-20">
      {/* breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="mb-10 font-mono text-[11px] uppercase tracking-[0.24em]"
        style={{ color: 'var(--color-gold-dim)' }}
      >
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 underline decoration-[color:var(--color-gold)] decoration-2 underline-offset-[5px] transition-colors duration-300 hover:text-[color:var(--color-accent)]"
        >
          ← notes
        </Link>
        <span className="mx-3" aria-hidden>
          /
        </span>
        <span>{note.slug.replace(/-/g, ' ')}</span>
      </nav>

      {/* placard */}
      <div
        className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t pt-5 font-mono text-[11px] uppercase tracking-[0.22em]"
        style={{
          borderColor: 'rgba(196, 138, 58, 0.45)',
          color: 'var(--color-ink-muted)',
        }}
      >
        <span style={{ color: 'var(--color-gold-dim)' }}>
          № {num} / {tot}
        </span>
        <span>{d.dotted}</span>
        <span>{note.readingMinutes} min read</span>
        {note.tags.length > 0 ? (
          <span className="flex flex-wrap gap-3">
            {note.tags.map((t) => (
              <span key={t} style={{ color: 'var(--color-gold-dim)' }}>
                · {t}
              </span>
            ))}
          </span>
        ) : null}
      </div>

      {/* title */}
      <h1
        className="mt-10 font-serif font-medium leading-[0.96] tracking-[-0.025em]"
        style={{
          color: 'var(--color-ink)',
          fontSize: 'clamp(44px, 7.6vw, 112px)',
        }}
      >
        {note.title}
      </h1>

      {/* standfirst */}
      {note.description ? (
        <p
          className="mt-10 max-w-[50ch] font-serif italic leading-[1.4]"
          style={{
            color: 'var(--color-ink-muted)',
            fontSize: 'clamp(20px, 2.2vw, 26px)',
          }}
        >
          {note.description}
        </p>
      ) : null}

      {/* gold ornament before body */}
      <div className="mt-14 flex items-center gap-4" aria-hidden>
        <span
          className="inline-block h-px w-12"
          style={{ background: 'var(--color-gold)' }}
        />
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ begin
        </span>
      </div>
    </header>
  );
}
