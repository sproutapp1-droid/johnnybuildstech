/**
 * Generates the circular jbt mark + favicon + OG / Twitter share images.
 *
 * Reads:  public/brand/jbt.png           (the cropped letterpress jbt)
 * Writes: public/brand/jbt-circle.png    (512×512 brand asset, reusable)
 *         app/icon.png                   (512×512 favicon, Next auto-discovers)
 *         app/apple-icon.png             (512×512 iOS home-screen)
 *         app/opengraph-image.png        (1200×630 social preview)
 *         app/twitter-image.png          (1200×630, same content)
 *
 * Run once (or after changing public/brand/jbt.png):
 *   pnpm tsx scripts/gen-brand.ts
 */

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const BG = '#F5ECD9'; // cream
const GOLD = '#C48A3A';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'public/brand/jbt.png');
const BRAND_OUT = path.join(ROOT, 'public/brand');
const APP = path.join(ROOT, 'app');

async function ensureDir(d: string) {
  await fs.mkdir(d, { recursive: true });
}

/** Paper-grain SVG overlay for texture */
function grainSvg(w: number, h: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 0.17  0 0 0 0 0.11  0 0 0 0 0.07  0 0 0 0.22 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`;
}

/** Circular SVG mask at a given size */
function circleMaskSvg(size: number) {
  const r = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
  </svg>`;
}

/** SVG for four small gold L-corner marks + a thin inner frame, sized to canvas */
function cornersSvg(w: number, h: number, inset = 48, markLen = 28) {
  const s = 3; // stroke width
  const x1 = inset;
  const x2 = w - inset;
  const y1 = inset;
  const y2 = h - inset;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <g stroke="${GOLD}" stroke-width="${s}" stroke-linecap="square" fill="none" opacity="0.9">
      <path d="M${x1} ${y1 + markLen} L${x1} ${y1} L${x1 + markLen} ${y1}"/>
      <path d="M${x2 - markLen} ${y1} L${x2} ${y1} L${x2} ${y1 + markLen}"/>
      <path d="M${x1} ${y2 - markLen} L${x1} ${y2} L${x1 + markLen} ${y2}"/>
      <path d="M${x2 - markLen} ${y2} L${x2} ${y2} L${x2} ${y2 - markLen}"/>
    </g>
  </svg>`;
}

/** Plain cream square — no grain — used inside circles so the letterpress
 * rectangle bg of jbt.png blends seamlessly with the surrounding cream. */
async function buildSquareCream(size: number, withGrain = false) {
  const base = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  });
  if (!withGrain) return base.png();
  return base
    .composite([{ input: Buffer.from(grainSvg(size, size)), blend: 'multiply' }])
    .png();
}

/** Turn the source jbt.png into a perfectly circular composition on cream */
async function makeCircleAsset(outputSize: number, jbtSizeRatio = 0.92): Promise<Buffer> {
  const jbtSize = Math.round(outputSize * jbtSizeRatio);

  // Resize so the jbt mark nearly fills the circle (0.9+ ratio) — that
  // hides the jbt.png's own cream rectangle background inside the circle.
  const jbtResized = await sharp(SRC)
    .resize(jbtSize, jbtSize, {
      fit: 'cover',
      position: 'center',
    })
    .toBuffer();

  // Plain cream square (no grain — applied only once, on the outer OG canvas)
  const base = await (await buildSquareCream(outputSize, false)).toBuffer();

  const flat = await sharp(base)
    .composite([{ input: jbtResized, gravity: 'center' }])
    .png()
    .toBuffer();

  const circled = await sharp(flat)
    .composite([{ input: Buffer.from(circleMaskSvg(outputSize)), blend: 'dest-in' }])
    .png()
    .toBuffer();

  return circled;
}

async function main() {
  await ensureDir(BRAND_OUT);

  // ─── Brand asset: reusable circular jbt (512) ─────────────
  const brandCircle = await makeCircleAsset(512, 0.78);
  await fs.writeFile(path.join(BRAND_OUT, 'jbt-circle.png'), brandCircle);
  console.log('✓ public/brand/jbt-circle.png');

  // ─── Favicon: app/icon.png (512×512 — Next auto-scales) ───
  await fs.writeFile(path.join(APP, 'icon.png'), brandCircle);
  console.log('✓ app/icon.png');

  // ─── Apple touch icon: needs square with bg (iOS adds rounded
  //     corners itself, so we give it a full square cream+circle). ──
  const appleSize = 512;
  const appleBase = await (await buildSquareCream(appleSize)).toBuffer();
  const appleCircle = await makeCircleAsset(Math.round(appleSize * 0.88), 0.82);
  const appleIcon = await sharp(appleBase)
    .composite([{ input: appleCircle, gravity: 'center' }])
    .png()
    .toBuffer();
  await fs.writeFile(path.join(APP, 'apple-icon.png'), appleIcon);
  console.log('✓ app/apple-icon.png');

  // ─── OG image: 1200×630 cream + centered circular logo + frame ─
  const W = 1200;
  const H = 630;
  const logoSize = 440;
  const logoCircle = await makeCircleAsset(logoSize, 0.8);

  const ogBase = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: BG,
    },
  }).composite([
    // paper grain
    { input: Buffer.from(grainSvg(W, H)), blend: 'multiply' },
    // the circular mark, centered
    { input: logoCircle, gravity: 'center' },
    // gold corner marks as a frame
    { input: Buffer.from(cornersSvg(W, H, 40, 32)) },
  ]);

  const og = await ogBase.png({ compressionLevel: 9 }).toBuffer();
  await fs.writeFile(path.join(APP, 'opengraph-image.png'), og);
  console.log('✓ app/opengraph-image.png');

  await fs.writeFile(path.join(APP, 'twitter-image.png'), og);
  console.log('✓ app/twitter-image.png');

  console.log('\nAll brand assets generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
