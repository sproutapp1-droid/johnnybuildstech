/* Shared chrome for privacy + support. Same notebook substrate, but
 * narrower column, less motion, designed to read like a quiet page
 * of a notebook rather than a marketing landing. */

import { SectionRule } from './InkMarks';

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative mx-auto max-w-[760px] px-6 pt-36 pb-32 md:px-10">
      <p
        className="pebble-mono text-[11px] uppercase"
        style={{ letterSpacing: '0.22em', color: 'var(--pebble-ink-muted)' }}
      >
        {eyebrow}
      </p>
      <h1
        className="pebble-serif mt-6 text-[42px] font-medium leading-[1.05] tracking-[-0.01em] md:text-[64px]"
        style={{ color: 'var(--pebble-ink)' }}
      >
        {title}
      </h1>
      <SectionRule className="mt-8 h-2 w-32" style={{ color: 'var(--pebble-rule)' }} />

      {intro && (
        <p
          className="pebble-serif mt-10 text-[19px] leading-[1.6] italic"
          style={{ color: 'var(--pebble-ink-muted)' }}
        >
          {intro}
        </p>
      )}

      <div className="pebble-prose mt-10">{children}</div>

      <style>{`
        .pebble-prose {
          font-family: var(--pebble-serif);
          font-size: 17px;
          line-height: 1.7;
          color: var(--pebble-ink);
        }
        .pebble-prose h2 {
          font-family: var(--pebble-hand);
          font-size: 32px;
          font-weight: 600;
          line-height: 1.1;
          margin-top: 56px;
          margin-bottom: 14px;
          color: var(--pebble-ink);
        }
        .pebble-prose h3 {
          font-family: var(--pebble-serif);
          font-size: 20px;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 10px;
          color: var(--pebble-ink);
        }
        .pebble-prose p { margin-bottom: 18px; max-width: 64ch; }
        .pebble-prose p.muted { color: var(--pebble-ink-muted); font-style: italic; }
        .pebble-prose ul { margin: 14px 0 22px; padding-left: 24px; }
        .pebble-prose ul li { margin-bottom: 8px; max-width: 60ch; }
        .pebble-prose ul li::marker { color: var(--pebble-terracotta); }
        .pebble-prose a {
          color: var(--pebble-ink);
          text-decoration: underline;
          text-decoration-color: var(--pebble-terracotta);
          text-underline-offset: 3px;
          transition: color 200ms;
        }
        .pebble-prose a:hover { color: var(--pebble-terracotta); }
        .pebble-prose table {
          width: 100%;
          margin: 22px 0 30px;
          border-collapse: collapse;
          font-size: 15px;
        }
        .pebble-prose th, .pebble-prose td {
          text-align: left;
          padding: 12px 14px;
          border-bottom: 1px solid var(--pebble-rule);
          vertical-align: top;
        }
        .pebble-prose th {
          font-family: var(--pebble-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pebble-ink-muted);
        }
        .pebble-prose hr {
          border: 0;
          border-top: 1px solid var(--pebble-rule);
          margin: 40px 0;
        }
        .pebble-prose strong { font-weight: 600; }
        .pebble-prose code {
          font-family: var(--pebble-mono);
          font-size: 0.92em;
          background: var(--pebble-paper-deep);
          padding: 1px 6px;
          border-radius: 3px;
        }
      `}</style>
    </article>
  );
}
