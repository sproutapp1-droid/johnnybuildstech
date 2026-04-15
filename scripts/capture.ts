/**
 * Automated capture pipeline for the /websites gallery.
 *
 * Two phases per site:
 *   1. STILLS phase (non-recording browser context) — hero.png + full.png
 *   2. VIDEO phase (fresh recording context)         — raw.webm
 *
 * Splitting the phases means the video only contains the smooth scroll-through,
 * not the viewport jumps that fullPage screenshots cause.
 *
 * Run:
 *   pnpm tsx scripts/capture.ts                      # all sites
 *   pnpm tsx scripts/capture.ts ygan-consulting      # single site
 */

import { chromium, type Browser, type Page } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { WEBSITES, type WebsiteWork } from '../lib/websites';

const OUT_ROOT = path.resolve('public/screenshots');
const VIEWPORT = { width: 1440, height: 900 };
const DPR = 2;
const VIDEO_DURATION_MS = 7000; // total scroll time
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const KILL_CRUFT_CSS = `
  [class*="cookie" i], [id*="cookie" i],
  [class*="consent" i], [id*="consent" i],
  [class*="gdpr" i], [id*="gdpr" i],
  [class*="notice-banner" i],
  [aria-label*="cookie" i],
  iframe[src*="cookiebot"],
  #onetrust-banner-sdk,
  #hubspot-messages-iframe-container,
  [class*="intercom" i], [class*="drift" i], [class*="crisp" i] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Some cookie banners use generic utility classes (no "cookie" in the DOM name).
 * Find any fixed/sticky element whose text contains cookie-related phrases
 * and hide it. Arrow-only to stay safe under tsx's `__name` transform.
 */
async function killBannersByText(page: Page) {
  await page.evaluate(() => {
    const needles = [
      'we use cookie',
      'cookie policy',
      'accept cookie',
      'cookie preferences',
      'manage cookies',
      'allow cookies',
      'gdpr',
    ];
    const all = Array.from(document.querySelectorAll<HTMLElement>('*'));
    for (const el of all) {
      const text = (el.textContent || '').toLowerCase();
      if (text.length > 2000 || text.length < 4) continue;
      if (!needles.some((n) => text.includes(n))) continue;
      const style = window.getComputedStyle(el);
      const pos = style.position;
      if (pos !== 'fixed' && pos !== 'sticky') continue;
      el.style.setProperty('display', 'none', 'important');
    }
  });
}

async function preparePage(page: Page, url: string) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  } catch {
    console.warn(`    ! networkidle timeout, continuing`);
  }
  await page.addStyleTag({ content: KILL_CRUFT_CSS });
  await killBannersByText(page);
  // let webfonts + hero images paint
  await page.waitForTimeout(1800);
  // warm the whole page so lazy-loaded images are cached before video starts
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    const step = Math.max(window.innerHeight * 0.75, 400);
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

async function captureStills(browser: Browser, site: WebsiteWork, siteDir: string) {
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
    userAgent: UA,
  });
  const page = await ctx.newPage();
  await preparePage(page, site.url);

  await page.screenshot({
    path: path.join(siteDir, 'hero.png'),
    type: 'png',
    fullPage: false,
  });
  console.log(`    ✓ hero.png`);

  await page.screenshot({
    path: path.join(siteDir, 'full.png'),
    type: 'png',
    fullPage: true,
  });
  console.log(`    ✓ full.png`);

  await page.close();
  await ctx.close();
}

async function captureVideo(browser: Browser, site: WebsiteWork, siteDir: string) {
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1, // videos at 1× DPR — 1440 wide is plenty, 2× bloats filesize
    userAgent: UA,
    recordVideo: { dir: siteDir, size: VIEWPORT },
  });
  const page = await ctx.newPage();

  // Lean prep — assets already cached by the stills phase, so we can skip
  // the warmup scroll (which would show up as ugly jitter in the video).
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45_000 });
  } catch {
    console.warn(`    ! networkidle timeout, continuing`);
  }
  await page.addStyleTag({ content: KILL_CRUFT_CSS });
  await killBannersByText(page);
  // let webfonts + hero paint, and make sure we're at the top
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  // re-run the killer after paint in case the banner mounts late
  await killBannersByText(page);
  // hero dwell — 1.5s of still on the hero before motion starts
  await page.waitForTimeout(1500);

  // smooth scroll-through
  await smoothScrollThrough(page, VIDEO_DURATION_MS);
  const endY = await page.evaluate(() => window.scrollY);
  console.log(`    · ended at scrollY=${endY}`);

  // tail dwell before closing so last frame isn't mid-scroll
  await page.waitForTimeout(500);

  await page.close();
  await ctx.close();

  // Playwright writes a random filename; rename to raw.webm
  const files = await fs.readdir(siteDir);
  const webm = files
    .filter((f) => f.endsWith('.webm') && f !== 'hero.webm' && f !== 'raw.webm')
    .sort();
  if (webm.length === 0) {
    console.warn(`    ! no video produced`);
    return;
  }
  const from = path.join(siteDir, webm[webm.length - 1]);
  const to = path.join(siteDir, 'raw.webm');
  try { await fs.rm(to); } catch {}
  await fs.rename(from, to);
  // clean up any stray webms from prior failed runs
  for (const stray of webm.slice(0, -1)) {
    try { await fs.rm(path.join(siteDir, stray)); } catch {}
  }
  console.log(`    ✓ raw.webm`);
}

async function smoothScrollThrough(page: Page, totalMs: number) {
  // Real wheel events work on scroll-hijacked sites (Locomotive / Lenis /
  // ScrollSmoother). IPC for each `mouse.wheel` has a non-trivial cost
  // (~15–40ms each), so we pace by WALL CLOCK, not frame count — the loop
  // fires as many wheels as possible in `totalMs` and stops on time.
  await page.mouse.move(720, 450);

  const maxScroll = await page.evaluate(() =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
  );
  const target = Math.min(maxScroll, 900 * 4);
  if (target < 50) return;

  const start = Date.now();
  let lastEased = 0;
  let carry = 0;
  while (true) {
    const elapsed = Date.now() - start;
    if (elapsed >= totalMs) break;
    const t = elapsed / totalMs;
    const eased = t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const raw = (eased - lastEased) * target + carry;
    const delta = Math.round(raw);
    carry = raw - delta;
    lastEased = eased;
    if (delta > 0) await page.mouse.wheel(0, delta);
  }

  // final nudge in case rounding left residue
  const residue = target - Math.round(lastEased * target);
  if (residue > 0) await page.mouse.wheel(0, residue);
}

async function captureSite(browser: Browser, site: WebsiteWork) {
  const siteDir = path.join(OUT_ROOT, site.slug);
  await ensureDir(siteDir);
  console.log(`\n⇢ ${site.slug}  (${site.url})`);
  try {
    await captureStills(browser, site, siteDir);
    await captureVideo(browser, site, siteDir);
  } catch (err) {
    console.error(`  ✗ ${site.slug} failed:`, err instanceof Error ? err.message : err);
  }
}

async function main() {
  const requested = process.argv.slice(2);
  const targets =
    requested.length > 0
      ? WEBSITES.filter((w) => requested.includes(w.slug))
      : WEBSITES;

  if (targets.length === 0) {
    console.error('No matching slugs. Available:', WEBSITES.map((w) => w.slug).join(', '));
    process.exit(1);
  }

  console.log(`Capturing ${targets.length} site(s) @ ${VIEWPORT.width}×${VIEWPORT.height}`);
  await ensureDir(OUT_ROOT);

  const browser = await chromium.launch({ headless: true });
  try {
    for (const site of targets) {
      await captureSite(browser, site);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone. Next step: compress raw.webm files — see scripts/README_CAPTURE.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
