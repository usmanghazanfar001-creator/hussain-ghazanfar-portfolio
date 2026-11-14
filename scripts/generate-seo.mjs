// Runs automatically before `npm run build`.
// Writes public/sitemap.xml and public/robots.txt using VITE_SITE_URL and the project slugs.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readEnvUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  try {
    const env = readFileSync(resolve(root, '.env'), 'utf8');
    const m = env.match(/^VITE_SITE_URL=(.+)$/m);
    if (m) return m[1].trim();
  } catch {}
  return 'https://www.example.com';
}

const site = readEnvUrl().replace(/\/$/, '');
const projectsSrc = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8');
const slugs = [...projectsSrc.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${site}/`, priority: '1.0' },
  ...slugs.map((s) => ({ loc: `${site}/projects/${s}`, priority: '0.7' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`SEO files written for ${site} (${urls.length} URLs)`);
