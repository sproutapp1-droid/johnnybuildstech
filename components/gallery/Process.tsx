import Link from 'next/link';

const STEPS = [
  {
    n: '01',
    title: 'Get in touch',
    body:
      'A quick email, a short call — whatever suits you. No forms to wade through, no sales pipeline. You talk to me, the person building it.',
  },
  {
    n: '02',
    title: 'Canvass your idea',
    body:
      'We map out what you actually need — your voice, your audience, your offer. I ask a lot of questions. No templates, no guesswork, no moodboards you didn\'t ask for.',
  },
  {
    n: '03',
    title: 'I build your site',
    body:
      'Every pixel hand-coded, every word considered. You see it come together in real time, not after a three-week silence. Launched on Vercel — fast, free to host, built to last.',
  },
];

const VS = [
  { them: 'Drag-and-drop templates everyone else uses', us: 'One-off, built from scratch for your story' },
  { them: 'Monthly hosting & platform fees, forever', us: '£0/mo hosting on Vercel — yours to keep' },
  { them: 'Learn the builder, wrestle the builder', us: 'No learning curve — I hand you a finished site' },
  { them: 'Looks like every other Squarespace', us: 'Designed to stand out and get remembered' },
  { them: 'SEO bolted on as an afterthought', us: 'Built for discoverability from the first line of code' },
  { them: 'Support ticket queue in Manila', us: 'A human who knows your site (me) replies' },
];

export function Process() {
  return (
    <section
      id="process"
      aria-label="How it works"
      className="relative z-10 mx-auto mt-32 max-w-[1400px] px-6 pb-32 md:px-10 md:mt-48"
    >
      {/* heading */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ how it works
          </p>
          <h2 className="mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[0.95] tracking-[-0.02em] md:text-[64px]">
            three steps. one{' '}
            <span className="italic text-ink-muted">human</span>.
          </h2>
        </div>
        <p className="hidden max-w-[30ch] pb-2 text-right font-serif italic text-ink-muted md:block">
          no account managers, no project portals, no auto-replies — just me and your idea.
        </p>
      </div>

      {/* steps */}
      <ol className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="group relative rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
            style={{
              background: 'var(--color-bg-deep)',
              borderColor: 'rgba(196, 138, 58, 0.35)',
              boxShadow: '0 1px 0 rgba(122, 91, 63, 0.08), 0 20px 40px -28px rgba(44, 29, 18, 0.28)',
            }}
          >
            {/* gold corner marks */}
            <span
              aria-hidden
              className="absolute left-3 top-3 h-3 w-3 border-l border-t"
              style={{ borderColor: 'var(--color-gold)' }}
            />
            <span
              aria-hidden
              className="absolute right-3 top-3 h-3 w-3 border-r border-t"
              style={{ borderColor: 'var(--color-gold)' }}
            />
            <span
              aria-hidden
              className="absolute bottom-3 left-3 h-3 w-3 border-b border-l"
              style={{ borderColor: 'var(--color-gold)' }}
            />
            <span
              aria-hidden
              className="absolute bottom-3 right-3 h-3 w-3 border-b border-r"
              style={{ borderColor: 'var(--color-gold)' }}
            />

            <div
              className="font-mono text-[11px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-accent)' }}
            >
              step {s.n}
            </div>
            <h3 className="mt-4 font-serif text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[34px]">
              {s.title}
            </h3>
            <p className="mt-5 text-[16px] leading-[1.6] text-ink-muted">
              {s.body}
            </p>
          </li>
        ))}
      </ol>

      {/* vs traditional builders */}
      <div className="mt-24 md:mt-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-gold-dim)' }}
            >
              ─ why bespoke
            </p>
            <h2 className="mt-4 max-w-[24ch] font-serif text-[32px] font-medium leading-[0.95] tracking-[-0.02em] md:text-[52px]">
              the difference between{' '}
              <span className="italic text-ink-muted">a website</span>{' '}
              and <span className="italic">a website that works</span>.
            </h2>
          </div>
        </div>

        <ul className="mt-14 divide-y" style={{ borderColor: 'rgba(196, 138, 58, 0.3)' }}>
          <li
            className="grid grid-cols-1 gap-4 py-5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted md:grid-cols-2 md:gap-10"
            style={{ borderBottom: '1px solid rgba(196, 138, 58, 0.3)' }}
          >
            <span>Squarespace · Wix · Webflow templates</span>
            <span style={{ color: 'var(--color-accent)' }}>johnnybuildstech</span>
          </li>
          {VS.map((row) => (
            <li
              key={row.them}
              className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 md:gap-10"
              style={{ borderTop: '1px solid rgba(196, 138, 58, 0.2)' }}
            >
              <span className="font-serif text-[17px] leading-[1.5] text-ink-muted line-through decoration-[1px] md:text-[19px]">
                {row.them}
              </span>
              <span className="font-serif text-[17px] leading-[1.5] text-ink md:text-[19px]">
                {row.us}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* closing CTA */}
      <div className="mt-24 flex flex-col items-start gap-6 md:mt-32 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[36ch] font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-ink md:text-[40px]">
          Got an idea?{' '}
          <span className="italic text-ink-muted">
            Let's talk it through — no pitch, no pressure.
          </span>
        </p>
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
          send me an email
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
