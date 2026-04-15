import Link from 'next/link';
import { Socials } from './Socials';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10"
      style={{ background: 'var(--color-bg-deep)', color: 'var(--color-ink)' }}
    >
      {/* gold hairline */}
      <div
        className="mx-auto max-w-[1400px] px-6 md:px-10"
        style={{ borderTop: '1px solid rgba(196, 138, 58, 0.45)' }}
      />
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              ─ outro
            </p>
            <h2 className="mt-6 font-serif text-[44px] font-medium leading-[1] tracking-[-0.02em] md:text-[76px]">
              let&rsquo;s make yours
              <br />
              feel{' '}
              <span
                className="inline-block relative font-hand font-normal"
                style={{
                  color: 'var(--color-accent)',
                  transform: 'rotate(-4deg) translateY(-0.04em)',
                  fontSize: '0.82em',
                }}
              >
                alive
                <span className="alive-smudge" />
              </span>
              .
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-transform duration-200 hover:translate-y-[-1px]"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  boxShadow:
                    '0 1px 0 rgba(149, 53, 25, 0.35), 0 12px 24px -10px rgba(184, 66, 31, 0.6)',
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
                href="mailto:bitebuddy2@gmail.com?subject=project%20inquiry"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-ink hover:text-bg"
                style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
              >
                or email directly
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              ─ pages
            </p>
            <ul className="mt-6 space-y-2.5 font-serif text-[17px]">
              {[
                ['Work', '/'],
                ['Services', '/services'],
                ['Apps', '/apps'],
                ['Notes', '/notes'],
                ['About', '/about'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              ─ elsewhere
            </p>
            <Socials className="mt-6" />
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              handcrafted · hand-coded
              <br />
              hosted on Vercel · $0/mo
            </p>
          </div>
        </div>

        <div
          className="mt-20 flex flex-col items-start justify-between gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted md:flex-row md:items-center"
          style={{ borderTop: '1px solid rgba(44, 29, 18, 0.12)' }}
        >
          <span>
            © {year} · <span className="text-ink">johnnybuildstech</span>
          </span>
          <span>est. 2026 · built in the open</span>
        </div>
      </div>
    </footer>
  );
}
