import type { Metadata } from 'next';
import { NotesIndex } from '@/components/notes/NotesIndex';
import { allNoteSummaries, allTags } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Notes — field notes from the studio',
  description:
    'Essays on bespoke websites, landing pages, Vercel hosting, and the craft of the handmade web. From the studio at johnnybuildstech.',
  alternates: { canonical: '/notes' },
  openGraph: {
    title: 'Notes — field notes from johnnybuildstech',
    description:
      'Essays on bespoke websites, landing pages, and the craft of the handmade web.',
    url: '/notes',
    type: 'website',
  },
};

export default function NotesPage() {
  const notes = allNoteSummaries;

  const baseUrl = 'https://johnnybuildstech.com';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/notes#page`,
        url: `${baseUrl}/notes`,
        name: 'Notes — field notes from johnnybuildstech',
        description:
          'Essays on bespoke websites, landing pages, Vercel hosting for small businesses, and the craft of the handmade web.',
        inLanguage: 'en-GB',
        isPartOf: { '@type': 'WebSite', url: baseUrl, name: 'johnnybuildstech' },
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/notes#list`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: notes.length,
        itemListElement: notes.map((n, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${baseUrl}/notes/${n.slug}`,
          name: n.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/notes#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Notes',
            item: `${baseUrl}/notes`,
          },
        ],
      },
    ],
  };

  const earliest = notes[notes.length - 1]?.date;
  const latest = notes[0]?.date;
  const yearSpan =
    earliest && latest
      ? earliest.slice(0, 4) === latest.slice(0, 4)
        ? latest.slice(0, 4)
        : `${earliest.slice(0, 4)}–${latest.slice(0, 4)}`
      : new Date().getFullYear();

  return (
    <div
      className="relative min-h-screen pb-32 pt-36 md:pt-44"
      style={{ background: 'var(--color-bg)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      {/* paper-grain haze behind the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(44, 29, 18, 0.9) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />

      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-24 md:px-10">
        {/* LEFT — masthead */}
        <header className="md:sticky md:top-36 md:self-start">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ field notes
          </p>
          <h1
            className="mt-6 font-serif font-medium leading-[0.92] tracking-[-0.02em]"
            style={{
              color: 'var(--color-ink)',
              fontSize: 'clamp(64px, 11vw, 148px)',
            }}
          >
            notes.
          </h1>
          <p
            className="mt-8 max-w-[36ch] font-serif italic leading-[1.45] md:text-[20px]"
            style={{ color: 'var(--color-ink-muted)', fontSize: '19px' }}
          >
            Short essays from the studio — on the craft of bespoke websites,
            landing pages that convert, the economics of Vercel for small
            businesses, and the handmade web.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-5">
            <dt
              className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              edition
            </dt>
            <dd
              className="font-mono text-[12px] tracking-[0.1em]"
              style={{ color: 'var(--color-ink)' }}
            >
              № 01 · {yearSpan}
            </dd>

            <dt
              className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              entries
            </dt>
            <dd
              className="font-mono text-[12px] tracking-[0.1em]"
              style={{ color: 'var(--color-ink)' }}
            >
              {String(notes.length).padStart(2, '0')} filed
            </dd>

            <dt
              className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              cadence
            </dt>
            <dd
              className="font-mono text-[12px] tracking-[0.1em]"
              style={{ color: 'var(--color-ink)' }}
            >
              ~1 / fortnight
            </dd>

            <dt
              className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              typeset in
            </dt>
            <dd
              className="font-mono text-[12px] tracking-[0.1em]"
              style={{ color: 'var(--color-ink)' }}
            >
              fraunces · manrope · dm mono
            </dd>
          </dl>

          <p
            className="mt-12 max-w-[32ch] font-serif italic text-[16px] leading-[1.55]"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Every essay in here argues, one way or another, that the website
            you keep meaning to redo is worth the bother.
          </p>
        </header>

        {/* RIGHT — contents */}
        <section>
          <NotesIndex notes={notes} tags={allTags} />

          {/* tail CTA */}
          <div
            className="mt-16 flex flex-col gap-5 rounded-[20px] p-7 md:mt-20 md:flex-row md:items-center md:justify-between md:p-8"
            style={{
              background: 'var(--color-bg-deep)',
              boxShadow:
                'inset 0 0 0 1px rgba(196, 138, 58, 0.35), 0 10px 28px -18px rgba(44, 29, 18, 0.28)',
            }}
          >
            <div>
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-dim)' }}
              >
                ─ from the studio
              </p>
              <p
                className="mt-3 max-w-[44ch] font-serif leading-[1.45] md:text-[20px]"
                style={{ color: 'var(--color-ink)', fontSize: '18px' }}
              >
                If something in the notes is true of you, it&rsquo;s probably
                worth a ten-minute conversation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{
                  background: 'var(--color-ink)',
                  color: 'var(--color-bg)',
                  transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                start a project
                <span aria-hidden>→</span>
              </a>
              <a
                href="mailto:jonathanlai928@gmail.com?subject=hello%20from%20the%20notes&body=hi%20jonathan%2C%20"
                className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[color:var(--color-gold)] decoration-2 underline-offset-[6px]"
                style={{
                  color: 'var(--color-ink-muted)',
                  transition: 'color 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                or email me
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
