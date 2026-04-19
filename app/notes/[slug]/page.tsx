import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allNotes, adjacentNotes, getNote } from '@/lib/notes';
import { notesMdxComponents } from '@/components/notes/NotesMdx';
import { NoteHeader } from '@/components/notes/NoteHeader';
import { NoteToc } from '@/components/notes/NoteToc';
import { ReadingProgress } from '@/components/notes/ReadingProgress';
import { NoteFooter } from '@/components/notes/NoteFooter';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.description,
      url: `/notes/${note.slug}`,
      type: 'article',
      publishedTime: note.date,
      tags: note.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const index = allNotes.findIndex((n) => n.slug === note.slug);
  const { prev, next } = adjacentNotes(note.slug);
  const Body = note.doc.body;
  const toc = note.doc.toc;

  // Approximate word count from the structured-data contents so AI systems
  // have a reliable articleBody length signal without us re-reading the MDX.
  const wordCount =
    note.doc.structuredData?.contents
      ?.map((c) => (c.content ?? '').trim())
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length ?? 0;

  // Article + BreadcrumbList JSON-LD. Nest inside @graph so crawlers see them
  // as a single linked-data document.
  const baseUrl = 'https://johnnybuildstech.com';
  const pageUrl = `${baseUrl}/notes/${note.slug}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: note.title,
        description: note.description,
        abstract: note.description,
        datePublished: note.date,
        dateModified: note.date,
        inLanguage: 'en-GB',
        articleSection: note.tags[0] ?? 'Notes',
        keywords: note.tags.join(', '),
        wordCount,
        url: pageUrl,
        author: {
          '@type': 'Person',
          name: 'Jonathan',
          url: `${baseUrl}/about`,
          jobTitle: 'Bespoke website designer & developer',
        },
        publisher: {
          '@type': 'Organization',
          name: 'johnnybuildstech',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/icon.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Notes',
            item: `${baseUrl}/notes`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: note.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <article
        data-reading-root
        className="relative pb-28 pt-36 md:pt-44"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* paper-grain haze */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(44, 29, 18, 0.9) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />

        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <NoteHeader note={note} index={index} total={allNotes.length} />

          <div className="grid gap-12 md:grid-cols-[230px_minmax(0,1fr)] md:gap-16">
            <NoteToc items={toc} />

            <div className="min-w-0 max-w-[68ch]">
              <Body components={notesMdxComponents} />
              <NoteFooter prev={prev} next={next} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
