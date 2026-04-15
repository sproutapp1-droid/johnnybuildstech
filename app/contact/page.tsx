import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — johnnybuildstech',
  description:
    'Tell me about your project — I reply from a real inbox within a day or two. Bespoke, hand-coded websites and apps.',
  alternates: { canonical: 'https://johnnybuildstech.com/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact — johnnybuildstech',
    description:
      'Tell me about your project — I reply from a real inbox within a day or two.',
  },
};

export default function ContactPage() {
  return (
    <>
      <section
        aria-label="Contact"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44"
      >
        {/* masthead strip */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.26em] text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
            the intake form
          </span>
          <span className="hidden md:inline">folio no.03</span>
          <span className="inline-flex items-center gap-2">
            drop a note
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
        </div>

        {/* letterhead */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_auto] md:items-end md:gap-20">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              ─ let&rsquo;s make something
            </p>
            <h1
              className="mt-5 font-serif font-medium leading-[0.92] tracking-[-0.035em] text-ink"
              style={{ fontSize: 'clamp(48px, 8.4vw, 132px)' }}
            >
              small &amp;{' '}
              <span className="italic text-ink-muted">handmade</span>
              <span
                className="ml-2 inline-block font-hand font-normal align-[0.15em]"
                style={{
                  color: 'var(--color-accent)',
                  fontSize: '0.42em',
                  transform: 'rotate(-4deg) translateY(-0.35em)',
                }}
              >
                together.
              </span>
            </h1>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-[1.65] text-ink-muted md:text-[19px]">
              Tell me who you are, what you&rsquo;re building, and the shape of
              what you have in mind. I read every enquiry myself and reply{' '}
              <span className="text-ink">from a real inbox</span> — usually
              within a day or two.
            </p>
          </div>

          {/* rules card */}
          <aside
            className="relative w-full max-w-[320px] shrink-0 overflow-hidden md:w-[320px]"
            style={{
              background: 'var(--color-bg)',
              borderRadius: 14,
              boxShadow:
                '0 1px 0 rgba(122, 91, 63, 0.08), 0 24px 48px -30px rgba(44, 29, 18, 0.35), inset 0 0 0 1px rgba(196, 138, 58, 0.5)',
              transform: 'rotate(0.6deg)',
              transformOrigin: 'top right',
            }}
          >
            <div
              className="border-b px-6 pt-5 pb-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{
                color: 'var(--color-gold-dim)',
                borderColor: 'rgba(196, 138, 58, 0.45)',
              }}
            >
              ─ the rules of engagement
            </div>
            <ul className="space-y-4 px-6 py-6 font-serif text-[15px] leading-[1.5] text-ink md:text-[16px]">
              <RuleRow index="01" text="I read every enquiry personally." />
              <RuleRow index="02" text="Reply within a day or two, from a real inbox." />
              <RuleRow index="03" text="Small projects, kind briefs, iterative work." />
              <RuleRow index="04" text="Hosted on Vercel — £0/mo to you, forever." />
            </ul>
            <div
              className="border-t px-6 py-3 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{
                color: 'var(--color-gold-dim)',
                borderColor: 'rgba(196, 138, 58, 0.4)',
              }}
            >
              card 01 · keep somewhere safe
            </div>
          </aside>
        </div>

        {/* the form */}
        <div className="mt-20 md:mt-28">
          <ContactForm />
        </div>

        {/* mailto fallback */}
        <div
          className="mt-16 flex flex-wrap items-baseline justify-between gap-6 border-t pt-10 font-mono text-[11px] uppercase tracking-[0.24em]"
          style={{
            borderColor: 'rgba(196, 138, 58, 0.38)',
            color: 'var(--color-gold-dim)',
          }}
        >
          <span>prefer email? understood.</span>
          <a
            href="mailto:jonathanlai928@gmail.com?subject=project%20inquiry&body=hi%20jonathan%2C%20"
            className="group inline-flex items-center gap-2 rounded-full border px-5 py-3 transition-colors hover:text-[color:var(--color-bg)]"
            style={{
              borderColor: 'var(--color-ink)',
              color: 'var(--color-ink)',
            }}
          >
            write me directly
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </div>
      </section>

      {/* JSON-LD ContactPoint */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'johnnybuildstech',
            url: 'https://johnnybuildstech.com',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'jonathanlai928@gmail.com',
                areaServed: ['GB', 'US', 'Worldwide'],
                availableLanguage: ['English'],
              },
            ],
          }),
        }}
      />
    </>
  );
}

function RuleRow({ index, text }: { index: string; text: string }) {
  return (
    <li className="flex gap-4">
      <span
        className="shrink-0 pt-1 font-mono text-[10.5px] uppercase tracking-[0.28em]"
        style={{ color: 'var(--color-gold-dim)' }}
      >
        {index}
      </span>
      <span>{text}</span>
    </li>
  );
}
