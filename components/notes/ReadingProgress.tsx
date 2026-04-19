'use client';

import { useEffect, useState } from 'react';

// Thin rust line at the top of the screen. Width scales with scroll progress
// through <article data-reading-root>. Motion is a smooth CSS transition on
// transform — no spring.

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-reading-root]');
    if (!root) return;

    let raf = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-[2px]"
      style={{ background: 'transparent' }}
      aria-hidden
    >
      <div
        className="h-full origin-left"
        style={{
          background: 'var(--color-accent)',
          transform: `scaleX(${progress})`,
          transition: 'transform 180ms linear',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
