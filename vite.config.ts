import { defineConfig } from 'vite';

export default defineConfig({
  base: '/nightfall-monster-rpg/',
  server: {
    port: 3000,
    open: false
  },
  build: {
    target: 'esnext'
  }
});
