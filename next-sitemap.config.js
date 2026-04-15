/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://johnnybuildstech.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
};
