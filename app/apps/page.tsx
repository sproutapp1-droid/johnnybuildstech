import type { Metadata } from 'next';
import Link from 'next/link';
import { APPS } from '@/lib/apps';
import { AppsHero } from '@/components/apps/AppsHero';
import { AppCard } from '@/components/apps/AppCard';

export const metadata: Metadata = {
  title: 'Apps — five shipped iOS & Android apps by johnnybuildstech',
  description:
    "A small stable of hand-built mobile apps for ADHD brains, debt-crushers, smart shoppers, household teams and anyone who wants to track how long it's been. Each one solves a problem I had myself.",
  alternates: { canonical: 'https://johnnybuildstech.com/apps' },
  openGraph: {
    title: 'The apps — johnnybuildstech',
    description:
      'Five mobile apps, shipped solo on iOS and Android. Each one scratches a real itch.',
    type: 'website',
  },
};

export default function AppsPage() {
  return (
    <>
      <AppsHero />

      <section
        aria-label="Apps"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 md:px-10 md:pb-48"
      >
        <ul className="flex flex-col">
          {APPS.map((app, i) => (
            <AppCard key={app.slug} app={app} index={i} total={APPS.length} />
          ))}
        </ul>
      </section>

      <section
        aria-label="Got an app idea?"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 md:px-10 md:pb-48"
      >
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-24"
          style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
        >
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-20">
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: 'var(--color-gold)' }}
              >
                ─ the sixth one
              </p>
              <h2 className="mt-4 font-serif text-[36px] font-medium leading-[0.98] tracking-[-0.02em] md:text-[64px]">
                got an idea for{' '}
                <span
                  className="font-hand font-normal"
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.72em',
                    display: 'inline-block',
                    transform: 'rotate(-4deg)',
                  }}
                >
                  number six
                </span>
                ?
              </h2>
              <p
                className="mt-6 max-w-[54ch] text-[17px] leading-[1.6]"
                style={{ color: 'rgba(245, 236, 217, 0.8)' }}
              >
                I take on a small number of mobile projects a year with
                founders I click with — people who have a real problem, a real
                audience, and the appetite to ship. If that sounds like you,
                send me a note.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-6 rounded-full px-7 py-5 font-mono text-[12px] uppercase tracking-[0.2em]"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  boxShadow:
                    '0 1px 0 rgba(149, 53, 25, 0.35), 0 14px 26px -10px rgba(184, 66, 31, 0.55)',
                }}
              >
                tell me about it
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <p
                className="font-serif italic"
                style={{ color: 'rgba(245, 236, 217, 0.65)' }}
              >
                or read the{' '}
                <Link href="/services" className="underline underline-offset-4">
                  services page
                </Link>{' '}
                first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Shipped mobile apps by johnnybuildstech',
            itemListElement: APPS.map((app, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'MobileApplication',
                name: app.name,
                applicationCategory: 'Lifestyle',
                operatingSystem: 'iOS, Android',
                url: app.web,
                description: app.solution,
                ...(app.appStore ? { downloadUrl: app.appStore } : {}),
              },
            })),
          }),
        }}
      />
    </>
  );
}
