import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Feature modules must go through these two aliases to reach anything
      // outside their own folder — no deep `../../` reaching into another
      // feature's internals. Mirrors how independently-owned micro-frontends
      // would only ever talk to each other through a published package/API.
      '@platform': fileURLToPath(new URL('./src/platform', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
