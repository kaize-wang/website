# Kaize Wang — Personal Website

Source code for my personal academic homepage and notes site.

The site is built with Astro. It combines a restrained academic homepage with a lightweight Markdown-based notes/blog system for research notes, reading notes, technical writing, and longer-form personal writing.

## Main structure

- `src/site.config.ts` — personal information, links, education, and research interests
- `src/pages/` — homepage, research, notes, archive, search, and taxonomy pages
- `src/content/notes/` — Markdown/MDX notes
- `src/styles/global.css` — site-wide visual system
- `public/` — static assets

## Local development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

Deployment will be configured separately after the repository structure is verified.
