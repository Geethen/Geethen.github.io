import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is crucial for GitHub Pages.
  // It sets the base path to your repository name if usually defined in package.json, 
  // or './' to make all assets relative.
  base: './', 
});