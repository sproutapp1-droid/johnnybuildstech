'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { WebsiteWork } from '@/lib/websites';
import { Canvas } from './Canvas';

gsap.registerPlugin(ScrollTrigger);

export function GalleryStack({ works }: { works: WebsiteWork[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-gallery-card]', root);

      // As each NEW card rises up from below and covers the CURRENT card,
      // the CURRENT card shrinks + fades out so it feels like it's being
      // flipped away into the discard pile (not stacked).
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector<HTMLElement>('[data-gallery-card-inner]');
        if (!inner) return;
        const nextCard = cards[i + 1];

        gsap.fromTo(
          inner,
          { scale: 1, opacity: 1, y: 0 },
          {
            scale: 0.9,
            opacity: 0,
            y: -40,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 85%', // begin once next card pokes into viewport
              end: 'top top', // finished as next card fully takes over
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Selected web work"
      className="relative z-10"
    >
      {/* intro strip */}
      <div className="mx-auto mb-10 flex max-w-[1400px] items-end justify-between gap-6 px-6 md:mb-14 md:px-10">
        <div>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: 'var(--color-gold-dim)' }}
          >
            ─ the gallery
          </p>
          <h2 className="mt-4 max-w-[20ch] font-serif text-[32px] font-medium leading-[0.95] tracking-[-0.02em] md:text-[52px]">
            no templates.
            <span className="italic text-ink-muted"> no two alike</span>.
          </h2>
        </div>
        <p className="hidden max-w-[32ch] pb-2 text-right font-serif italic text-ink-muted md:block">
          each one hand-built for a real human, their real voice, their
          real business.
        </p>
      </div>

      {/* the deck — sticky siblings, each 100vh, pinned at top:0 in turn */}
      <div className="mx-auto max-w-[1400px]">
        {works.map((w, i) => (
          <Canvas key={w.slug} work={w} index={i} total={works.length} />
        ))}
      </div>

      {/* small trailing spacer so last card has breathing room before footer */}
      <div aria-hidden style={{ height: '15vh' }} />
    </section>
  );
}
