import type { Metadata } from 'next';
import { AboutMasthead } from '@/components/about/AboutMasthead';
import { AboutCard } from '@/components/about/AboutCard';
import { AboutPress } from '@/components/about/AboutPress';

export const metadata: Metadata = {
  title: 'About — johnnybuildstech',
  description:
    "A letter from Jonathan, founder of johnnybuildstech. It started with Sprout — a mobile app I built for my wife — and became a quiet studio for bespoke, hand-coded websites.",
  alternates: { canonical: 'https://johnnybuildstech.com/about' },
  openGraph: {
    type: 'profile',
    title: 'About — johnnybuildstech',
    description:
      'Jonathan builds bespoke websites and mobile apps. It started with Sprout, made for his wife.',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutMasthead />
      <AboutCard />
      <AboutPress />

      {/* JSON-LD Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Jonathan',
            alternateName: 'johnnybuildstech',
            url: 'https://johnnybuildstech.com/about',
            image: 'https://johnnybuildstech.com/about/johnny.jpg',
            jobTitle: 'Bespoke website designer & developer',
            knowsAbout: [
              'Next.js',
              'Vercel',
              'React',
              'Web design',
              'Mobile app design',
            ],
            subjectOf: [
              {
                '@type': 'Article',
                name: 'Built for his wife, loved by thousands — the ADHD app created by UEA graduates',
                publisher: { '@type': 'Organization', name: 'University of East Anglia' },
                url: 'https://www.uea.ac.uk/about/news/article/built-for-his-wife-loved-by-thousands-the-adhd-app-created-by-uea-graduates',
              },
            ],
            sameAs: [
              'https://johnnybuildstech.com',
              'https://johnnybuildstech.com/apps',
              'https://www.sproutapp.tech/our-story',
            ],
          }),
        }}
      />
    </>
  );
}
