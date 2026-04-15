# johnnybuildstech

Johnny's portfolio + bespoke-website services site. Deployed on Vercel at **johnnybuildstech.com**.

- **`/`** — warm Rust & Cream gallery showcasing client web work as a flashcard-flip deck (GSAP + Lenis, CSS sticky). 5 live preview videos + posters.
- **`/apps`** — simple list of personal mobile apps (for social-traffic visitors).
- **`/services`, `/notes`, `/contact`, `/about`** — supporting routes.

## Stack

Next 16 · React 19 · Tailwind v4 · Fumadocs MDX · motion · gsap · lenis · Fraunces + Homemade Apple + Manrope + DM Mono · Vercel Analytics & Speed Insights.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build + next-sitemap
pnpm lint
pnpm typecheck
```

## Capture pipeline for the gallery

See `scripts/README_CAPTURE.md`. Short version:

```bash
pnpm tsx scripts/capture.ts             # all 5 sites
# then: ffmpeg -y -ss 4 -i raw.webm -t 9 -c:v libvpx-vp9 -crf 34 ... hero.webm
```

Outputs to `public/screenshots/<slug>/{hero.webm,poster.jpg}`, consumed by `components/gallery/GalleryMedia.tsx` which plays only the card currently ≥55% in viewport.

## Signature scroll

The deck mechanic on `/` uses CSS-sticky siblings (each 100vh, `top: 0`, z-index ascending) plus a single GSAP scrub per card that shrinks + fades the outgoing card as the next rises. Reduced-motion falls back to a flat 85vh stack.

Full design spec in `CLAUDE.md`.
