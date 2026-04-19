'use client';

import { useEffect, useState } from 'react';
import type { TOCItemType } from 'fumadocs-core/toc';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// Sticky "chapter index" for desktop + a collapsible inline index for mobile.
// The active heading is highlighted by colour only — no sliding markers, no
// bounces, no scale. A slow 450ms fade between states.

export function NoteToc({ items }: { items: TOCItemType[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // flatten to h2 + h3 entries only
  const flat = items.filter((i) => i.depth === 2 || i.depth === 3);

  useEffect(() => {
    if (flat.length === 0) return;

    const ids = flat
      .map((i) => (typeof i.url === 'string' ? i.url.replace(/^#/, '') : ''))
      .filter(Boolean);
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [flat]);

  if (flat.length === 0) return null;

  return (
    <>
      {/* desktop — sticky chapter index */}
      <nav
        aria-label="On this page"
        className="hidden w-[230px] shrink-0 md:sticky md:top-36 md:block md:self-start"
      >
        <p
          className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.28em]"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          ─ on this page
        </p>
        <ol className="list-none space-y-2.5">
          {flat.map((item) => {
            const id = typeof item.url === 'string' ? item.url.replace(/^#/, '') : '';
            const isActive = id === activeId;
            const isSub = item.depth === 3;
            return (
              <li key={id} className={isSub ? 'pl-4' : ''}>
                <a
                  href={`#${id}`}
                  className="group flex items-baseline gap-3 py-1 font-serif leading-[1.3]"
                  style={{
                    color: isActive
                      ? 'var(--color-accent)'
                      : 'var(--color-ink-muted)',
                    transition: `color 450ms ${EASE}`,
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block h-px shrink-0"
                    style={{
                      width: isActive ? '18px' : '10px',
                      background: isActive
                        ? 'var(--color-accent)'
                        : 'var(--color-gold-dim)',
                      transition: `width 500ms ${EASE}, background 500ms ${EASE}`,
                    }}
                  />
                  <span
                    className={isSub ? 'text-[14px] italic' : 'text-[15px]'}
                    style={{
                      fontStyle: isSub ? 'italic' : 'normal',
                    }}
                  >
                    {String(item.title)}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* mobile — collapsible inline index */}
      <details
        className="group mb-8 rounded-[14px] md:hidden"
        style={{
          background: 'var(--color-bg-deep)',
          boxShadow: 'inset 0 0 0 1px rgba(196, 138, 58, 0.35)',
        }}
        onToggle={(e) => setMobileOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-between px-4 py-3"
          style={{ color: 'var(--color-ink)' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
            ─ on this page
          </span>
          <span
            className="font-mono text-[14px]"
            style={{
              color: 'var(--color-gold-dim)',
              transform: mobileOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: `transform 400ms ${EASE}`,
            }}
            aria-hidden
          >
            +
          </span>
        </summary>
        <ol className="list-none space-y-2 px-4 pb-4">
          {flat.map((item) => {
            const id =
              typeof item.url === 'string' ? item.url.replace(/^#/, '') : '';
            const isSub = item.depth === 3;
            return (
              <li key={id} className={isSub ? 'pl-4' : ''}>
                <a
                  href={`#${id}`}
                  className="block py-1 font-serif"
                  style={{
                    color: 'var(--color-ink)',
                    fontSize: isSub ? '14px' : '15px',
                    fontStyle: isSub ? 'italic' : 'normal',
                  }}
                >
                  {String(item.title)}
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </>
  );
}
