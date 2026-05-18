import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Serif_4, Caveat, IBM_Plex_Mono } from 'next/font/google';
import { PebbleNav } from '@/components/pebble/PebbleNav';
import { PebbleFooter } from '@/components/pebble/PebbleFooter';
import './pebble.css';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  axes: ['opsz'],
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-caveat',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pebble — a quiet symptom tracker for chronic illness',
  description:
    "Pebble is a beautifully simplistic symptom tracker for chronic illness and ADHD/AuDHD. Log in 30 seconds. Walk into your appointment with a one-page brief your doctor reads in 60. Data never leaves your phone.",
  alternates: { canonical: 'https://johnnybuildstech.com/apps/pebble' },
  openGraph: {
    title: 'Pebble — a quiet symptom tracker for chronic illness',
    description:
      'Log how you feel in under a minute. Before appointments, Pebble prints a one-page brief that reads like a human wrote it. No accounts. No cloud. No analytics, ever.',
    type: 'website',
    url: 'https://johnnybuildstech.com/apps/pebble',
  },
};

export default function PebbleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-pebble
      className={`${sourceSerif.variable} ${caveat.variable} ${plexMono.variable}`}
    >
      <div className="pebble-dotgrid" aria-hidden />
      <PebbleNav />
      <main className="relative z-10">{children}</main>
      <PebbleFooter />
      {/* Tally widget — used by WaitlistForm to open the form popup */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
