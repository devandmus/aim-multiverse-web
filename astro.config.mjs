// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import prefetch from "@astrojs/prefetch";


// https://astro.build/config
export default defineConfig({
  integrations: [prefetch()],
  output: 'static',
  site: 'https://andres-maldonado.com',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@lib": "/src/lib"
      }
    }
  },
  markdown: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});