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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll when sheet open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
          className="pointer-events-auto group inline-flex items-baseline gap-0 rounded-full border px-4 py-2 font-serif text-[14px] tracking-tight transition-colors duration-300 md:text-[15px]"
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
          <span
            className="relative mr-1 inline-flex h-1.5 w-1.5 translate-y-[-1px]"
            aria-hidden
          >
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: 'var(--color-available)' }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-available)' }}
            />
          </span>
          <span className="font-medium italic">johnny</span>
          <span className="text-ink-muted">buildstech</span>
        </Link>

        {/* center: desktop link cluster */}
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

        {/* right: desktop Contact CTA */}
        <Link
          href="/contact"
          className="pointer-events-auto group hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-200 md:inline-flex"
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

        {/* right: mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
          style={{
            borderColor: 'rgba(44, 29, 18, 0.14)',
            background: 'rgba(245, 236, 217, 0.82)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span
              className="absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: 'currentColor',
                top: open ? '50%' : '2px',
                transform: open ? 'translateY(-50%) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full transition-opacity duration-200"
              style={{ background: 'currentColor', opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: 'currentColor',
                bottom: open ? '50%' : '2px',
                transform: open ? 'translateY(50%) rotate(-45deg)' : 'none',
              }}
            />
          </span>
        </button>
      </div>

      {/* mobile sheet */}
      <div
        id="mobile-nav-sheet"
        className={`pointer-events-auto fixed inset-0 top-0 z-40 md:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'rgba(44, 29, 18, 0.28)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
          tabIndex={open ? 0 : -1}
        />

        {/* panel */}
        <div
          className={`absolute inset-x-3 top-3 rounded-[22px] border p-5 pt-20 transition-all duration-300 ${
            open
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          }`}
          style={{
            borderColor: 'rgba(44, 29, 18, 0.14)',
            background: 'var(--color-bg)',
            boxShadow:
              '0 1px 0 rgba(44, 29, 18, 0.04), 0 24px 60px -24px rgba(44, 29, 18, 0.35)',
            color: 'var(--color-ink)',
          }}
        >
          {/* gallery placard top-rule */}
          <div
            className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted"
            aria-hidden
          >
            <span
              className="inline-block h-px flex-1"
              style={{ background: 'rgba(196, 138, 58, 0.6)' }}
            />
            <span>menu · no.01</span>
            <span
              className="inline-block h-px flex-1"
              style={{ background: 'rgba(196, 138, 58, 0.6)' }}
            />
          </div>

          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b py-4 font-serif tracking-[-0.01em] transition-colors"
                  style={{
                    borderColor: 'rgba(44, 29, 18, 0.1)',
                    color: active ? 'var(--color-accent)' : 'var(--color-ink)',
                  }}
                >
                  <span
                    className="font-medium"
                    style={{ fontSize: 'clamp(28px, 8vw, 40px)', lineHeight: 1 }}
                  >
                    {link.label.toLowerCase()}
                  </span>
                  <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    <span>0{i + 1}</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-mono text-[12px] uppercase tracking-[0.18em]"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              boxShadow:
                '0 1px 0 rgba(149, 53, 25, 0.35), 0 14px 26px -10px rgba(184, 66, 31, 0.55)',
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
            <span aria-hidden>→</span>
          </Link>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            handcrafted sites · est. 2026
          </p>
        </div>
      </div>
    </header>
  );
}
