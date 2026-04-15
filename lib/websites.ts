export type WebsiteWork = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: string;
  url: string;
  tagline: string;
  /** Poster image — shown instantly, used as video poster, or as still fallback */
  cover?: string;
  /** Optional short looping preview video (webm preferred, mp4 fallback accepted) */
  preview?: string;
};

export const WEBSITES: WebsiteWork[] = [
  {
    slug: 'ygan-consulting',
    title: 'YGAN Consulting',
    client: 'YGAN',
    year: 2025,
    category: 'Consulting · Service',
    url: 'https://www.yganconsulting.com/',
    tagline: 'Quiet confidence for a young, hungry consulting practice.',
    cover: '/screenshots/ygan-consulting/poster.jpg',
    preview: '/screenshots/ygan-consulting/hero.webm',
  },
  {
    slug: 'occ-health-revision',
    title: 'Occ Health Revision',
    client: 'Occ Health Revision',
    year: 2025,
    category: 'Medical Education',
    url: 'https://occhealthrevision.co.uk/',
    tagline: 'A revision platform that made dense syllabus content feel human.',
    cover: '/screenshots/occ-health-revision/poster.jpg',
    preview: '/screenshots/occ-health-revision/hero.webm',
  },
  {
    slug: 'adhd-mentor',
    title: 'ADHD Mentor',
    client: 'C. Hollywood',
    year: 2025,
    category: 'Coaching · Landing',
    url: 'https://adhdmentor-chollywood.com/',
    tagline: 'Warm, focused landing — built for ADHD brains by an ADHD brain.',
    cover: '/screenshots/adhd-mentor/poster.jpg',
    preview: '/screenshots/adhd-mentor/hero.webm',
  },
  {
    slug: 'payoff-debt-planner',
    title: 'Payoff Debt Planner',
    client: 'Payoff',
    year: 2025,
    category: 'App · Marketing',
    url: 'https://www.payoffdebtplanner.com/',
    tagline: 'A finance app landing that feels calm, legible and quietly hopeful.',
    cover: '/screenshots/payoff-debt-planner/poster.jpg',
    preview: '/screenshots/payoff-debt-planner/hero.webm',
  },
  {
    slug: 'tidywell',
    title: 'Tidywell',
    client: 'Tidywell',
    year: 2025,
    category: 'App · Marketing',
    url: 'https://www.tidywell-app.com/',
    tagline: 'Marketing site for a home-care app — soft edges, real breathing room.',
    cover: '/screenshots/tidywell/poster.jpg',
    preview: '/screenshots/tidywell/hero.webm',
  },
];
