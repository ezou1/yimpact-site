import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite reads this file to build and to run the dev server.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
