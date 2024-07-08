import { defineConfig } from 'vite';
import globals from 'rollup-plugin-node-globals';

export default defineConfig({
  plugins: [
    // other plugins...
    globals()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  define: {
    'global': {}
  }
});