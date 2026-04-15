import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apps — five shipped iOS & Android apps by johnnybuildstech',
  description:
    'A small stable of hand-built mobile apps for ADHD brains, debt-crushers, smart shoppers, household teams and anyone who wants to track how long it\'s been. Each one solves a problem I had myself.',
  alternates: { canonical: 'https://johnnybuildstech.com/apps' },
  openGraph: {
    title: 'The apps — johnnybuildstech',
    description:
      'Five mobile apps, shipped solo on iOS and Android. Each one scratches a real itch.',
    type: 'website',
  },
};

type AppEntry = {
  slug: string;
  name: string;
  subtitle: string;
  problem: string;
  solution: string;
  features: string[];
  audience: string;
  web?: string;
  appStore?: string;
  playStore?: string;
  shots: string[];
  accent: string;
};

const APPS: AppEntry[] = [
  {
    slug: 'sprout',
    name: 'Sprout',
    subtitle: 'Smart ADHD task app · AI focus planner',
    problem:
      'Traditional to-do apps punish ADHD brains — harsh deadlines, streak shame, endless lists that all look equally urgent. Most productivity tools are built for neurotypicals on a good day.',
    solution:
      'A calm task system with an AI that turns a brain-dump into organised tasks, a virtual pet that grows as you do, penalty-free streaks with Free Days, and a Pomodoro timer that actually fits how ADHD focus works.',
    features: [
      'AI brain-dump → organised tasks, typed or spoken',
      'Virtual pet companion that evolves as you ship your days',
      'Penalty-free streaks, auto-rollover tasks, calming palettes',
      'Built-in Pomodoro, 4-7-8 breathing, "what\'s next" decider',
    ],
    audience: 'ADHD brains · neurodivergent minds · anyone tired of guilt-trip productivity',
    web: 'https://sproutapp.tech',
    appStore: 'https://apps.apple.com/us/app/sprout-smart-adhd-task-app/id6754895173',
    playStore: 'https://play.google.com/store/apps/details?id=com.sproutapp.sprout',
    shots: ['/apps/sprout/01.png', '/apps/sprout/02.png', '/apps/sprout/03.png'],
    accent: '#2f7a3a',
  },
  {
    slug: 'payoff',
    name: 'Payoff',
    subtitle: 'Smart debt planner · AI coach, snowball & tracker',
    problem:
      'Debt is a solved maths problem with a completely unsolved emotional one. Most finance apps want your bank login, bury you in charts, and treat a £12k credit card balance like a spreadsheet instead of a weight on your chest.',
    solution:
      'A personal debt coach in your pocket. Pick a strategy (Snowball, Avalanche, Dave Ramsey\'s Baby Steps and four more), watch a debt-free countdown, and hit Focus Mode when the balances get too loud to look at.',
    features: [
      'AI debt coach tailored to your balances — no bank access required',
      '7 payoff strategies including Snowball, Avalanche, Dave Ramsey',
      'Focus Mode hides balances when you need to just keep going',
      'Partner Mode for couples sharing debts and a shared AI coach',
    ],
    audience: 'Credit card, student loan, car loan & BNPL payers · couples tackling debt together',
    web: 'https://www.payoffdebtplanner.com',
    appStore: 'https://apps.apple.com/us/app/payoff-smart-debt-planner/id6761310986',
    shots: ['/apps/payoff/01.png', '/apps/payoff/02.png', '/apps/payoff/03.png'],
    accent: '#143226',
  },
  {
    slug: 'skip-or-buy',
    name: 'Skip or Buy',
    subtitle: 'Cost per use · smart shopping value tracker',
    problem:
      'You don\'t know if that £180 jacket is a bargain or a regret until you\'ve already bought it. "Cost per use" is the honest answer — but nobody does that maths in the shop.',
    solution:
      'Enter price, how often you\'ll use it, for how long. Get a colour-coded verdict in seconds — Buy, Think Twice, or Skip. Works offline, no account, no data collected.',
    features: [
      'Buy · Think Twice · Skip verdict with 0–100 value score',
      '"Worth It By" date — when the item actually pays for itself',
      '"Hours worked to afford" — price translated into your time',
      'Side-by-side compare, usage logging, fully offline',
    ],
    audience: 'Conscious spenders · minimalists · anyone mid-doomscroll on a checkout page',
    web: 'https://skiporbuyapp.com',
    appStore: 'https://apps.apple.com/us/app/skip-or-buy-cost-per-use/id6759465475',
    playStore: 'https://play.google.com/store/apps/details?id=com.skiporbuy.app',
    shots: ['/apps/skip-or-buy/01.png', '/apps/skip-or-buy/02.png', '/apps/skip-or-buy/03.png'],
    accent: '#0a0a0a',
  },
  {
    slug: 'tidywell',
    name: 'Tidywell',
    subtitle: 'Daily chore tracker · household planner & schedule',
    problem:
      'Chore charts are either kids\' sticker books or spreadsheets for grown-ups who love spreadsheets. Nobody has built one that works when your home has three humans, two energy levels and zero patience for "you missed 3 days" shame.',
    solution:
      'A 2.5D dollhouse view of your home that glows when it\'s clean. Focus Mode surfaces one task at a time, the AI breaks chores into micro-steps, and Fair Share insights quietly end the "who does more" argument.',
    features: [
      '2.5D dollhouse view — rooms glow sage when clean, amber when due',
      'Focus Mode, energy check-in, spin-the-wheel, body-doubling sprints',
      'Kids mode with before/after photo approvals and 1.5× coin rewards',
      'Smart Schedule auto-plans the week around your time + calendar',
    ],
    audience: 'Families · flatmates · roommates · parents · ADHD households',
    web: 'https://www.tidywell-app.com',
    shots: ['/apps/tidywell/01.png', '/apps/tidywell/02.png', '/apps/tidywell/03.png'],
    accent: '#2e3a27',
  },
  {
    slug: 'lapsed',
    name: 'Lapsed',
    subtitle: 'Days since tracker · count days since you last did',
    problem:
      'You know you called mum recently. But was it Tuesday or three Tuesdays ago? Watered the plants. Went for a run. Called the dentist. The gap between "not long ago" and "oh no" is always the bit you forget to track.',
    solution:
      'A beautiful, deliberately small app that plots everything you care about as coloured dots drifting across a canvas. As days pass, dots drift further from "today" and cross a gentle threshold line when they\'re overdue. Flip into quitting mode to count days clean of something instead. No guilt, no ads.',
    features: [
      'Visual canvas — coloured dots, balloons, spaceships & jellyfish (Pro)',
      'Smart + recurring reminders with a calm threshold line',
      '90-day heatmap, 12-week charts, goal linking across habits',
      'Quitting mode, one-time tasks, satisfying completion animations',
    ],
    audience: 'Habit nerds · people breaking bad habits · carers · plant people · anyone with a "when did I last…" brain',
    web: 'https://www.lapsed-app.com',
    appStore: 'https://apps.apple.com/us/app/lapsed-days-since-tracker/id6760619087',
    playStore: 'https://play.google.com/store/apps/details?id=com.lapsedapp.lapsed',
    shots: ['/apps/lapsed/01.png', '/apps/lapsed/02.png', '/apps/lapsed/03.png'],
    accent: '#ff6b4a',
  },
];

function StoreBadges({ app }: { app: AppEntry }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {app.appStore && (
        <a
          href={app.appStore}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          style={{ borderColor: 'rgba(44, 29, 18, 0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          App Store
          <span aria-hidden>↗</span>
        </a>
      )}
      {app.playStore && (
        <a
          href={app.playStore}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          style={{ borderColor: 'rgba(44, 29, 18, 0.2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3.6 2.3C3.2 2.6 3 3 3 3.7v16.6c0 .7.2 1.1.6 1.4l9.2-9.7L3.6 2.3zm10.8 10.4l2.7 2.8-10.2 5.9 7.5-8.7zm4.6-2.3l-2.6 1.5-3-3.2 3-3.1 2.6 1.5c1 .6 1 1.7 0 2.3zM5.2 2l10 5.8-2.7 2.8L5.2 2z" />
          </svg>
          Google Play
          <span aria-hidden>↗</span>
        </a>
      )}
      {app.web && (
        <a
          href={app.web}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-bg)',
          }}
        >
          visit site
          <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}

export default function AppsPage() {
  return (
    <>
      {/* ───── HERO ─────────────────────────────────────────── */}
      <section
        aria-label="Apps intro"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48"
      >
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
            the stable
          </span>
          <span className="inline-flex items-center gap-2">
            five shipped apps · ios + android
            <span
              className="inline-block h-px w-8"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
        </div>

        <h1
          className="mt-14 max-w-[20ch] font-serif font-medium leading-[0.94] tracking-[-0.03em] text-ink md:mt-20"
          style={{ fontSize: 'clamp(44px, 9vw, 128px)' }}
        >
          small apps.{' '}
          <span
            className="font-hand font-normal"
            style={{
              color: 'var(--color-accent)',
              fontSize: '0.78em',
              display: 'inline-block',
              transform: 'rotate(-4deg) translateY(-0.04em)',
            }}
          >
            real
          </span>{' '}
          problems.
        </h1>

        <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.65] text-ink-muted md:mt-14 md:text-[20px]">
          Every app here started as a problem I actually had — a brain that
          wouldn't stick to a to-do list, a debt that wouldn't shrink, a
          jacket I didn't need. I couldn't find an app that solved it kindly,
          so I built one. Five of them, now.{' '}
          <span className="text-ink">
            Each one is small, focused, and built to be used on the days you
            don't feel like using an app.
          </span>
        </p>

        <div
          className="mt-16 grid grid-cols-2 gap-y-6 border-t pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:mt-24 md:grid-cols-4 md:gap-0"
          style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
        >
          {[
            '5 apps shipped',
            'ios + android',
            'designed + built solo',
            'problem-first, always',
          ].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--color-gold)' }}
              />
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ───── APPS LIST ────────────────────────────────────── */}
      <section
        aria-label="Apps"
        className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 md:px-10 md:pb-48"
      >
        <ul className="flex flex-col">
          {APPS.map((app, i) => (
            <li
              key={app.slug}
              id={app.slug}
              className="group relative border-t py-14 first:border-t-0 md:py-24"
              style={{ borderColor: 'rgba(196, 138, 58, 0.35)' }}
            >
              <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-24">
                {/* LEFT: copy */}
                <div>
                  <div
                    className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
                  >
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {String(i + 1).padStart(2, '0')} / {String(APPS.length).padStart(2, '0')}
                    </span>
                    <span
                      className="inline-block h-px w-10"
                      style={{ background: 'var(--color-gold)' }}
                    />
                    <span>{app.subtitle}</span>
                  </div>

                  <h2 className="mt-4 font-serif text-[42px] font-medium leading-[1.0] tracking-[-0.02em] md:text-[72px]">
                    {app.name}
                  </h2>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.24em]"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        The problem
                      </p>
                      <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.6] text-ink md:text-[17px]">
                        {app.problem}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.24em]"
                        style={{ color: 'var(--color-gold-dim)' }}
                      >
                        The app
                      </p>
                      <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.6] text-ink-muted md:text-[17px]">
                        {app.solution}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-2.5">
                    {app.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-[14px] leading-[1.55] text-ink md:text-[15px]"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] inline-block h-1 w-3 flex-none"
                          style={{ background: 'var(--color-accent)' }}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
                  >
                    <span style={{ color: 'var(--color-gold-dim)' }}>
                      For —{' '}
                    </span>
                    {app.audience}
                  </p>

                  <div className="mt-8">
                    <StoreBadges app={app} />
                  </div>
                </div>

                {/* RIGHT: phone screenshots */}
                <div className="relative">
                  <div
                    className="relative flex items-end justify-center gap-3 rounded-3xl p-6 md:p-8"
                    style={{
                      background: 'var(--color-bg-deep)',
                      boxShadow:
                        '0 1px 0 rgba(122, 91, 63, 0.08), 0 30px 60px -36px rgba(44, 29, 18, 0.35)',
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

                    {app.shots.map((src, idx) => (
                      <div
                        key={src}
                        className="relative w-1/3"
                        style={{
                          transform:
                            idx === 1
                              ? 'translateY(-12px)'
                              : idx === 0
                                ? 'rotate(-2deg)'
                                : 'rotate(2deg)',
                        }}
                      >
                        <div
                          className="overflow-hidden rounded-[26px] border"
                          style={{
                            borderColor: 'rgba(44, 29, 18, 0.12)',
                            background: 'var(--color-bg)',
                            aspectRatio: '9 / 19.5',
                          }}
                        >
                          <Image
                            src={src}
                            alt={`${app.name} screenshot ${idx + 1}`}
                            width={400}
                            height={866}
                            sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 33vw"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: 'var(--color-gold-dim)' }}
                  >
                    {app.name.toLowerCase()} · in the wild
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── CTA ──────────────────────────────────────────── */}
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
                founders I click with — people who have a real problem, a
                real audience, and the appetite to ship. If that sounds like
                you, send me a note.
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

      {/* ───── JSON-LD ──────────────────────────────────────── */}
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
