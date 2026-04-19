import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/apps',
  '/services',
  '/about',
  '/contact',
  '/notes',
  '/notes/handmade-web-manifesto',
  '/notes/eleven-parts-of-a-landing-page',
] as const;

test.describe('no horizontal overflow at 360×640', () => {
  for (const route of ROUTES) {
    test(`${route} — document does not scroll horizontally`, async ({
      page,
    }) => {
      await page.goto(route);
      // Give fonts + motion a beat to settle.
      await page.waitForTimeout(600);

      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      // 1px of sub-pixel slack to absorb rounding noise.
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
    });
  }

  test('/contact rules card stays within viewport', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(400);

    // The rules card uses max-w-[320px] + a transform rotate. On a 360px
    // viewport with any horizontal padding the rotated corner can poke out.
    const overflow = await page.evaluate(() => {
      const card = Array.from(document.querySelectorAll('aside, div')).find(
        (el) => /the rules|rules of engagement/i.test(el.textContent ?? ''),
      ) as HTMLElement | undefined;
      if (!card) return { found: false };
      const rect = card.getBoundingClientRect();
      return {
        found: true,
        left: rect.left,
        right: rect.right,
        vw: window.innerWidth,
      };
    });
    expect(overflow.found).toBe(true);
    if (overflow.found) {
      expect(overflow.left).toBeGreaterThanOrEqual(-1);
      expect(overflow.right).toBeLessThanOrEqual((overflow.vw ?? 0) + 1);
    }
  });
});
