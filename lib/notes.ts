import { notes as notesCollection } from '@/.source/server';

// Plain-data shape, safe to cross the server→client boundary.
// (Doc entries carry function references like `body`, which React can't
// serialise into a Client Component.)
export type NoteSummary = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

export type Note = NoteSummary & {
  doc: (typeof notesCollection.docs)[number];
};

function slugFromPath(path: string) {
  // info.path is "why-your-template-website-feels-dead.mdx"
  return path.replace(/\.mdx$/, '').replace(/^\/?/, '').replace(/\/$/, '');
}

function readingMinutes(doc: (typeof notesCollection.docs)[number]) {
  const text = (doc.structuredData?.contents ?? [])
    .map((c) => c.content ?? '')
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}

export const allNotes: Note[] = notesCollection.docs
  .map((doc) => ({
    slug: slugFromPath(doc.info.path),
    title: doc.title as string,
    description: doc.description as string | undefined,
    date: doc.date as string,
    tags: ((doc as unknown as { tags?: string[] }).tags ?? []) as string[],
    readingMinutes: readingMinutes(doc),
    doc,
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getNote(slug: string): Note | undefined {
  return allNotes.find((n) => n.slug === slug);
}

export function toSummary(n: Note): NoteSummary {
  return {
    slug: n.slug,
    title: n.title,
    description: n.description,
    date: n.date,
    tags: n.tags,
    readingMinutes: n.readingMinutes,
  };
}

export const allNoteSummaries: NoteSummary[] = allNotes.map(toSummary);

export function adjacentNotes(slug: string) {
  const i = allNotes.findIndex((n) => n.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  // allNotes is newest first; "next" in reading order = next newer = i - 1
  return {
    prev: allNotes[i + 1], // older
    next: allNotes[i - 1], // newer
  };
}

export const allTags: string[] = Array.from(
  new Set(allNotes.flatMap((n) => n.tags)),
).sort();

export function formatDate(iso: string) {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = String(d.getUTCFullYear());
  return { day, month, year, dotted: `${day} · ${month} · ${year}` };
}
