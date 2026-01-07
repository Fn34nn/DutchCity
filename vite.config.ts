import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This ensures assets are linked relatively (./assets/...) 
  // instead of absolutely (/assets/...), allowing the app to work 
  // in a GitHub Pages subdirectory (e.g. username.github.io/repo-name/)
  base: './', 
});