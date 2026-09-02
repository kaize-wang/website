import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const referenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.string(),
  year: z.number(),
  venue: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().url().optional()
});

const paperSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number(),
  venue: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().url().optional()
});

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
    lang: z.enum(['zh', 'en']).default('zh'),
    translationOf: z.string().optional(),
    englishSummary: z.string().optional(),
    paper: paperSchema.optional(),
    references: z.array(referenceSchema).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { notes };
