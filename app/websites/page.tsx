import type { Metadata } from 'next';
import { NitroHero } from '@/components/nitro/NitroHero';
import { EmptyStatePanel } from '@/components/nitro/EmptyStatePanel';
import { RotatingText } from '@/components/nitro/RotatingText';

export const metadata: Metadata = {
  title: 'Websites',
  description:
    'Website case studies — landing pages and marketing sites built around each product.',
};

export default function WebsitesPage() {
  return (
    <>
      <NitroHero
        kicker="Hey, I'm Johnny — a product builder"
        viewTransitionName="triage-websites"
        headline={
          <>
            a product builder <br />
            with focus on{' '}
            <RotatingText
              className="text-accent"
              phrases={[
                'interactive websites',
                'marketing sites',
                'launch pages',
                'brand systems',
              ]}
            />
          </>
        }
        count="drafts in progress · q3 2026"
      />
      <EmptyStatePanel />
    </>
  );
}
