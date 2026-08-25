'use client';

/* Both stores, as two journal stamps.
 *
 * This was `WaitlistForm`: an App Store stamp with "on android? join the
 * waitlist" underneath, wired to a Tally popup. Android was approved on
 * 2026-08-25, so there is nothing left to wait for and the Tally machinery,
 * the success line and the "one email when android lands" promise have all
 * gone with it.
 *
 * Two equal stamps rather than a primary and a secondary: with both stores
 * live there is no longer a right guess to make about the reader's phone. */

import { motion } from 'motion/react';

const APP_STORE_URL =
  'https://apps.apple.com/us/app/pebble-symptom-tracker/id6772501410';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=app.pebble.tracker';

const EASE = [0.16, 1, 0.3, 1] as const;

function AppleGlyph() {
  return (
    <svg aria-hidden width={28} height={28} viewBox="0 0 24 24" fill="currentColor" className="relative flex-none">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg aria-hidden width={28} height={28} viewBox="0 0 24 24" fill="currentColor" className="relative flex-none">
      <path d="M3.6 2.3C3.2 2.6 3 3 3 3.7v16.6c0 .7.2 1.1.6 1.4l9.2-9.7L3.6 2.3zm10.8 10.4l2.7 2.8-10.2 5.9 7.5-8.7zm4.6-2.3l-2.6 1.5-3-3.2 3-3.1 2.6 1.5c1 .6 1 1.7 0 2.3zM5.2 2l10 5.8-2.7 2.8L5.2 2z" />
    </svg>
  );
}

/** One journal stamp: rules above and below, terracotta wash on hover. */
function Stamp({
  href,
  label,
  children,
  glyph,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  glyph: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE }}
      aria-label={label}
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
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.08 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--pebble-terracotta)' }}
      />
      {glyph}
      <span className="relative">{children}</span>
    </motion.a>
  );
}

export function StoreButtons({ surface = 'hero' }: { surface?: 'hero' | 'footer' }) {
  const isFooter = surface === 'footer';

  return (
    <div
      className="relative w-full"
      style={{
        maxWidth: 460,
        marginLeft: isFooter ? 'auto' : undefined,
        marginRight: isFooter ? 'auto' : undefined,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`flex flex-col gap-4 ${isFooter ? 'items-center' : 'items-start'}`}
      >
        <Stamp href={APP_STORE_URL} label="download pebble on the app store" glyph={<AppleGlyph />}>
          on the app store
        </Stamp>
        <Stamp href={PLAY_STORE_URL} label="get pebble on google play" glyph={<PlayGlyph />}>
          on google play
        </Stamp>

        <p
          className="pebble-serif mt-1 text-[14px] italic"
          style={{
            color: 'var(--pebble-ink-muted)',
            textAlign: isFooter ? 'center' : 'left',
            maxWidth: '38ch',
          }}
        >
          free to try. no account, no cloud, nothing leaves your phone.
        </p>
      </motion.div>
    </div>
  );
}
