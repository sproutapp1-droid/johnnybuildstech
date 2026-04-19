import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

// ───── TLDR / "quick take" block ─────────────────────────────────
// Short, extractable answer at the top of each note. AI systems (Google
// AI Overviews, ChatGPT search, Perplexity) preferentially cite passages
// of 40–60 words that read as self-contained answers. Styled distinctly
// so a human reader clocks it as "summary" and so the underlying HTML
// offers a clear anchor (<aside role="doc-tip">) for extraction.

export function TLDR({ children }: { children: ReactNode }) {
  return (
    <aside
      role="doc-tip"
      aria-label="Quick take"
      className="my-10 rounded-[14px] p-6 md:p-7"
      style={{
        background: 'var(--color-bg-deep)',
        boxShadow: 'inset 0 0 0 1px rgba(196, 138, 58, 0.45)',
      }}
    >
      <p
        className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.3em]"
        style={{ color: 'var(--color-accent)' }}
      >
        ─ the short answer
      </p>
      <div
        className="font-serif text-[18px] leading-[1.55] md:text-[19px]"
        style={{ color: 'var(--color-ink)' }}
      >
        {children}
      </div>
    </aside>
  );
}

// Styled MDX component map. Shared by every /notes post so the essay
// feels like a hand-set chapbook: generous leading, serif body, gold
// rule between sections, pull-quote treatment on blockquotes.

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function headingText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children))
    return children.map((c) => headingText(c as ReactNode)).join('');
  if (children && typeof children === 'object') {
    const c = children as unknown as { props?: { children?: ReactNode } };
    if (c.props && 'children' in c.props) return headingText(c.props.children);
  }
  return '';
}

export const notesMdxComponents = {
  TLDR,
  h1: ({ children, ...rest }: ComponentProps<'h1'>) => (
    <h1
      {...rest}
      className="mt-16 font-serif text-[clamp(40px,6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em]"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...rest }: ComponentProps<'h2'>) => {
    const id = slugify(headingText(children));
    return (
      <h2
        id={id}
        {...rest}
        className="mt-16 mb-5 scroll-mt-32 font-serif text-[clamp(26px,3.4vw,38px)] font-medium leading-[1.1] tracking-[-0.015em]"
      >
        <span
          className="mr-3 inline-block align-middle font-mono text-[12px] tracking-[0.24em]"
          style={{ color: 'var(--color-gold)' }}
          aria-hidden
        >
          ─
        </span>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...rest }: ComponentProps<'h3'>) => {
    const id = slugify(headingText(children));
    return (
      <h3
        id={id}
        {...rest}
        className="mt-10 mb-3 scroll-mt-32 font-serif text-[22px] font-medium italic leading-[1.2]"
      >
        {children}
      </h3>
    );
  },
  p: ({ children, ...rest }: ComponentProps<'p'>) => (
    <p
      {...rest}
      className="my-6 font-serif text-[19px] leading-[1.72] text-ink first-of-type:first-letter:float-left first-of-type:first-letter:mt-1 first-of-type:first-letter:mr-3 first-of-type:first-letter:font-serif first-of-type:first-letter:text-[68px] first-of-type:first-letter:font-medium first-of-type:first-letter:leading-[0.8] first-of-type:first-letter:text-[color:var(--color-accent)] md:text-[20px]"
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...rest }: ComponentProps<'a'>) => {
    const isInternal = href?.startsWith('/');
    const cls =
      'underline decoration-[color:var(--color-gold)] decoration-2 underline-offset-[5px] transition-colors duration-200 hover:text-[color:var(--color-accent)] hover:decoration-[color:var(--color-accent)]';
    if (isInternal && href) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a
        {...rest}
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...rest }: ComponentProps<'ul'>) => (
    <ul
      {...rest}
      className="my-6 list-none space-y-2.5 pl-0 font-serif text-[18px] leading-[1.65] md:text-[19px]"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }: ComponentProps<'ol'>) => (
    <ol
      {...rest}
      className="my-6 list-decimal space-y-2.5 pl-6 font-serif text-[18px] leading-[1.65] marker:font-mono marker:text-[13px] marker:text-[color:var(--color-accent)] md:text-[19px]"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...rest }: ComponentProps<'li'>) => (
    <li {...rest} className="pl-5 relative">
      <span
        aria-hidden
        className="absolute left-0 top-[0.85em] inline-block h-[2px] w-3"
        style={{ background: 'var(--color-gold)' }}
      />
      {children}
    </li>
  ),
  blockquote: ({ children, ...rest }: ComponentProps<'blockquote'>) => (
    <blockquote
      {...rest}
      className="my-10 border-l-2 pl-6 font-serif text-[22px] italic leading-[1.45] text-ink-muted md:text-[26px]"
      style={{ borderColor: 'var(--color-accent)' }}
    >
      {children}
    </blockquote>
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <div
      {...props}
      className="my-12 flex items-center justify-center"
      aria-hidden
    >
      <span
        className="inline-block h-px w-10"
        style={{ background: 'var(--color-gold)' }}
      />
      <span
        className="mx-4 font-mono text-[11px] uppercase tracking-[0.3em]"
        style={{ color: 'var(--color-gold-dim)' }}
      >
        ·
      </span>
      <span
        className="inline-block h-px w-10"
        style={{ background: 'var(--color-gold)' }}
      />
    </div>
  ),
  strong: ({ children, ...rest }: ComponentProps<'strong'>) => (
    <strong
      {...rest}
      className="font-semibold"
      style={{ color: 'var(--color-ink)' }}
    >
      {children}
    </strong>
  ),
  em: ({ children, ...rest }: ComponentProps<'em'>) => (
    <em
      {...rest}
      className="italic"
      style={{ color: 'var(--color-ink-muted)' }}
    >
      {children}
    </em>
  ),
  code: ({ children, ...rest }: ComponentProps<'code'>) => (
    <code
      {...rest}
      className="rounded-[4px] px-1.5 py-0.5 font-mono text-[0.88em]"
      style={{
        background: 'var(--color-bg-deep)',
        color: 'var(--color-accent-dim)',
      }}
    >
      {children}
    </code>
  ),
  table: ({ children, ...rest }: ComponentProps<'table'>) => (
    <div className="my-10 overflow-x-auto">
      <table
        {...rest}
        className="w-full border-collapse font-mono text-[13px]"
        style={{ borderColor: 'rgba(196, 138, 58, 0.4)' }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...rest }: ComponentProps<'th'>) => (
    <th
      {...rest}
      className="border-b px-3 py-3 text-left font-mono text-[11px] uppercase tracking-[0.2em]"
      style={{
        borderColor: 'var(--color-gold)',
        color: 'var(--color-gold-dim)',
      }}
    >
      {children}
    </th>
  ),
  td: ({ children, ...rest }: ComponentProps<'td'>) => (
    <td
      {...rest}
      className="border-b px-3 py-3 align-top font-serif text-[15px]"
      style={{ borderColor: 'rgba(196, 138, 58, 0.25)' }}
    >
      {children}
    </td>
  ),
};
