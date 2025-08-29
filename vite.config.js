// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './app/public',
  build: {
    rollupOptions: {
      input: './app/public/index.html',
    },
  },
});