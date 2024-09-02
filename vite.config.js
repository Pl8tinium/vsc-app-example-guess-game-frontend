import { defineConfig } from 'vite';

export default defineConfig({
  base: '/vsc-app-example-guess-game-frontend/',  
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  }
});
