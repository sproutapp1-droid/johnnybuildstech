'use client';

/* Waitlist capture, wired to Tally.
 *
 * Single journal-stamp button that opens the Tally popup. The user
 * types their email inside the Tally modal (Tally's free tier
 * doesn't expose a reliable field-name for prefill, so we collect
 * the email there instead of double-collecting on our page).
 *
 * On submission we hear Tally's `Tally.FormSubmitted` postMessage
 * and swap our UI to the quiet success line. */

const TALLY_FORM_ID = '9qRRO5';
const APP_STORE_URL =
  'https://apps.apple.com/us/app/pebble-symptom-tracker/id6772501410';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Status = 'idle' | 'opening' | 'ok';

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: 'modal' | 'drawer-left' | 'drawer-right';
          width?: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          overlay?: boolean;
          emoji?: { text: string; animation: string };
          autoClose?: number;
          hiddenFields?: Record<string, string>;
          onOpen?: () => void;
          onClose?: () => void;
          onPageView?: (page: number) => void;
          onSubmit?: (payload: unknown) => void;
        },
      ) => void;
      closePopup: (formId: string) => void;
    };
  }
}

export function WaitlistForm({ surface = 'hero' }: { surface?: 'hero' | 'footer' }) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = typeof e.data === 'string' ? e.data : '';
      if (data.includes('Tally.FormSubmitted')) {
        setStatus('ok');
      }
      if (data.includes('Tally.PopupClosed')) {
        setStatus((s) => (s === 'ok' ? 'ok' : 'idle'));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  function onClick() {
    if (!window.Tally?.openPopup) {
      // script not ready yet — try again shortly
      setTimeout(onClick, 250);
      return;
    }
    setStatus('opening');
    window.Tally.openPopup(TALLY_FORM_ID, {
      layout: 'modal',
      width: 500,
      hideTitle: false,
      overlay: true,
      onSubmit: () => setStatus('ok'),
      onClose: () => setStatus((s) => (s === 'ok' ? 'ok' : 'idle')),
    });
  }

  const isFooter = surface === 'footer';

  return (
    <div
      className="relative w-full"
      style={{ maxWidth: 460, marginLeft: isFooter ? 'auto' : undefined, marginRight: isFooter ? 'auto' : undefined }}
    >
      <AnimatePresence mode="wait">
        {status === 'ok' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pebble-serif"
            style={{
              color: 'var(--pebble-ink)',
              fontSize: 19,
              lineHeight: 1.5,
              textAlign: isFooter ? 'center' : 'left',
            }}
          >
            <p>saved. i&rsquo;ll write to you when pebble is ready.</p>
            <p
              className="pebble-hand mt-3"
              style={{ color: 'var(--pebble-ink-muted)', fontSize: 24, fontStyle: 'italic' }}
            >
              pebble
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={isFooter ? 'flex flex-col items-center' : 'flex flex-col items-start'}
          >
            {/* primary — iPhone is live on the App Store */}
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-label="download pebble on the app store"
              className="pebble-hand relative inline-flex items-center justify-center gap-3"
              style={{
                color: 'var(--pebble-ink)',
                cursor: 'pointer',
                fontSize: 38,
                lineHeight: 1,
                padding: '20px 36px',
                background: 'transparent',
                textDecoration: 'none',
              }}
            >
              {/* journal-stamp rules above + below */}
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0"
                style={{ height: 1.5, background: 'var(--pebble-ink)', opacity: 0.85 }}
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-0"
                style={{ height: 1.5, background: 'var(--pebble-ink)', opacity: 0.85 }}
              />
              {/* subtle terracotta wash on hover */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'var(--pebble-terracotta)' }}
              />
              <svg
                aria-hidden
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative flex-none"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="relative">on the app store</span>
            </motion.a>

            {/* secondary — Android isn't out yet, so keep the waitlist */}
            <button
              type="button"
              onClick={onClick}
              disabled={status === 'opening'}
              className="pebble-serif mt-6 inline-flex items-center gap-1.5 text-[16px]"
              style={{
                color: 'var(--pebble-terracotta)',
                cursor: status === 'opening' ? 'wait' : 'pointer',
                background: 'transparent',
                border: 'none',
                padding: 0,
              }}
            >
              {status === 'opening' ? 'opening…' : 'on android? join the waitlist'}
              <span aria-hidden>→</span>
            </button>

            <p
              className="pebble-serif mt-4 text-[14px] italic"
              style={{
                color: 'var(--pebble-ink-muted)',
                textAlign: isFooter ? 'center' : 'left',
                maxWidth: '38ch',
              }}
            >
              one email when android lands. no marketing. unsubscribe with one click.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
