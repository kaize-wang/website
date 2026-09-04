import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const articleEquationStyles = {
  name: 'article-equation-styles',
  hooks: {
    'astro:config:setup': ({ injectScript }) => {
      injectScript('page-ssr', 'import "/src/styles/equation-layout.css";');
    }
  }
};

export default defineConfig({
  site: 'https://kaize-wang.github.io',
  base: '/website',
  integrations: [articleEquationStyles, mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: 'github-dark' }
  }
});
