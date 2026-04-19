import { expect, test } from '@playwright/test';

test.describe('smoke — harness is wired', () => {
  test('home page responds', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
  });
});
