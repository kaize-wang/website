import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/i, '').replace(/\.(md|mdx)$/i, '')
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Research', 'Reading', 'Technical', 'Life']).default('Research'),
    tags: z.array(z.string()).default([]),
    collection: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { notes };
