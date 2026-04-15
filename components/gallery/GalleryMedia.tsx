'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  poster?: string;
  alt: string;
  index: number;
};

/**
 * Plays the preview video ONLY when its card is the active (prominently visible)
 * card in the gallery deck. Others render the poster still. Respects
 * prefers-reduced-motion by never playing.
 */
export function GalleryMedia({ src, poster, alt, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    // Treat a card as "active" when ≥55% of its viewport area is showing.
    // Because the deck is full-viewport + sticky, only one card satisfies
    // this at a time.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) {
          void video.play().catch(() => {
            /* autoplay blocked — silent noop, poster still shows */
          });
        } else {
          video.pause();
          // reset so the next activation feels like a fresh start
          if (entry.intersectionRatio < 0.1) {
            try {
              video.currentTime = 0;
            } catch {
              /* noop */
            }
          }
        }
      },
      { threshold: [0, 0.1, 0.55, 1] },
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        aria-label={alt}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
