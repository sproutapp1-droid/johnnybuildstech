'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Pebble } from './Pebble';

const SECTIONS = [
  { href: '#what-it-does', label: 'what it does' },
  { href: '#how', label: 'how' },
  { href: '#privacy-promise', label: 'privacy' },
  { href: '/apps/pebble/support', label: 'support' },
];

export function PebbleNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const isLanding = pathname === '/apps/pebble';

  // Lenis (mounted in the root layout) doesn't reset scroll on Next.js
  // client-side navigation, so /apps/pebble/privacy etc. open mid-page.
  // Force the viewport back to the top on every route change, and on
  // bfcache restoration (browser back/forward).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // No hash → scroll to top. Hash → leave the anchor scroll alone.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity,
          background:
            'linear-gradient(to bottom, var(--pebble-paper) 0%, rgba(244, 239, 230, 0.85) 70%, rgba(244, 239, 230, 0) 100%)',
        }}
      />
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-5 pt-5 md:px-10 md:pt-7">
        {/* left — back to apps + Pebble wordmark */}
        <Link
          href="/apps"
          className="pointer-events-auto inline-flex items-center gap-2.5 group"
          style={{ color: 'var(--pebble-ink)' }}
        >
          <Pebble size={28} state="idle" />
          <span className="pebble-hand text-[28px] leading-none">pebble</span>
          <span
            className="pebble-serif hidden text-[13px] italic md:inline-block"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            ← all apps
          </span>
        </Link>

        {/* center — section anchors, only on the landing page */}
        {isLanding && (
          <nav
            className="pointer-events-auto hidden gap-7 md:flex"
            style={{ color: 'var(--pebble-ink-muted)' }}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="pebble-serif text-[14px] transition-colors hover:text-[var(--pebble-terracotta)]"
              >
                {s.label}
              </a>
            ))}
          </nav>
        )}

        {/* right — CTA */}
        <a
          href={isLanding ? '#waitlist' : '/apps/pebble#waitlist'}
          className="pointer-events-auto pebble-hand inline-flex items-center text-[22px] leading-none transition-colors"
          style={{ color: 'var(--pebble-terracotta)' }}
        >
          join the waitlist
        </a>
      </div>
    </header>
  );
}
