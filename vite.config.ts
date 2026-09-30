import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
// every asset and route needs that prefix. The workflow sets VITE_BASE; the
// default suits a local `npm run build`. For a custom domain or a user page,
// set VITE_BASE=/ instead.
const base = process.env.VITE_BASE ?? '/yimpact-site/';

// GitHub Pages has no server-side rewrite, so a deep link like /team would
// 404. Pages serves 404.html for any unknown path, so shipping a copy of
// index.html under that name hands the request to the router instead.
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    // writeBundle runs after Vite has written index.html to disk.
    writeBundle(options) {
      const outDir = options.dir ?? resolve(process.cwd(), 'dist');
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

// Vite reads this file to build and to run the dev server.
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), spaFallback()],
});
