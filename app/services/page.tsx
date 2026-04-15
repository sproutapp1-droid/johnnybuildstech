import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — bespoke website, web app & mobile app developer',
  description:
    'Hand-coded, bespoke websites, custom web apps and React Native mobile apps. Beautiful landing pages, service-business sites, mini-SaaS builds and iOS + Android apps. Next.js + Vercel · Expo · £0/mo hosting, no templates.',
  alternates: { canonical: 'https://johnnybuildstech.com/services' },
  keywords: [
    'bespoke website developer',
    'custom website designer',
    'beautiful website developer',
    'hand-coded website',
    'bespoke landing page designer',
    'Next.js developer',
    'Vercel website developer',
    'mini SaaS developer',
    'freelance web developer UK',
    'custom web app developer',
    'restaurant website designer',
    'service business website',
    'bespoke app developer',
    'React Native app developer',
    'Expo app developer UK',
    'iOS and Android app developer',
    'mobile app developer UK',
  ],
  openGraph: {
    title: 'Services · bespoke website & web app developer',
    description:
      'Three ways to work together: a beautiful landing page, a full service-business site, or a custom web app. Hand-coded on Next.js + Vercel.',
    url: 'https://johnnybuildstech.com/services',
    type: 'website',
  },
};

type Package = {
  n: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  lead: string;
  includes: string[];
  perfectFor: string;
  timeframe: string;
  cta: string;
  accent?: boolean;
};

const PACKAGES: Package[] = [
  {
    n: '01',
    name: 'The Landing',
    tagline: 'One page. Zero compromises.',
    price: 'from £1,000',
    priceNote: 'indicative · final quote after we chat',
    lead:
      'A single page that does the heavy lifting. Perfect for launches, lead magnets, a restaurant that needs bookings to click through, a consultant with one clear offer.',
    includes: [
      'One hand-designed landing page',
      'Fraunces-quality typography, paper-grade finish',
      'Mobile-first, reduced-motion aware',
      'Contact form + email delivery (Resend)',
      'SEO metadata, OG image, JSON-LD',
      'Vercel deploy on your domain',
    ],
    perfectFor:
      'Service businesses · restaurants · single-offer launches · waitlists',
    timeframe: '~1–2 weeks',
    cta: 'Start a landing',
  },
  {
    n: '02',
    name: 'The Full Site',
    tagline: 'A proper home on the internet.',
    price: 'from £2,000',
    priceNote: 'indicative · final quote after we chat',
    lead:
      'A multi-page, fully bespoke site with room to grow — service pages, about, case studies, a proper blog, the lot. Built to rank, built to last, built for you.',
    includes: [
      'Up to 6 hand-designed pages',
      'MDX-powered blog for SEO compounding',
      'Interior page layouts, case studies, testimonials',
      'Contact form, newsletter capture, analytics',
      'Full on-page SEO + JSON-LD + sitemap',
      'Vercel deploy on your domain',
    ],
    perfectFor:
      'Clinicians · consultants · coaches · agencies · indie founders',
    timeframe: '~3–5 weeks',
    cta: 'Plan a full site',
    accent: true,
  },
  {
    n: '03',
    name: 'The Web App',
    tagline: 'A product that actually works.',
    price: 'from £5,000',
    priceNote: 'indicative · every build is different',
    lead:
      'You have an idea that needs a database, a login, payments. Think subscription revision tools, question banks, member portals, booking apps. Not a Squarespace plugin — a real, fast, custom product. Every build is different, so this one is a conversation, not a fixed quote.',
    includes: [
      'Custom Next.js web app, designed end-to-end',
      'Auth, user accounts, admin areas',
      'Stripe subscriptions & one-off payments',
      'Database (Postgres) for content & users',
      'Email workflows, receipts, reminders',
      'Same beautiful paper-grade front door',
    ],
    perfectFor:
      'Mini-SaaS · subscription quiz banks · member tools · booking portals · coaching platforms',
    timeframe: 'scoped together',
    cta: 'Start a conversation',
  },
  {
    n: '04',
    name: 'The Mobile App',
    tagline: 'Bring the idea. I\'ll bring the build.',
    price: 'let\'s talk',
    priceNote: 'always a conversation',
    lead:
      'You have conviction and a clear idea for a mobile app. I\'ve shipped five of my own on iOS and Android, and I want to build the next one with someone. This one\'s a conversation, not a quote.',
    includes: [
      'iOS + Android, one codebase (React Native · Expo)',
      'Designed end-to-end to the same paper-grade standard',
      'App Store + Google Play submission handled',
      'Auth, payments, push notifications where needed',
      'Built alongside you, not for you',
      'Flexible scope — we shape it together',
    ],
    perfectFor: 'Founders with a strong idea and the drive to ship it',
    timeframe: 'case-by-case',
    cta: 'Start a conversation',
  },
];

const SCOPE_YES = [
  'Beautiful one-off landing pages',
  'Full marketing sites for service businesses',
  'Restaurant, clinic, consultancy, agency sites',
  'MDX blogs that actually rank',
  'Mini-SaaS web apps (question banks, member tools, coaching platforms)',
  'Mobile apps for iOS & Android (React Native · Expo)',
  'Stripe subscriptions & one-off payments',
  'Custom booking & scheduling flows',
  'Email flows (welcome, receipts, nudges)',
];

const SCOPE_NO = [
  'E-commerce stores (Shopify does this better)',
  'Online forums or community boards',
  'Plugin-heavy WordPress sites',
  'Cheap, templated listings',
  'Monthly retainer lock-in',
];

const FAQS = [
  {
    q: 'What makes this different from Squarespace, Wix or Webflow?',
    a:
      "Those tools give you a template everyone else is using. I hand-code your site from scratch in Next.js — so every line of code, every animation, every bit of copy is built for your business, not adapted from someone else's. Faster, prettier, and yours to keep.",
  },
  {
    q: 'How much does a bespoke website cost?',
    a:
      "Landing pages start from around £1,000, multi-page marketing sites from around £2,000, and custom web apps from around £5,000. Mobile apps are always a separate conversation. These are indicative starting points, not fixed price lists — every project is a bit different, so I'll send a tailored quote after our first call. All one-off: no retainers, no surprise monthly fees.",
  },
  {
    q: 'Why is hosting free?',
    a:
      "I deploy every site on Vercel's generous free tier, which comfortably handles most small-business traffic. You pay for your domain (around £10/year) and that's it. If your site ever grows into paid Vercel territory, you'll be thrilled — it means you're doing well.",
  },
  {
    q: 'Do you build apps or only websites?',
    a:
      "Both. The Web App package covers custom web products — mini-SaaS, subscription tools, member portals, booking apps (think occhealthrevision.co.uk: a quiz bank with Stripe subscriptions). The Mobile App package is for native iOS + Android apps built in React Native / Expo — I've shipped five of my own, and I take on a small number of mobile projects where the idea and founder feel right. That one's always a conversation.",
  },
  {
    q: 'Can I edit the site myself after launch?',
    a:
      'Yes. Blog posts are written in MDX (basically Markdown) so you can add content without touching code. For bigger design changes, send me a message — updates are cheap and quick.',
  },
  {
    q: 'How long does a project take?',
    a:
      'A landing page: about 1–2 weeks. A full site: 3–5 weeks. A custom app: 6–10 weeks depending on scope. We agree the timeline before I start; you see progress every few days, not after a three-week silence.',
  },
  {
    q: 'Do you work with clients outside the UK?',
    a:
      "Yes. I'm based in the UK but work remotely with clients anywhere — the process is the same: an email, a call, then we build.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ───── HERO ─────────────────────────────────────────── */}
      <section
        aria-label="Services intro"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48"
      >
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
            the services
          </span>
          <span className="inline-flex items-center gap-2">
            three packages · one human
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
        </div>

        <h1 className="mt-14 font-serif font-medium leading-[0.94] tracking-[-0.03em] text-ink md:mt-20">
          <span
            className="block"
            style={{ fontSize: 'clamp(44px, 9vw, 128px)' }}
          >
            a bespoke website,
          </span>
          <span
            className="mt-1 block"
            style={{ fontSize: 'clamp(44px, 9vw, 128px)' }}
          >
            built{' '}
            <span
              className="font-hand font-normal"
              style={{
                color: 'var(--color-accent)',
                fontSize: '0.78em',
                display: 'inline-block',
                transform: 'rotate(-4deg) translateY(-0.04em)',
                marginLeft: '0.06em',
                marginRight: '0.12em',
              }}
            >
              by hand
            </span>{' '}
            for you.
          </span>
        </h1>

        <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.6] text-ink-muted md:mt-14 md:text-[20px]">
          I design and develop beautiful, hand-coded websites and custom web apps
          for the kind of business that doesn't want to look like everyone else.
          No templates. No plugins. No monthly platform fees.{' '}
          <span className="text-ink">Just a site that feels like yours.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-transform duration-200 hover:translate-y-[-1px]"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              boxShadow:
                '0 1px 0 rgba(149, 53, 25, 0.35), 0 14px 26px -10px rgba(184, 66, 31, 0.55)',
            }}
          >
            start a project
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <a
            href="#packages"
            className="inline-flex items-center gap-3 rounded-full border px-5 py-4 font-mono text-[12px] uppercase tracking-[0.18em]"
            style={{
              borderColor: 'var(--color-ink)',
              color: 'var(--color-ink)',
            }}
          >
            see the packages
            <span aria-hidden>↓</span>
          </a>
        </div>

        {/* trust strip */}
        <div
          className="mt-20 grid grid-cols-2 gap-y-6 border-t pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:mt-28 md:grid-cols-4 md:gap-0"
          style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
            scoped together
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
            £0/mo hosting on Vercel
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
            no retainers, ever
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-gold)' }}
            />
            you own the code
          </span>
        </div>
      </section>

      {/* ───── PACKAGES ─────────────────────────────────────── */}
      <section
        id="packages"
        aria-label="Packages"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              ─ the packages
            </p>
            <h2 className="mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[0.95] tracking-[-0.02em] md:text-[56px]">
              three ways <span className="italic text-ink-muted">to work together</span>.
            </h2>
          </div>
          <p className="hidden max-w-[32ch] pb-2 text-right font-serif italic text-ink-muted md:block">
            every project scoped, quoted and built for a real human — not a persona.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <article
              key={p.n}
              className="group relative flex flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
              style={{
                background: p.accent ? 'var(--color-ink)' : 'var(--color-bg-deep)',
                color: p.accent ? 'var(--color-bg)' : 'var(--color-ink)',
                borderColor: p.accent
                  ? 'var(--color-ink)'
                  : 'rgba(196, 138, 58, 0.4)',
                boxShadow: p.accent
                  ? '0 20px 50px -28px rgba(44, 29, 18, 0.55)'
                  : '0 1px 0 rgba(122, 91, 63, 0.08), 0 20px 40px -28px rgba(44, 29, 18, 0.28)',
              }}
            >
              {/* gold corner marks */}
              {['left-3 top-3 border-l border-t', 'right-3 top-3 border-r border-t', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`absolute h-3 w-3 ${pos}`}
                  style={{ borderColor: 'var(--color-gold)' }}
                />
              ))}

              <div className="flex items-baseline justify-between">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  style={{
                    color: p.accent ? 'var(--color-gold)' : 'var(--color-accent)',
                  }}
                >
                  package {p.n}
                </span>
                {p.accent && (
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'var(--color-bg)',
                    }}
                  >
                    most loved
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-serif text-[30px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[36px]">
                {p.name}
              </h3>
              <p
                className="mt-2 font-serif italic"
                style={{
                  color: p.accent
                    ? 'rgba(245, 236, 217, 0.7)'
                    : 'var(--color-ink-muted)',
                  fontSize: '18px',
                }}
              >
                {p.tagline}
              </p>

              <div
                className="mt-6 flex items-baseline gap-3 border-b pb-6"
                style={{
                  borderColor: p.accent
                    ? 'rgba(245, 236, 217, 0.18)'
                    : 'rgba(196, 138, 58, 0.3)',
                }}
              >
                <span className="font-serif text-[28px] font-medium tracking-[-0.01em] md:text-[34px]">
                  {p.price}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{
                    color: p.accent
                      ? 'rgba(245, 236, 217, 0.6)'
                      : 'var(--color-ink-muted)',
                  }}
                >
                  {p.priceNote}
                </span>
              </div>

              <p
                className="mt-6 text-[15px] leading-[1.6]"
                style={{
                  color: p.accent
                    ? 'rgba(245, 236, 217, 0.82)'
                    : 'var(--color-ink-muted)',
                }}
              >
                {p.lead}
              </p>

              <ul className="mt-6 space-y-3">
                {p.includes.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[14px] leading-[1.5]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1 w-3 flex-none"
                      style={{
                        background: p.accent
                          ? 'var(--color-gold)'
                          : 'var(--color-accent)',
                      }}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <dl
                className="mt-6 space-y-2 border-t pt-5 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{
                  borderColor: p.accent
                    ? 'rgba(245, 236, 217, 0.18)'
                    : 'rgba(196, 138, 58, 0.3)',
                  color: p.accent
                    ? 'rgba(245, 236, 217, 0.7)'
                    : 'var(--color-ink-muted)',
                }}
              >
                <div className="flex gap-3">
                  <dt className="w-20 flex-none">Perfect for</dt>
                  <dd className="font-mono normal-case tracking-[0.02em]">
                    {p.perfectFor}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 flex-none">Timeline</dt>
                  <dd className="font-mono normal-case tracking-[0.02em]">
                    {p.timeframe}
                  </dd>
                </div>
              </dl>

              <Link
                href="/contact"
                className="group/cta mt-8 inline-flex items-center justify-between rounded-full px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
                style={{
                  background: p.accent ? 'var(--color-accent)' : 'var(--color-ink)',
                  color: 'var(--color-bg)',
                }}
              >
                {p.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center font-serif italic text-ink-muted">
          Not sure which one? Send me an email — I'll tell you honestly if I'm
          the right fit.
        </p>
      </section>

      {/* ───── SCOPE: YES / NO ──────────────────────────────── */}
      <section
        aria-label="What I build and what I don't"
        className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="max-w-[50ch]">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ the honest bit
          </p>
          <h2 className="mt-4 font-serif text-[32px] font-medium leading-[0.98] tracking-[-0.02em] md:text-[52px]">
            what I build.{' '}
            <span className="italic text-ink-muted">and what I won't.</span>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.6] text-ink-muted">
            I'd rather tell you I'm the wrong person upfront than take your
            money and ship you something mediocre. Here's the scope.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
          {/* YES */}
          <div
            className="relative rounded-2xl p-8 md:p-10"
            style={{ background: 'var(--color-bg-deep)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                }}
              >
                ✓
              </span>
              <h3 className="font-serif text-[24px] font-medium tracking-[-0.01em] md:text-[28px]">
                Yes — this is my thing
              </h3>
            </div>
            <ul className="mt-6 space-y-3">
              {SCOPE_YES.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[15px] leading-[1.55] text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-3 flex-none"
                    style={{ background: 'var(--color-accent)' }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NO */}
          <div
            className="relative rounded-2xl border p-8 md:p-10"
            style={{
              background: 'transparent',
              borderColor: 'rgba(196, 138, 58, 0.35)',
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border font-serif text-lg text-ink-muted"
                style={{ borderColor: 'var(--color-ink-muted)' }}
              >
                ✕
              </span>
              <h3 className="font-serif text-[24px] font-medium tracking-[-0.01em] text-ink-muted md:text-[28px]">
                Not my thing (and I'll say so)
              </h3>
            </div>
            <ul className="mt-6 space-y-3">
              {SCOPE_NO.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[15px] leading-[1.55] text-ink-muted line-through decoration-[1px] decoration-ink-muted/40"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-3 flex-none no-underline"
                    style={{ background: 'var(--color-ink-muted)' }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── WHY VERCEL STRIP ─────────────────────────────── */}
      <section
        aria-label="Why Vercel"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32"
      >
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16 md:py-20"
          style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
        >
          <div className="relative z-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-20">
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: 'var(--color-gold)' }}
              >
                ─ £0/mo hosting, forever
              </p>
              <h2 className="mt-4 font-serif text-[34px] font-medium leading-[0.98] tracking-[-0.02em] md:text-[56px]">
                your site, hosted for{' '}
                <span
                  className="font-hand font-normal"
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.72em',
                    display: 'inline-block',
                    transform: 'rotate(-4deg)',
                  }}
                >
                  nothing
                </span>
                .
              </h2>
              <p
                className="mt-6 max-w-[54ch] text-[17px] leading-[1.6]"
                style={{ color: 'rgba(245, 236, 217, 0.78)' }}
              >
                Every site I build deploys on Vercel's free tier — the same
                infrastructure that runs TikTok and The Washington Post.
                Lightning-fast, globally cached, SSL included. No monthly
                platform fees, no surprise bills. You just pay for your domain.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-6">
              {[
                { k: '£0', v: 'monthly hosting' },
                { k: '<1s', v: 'typical load time' },
                { k: '100%', v: 'yours to keep' },
              ].map((s) => (
                <div
                  key={s.k}
                  className="border-t pt-4"
                  style={{ borderColor: 'rgba(245, 236, 217, 0.25)' }}
                >
                  <dt className="font-serif text-[38px] font-medium leading-none tracking-[-0.02em] md:text-[52px]">
                    {s.k}
                  </dt>
                  <dd
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(245, 236, 217, 0.6)' }}
                  >
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───── FAQ ──────────────────────────────────────────── */}
      <section
        aria-label="Frequently asked questions"
        className="relative z-10 mx-auto max-w-[1100px] px-6 pb-24 md:px-10 md:pb-32"
      >
        <div className="max-w-[50ch]">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ questions, answered
          </p>
          <h2 className="mt-4 font-serif text-[32px] font-medium leading-[0.98] tracking-[-0.02em] md:text-[52px]">
            the things{' '}
            <span className="italic text-ink-muted">everyone asks</span>.
          </h2>
        </div>

        <div
          className="mt-14 divide-y"
          style={{ borderColor: 'rgba(196, 138, 58, 0.3)' }}
        >
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              className="group py-6"
              style={{
                borderTop:
                  i === 0 ? '1px solid rgba(196, 138, 58, 0.3)' : undefined,
                borderBottom: '1px solid rgba(196, 138, 58, 0.3)',
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <h3 className="font-serif text-[20px] font-medium tracking-[-0.01em] text-ink md:text-[26px]">
                  {f.q}
                </h3>
                <span
                  aria-hidden
                  className="flex-none font-mono text-[22px] text-ink-muted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-5 max-w-[72ch] text-[16px] leading-[1.65] text-ink-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ────────────────────────────────────── */}
      <section
        aria-label="Start a project"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 md:px-10 md:pb-48"
      >
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2
            className="max-w-[22ch] font-serif font-medium leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
          >
            so — what are we{' '}
            <span className="italic text-ink-muted">building</span>?
          </h2>
          <div className="flex flex-col gap-4">
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
              tell me about your project
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <p className="text-center font-serif italic text-ink-muted md:text-right">
              or{' '}
              <a
                href="mailto:bitebuddy2@gmail.com"
                className="underline decoration-[1px] underline-offset-4 hover:text-ink"
              >
                email me directly
              </a>{' '}
              — I reply to every one.
            </p>
          </div>
        </div>
      </section>

      {/* ───── JSON-LD ──────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: 'Bespoke website & custom web app development',
                serviceType: 'Web & mobile app design and development',
                provider: {
                  '@type': 'Person',
                  name: 'Johnny',
                  url: 'https://johnnybuildstech.com',
                },
                areaServed: { '@type': 'Country', name: 'United Kingdom' },
                description:
                  'Hand-coded, bespoke websites, custom web apps and React Native mobile apps. Landing pages, full marketing sites, mini-SaaS builds, and iOS + Android apps built with Expo.',
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'The Landing — bespoke landing page',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '1000',
                      priceCurrency: 'GBP',
                      description: 'Indicative starting point — quoted per project',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'The Full Site — multi-page bespoke website',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '2000',
                      priceCurrency: 'GBP',
                      description: 'Indicative starting point — quoted per project',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'The Web App — custom mini-SaaS',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '5000',
                      priceCurrency: 'GBP',
                      description: 'Indicative starting point — scoped per project',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'The Mobile App — iOS + Android (React Native · Expo)',
                    description:
                      'Scoped per idea in conversation — no fixed price published',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://johnnybuildstech.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Services',
                    item: 'https://johnnybuildstech.com/services',
                  },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
