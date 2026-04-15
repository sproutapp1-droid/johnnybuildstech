import type { Metadata, Viewport } from 'next';
import { Manrope, DM_Mono, Fraunces, Homemade_Apple } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const homemade = Homemade_Apple({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-homemade',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://johnnybuildstech.com'),
  title: {
    default: 'johnnybuildstech — building websites that feel alive',
    template: '%s · johnnybuildstech',
  },
  description:
    'Bespoke, highly personalised websites for people who hate templates. Hand-built on Vercel with zero monthly hosting cost.',
  openGraph: {
    type: 'website',
    siteName: 'johnnybuildstech',
    url: 'https://johnnybuildstech.com',
    title: 'johnnybuildstech — building websites that feel alive',
    description:
      'Bespoke, highly personalised websites for ADHD brains, solo founders, clinicians and service businesses.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5ECD9',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${homemade.variable} ${dmMono.variable}`}
    >
      <body className="relative min-h-screen bg-bg text-ink">
        <SmoothScroll />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
