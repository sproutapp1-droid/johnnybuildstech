# Screenshot + video capture pipeline

Automates the hero stills and preview videos for the `/` gallery deck.

## One-time setup

```bash
pnpm add -D playwright tsx
pnpm exec playwright install chromium
```

Install **ffmpeg** (for video compression). Windows: `winget install ffmpeg` or download from https://www.gyan.dev/ffmpeg/builds/. Verify with `ffmpeg -version`.

## Capture all 5 sites

```bash
pnpm tsx scripts/capture.ts
```

Outputs per site, to `public/screenshots/<slug>/`:
- `hero.png` — 1440×900 @ 2× DPR (2880×1800) above-the-fold still
- `full.png` — full-page still @ 2× DPR
- `raw.webm` — ~5-second smooth scroll-through of the top of the page

Re-run a single site (or a few):

```bash
pnpm tsx scripts/capture.ts ygan-consulting
pnpm tsx scripts/capture.ts payoff-debt-planner tidywell
```

Valid slugs are defined in `lib/websites.ts`.

## Compress videos with ffmpeg

Raw Playwright WebMs are ~10–30 MB each. Compress each one with:

```bash
ffmpeg -i raw.webm -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "scale=1440:-2,fps=24" -an -row-mt 1 hero.webm
```

Flags:
- `-c:v libvpx-vp9` — VP9 codec, great for UI footage
- `-crf 34 -b:v 0` — constant-quality mode, ~sweet-spot for web
- `-vf scale=1440:-2,fps=24` — downscale to 1440 wide, cap to 24fps
- `-an` — strip audio (the captures are silent anyway, saves bytes)
- `-row-mt 1` — multithreaded encoding

Expect `hero.webm` to be **600 KB – 1.5 MB**.

Also generate a matching poster frame (first frame of the clip):

```bash
ffmpeg -i raw.webm -vframes 1 -vf "scale=1440:-2" -q:v 3 -update 1 poster.jpg
```

### Batch compress all 5 (PowerShell)

```powershell
Get-ChildItem public\screenshots -Directory | ForEach-Object {
  $dir = $_.FullName
  if (Test-Path "$dir\raw.webm") {
    ffmpeg -y -i "$dir\raw.webm" -c:v libvpx-vp9 -crf 34 -b:v 0 `
      -vf "scale=1440:-2,fps=24" -an -row-mt 1 "$dir\hero.webm"
    ffmpeg -y -i "$dir\raw.webm" -vframes 1 -vf "scale=1440:-2" `
      -q:v 3 -update 1 "$dir\poster.jpg"
  }
}
```

### Batch compress (bash / git-bash)

```bash
for dir in public/screenshots/*/; do
  if [ -f "$dir/raw.webm" ]; then
    ffmpeg -y -i "$dir/raw.webm" -c:v libvpx-vp9 -crf 34 -b:v 0 \
      -vf "scale=1440:-2,fps=24" -an -row-mt 1 "$dir/hero.webm"
    ffmpeg -y -i "$dir/raw.webm" -vframes 1 -vf "scale=1440:-2" \
      -q:v 3 -update 1 "$dir/poster.jpg"
  fi
done
```

## Wire the outputs in

Once a site has `hero.webm` + `poster.jpg` (or just `hero.png`), update its entry in `lib/websites.ts`:

```ts
{
  slug: 'ygan-consulting',
  // ...
  cover: '/screenshots/ygan-consulting/poster.jpg',   // or hero.png if still-only
  preview: '/screenshots/ygan-consulting/hero.webm',  // omit if still-only
}
```

The `Canvas` component picks automatically:
1. `preview` + `cover` → `<video>` with poster (plays only when card is active on screen)
2. `cover` only → `<Image>`
3. neither → "paper proof · screenshot pending" placeholder

## Tips / troubleshooting

- **Cookie banner still shows**: add its selector to `KILL_CRUFT_CSS` in `scripts/capture.ts`, re-run.
- **Video looks jerky**: lower `fps=24` to `fps=30` in the ffmpeg command, or record longer (`VIDEO_DURATION_MS` in the script) for smoother scroll.
- **Site blocks Playwright**: the script already sends a desktop Chrome user-agent; if still blocked, set `headless: false` in the script so you can see what's happening.
- **Don't commit `raw.webm`**: add `public/screenshots/**/raw.webm` to `.gitignore` — it's disposable.
