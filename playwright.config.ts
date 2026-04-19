import { defineConfig, devices } from '@playwright/test';

/**
 * Mobile-oriented E2E harness.
 * `webServer` runs `pnpm dev` against a compiled-on-demand Next dev server.
 * Tests are split by project so we can run reduced-motion and mobile-viewport
 * assertions in isolation.
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      // Reduced-motion preference is applied per-test via
      // page.emulateMedia({ reducedMotion: 'reduce' }) — it isn't a
      // supported project-level option in this Playwright version.
      name: 'mobile-reduced-motion',
      testMatch: /reduced-motion\.spec\.ts/,
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'mobile-layout',
      testMatch: /(mobile-layout|smoke)\.spec\.ts/,
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'mobile-small',
      testMatch: /(mobile-small|gallery-mobile)\.spec\.ts/,
      use: {
        viewport: { width: 360, height: 640 },
        userAgent:
          'Mozilla/5.0 (Linux; Android 12; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
      },
    },
  ],
});
