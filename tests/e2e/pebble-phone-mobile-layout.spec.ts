import { test, expect } from '@playwright/test';

test('pebble mobile phone mockup sections', async ({ page }) => {
  await page.goto('/apps/pebble', { waitUntil: 'networkidle' });

  const phones = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('div'));
    const matches = all.filter((el) => {
      const s = el.getAttribute('style') || '';
      return s.includes('9 / 19.5') || s.includes('9/19.5');
    });
    return matches.map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        top: r.top + window.scrollY,
        width: r.width,
        height: r.height,
      };
    });
  });
  console.log('phones:', JSON.stringify(phones, null, 2));
  expect(phones.length).toBeGreaterThan(0);

  for (const p of phones) {
    await page.evaluate((y) => window.scrollTo(0, y - 80), p.top);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `test-results/pebble-phone-${p.i}.png` });
  }
});
