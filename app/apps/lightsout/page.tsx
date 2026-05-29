import Link from 'next/link';
import { Moon } from '@/components/lightsout/Moon';
import { PhoneMockup } from '@/components/lightsout/PhoneMockup';
import { WaitlistForm } from '@/components/lightsout/WaitlistForm';
import { HeroReveal, ScrollIn, FAQItem } from './page.client';

const CONDITIONS = [
  '1am doomscrolling',
  'just one more video',
  'revenge bedtime procrastination',
  'tiktok holes',
  'checking work at midnight',
  'the 3am phone reach',
  'blue-light insomnia',
];

const WHAT_IT_DOES = [
  {
    title: 'a curfew that holds',
    body:
      'pick your bedtime and the apps to put away. when the lights go out, they stay out, behind a shield that doesn’t have an easy off switch.',
  },
  {
    title: 'a wind-down worth opening',
    body:
      'nine sleep protocols, from 4-7-8 breathing to a 22-minute sleep story. a breathing moon to follow, and a screen that dims itself as you drift.',
  },
  {
    title: 'focus by daylight',
    body:
      'the same gentle blocking runs your work hours and app limits. one tool for the whole day, not another thing to manage.',
  },
  {
    title: 'truly yours, truly offline',
    body:
      'no account. no cloud. no analytics, no crash reports, no trackers. your nights live on your phone. uninstall and they’re gone.',
  },
];

const PROTOCOLS = [
  ['long exhale', '4-7-8'],
  ['tucked in', 'sleep story'],
  ['deep rest', 'NSDR'],
  ['shuffle', 'cognitive'],
  ['slow release', 'PMR'],
  ['two-minute drop', ''],
];

const HOW = [
  {
    n: '01',
    title: 'set your curfew',
    body: 'choose a bedtime, the days, and which apps to put away. takes about a minute, once.',
  },
  {
    n: '02',
    title: 'lights out',
    body: 'at bedtime the shield lifts. open the wind-down, follow the moon, let the screen dim itself.',
  },
  {
    n: '03',
    title: 'good morning',
    body: 'your phone unlocks with the dawn and tells you how long the curfew held. log the night if you like.',
  },
];

const NOT_LIST = [
  'no shame. no “you failed your goal last night”.',
  'no streaks to defend, no badges to chase.',
  'no account, no email, no password, no cloud.',
  'no analytics, no crash reports, no trackers.',
  'no ads, ever. you’re the customer, not the product.',
  'no harsh lock you’ll come to resent. it bends when you truly need it.',
];

const VOICES = [
  {
    q: 'i know i should put it down. i just don’t.',
    a: 'so the shield decides for you. at bedtime the apps go quiet, no willpower required.',
  },
  {
    q: 'a blocked phone just makes me anxious and bored.',
    a: 'so every curfew opens into a wind-down. a breathing moon, a sleep protocol, a screen that dims itself.',
  },
  {
    q: 'i don’t want another app harvesting my data.',
    a: 'so there is no server. nothing about your nights ever leaves your phone. we couldn’t sell it if we wanted to.',
  },
];

const FAQS = [
  {
    q: 'who is lights out for?',
    a: 'anyone whose phone is the last thing they touch at night and the reason they’re still awake. people doing revenge bedtime procrastination, doomscrollers, shift workers, and anyone who’s tried screen-time limits and tapped straight past them. it doubles as a daytime focus blocker too.',
  },
  {
    q: 'how is this different from a screen-time limit or opal?',
    a: 'two things. first, the shield is built to actually hold at night, not to be dismissed in one tap. second, lights out is a bedtime app first: every curfew opens into a real wind-down, built on CBT-I, not just a blocked screen. and it’s fully offline, with no account.',
  },
  {
    q: 'what’s CBT-I?',
    a: 'cognitive behavioural therapy for insomnia, the first-line, evidence-based treatment for sleeplessness. lights out is built on its four pillars: stimulus control, a consistent wind-down, a kinder relationship with the bed, and gentle daytime structure. there’s a short learn section in the app for each.',
  },
  {
    q: 'is my data really only on my phone?',
    a: 'yes. there is no lights out server. your schedules, your sleep logs, your journal, all of it lives in a local database on your phone. there’s no cloud because there is no cloud, and no analytics or crash reporting either. the only thing that leaves your phone is your purchase receipt, to the app store. that’s the entire list.',
  },
  {
    q: 'will there be iphone and android?',
    a: 'yes, both at launch. the blocking uses each platform’s native screen-time controls, so it works the same on either.',
  },
  {
    q: 'how much will it cost?',
    a: 'yearly at $29.99 with a 3-day free trial, a lifetime unlock at $59.99 paid once, or a monthly option. waitlist members get the launch discount. pricing is indicative until launch.',
  },
  {
    q: 'when does it launch?',
    a: 'app store and play store submission is in 2026. waitlist members get one quiet email when it goes live. no newsletter, no drip sequence. one email, then your address is removed unless you ask otherwise.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lights Out',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android',
  description:
    'A bedtime app that shields your phone against distracting apps after dark and pairs it with a calm, CBT-I-based wind-down. Fully offline; sleep data never leaves your phone.',
  offers: {
    '@type': 'Offer',
    price: '29.99',
    priceCurrency: 'USD',
    description: 'Yearly with a 3-day free trial. Lifetime unlock $59.99. Monthly option available.',
  },
  url: 'https://johnnybuildstech.com/apps/lightsout',
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function LightsOutLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ── */}
      <section id="top" className="hero">
        <div className="lo-wrap hero-grid">
          <HeroReveal>
            <p className="kicker">a phone curfew for sleep · launching 2026</p>
            <h1>
              your phone is the
              <br />
              reason you&rsquo;re{' '}
              <span className="hand-underline">
                still awake
                <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
                  <path
                    d="M3 14 C 70 6, 150 6, 222 11 C 255 13, 280 11, 297 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="accent glow-text">so we turn it off.</span>
            </h1>
            <p className="lede">
              lights out is a bedtime app that shields your phone after dark and walks you into
              sleep with a calm wind-down. by day, the same gentle blocking runs your focus hours.
              built on the four pillars of CBT-I.
            </p>
            <div id="waitlist" style={{ scrollMarginTop: 96 }}>
              <WaitlistForm surface="hero" cta="get the launch discount" />
            </div>
            <p className="margin-note">
              no account. no cloud. no analytics, ever. your sleep data lives on your phone and only
              your phone.
            </p>
          </HeroReveal>

          <div className="hero-phones">
            <PhoneMockup variant="shield-sm" float />
            <PhoneMockup variant="session" float="b" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <ScrollIn className="marq-sec">
        <div className="lo-wrap">
          <p className="kicker">made for the nights that get away from you</p>
        </div>
        <div className="marq-mask" aria-label="what lights out is for">
          <div className="marq">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1}>
                {CONDITIONS.map((c) => (
                  <li key={`${copy}-${c}`}>
                    {c}
                    <span className="dot" aria-hidden>
                      ·
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ── PROBLEM ── */}
      <ScrollIn className="sec">
        <div className="lo-wrap two">
          <div>
            <p className="kicker">the problem</p>
            <h2>you don&rsquo;t have a sleep problem. you have a phone problem.</h2>
            <hr className="rule" />
            <p className="handnote">
              it&rsquo;s 11pm. you meant to sleep an hour ago. the phone is still in your hand.
            </p>
            <p className="lede2">
              willpower loses to an infinite feed every single night. the apps are built to keep you
              scrolling, and &ldquo;i&rsquo;ll stop after this one&rdquo; is a promise your tired
              brain can&rsquo;t keep.
            </p>
            <p className="lede2 dim">
              screen-time limits are a tap away from off. you need a curfew that holds, paired with
              something better to do than stare at a blocked screen.
            </p>
          </div>
          <div className="col-art">
            <PhoneMockup variant="scroll" float />
          </div>
        </div>
      </ScrollIn>

      {/* ── THE SHIELD ── */}
      <ScrollIn id="features" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="lo-wrap two rev">
          <div>
            <p className="kicker sand">the shield</p>
            <h2>this is what your phone shows at bedtime.</h2>
            <hr className="rule" />
            <p className="lede2">
              when your curfew starts, the distracting apps go quiet behind a calm shield. no feed,
              no autoplay, no rabbit hole. just the moon, the time you&rsquo;ll be free, and a breath
              if you need one.
            </p>
            <ul className="notlist single">
              <li>
                <span className="x">✦</span>
                <span>blocks the apps you choose, on a schedule you set</span>
              </li>
              <li>
                <span className="x">✦</span>
                <span>night-allowed apps (kindle, alarms, calls) always get through</span>
              </li>
              <li>
                <span className="x">✦</span>
                <span>need a moment? &ldquo;request 10 min&rdquo; after five slow breaths</span>
              </li>
              <li>
                <span className="x">✦</span>
                <span>by day, the same shield runs your focus blocks</span>
              </li>
            </ul>
          </div>
          <div className="col-art">
            <PhoneMockup variant="shield" float />
          </div>
        </div>
      </ScrollIn>

      {/* ── WHAT IT DOES ── */}
      <ScrollIn className="sec">
        <div className="lo-wrap">
          <p className="kicker">what it does</p>
          <h2 style={{ maxWidth: '24ch' }}>four quiet things, done well.</h2>
          <hr className="rule" />
          <ul className="grid2">
            {WHAT_IT_DOES.map((item, i) => (
              <li key={item.title} className="feat">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollIn>

      {/* ── WIND-DOWN ── */}
      <ScrollIn id="how" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="lo-wrap two">
          <div>
            <p className="kicker">the wind-down</p>
            <h2>blocking is the easy half. this is the rest.</h2>
            <hr className="rule" />
            <p className="lede2">
              a blocked phone you just stare at isn&rsquo;t sleep. so every curfew opens into a
              wind-down session: a protocol with real research behind it, a breathing moon to pace
              you, and a screen that quietly dims itself.
            </p>
            <div className="protos">
              {PROTOCOLS.map(([name, tag]) => (
                <span className="proto" key={name}>
                  <b>{name}</b>
                  {tag ? ` · ${tag}` : ''}
                </span>
              ))}
            </div>
            <p className="handnote" style={{ marginTop: 30 }}>
              no streaks to keep. no badge for showing up. just a softer way down.
            </p>
          </div>
          <div className="col-art">
            <PhoneMockup variant="deep-rest" float />
          </div>
        </div>
      </ScrollIn>

      {/* ── HOW IT WORKS ── */}
      <ScrollIn className="sec">
        <div className="lo-wrap">
          <p className="kicker">a night with lights out</p>
          <h2 style={{ maxWidth: '22ch' }}>set it once. then just go to bed.</h2>
          <hr className="rule" />
          <div className="steps">
            {HOW.map((step) => (
              <div className="step" key={step.n}>
                <div className="card glass">
                  <div className="ico" aria-hidden>
                    <Moon size={26} phase={step.n === '03' ? 'full' : 'crescent'} />
                  </div>
                  <p className="n">{step.n}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ── PRIVACY PROMISE ── */}
      <ScrollIn id="privacy" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="lo-wrap">
          <div className="promise glass">
            <p className="kicker sand">a promise, before anything else</p>
            <p className="big">
              your sleep stays on this phone. there is no lights out server to send it to.{' '}
              <span className="accent">that&rsquo;s the whole deal.</span>
            </p>
            <p className="small">
              no account. no cloud. no analytics. no crash reports. no third-party trackers. the only
              thing that ever leaves your phone is your purchase receipt, to the app store, so we know
              your subscription is active. that is the entire list.
            </p>
            <p className="small">
              (full details in the <Link href="/apps/lightsout/privacy">privacy policy</Link>.)
            </p>
          </div>
        </div>
      </ScrollIn>

      {/* ── WHAT IT'S NOT ── */}
      <ScrollIn className="sec">
        <div className="lo-wrap">
          <p className="kicker">what lights out is not</p>
          <h2 style={{ maxWidth: '24ch' }}>a list of things we left out.</h2>
          <hr className="rule" />
          <ul className="notlist">
            {NOT_LIST.map((item) => (
              <li key={item}>
                <span className="x" aria-hidden>
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollIn>

      {/* ── VOICES ── */}
      <ScrollIn className="sec">
        <div className="lo-wrap">
          <p className="kicker">the conversations this app is built around</p>
          <hr className="rule" />
          <div className="voices">
            {VOICES.map((v) => (
              <div className="voice" key={v.q}>
                <p className="q">&ldquo;{v.q}&rdquo;</p>
                <p className="a">{v.a}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollIn>

      {/* ── PRICING ── */}
      <ScrollIn id="pricing" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="lo-wrap price-grid">
          <div>
            <p className="kicker">pricing</p>
            <h2 style={{ maxWidth: '18ch' }}>one price. a real free trial.</h2>
            <hr className="rule" />
            <p className="lede2">
              yearly with a 3-day free trial, or pay once and own it for life. waitlist members get
              the launch discount and a heads-up the day it lands.
            </p>
          </div>
          <div>
            <p className="price-big">
              $29.99<span> /yr</span>
            </p>
            <p className="lede2" style={{ marginTop: 18 }}>
              3-day free trial. or $59.99 once, forever. monthly also available. indicative launch
              pricing.
            </p>
          </div>
        </div>
      </ScrollIn>

      {/* ── FAQ ── */}
      <ScrollIn id="faq" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="lo-wrap">
          <p className="kicker">questions you might be asking</p>
          <hr className="rule" />
          <ul className="faq">
            {FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </ul>
        </div>
      </ScrollIn>

      {/* ── FINAL CTA ── */}
      <ScrollIn className="final">
        <div className="lo-wrap">
          <p className="kicker">one last thing</p>
          <h2>
            the best night&rsquo;s sleep starts{' '}
            <span className="accent glow-text">by putting it down.</span>
          </h2>
          <div style={{ marginTop: 40 }}>
            <WaitlistForm surface="footer" />
          </div>
          <Moon size={96} phase="crescent" breathe className="" />
          <p className="serif" style={{ fontSize: 18, color: 'var(--text-low)', marginTop: 18 }}>
            good night.
          </p>
        </div>
      </ScrollIn>
    </>
  );
}
