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

const updateSchema = z.object({
  date: z.coerce.date(),
  note: z.string()
});

const categorySchema = z
  .enum(['Research', 'Paper Reading', 'Learning', 'Essay', 'Reading', 'Technical', 'Life'])
  .transform(value => {
    if (value === 'Reading') return 'Paper Reading' as const;
    if (value === 'Technical') return 'Learning' as const;
    if (value === 'Life') return 'Essay' as const;
    return value;
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
    updates: z.array(updateSchema).default([]),
    category: categorySchema.default('Research'),
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

const ideaMilestoneSchema = z.object({
  text: z.string(),
  textZh: z.string().optional(),
  done: z.boolean().default(false)
});

const ideaProgressSchema = z.object({
  date: z.coerce.date(),
  note: z.string(),
  noteZh: z.string().optional()
});

const ideas = defineCollection({
  loader: glob({
    base: './src/content/ideas',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/i, '').replace(/\.(md|mdx)$/i, '')
  }),
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),
    summary: z.string(),
    summaryZh: z.string().optional(),
    area: z.enum(['Research', 'Build', 'Life', 'Writing', 'Learning']).default('Build'),
    stage: z.enum(['Spark', 'Exploring', 'Active', 'Realized', 'Parked']).default('Spark'),
    createdDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    nextAction: z.string().optional(),
    nextActionZh: z.string().optional(),
    whyNow: z.string().optional(),
    whyNowZh: z.string().optional(),
    milestones: z.array(ideaMilestoneSchema).default([]),
    progress: z.array(ideaProgressSchema).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { notes, ideas };
