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

const paperTakeawaysSchema = z.object({
  story: z.string(),
  state: z.string(),
  structure: z.string(),
  question: z.string()
});

const researchQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  status: z.enum(['Open', 'Exploring', 'Reframed', 'Resolved']).default('Open'),
  kind: z.enum(['Research', 'Reading']).default('Research'),
  note: z.string().optional()
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
    aliases: z.array(z.string()).default([]),
    lang: z.enum(['zh', 'en']).default('zh'),
    translationOf: z.string().optional(),
    englishSummary: z.string().optional(),
    paper: paperSchema.optional(),
    readingStatus: z.enum(['Reading', 'Read', 'Revisit', 'Core']).optional(),
    paperTakeaways: paperTakeawaysSchema.optional(),
    researchQuestions: z.array(researchQuestionSchema).default([]),
    references: z.array(referenceSchema).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { notes };
