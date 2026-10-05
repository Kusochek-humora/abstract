import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import htmlInclude from './src/plugins/html-include.js';

export default defineConfig({
  // относительные пути в сборке: работает из любой папки (GitHub Pages, любой хостинг)
  base: './',
  // для GitHub Pages «main + /docs»: в build ниже добавить outDir: 'docs', emptyOutDir: true
  plugins: [htmlInclude()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // многостраничный сайт: каждая страница — свой html в корне
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        catalog: fileURLToPath(new URL('./catalog.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        product: fileURLToPath(new URL('./product.html', import.meta.url)),
        contacts: fileURLToPath(new URL('./contacts.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
        project: fileURLToPath(new URL('./project.html', import.meta.url)),
        partnership: fileURLToPath(new URL('./partnership.html', import.meta.url)),
      },
    },
  },
  server: {
    open: true,
  },
});
