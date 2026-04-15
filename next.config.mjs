import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.sproutapp.tech' },
      { protocol: 'https', hostname: '**.payoffdebtplanner.com' },
      { protocol: 'https', hostname: '**.skiporbuyapp.com' },
      { protocol: 'https', hostname: '**.tidywell-app.com' },
      { protocol: 'https', hostname: '**.lapsed-app.com' },
    ],
  },
};

export default withMDX(config);
