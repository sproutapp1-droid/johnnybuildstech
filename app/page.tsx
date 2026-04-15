import type { Metadata } from 'next';
import { Hero } from '@/components/gallery/Hero';
import { GalleryStack } from '@/components/gallery/GalleryStack';
import { Process } from '@/components/gallery/Process';
import { WEBSITES } from '@/lib/websites';

export const metadata: Metadata = {
  title: 'johnnybuildstech — building websites that feel alive',
  description:
    'Bespoke, hand-built websites for ADHD brains, solo founders, clinicians and service businesses. Hosted on Vercel at £0/mo.',
  alternates: { canonical: 'https://johnnybuildstech.com/' },
};

export default function Page() {
  return (
    <>
      <Hero />
      <GalleryStack works={WEBSITES} />
      <Process />

      {/* JSON-LD: Person + WebSite + ItemList of CreativeWork */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                name: 'Johnny',
                url: 'https://johnnybuildstech.com',
                jobTitle: 'Bespoke website designer & developer',
                sameAs: ['https://x.com/johnnybuildr'],
              },
              {
                '@type': 'WebSite',
                name: 'johnnybuildstech',
                url: 'https://johnnybuildstech.com/',
                inLanguage: 'en',
              },
              {
                '@type': 'ItemList',
                name: 'Selected web work',
                itemListElement: WEBSITES.map((w, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  item: {
                    '@type': 'CreativeWork',
                    name: w.title,
                    url: w.url,
                    dateCreated: String(w.year),
                    genre: w.category,
                    creator: { '@type': 'Person', name: 'Johnny' },
                    about: w.client,
                    description: w.tagline,
                  },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
