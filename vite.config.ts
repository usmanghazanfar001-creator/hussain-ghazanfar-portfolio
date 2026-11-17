import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Replaces %SITE_URL% in index.html with VITE_SITE_URL (falls back to a clearly-fake
 * example domain) and injects optional verification tags only when their env var is set.
 * No tokens or IDs are ever invented.
 */
function htmlEnv(env: Record<string, string>): Plugin {
  const site = (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, '');
  return {
    name: 'html-env',
    // order: 'pre' — must run BEFORE Vite parses the HTML, otherwise it tries to decode the
    // literal "%SITE_URL%" in href/content attributes and fails with "URI malformed".
    transformIndexHtml: {
      order: 'pre',
      handler(html: string) {
      const extra: string[] = [];
      if (env.VITE_BING_VERIFICATION) {
        extra.push(`<meta name="msvalidate.01" content="${env.VITE_BING_VERIFICATION}" />`);
      }
      return html.split('%SITE_URL%').join(site).replace('<!--ENV_META-->', extra.join('\n    '));
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), htmlEnv(env)],
    build: {
      target: 'es2020',
      // Hashed bundles go to /static so /assets (your own images) can use a shorter cache policy.
      assetsDir: 'static',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
