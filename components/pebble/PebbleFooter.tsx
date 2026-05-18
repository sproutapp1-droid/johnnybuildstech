import Link from 'next/link';
import { Pebble } from './Pebble';
import { SectionRule } from './InkMarks';

export function PebbleFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10 mt-20 pt-12 pb-10"
      style={{ color: 'var(--pebble-ink)' }}
    >
      <SectionRule
        className="mx-auto h-2 w-3/4 max-w-[800px]"
        style={{ color: 'var(--pebble-rule)' }}
      />

      <div className="mx-auto mt-10 grid max-w-[1200px] gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <Pebble size={36} state="idle" />
            <span className="pebble-hand text-[32px] leading-none">pebble</span>
          </div>
          <p
            className="pebble-serif mt-4 max-w-[34ch] text-[15px] italic"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            a quiet symptom tracker for chronic illness and adhd/audhd. log in
            30 seconds. walk in with a one-page brief.
          </p>
        </div>

        <nav aria-label="Pebble pages">
          <p
            className="pebble-mono text-[11px] uppercase"
            style={{ letterSpacing: '0.2em', color: 'var(--pebble-ink-muted)' }}
          >
            pebble
          </p>
          <ul className="mt-3 space-y-2 pebble-serif text-[15px]">
            <li>
              <Link href="/apps/pebble" className="hover:text-[var(--pebble-terracotta)]">
                the app
              </Link>
            </li>
            <li>
              <Link
                href="/apps/pebble/privacy"
                className="hover:text-[var(--pebble-terracotta)]"
              >
                privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/apps/pebble/support"
                className="hover:text-[var(--pebble-terracotta)]"
              >
                support
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="elsewhere">
          <p
            className="pebble-mono text-[11px] uppercase"
            style={{ letterSpacing: '0.2em', color: 'var(--pebble-ink-muted)' }}
          >
            elsewhere
          </p>
          <ul className="mt-3 space-y-2 pebble-serif text-[15px]">
            <li>
              <a
                href="mailto:pebble.symptom.app@gmail.com"
                className="hover:text-[var(--pebble-terracotta)]"
              >
                pebble.symptom.app@gmail.com
              </a>
            </li>
            <li>
              <Link href="/apps" className="hover:text-[var(--pebble-terracotta)]">
                all apps
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[var(--pebble-terracotta)]">
                johnnybuildstech ↗
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <p
        className="pebble-mono mt-14 text-center text-[11px] uppercase"
        style={{ letterSpacing: '0.2em', color: 'var(--pebble-ink-muted)' }}
      >
        © {year} pebble · made with care by{' '}
        <Link
          href="/"
          className="underline-offset-2 hover:underline hover:text-[var(--pebble-terracotta)]"
        >
          johnnybuildstech
        </Link>
      </p>
    </footer>
  );
}
