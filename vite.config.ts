import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // Forward /api/* to the Laravel backend (php artisan serve) so the
        // browser only ever talks to its own origin during development —
        // no CORS preflight, and the Authorization header passes through.
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
        // Media uploads are served from Laravel's public storage disk.
        '/storage': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  };
});
