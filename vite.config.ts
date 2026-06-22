import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' works on GitHub Pages user-pages and via dev server;
// adjust to '/<repo>/' if deploying to a project page.
export default defineConfig({
  plugins: [react()],
  base: './',
});
