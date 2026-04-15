'use client';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type StartViewTransition = (cb: () => void) => { finished: Promise<void> };

export function navigateWithTransition(router: AppRouterInstance, href: string) {
  const doc = document as Document & { startViewTransition?: StartViewTransition };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || typeof doc.startViewTransition !== 'function') {
    router.push(href);
    return;
  }

  doc.startViewTransition(() => {
    router.push(href);
  });
}
