import type { Metadata } from 'next';
import Script from 'next/script';
import { Newsreader, Geist, Geist_Mono } from 'next/font/google';
import { LightsOutNav } from '@/components/lightsout/LightsOutNav';
import { LightsOutFooter } from '@/components/lightsout/LightsOutFooter';
import { Starfield } from '@/components/lightsout/Starfield';
import './lightsout.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['300', '400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const TITLE = 'Lights Out: a phone curfew for sleep';
const SHARE =
  'Shield your phone after dark, wind down with the moon, and wake up to a kinder morning. Built on CBT-I. No account, no cloud, no analytics, ever.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    'Lights Out is a bedtime app that shields your phone against distracting apps after dark and pairs it with a calm, CBT-I-based wind-down. By day, the same gentle blocking runs your focus hours. Fully offline. Your sleep data never leaves your phone.',
  alternates: { canonical: 'https://johnnybuildstech.com/apps/lightsout' },
  openGraph: {
    title: TITLE,
    description: SHARE,
    type: 'website',
    url: 'https://johnnybuildstech.com/apps/lightsout',
    siteName: 'Lights Out',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE },
};

export default function LightsOutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-lightsout
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <Starfield />
      <LightsOutNav />
      <main className="relative" style={{ zIndex: 1 }}>
        {children}
      </main>
      <LightsOutFooter />
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
    </div>
  );
}
