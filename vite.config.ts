import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const vercelHost = env.VERCEL_URL || process.env.VERCEL_URL || '';
  const vercelUrl = vercelHost
    ? vercelHost.startsWith('http')
      ? vercelHost
      : `https://${vercelHost}`
    : '';

  // Priority: APP_URL (Vercel / AI Studio) -> VITE_APP_URL -> VERCEL_URL -> runtime window.location.origin
  // Note: GEMINI_API_KEY is intentionally kept server-side only and never injected into client bundles.
  const resolvedAppUrl = (
    env.APP_URL ||
    process.env.APP_URL ||
    env.VITE_APP_URL ||
    process.env.VITE_APP_URL ||
    vercelUrl
  ).replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __APP_URL__: JSON.stringify(resolvedAppUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

