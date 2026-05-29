/* Capture the three Lights Out mockup screens (screen-only, no device
 * frame) to public/apps/lightsout/{01,02,03}.png at 3x DPR. The /apps
 * AppCard PhoneTray adds the device frame + rounded corners, so these
 * are full-bleed screen captures. Run: node scripts/capture-lightsout.mjs */

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlUrl = 'file://' + path.join(root, 'scripts', 'lightsout-shots.html');
const outDir = path.join(root, 'public', 'apps', 'lightsout');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 3, viewport: { width: 1400, height: 1000 } });
await page.goto(htmlUrl, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const map = { s1: '01.png', s2: '02.png', s3: '03.png' };
for (const [id, file] of Object.entries(map)) {
  await page.locator('#' + id).screenshot({ path: path.join(outDir, file) });
  console.log('wrote', file);
}

await browser.close();
console.log('done');
