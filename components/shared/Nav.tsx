'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/apps', label: 'Apps' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-4 pt-4 md:px-8 md:pt-6 transition-all duration-500 ${
          scrolled ? '' : ''
        }`}
      >
        {/* left: wordmark pill */}
        <Link
          href="/"
          className="pointer-events-auto group inline-flex items-baseline gap-0 rounded-full border px-4 py-2 font-serif text-[15px] tracking-tight transition-colors duration-300"
          style={{
            borderColor: 'rgba(44, 29, 18, 0.14)',
            background: scrolled
              ? 'rgba(245, 236, 217, 0.82)'
              : 'rgba(245, 236, 217, 0.55)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[color:var(--color-accent)]" />
          <span className="font-medium italic">johnny</span>
          <span className="text-ink-muted">buildstech</span>
        </Link>

        {/* center: link cluster */}
        <nav
          className="pointer-events-auto hidden items-center gap-0.5 rounded-full border px-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] md:flex"
          style={{
            borderColor: 'rgba(44, 29, 18, 0.14)',
            background: 'rgba(245, 236, 217, 0.55)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          }}
          aria-label="Primary"
        >
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 transition-colors duration-200 ${
                  active ? 'text-bg' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {active && (
                  <span
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: 'var(--color-ink)' }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* right: Contact CTA — rust pill */}
        <Link
          href="/contact"
          className="pointer-events-auto group inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-200"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            boxShadow:
              '0 1px 0 rgba(149, 53, 25, 0.35), 0 8px 18px -8px rgba(184, 66, 31, 0.55)',
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ background: 'var(--color-bg)' }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-bg)' }}
            />
          </span>
          start a project
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
