import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconPath = 'D:/Symptom Tracker/App icon.png';
const outDir = path.join(__dirname, '..', 'app', 'apps', 'pebble');

const W = 1200;
const H = 630;
const BG = { r: 0xf4, g: 0xef, b: 0xe6, alpha: 1 }; // --pebble-paper #F4EFE6

// Icon already has its own glow halo; render at ~520px so it breathes.
const ICON_SIZE = 520;

const iconBuf = await sharp(iconPath)
  .resize(ICON_SIZE, ICON_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const left = Math.round((W - ICON_SIZE) / 2);
const top = Math.round((H - ICON_SIZE) / 2);

const composed = await sharp({
  create: { width: W, height: H, channels: 4, background: BG },
})
  .composite([{ input: iconBuf, left, top }])
  .png()
  .toBuffer();

await sharp(composed).toFile(path.join(outDir, 'opengraph-image.png'));
await sharp(composed).toFile(path.join(outDir, 'twitter-image.png'));

console.log('Wrote opengraph-image.png and twitter-image.png to', outDir);
