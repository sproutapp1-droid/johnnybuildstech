import Link from 'next/link';
import { WaitlistForm } from '@/components/pebble/WaitlistForm';
import { Receipt } from '@/components/pebble/Receipt';
import { Polaroid } from '@/components/pebble/Polaroid';
import { Pebble } from '@/components/pebble/Pebble';
import { PhoneMockup } from '@/components/pebble/PhoneMockup';
import { HeroPhones } from '@/components/pebble/HeroPhones';
import {
  MarginRule,
  SectionRule,
  HandUnderline,
  Tick,
} from '@/components/pebble/InkMarks';
import { HeroReveal, ScrollIn, FAQItem } from './page.client';

const CONDITIONS = [
  'POTS',
  'EDS',
  'MCAS',
  'endometriosis',
  'PMDD',
  'long COVID',
  'migraine',
  'ME/CFS',
  'fibromyalgia',
  'chronic pain',
  'IBS',
  'IBD',
  'ADHD',
  'AuDHD',
  'absolutely any symptom you want to track',
];

const WHAT_IT_DOES = [
  {
    title: 'a 30-second log',
    body:
      'three sliders. tap any symptoms. done. the whole thing fits on bad days when you can barely look at your phone.',
  },
  {
    title: 'a brief that reads like a human wrote it',
    body:
      'before your appointment, pebble prints a one-page narrative your doctor can read in 60 seconds. not a chart dump. a paragraph.',
  },
  {
    title: 'patterns when you want them',
    body:
      'pebble watches quietly. when sleep, stress, weather, food or your cycle line up with a flare, you see a margin note. three sentences. no heatmaps.',
  },
  {
    title: 'truly local',
    body:
      'no account. no cloud. no analytics, ever. your symptom data lives on this phone and only this phone. uninstall and it is gone.',
  },
];

const HOW = [
  {
    n: '01',
    title: 'open pebble',
    body:
      'no signup. no profile. you land on today, a single page that knows what you care about.',
  },
  {
    n: '02',
    title: 'log how you feel',
    body:
      'drag three sliders. tap a symptom if you want. add a voice note if typing is too much. tap done.',
  },
  {
    n: '03',
    title: 'tap brief before your appointment',
    body:
      'a one-page narrative prints, with what is changed since last visit. share it as a pdf, text, or read it on screen.',
  },
];

const NOT_LIST = [
  'no streaks. no badges. no "you missed yesterday".',
  'no AI wellness coach. no journal prompts.',
  'no account. no email. no password. no cloud.',
  'no analytics. no crash reports. no third-party trackers.',
  'no leaves, no zen rocks, no "find your calm".',
  'no chart dumps for your doctor. one page, in english.',
];

const AFFIRMATIONS = [
  {
    quote: 'on bad days, i can barely look at my phone.',
    response:
      "so pebble's default log takes 30 seconds. three sliders and done.",
  },
  {
    quote: 'i want to walk into my appointment with something they’ll actually read.',
    response:
      'so the brief is a paragraph, not a spreadsheet. 60 seconds to read, on one page.',
  },
  {
    quote: 'i’m tired of apps that make me feel behind.',
    response:
      'so pebble has no streaks. you can skip a week. vacation mode is one tap.',
  },
];

const FAQS = [
  {
    q: 'who is pebble for?',
    a: 'adults with chronic illness (POTS, EDS, MCAS, endometriosis, PMDD, long COVID, migraine, fibromyalgia, ME/CFS, IBS, IBD), often comorbid with ADHD or AuDHD. carers tracking on behalf of someone. anyone who has bounced off bearable or daylio because they felt like homework.',
  },
  {
    q: 'how is this different from bearable, daylio, or human health?',
    a: 'those are spreadsheets in disguise: 2,000-symptom pickers, mood rainbows, dashboards. pebble does almost nothing. three sliders, a symptom row, a one-page brief for your doctor. that is the whole product. if you want to chart 40 datapoints daily, those apps are for you.',
  },
  {
    q: 'is my data really only on my phone?',
    a: 'yes. there is no pebble server. logs, voice notes, photos and the brief live in a local database on your phone. nothing syncs to a cloud because there is no cloud. the only data that leaves your phone is (a) approximate location, if you turn on the weather factor, to fetch barometric pressure from open-meteo, and (b) your purchase receipt, to revenuecat, so we know your subscription is active. that is the entire list.',
  },
  {
    q: 'will there be android and iphone?',
    a: 'yes. both at launch.',
  },
  {
    q: 'how much will it cost?',
    a: 'lifetime unlock at launch, around £24.99 / $29.99, paid once. there will also be a monthly and yearly option for people who prefer that. the doctor brief itself is free for everyone, forever. the paid tier unlocks unlimited factors, voice notes, and the full data export.',
  },
  {
    q: 'when does it launch?',
    a: 'app store + play store submission is in early 2026. waitlist members get the launch discount and a quiet email when it goes live. nothing in between.',
  },
  {
    q: 'i don’t want to subscribe to your emails forever. is the waitlist email-spam-y?',
    a: 'one email at launch. that is all. no newsletter, no drip sequence, no "we noticed you didn\'t click last time". one email. then your address is deleted from the list a month after launch unless you tell us otherwise.',
  },
];

export default function PebbleLanding() {
  return (
    <>
      {/* hand-drawn left margin runs the whole page */}
      <MarginRule
        aria-hidden
        className="pointer-events-none fixed left-[28px] top-0 hidden h-screen w-1 md:block"
        style={{ color: 'var(--pebble-rule)' }}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-20 md:px-16 md:pt-44 md:pb-28"
      >
        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-12 lg:gap-20">
          <HeroReveal>
            <p
              className="pebble-mono text-[11px] uppercase"
              style={{ letterSpacing: '0.24em', color: 'var(--pebble-ink-muted)' }}
            >
              a symptom tracker · launching 2026
            </p>

            <h1
              className="pebble-serif mt-7 text-[44px] font-medium leading-[1.04] tracking-[-0.012em] md:text-[68px] md:leading-[0.98] lg:text-[80px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              tracking your health
              <br />
              <span className="relative inline-block">
                shouldn&rsquo;t feel like
                <HandUnderline
                  aria-hidden
                  className="absolute left-0 right-0 h-3"
                  style={{
                    bottom: -10,
                    color: 'var(--pebble-terracotta)',
                    width: '100%',
                  }}
                  delay={900}
                />
              </span>
              <br />
              <span
                className="pebble-hand inline-block"
                style={{
                  color: 'var(--pebble-terracotta)',
                  fontSize: '0.92em',
                  fontWeight: 600,
                  transform: 'rotate(-2deg)',
                  lineHeight: 1,
                  marginTop: '0.2em',
                }}
              >
                a second job.
              </span>
            </h1>

            <p
              className="pebble-serif mt-10 max-w-[52ch] text-[18px] leading-[1.55] md:text-[20px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              pebble is a beautifully simplistic symptom tracker for chronic
              illness, and the brains they live in. log in 30 seconds. before
              your appointment, walk in with a one-page brief your doctor
              actually reads.
            </p>

            <div id="waitlist" className="mt-12 max-w-[460px] scroll-mt-32">
              <WaitlistForm surface="hero" />
            </div>

            {/* margin note */}
            <p
              className="pebble-serif mt-12 max-w-[36ch] text-[15px] italic"
              style={{ color: 'var(--pebble-ink-muted)' }}
            >
              no account. no cloud. no analytics, ever. your symptom data lives on your phone and only your phone.
            </p>
          </HeroReveal>

          {/* right column — double phone showcase, hidden on mobile to avoid
              shrinking the hero copy */}
          <div className="hidden md:block">
            <HeroPhones />
          </div>
        </div>
      </section>

      {/* ─── CONDITIONS STRIP (social proof, horizontal marquee) ─ */}
      <ScrollIn className="relative border-y" style={{ borderColor: 'var(--pebble-rule)' }}>
        <div className="mx-auto max-w-[1200px] px-6 pt-10 md:px-16 md:pt-14">
          <p
            className="pebble-mono text-[11px] uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
          >
            built for
          </p>
        </div>
        <div
          className="relative mt-5 overflow-hidden py-6 md:mt-7 md:py-10"
          style={{
            // soft paper fade at both edges so the loop point hides
            maskImage:
              'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          }}
          aria-label="Conditions Pebble is built for"
        >
          <div className="pebble-marquee" role="list">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex items-baseline gap-x-10 pr-10"
              >
                {CONDITIONS.map((c) => (
                  <li
                    key={`${copy}-${c}`}
                    role="listitem"
                    className="pebble-serif flex shrink-0 items-baseline gap-10 text-[22px] md:text-[28px]"
                    style={{ color: 'var(--pebble-ink)' }}
                  >
                    <span style={{ whiteSpace: 'nowrap' }}>{c}</span>
                    <span
                      aria-hidden
                      style={{
                        color: 'var(--pebble-terracotta)',
                        fontSize: 18,
                        opacity: 0.6,
                      }}
                    >
                      ·
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ─── THE PROBLEM ──────────────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          the problem
        </p>
        <h2
          className="pebble-serif mt-6 max-w-[24ch] text-[36px] font-medium leading-[1.08] md:text-[64px] md:leading-[1.04]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          most symptom apps feel like spreadsheets.
        </h2>
        <SectionRule
          className="mt-8 h-2 w-32"
          style={{ color: 'var(--pebble-rule)' }}
        />
        <p
          className="pebble-hand mt-7 max-w-[34ch] text-[28px] leading-[1.2] md:text-[36px]"
          style={{
            color: 'var(--pebble-terracotta)',
            transform: 'rotate(-0.4deg)',
            transformOrigin: 'left center',
          }}
        >
          2,000-symptom checklists. mood rainbows. daily questionnaires. trackers built for the app, not for you.
        </p>
        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <p
            className="pebble-serif text-[19px] leading-[1.6]"
            style={{ color: 'var(--pebble-ink)' }}
          >
            you log for two weeks. you forget. you give up. then your appointment
            comes and you sit in the waiting room trying to remember what
            wednesday was like, three weeks ago.
          </p>
          <p
            className="pebble-serif text-[19px] leading-[1.6] italic"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            and the doctor gets six minutes. they cannot read your 47-page export.
            so what was the point of logging at all?
          </p>
        </div>
      </ScrollIn>

      {/* ─── THE RECEIPT (peak moment) ────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        {/* small "this is what you log" phone, absolutely positioned in the
            empty top-left next to the tall receipt (no gap changes) */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden md:block"
          style={{ top: '12%', left: '6%', zIndex: 5 }}
        >
          <div style={{ transform: 'rotate(-6deg)' }}>
            <PhoneMockup variant="today" size="sm" rotation={-6} bobDelay={1.2} />
          </div>
          <p
            className="pebble-hand mt-3 text-center"
            style={{
              color: 'var(--pebble-terracotta)',
              fontSize: 22,
              lineHeight: 1.1,
              transform: 'rotate(-3deg)',
            }}
          >
            this is what you log
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-24">
          <div>
            <p
              className="pebble-mono text-[11px] uppercase"
              style={{ letterSpacing: '0.22em', color: 'var(--pebble-terracotta)' }}
            >
              the brief
            </p>
            <h2
              className="pebble-serif mt-6 text-[36px] font-medium leading-[1.06] md:text-[60px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              this is what your doctor sees.
            </h2>
            <SectionRule
              className="mt-7 h-2 w-32"
              style={{ color: 'var(--pebble-rule)' }}
            />
            <p
              className="pebble-serif mt-8 text-[18px] leading-[1.6]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              not a 47-page spreadsheet. a one-page narrative your doctor reads in
              60 seconds, with what is changed since last visit, what may have
              contributed, and a quote you wanted them to hear.
            </p>
            <p
              className="pebble-serif mt-6 text-[17px] italic"
              style={{ color: 'var(--pebble-ink-muted)' }}
            >
              the brief is generated locally on your phone. it never touches a
              server. you can share it as a pdf, plain text, or just read it
              off the screen in the appointment.
            </p>

            <ul
              className="mt-10 space-y-3 pebble-serif text-[16px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              <li className="flex items-start gap-3">
                <Tick className="mt-1 flex-none" size={20} style={{ color: 'var(--pebble-terracotta)' }} />
                <span>reads in 60 seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <Tick className="mt-1 flex-none" size={20} style={{ color: 'var(--pebble-terracotta)' }} />
                <span>a narrative paragraph, not a chart</span>
              </li>
              <li className="flex items-start gap-3">
                <Tick className="mt-1 flex-none" size={20} style={{ color: 'var(--pebble-terracotta)' }} />
                <span>a "what's changed since last visit" section</span>
              </li>
              <li className="flex items-start gap-3">
                <Tick className="mt-1 flex-none" size={20} style={{ color: 'var(--pebble-terracotta)' }} />
                <span>a quote field for one thing you don't want to forget</span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <Receipt />
          </div>
        </div>
      </ScrollIn>

      {/* ─── WHAT IT DOES (2x2) ───────────────────────────────── */}
      <ScrollIn
        id="what-it-does"
        className="relative mx-auto max-w-[1200px] scroll-mt-32 px-6 py-24 md:px-16 md:py-36"
      >
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          what it does
        </p>
        <h2
          className="pebble-serif mt-6 max-w-[28ch] text-[36px] font-medium leading-[1.06] md:text-[60px]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          almost nothing. on purpose.
        </h2>
        <SectionRule className="mt-8 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

        <ul className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {WHAT_IT_DOES.map((item, i) => (
            <li key={item.title}>
              <div className="flex items-baseline gap-3">
                <span
                  className="pebble-mono text-[12px]"
                  style={{
                    letterSpacing: '0.2em',
                    color: 'var(--pebble-terracotta)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="pebble-serif text-[26px] font-medium leading-[1.15] md:text-[32px]"
                  style={{ color: 'var(--pebble-ink)' }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className="pebble-serif mt-4 max-w-[42ch] text-[17px] leading-[1.6]"
                style={{ color: 'var(--pebble-ink)' }}
              >
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </ScrollIn>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <ScrollIn
        id="how"
        className="relative mx-auto max-w-[1200px] scroll-mt-32 px-6 py-24 md:px-16 md:py-36"
      >
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          how it works
        </p>
        <h2
          className="pebble-serif mt-6 max-w-[24ch] text-[36px] font-medium leading-[1.06] md:text-[60px]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          three taps and a slider.
        </h2>
        <SectionRule className="mt-8 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-20">
          {HOW.map((step, i) => (
            <div key={step.n} className="flex flex-col items-center text-center md:items-start md:text-left">
              <Polaroid
                variant={i === 0 ? 'today' : i === 1 ? 'history' : 'brief'}
                rotation={i === 0 ? -2.5 : i === 1 ? 1.5 : -1.5}
                caption={`step ${step.n}`}
              />
              <div className="mt-8">
                <p
                  className="pebble-mono text-[12px]"
                  style={{
                    letterSpacing: '0.2em',
                    color: 'var(--pebble-terracotta)',
                  }}
                >
                  {step.n}
                </p>
                <h3
                  className="pebble-serif mt-2 text-[24px] font-medium md:text-[28px]"
                  style={{ color: 'var(--pebble-ink)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="pebble-serif mt-3 max-w-[34ch] text-[16px] leading-[1.55]"
                  style={{ color: 'var(--pebble-ink-muted)' }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollIn>

      {/* ─── PRIVACY PROMISE ──────────────────────────────────── */}
      <ScrollIn
        id="privacy-promise"
        className="relative mx-auto max-w-[1200px] scroll-mt-32 px-6 py-24 md:px-16 md:py-36"
      >
        <div
          className="relative mx-auto max-w-[820px] p-10 md:p-16"
          style={{
            background: 'var(--pebble-paper-deep)',
            border: '1.5px solid var(--pebble-rule)',
          }}
        >
          <p
            className="pebble-mono text-[11px] uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--pebble-terracotta)' }}
          >
            a note before we start
          </p>
          <p
            className="pebble-serif mt-6 text-[22px] leading-[1.55] md:text-[28px] md:leading-[1.45]"
            style={{ color: 'var(--pebble-ink)' }}
          >
            your symptom data stays on this phone. forever. if you delete the
            app, it is gone. we cannot help you recover it.{' '}
            <span
              className="pebble-hand inline"
              style={{
                color: 'var(--pebble-terracotta)',
                fontSize: '1.05em',
                fontWeight: 600,
              }}
            >
              that&rsquo;s the deal.
            </span>
          </p>
          <p
            className="pebble-serif mt-6 text-[16px] italic"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            no crash reports. no analytics. no servers. nothing about you ever
            leaves this phone.
          </p>
          <p
            className="pebble-serif mt-2 text-[16px] italic"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            (full details in the{' '}
            <Link
              href="/apps/pebble/privacy"
              className="underline underline-offset-2 hover:text-[var(--pebble-terracotta)]"
            >
              privacy policy
            </Link>
            .)
          </p>
        </div>
      </ScrollIn>

      {/* ─── WHAT PEBBLE IS NOT ───────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          what pebble is not
        </p>
        <h2
          className="pebble-serif mt-6 max-w-[24ch] text-[36px] font-medium leading-[1.06] md:text-[60px]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          a list of things we left out.
        </h2>
        <SectionRule className="mt-8 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

        <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-x-16 md:gap-y-5">
          {NOT_LIST.map((item) => (
            <li
              key={item}
              className="pebble-serif flex items-start gap-4 text-[18px] md:text-[20px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              <span
                aria-hidden
                className="pebble-hand mt-1 flex-none text-[24px] leading-none"
                style={{ color: 'var(--pebble-terracotta)' }}
              >
                ✕
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ScrollIn>

      {/* ─── VOICE OF CUSTOMER ────────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          the three conversations this app is built around
        </p>
        <SectionRule className="mt-6 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

        <div className="mt-14 grid gap-12 md:gap-16">
          {AFFIRMATIONS.map((a, i) => (
            <div
              key={i}
              className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-baseline md:gap-16"
            >
              <p
                className="pebble-hand text-[28px] leading-[1.25] md:text-[36px]"
                style={{
                  color: 'var(--pebble-ink)',
                  transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
                  transformOrigin: 'left center',
                }}
              >
                &ldquo;{a.quote}&rdquo;
              </p>
              <p
                className="pebble-serif text-[17px] leading-[1.6] italic md:text-[18px]"
                style={{ color: 'var(--pebble-ink-muted)' }}
              >
                {a.response}
              </p>
            </div>
          ))}
        </div>
      </ScrollIn>

      {/* ─── PRICING TEASE ────────────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-end md:gap-20">
          <div>
            <p
              className="pebble-mono text-[11px] uppercase"
              style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
            >
              pricing
            </p>
            <h2
              className="pebble-serif mt-6 max-w-[20ch] text-[36px] font-medium leading-[1.05] md:text-[56px]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              one payment. forever.
            </h2>
            <SectionRule className="mt-7 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />
            <p
              className="pebble-serif mt-8 max-w-[40ch] text-[17px] leading-[1.6]"
              style={{ color: 'var(--pebble-ink)' }}
            >
              lifetime unlock at launch. the doctor brief itself is free for
              everyone, forever. waitlist members get the launch discount.
            </p>
          </div>
          <div>
            <p
              className="pebble-hand text-[80px] leading-[0.9] md:text-[120px]"
              style={{ color: 'var(--pebble-terracotta)' }}
            >
              £24.99
            </p>
            <p
              className="pebble-serif mt-4 text-[16px] italic"
              style={{ color: 'var(--pebble-ink-muted)' }}
            >
              indicative launch price. monthly + yearly also available.
            </p>
          </div>
        </div>
      </ScrollIn>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-16 md:py-36">
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          questions you might be asking
        </p>
        <SectionRule className="mt-6 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

        <ul className="mt-10 max-w-[900px]">
          {FAQS.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </ul>
      </ScrollIn>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <ScrollIn className="relative mx-auto max-w-[1200px] px-6 py-28 text-center md:px-16 md:py-40">
        <p
          className="pebble-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
        >
          one more thing
        </p>
        <h2
          className="pebble-serif mx-auto mt-6 max-w-[18ch] text-[42px] font-medium leading-[1.04] md:text-[72px]"
          style={{ color: 'var(--pebble-ink)' }}
        >
          your brief is ready{' '}
          <span
            className="pebble-hand inline-block"
            style={{
              color: 'var(--pebble-terracotta)',
              fontSize: '0.86em',
              fontWeight: 600,
              transform: 'rotate(-3deg)',
              lineHeight: 1,
            }}
          >
            when you are.
          </span>
        </h2>
        <div className="mt-12 flex justify-center">
          <WaitlistForm surface="footer" />
        </div>
        <div className="mt-16 flex justify-center">
          <Pebble size={88} state="idle" />
        </div>
        <p
          className="pebble-serif mt-4 text-[18px] italic"
          style={{ color: 'var(--pebble-ink-muted)' }}
        >
          i&rsquo;ll be here.
        </p>
      </ScrollIn>
    </>
  );
}
