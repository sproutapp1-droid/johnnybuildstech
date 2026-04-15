# johnnybuildstech

Johnny's professional site — **primary purpose: sell bespoke website-building services**; **secondary purpose: showcase a stable of personal apps** for social-media-driven curiosity traffic. Deployed on Vercel at **johnnybuildstech.com**.

## Positioning

Niche: **highly personalised, professional website building** — landing pages and stunning modern service sites, hosted on Vercel (zero ongoing hosting cost to the client as a sales lever). Think: small businesses, consultants, clinicians, coaches, indie founders who need a site that feels bespoke, not templated.

Hero headline (load-bearing, true to theme): **"building websites that feel alive"**

SEO is a first-class concern. Every page ships per-route metadata, JSON-LD, OG images, clean semantic HTML, sitemap, and blog content targeting "bespoke website designer", "Vercel website developer", "handmade landing pages", regional + vertical long-tail. Regional landing pages are a planned later phase (e.g. `/websites/for/[region]`, `/websites/for/[industry]`).

## Site map (updated direction)

```
/                       WEBSITES showcase — THE homepage. Warm design-studio gallery.
                        Hero "building websites that feel alive" + stacked paper/canvas panels
                        of client and personal web builds. Primary CTAs: "Start a project"
                        (contact) and "See the work" (scroll).
/websites/[slug]        Individual website case study (story, stack, outcomes, screenshots)
/services               Packages, process, pricing anchors, Vercel cost pitch, FAQs
/apps                   Apps stable — secondary page for Twitter / social traffic.
                        Keeps the current stacked-panel experience for the 5 mobile apps.
/apps/[slug]            Mobile app case study
/about                  Personal story + socials
/notes                  MDX blog — SEO & discoverability engine
/notes/[slug]           MDX post with interactive components
/contact                Contact form (primary conversion surface) + mailto fallback
```

Nav order: **Work · Services · Apps · Notes · About · Contact** (Contact rendered as the accent CTA button).

Later phases:
- `/websites/for/[region]` regional landing pages (London, Manchester, Edinburgh, etc.)
- `/websites/for/[industry]` vertical landing pages (clinics, consultants, tradespeople, etc.)

## Design north star (revised)

**Warm design-studio / digital art gallery.** No dark-mode, no stark whites. Think paper, canvas, ink, gallery wall. Each showcased website feels like a framed piece of art or an architectural drawing pinned to a studio wall.

### Palette — Rust & Cream (locked 2026-04-15)

- `--bg`            `#F5ECD9`  cream
- `--bg-deep`       `#E8D9B7`  oat (panel backgrounds)
- `--ink`           `#2C1D12`  espresso ink (never pure black)
- `--ink-muted`     `#7A5B3F`  warm umber for supporting text
- `--accent`        `#B8421F`  rust — primary CTAs, accent pill highlight behind rotating text, handwritten "alive" word
- `--gold`          `#C48A3A`  warm gold — frame hairlines, gallery corner marks, secondary accent

No pure `#FFFFFF` or `#000000` anywhere. Subtle paper-grain texture overlay on `--bg` (low-opacity noise, ~3–4%).

### Type

- **Display:** a high-contrast serif with character — primary candidates: *Fraunces* (variable, most flexible), *Tiempos*, *GT Sectra*. Fraunces variable recommended for the "feel alive" headline.
- **Body:** Manrope (carry over)
- **Labels / numerals / captions:** DM Mono — handwritten-gallery-placard energy

Hero: 96–140px Fraunces 500, lowercase. The word **"alive"** is set in **Homemade Apple** (handwritten), tilted ~-4°, accent (rust) color, ~0.78em of the serif size, with a subtle rust underline smudge. Mono captions 11–13px uppercase tracking +0.08em.

**Rotating sub-line** (below the headline): `→ for [X]` pattern where `[X]` cycles every ~2.5s inside a rust accent pill. Phrase bank: `ADHD brains` · `solo founders` · `clinicians` · `service businesses` · `people who hate templates` · `consultants` · `therapists` · `indie founders`. This is the dynamic niche-targeting line — important for SEO + personalisation signal.

### Signature UX — "Gallery wall" stacked canvases

Evolution of the current stacked-panel scroll. Each showcased website is a full-viewport **canvas/paper rectangle** — rounded corners, soft drop shadow, thin gold hairline frame, slight paper texture — floating on the warm bone background with generous margins (not full-bleed). As you scroll, canvases stack and overlap like prints pinned onto a gallery wall, each resting slightly below and to the side of the last. Header strip stays visible on pinned canvases (year · category · site name · client) — like a gallery placard. Subtle paper-curl or lift shadow on hover.

Keep Lenis smooth scroll + GSAP ScrollTrigger pin. Reduced-motion fallback: flat vertical grid of framed canvases.

The mini "browser window" metaphor becomes a **paper-mockup** metaphor: screenshots live inside a framed paper rectangle (rounded rect + shadow + tiny gold corner marks), not a chromed browser.

## Conversion surfaces

- **Hero CTAs:** "Start a project" (→ `/contact`) as primary terracotta button, "See the work" as ghost link that scrolls.
- **After each case study** in the showcase: inline "I could build one of these for you" CTA with a short form (name, email, what you're building) — keep friction minimal.
- **Sticky footer CTA bar** on `/websites/[slug]` and `/services`.
- **Contact form** `/contact`: Name, Email, Project type, Budget range, What you have in mind. Posts to a Vercel serverless route → email (Resend) + optional Notion/Airtable. Include mailto fallback.
- **Services page** articulates 3 packages (Landing · Service Site · Full Build) with Vercel "$0/mo hosting" as a headline perk.

## Apps section (demoted + simplified)

`/apps` is the secondary page, designed for Twitter / social-media curiosity traffic. **Restyle it — do NOT keep the Nitro stacked-panel dark treatment here.** New direction: **extremely simple, marclou.com-style** — a single scrollable page listing each app with:

- Small app icon / thumbnail
- App name + one-line pitch
- 2–3 bullet points: main features, target market, value prop
- Link out to the product site + store badges

Use the warm Rust & Cream theme on `/apps` too — keep the site visually coherent, just drop the heavy stacked-scroll choreography. Reference: https://marclou.com/ for layout density and tone. Apps to list: Sprout · Payoff Debt Planner · Skip or Buy · Tidywell · Lapsed.

## Stack (unchanged)

- `next@16.2`, `react@19.2`, `typescript@6.0`
- `tailwindcss@4.2` + `@tailwindcss/postcss`
- `motion@11`, `gsap@3.14` + ScrollTrigger, `lenis@1.3`
- `fumadocs-mdx` + `fumadocs-core`, `remark-gfm`, `rehype-pretty-code`, `next-sitemap`
- `@react-three/fiber@9.5` + `@react-three/drei@10` + `three` (retained for optional apps-page 3D)
- `next-themes` (locked to single warm theme on root/websites, dark theme on `/apps`), `lucide-react`, `clsx`, `class-variance-authority`, radix primitives
- `@vercel/analytics@2`, `@vercel/speed-insights@2`
- **Add:** `resend` for contact-form email delivery
- **Add:** `fraunces` via `next/font/google`

## Commands

```
pnpm install
pnpm dev            # local dev (http://localhost:3000)
pnpm build          # production build
pnpm start          # serve production build locally
pnpm lint
pnpm typecheck
pnpm sitemap        # runs automatically post-build
```

Deploy: push to `main` → Vercel auto-deploys to `johnnybuildstech.com`.

## Websites to showcase on `/` (gallery)

Screenshots / case-study material needed for each:

1. https://www.yganconsulting.com/
2. https://www.payoffdebtplanner.com/
3. https://www.tidywell-app.com/
4. https://www.lapsed-app.com/
5. https://sproutapp.tech/
6. https://skiporbuyapp.com/
7. https://occhealthrevision.co.uk/
8. https://adhdmentor-chollywood.com/

Payoff / Tidywell / Lapsed / Sprout / Skip or Buy are companion marketing sites to the mobile apps — on `/` they're framed as *web work*, on `/apps` they're framed as *product stories*. Same assets, different narrative framing.

## High-resolution screenshot pipeline

Windows Snipping Tool is correctly insufficient (≈ 1× DPR). Use one of these:

1. **Chrome DevTools full-page capture (recommended, free, crisp):**
   Open site → F12 → `Cmd/Ctrl+Shift+P` → "Capture full size screenshot". Before capturing:
   - Device toolbar → Responsive → set width to `1440` and DPR to `2` or `3`.
   - Disable any cookie banners / chat widgets via Elements panel delete.
2. **Playwright script (best for repeatability + scale, recommended long-term):**
   One Node script iterates the 8 URLs at `deviceScaleFactor: 3`, viewport 1440×900, full-page + above-fold variants, writes to `public/screenshots/<slug>/{full,hero}.png`. Drop it in `scripts/capture.ts`. Re-runnable any time client sites update.
3. **Paid API (zero-setup, a few cents per shot):** `urlbox.io` or `screenshotone.com` — both support 2×/3× DPR, full-page, custom viewport, element-hide CSS.
4. **Mac/Windows polish:** pipe the raw capture through a mockup step (e.g. a Figma paper-frame component) — gives the canvas/gallery feel without over-processing.

Recommendation: start with DevTools at DPR 3 to unblock, script it in Playwright within a week so updates are one command away.

## Working conventions

- **All UI coding routes through the `/frontend-design` skill.** Non-UI work (config, content, build tooling, data, copy) does not.
- Warm theme on `/`, `/websites/*`, `/services`, `/about`, `/contact`, `/notes`. Dark per-app-brand theme confined to `/apps` and `/apps/[slug]`.
- No pure white, no pure black, anywhere on the warm side.
- Respect `prefers-reduced-motion` on every motion effect.
- `next/image` for all raster assets; WebP/AVIF preferred.
- Per-route `generateMetadata` with OG images. JSON-LD (`Person`, `WebSite`, `Service`, `Article`, `CreativeWork` as appropriate).
- Target Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95.

## SEO program

- Semantic HTML first. One `h1` per page.
- `/websites/[slug]` pages carry `CreativeWork` + `BreadcrumbList` JSON-LD.
- `/services` carries `Service` + `Offer` JSON-LD with GBP price anchors.
- Sitemap includes blog posts and all case studies. Ping Google/Bing on deploy.
- Blog cadence target: 1 post / 2 weeks. Target clusters:
  - "Vercel for small businesses" (hosting cost angle)
  - "Bespoke vs templated websites" (positioning angle)
  - "Case study: [client]" (narrative SEO for each build)
  - Regional: "Website designer in [city]" (future, pairs with regional landing pages)
- Internal linking: every blog post links to `/services` + at least one case study.

## Migration plan (from current state)

1. Move current `/apps` landing logic + stacked-panel components wholesale under a new `/apps` route (they already live there — just delete the root triage page).
2. Delete `/` triage (`app/page.tsx` currently) and the `TriageHero` + `TiltCard` components unless trivially repurposable.
3. Scaffold new `/` as the warm websites gallery — new layout, new theme tokens, new gallery-canvas component (`components/gallery/Canvas.tsx`, `GalleryStack.tsx`).
4. Introduce Fraunces font + warm token set in a sibling `app/(warm)/layout.tsx` or via CSS data-attribute theming so `/apps` can keep its dark tokens cleanly.
5. Build `/services` and `/contact` (Resend integration).
6. Capture high-res screenshots for all 8 sites via the DevTools method, then script with Playwright.
7. Per-route metadata + OG images + JSON-LD.
8. Blog post #1 live at launch for SEO signal.

## References

- Live Nitro template (structural reference only, visual language is being replaced for `/`): https://nitro.framer.website/
- Current app product sites: sproutapp.tech · payoffdebtplanner.com · skiporbuyapp.com · tidywell-app.com · lapsed-app.com
- Non-app client sites: yganconsulting.com · occhealthrevision.co.uk · adhdmentor-chollywood.com
- Gallery / paper visual references to gather: Hoefler&Co site, Pentagram project pages, Robin Mastromarino, Studio Hi Ho — "warm serif + paper + quiet confidence".
