import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

export const notes = defineDocs({
  dir: 'content/notes',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      description: z.string().optional(),
      cover: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

export const projects = defineDocs({
  dir: 'content/projects',
  docs: {
    schema: frontmatterSchema.extend({
      slug: z.string(),
      kind: z.enum(['app', 'website']),
      year: z.number(),
      category: z.string(),
      tagline: z.string(),
      brand: z.object({
        bg: z.string(),
        fg: z.string(),
      }),
      url: z.string().optional(),
      cover: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark-default' }]],
  },
});
