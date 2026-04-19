import { expect, test } from '@playwright/test';

// Deliberately lives under the mobile-small project (testMatch adjusted
// in playwright.config.ts) — runs at 360×640 with touch + mobile UA.
test.describe('gallery cards at 360×640', () => {
  test('inner frame does not clip its contents vertically', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForTimeout(600);

    const verdicts = await page.evaluate(() => {
      const frames = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-gallery-card-inner]',
        ),
      );
      return frames.map((frame, i) => {
        // Inner frame has overflow: hidden + h-full. If the content grows
        // taller than the frame (= 100vh minus article padding), anything
        // past the fold is visually cut. Playwright can read scrollHeight
        // even when overflow is hidden.
        const clipped = frame.scrollHeight - frame.clientHeight;
        return {
          i,
          clipped,
          clientH: frame.clientHeight,
          scrollH: frame.scrollHeight,
        };
      });
    });

    // No card may clip more than 1px (sub-pixel rounding slack).
    for (const v of verdicts) {
      expect(
        v.clipped,
        `card ${v.i}: ${v.scrollH}px content in ${v.clientH}px frame`,
      ).toBeLessThanOrEqual(1);
    }
  });
});
