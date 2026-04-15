export type Project = {
  slug: string;
  title: string;
  kind: 'app' | 'website';
  year: number;
  category: string;
  tagline: string;
  url?: string;
  cover: string;
  brand: { bg: string; fg: string };
};

// Mirror of content/projects/apps/*.mdx frontmatter. Case study bodies in MDX land in phase 5.
export const APPS: Project[] = [
  {
    slug: 'sprout',
    title: 'Sprout',
    kind: 'app',
    year: 2025,
    category: 'ADHD · Task Management',
    tagline: 'The ADHD app that grows with you.',
    url: 'https://sproutapp.tech',
    cover: '/projects/sprout.png',
    brand: { bg: '#2f7a3a', fg: '#f5fbe9' },
  },
  {
    slug: 'payoff',
    title: 'Payoff Debt Planner',
    kind: 'app',
    year: 2025,
    category: 'Personal Finance · AI Coach',
    tagline: 'Smart debt payoff with AI coaching.',
    url: 'https://www.payoffdebtplanner.com',
    cover: '/projects/payoff.png',
    brand: { bg: '#f4ece0', fg: '#143226' },
  },
  {
    slug: 'skip-or-buy',
    title: 'Skip or Buy',
    kind: 'app',
    year: 2025,
    category: 'Consumer · Decision Making',
    tagline: 'Know the real cost before you buy.',
    url: 'https://skiporbuyapp.com',
    cover: '/projects/skip-or-buy.png',
    brand: { bg: '#8cf0b6', fg: '#0a0a0a' },
  },
  {
    slug: 'tidywell',
    title: 'Tidywell',
    kind: 'app',
    year: 2025,
    category: 'Household · Gamified Chores',
    tagline: 'Your home, on autopilot.',
    url: 'https://www.tidywell-app.com',
    cover: '/projects/tidywell.png',
    brand: { bg: '#e9e2cf', fg: '#2e3a27' },
  },
  {
    slug: 'lapsed',
    title: 'Lapsed',
    kind: 'app',
    year: 2025,
    category: 'Tracking · Life Events',
    tagline: "Track how long it's been since anything.",
    url: 'https://www.lapsed-app.com',
    cover: '/projects/lapsed.png',
    brand: { bg: '#0e1220', fg: '#ff6b4a' },
  },
];

export const WEBSITES: Project[] = [];
