/**
 * Post-build step: writes real, crawlable HTML for every route into dist/, plus sitemap.xml,
 * robots.txt and 404.html. Route data comes from src/lib/routes.ts (same source the app uses).
 * Runs after `vite build` (see package.json "build").
 */
import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.resolve(root, process.env.PRERENDER_DIST || 'dist');

async function envValue(name) {
  if (process.env[name]) return process.env[name];
  for (const f of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    const p = path.join(root, f);
    if (!existsSync(p)) continue;
    const m = (await readFile(p, 'utf8')).match(new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`, 'm'));
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  return '';
}

const siteUrl = ((await envValue('VITE_SITE_URL')) || 'https://www.example.com').replace(/\/$/, '');
if (siteUrl.includes('example.com')) {
  console.warn('\n[prerender] WARNING: VITE_SITE_URL is not set. Canonical URLs and sitemap use https://www.example.com.\n');
}

// Bundle the route data (TypeScript) into a temporary ESM module.
const tmp = path.join(root, 'node_modules', '.prerender-tmp');
await mkdir(tmp, { recursive: true });
const out = path.join(tmp, 'routes.mjs');
await build({
  entryPoints: [path.join(root, 'src/lib/routes.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'error',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    'import.meta.env.DEV': 'false',
    'import.meta.env.VITE_GA_ID': 'undefined',
  },
});
const { allRoutes, homeMeta } = await import(pathToFileURL(out).href);
await rm(tmp, { recursive: true, force: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const abs = (p) => `${siteUrl}${p === '/' ? '/' : p}`;
const absImg = (s) => (s.startsWith('http') ? s : `${siteUrl}${s}`);

function body(meta) {
  const c = meta.content;
  const sections = c.sections
    .map((s) => {
      const paras = (s.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('');
      const items = s.items && s.items.length ? `<ul>${s.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
      return `<h2>${esc(s.heading)}</h2>${paras}${items}`;
    })
    .join('');
  const links = c.links.length ? `<nav aria-label="Site"><ul>${c.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul></nav>` : '';
  return `<div class="prerender"><h1>${esc(c.h1)}</h1><p>${esc(c.lead)}</p>${sections}${links}</div>`;
}

function render(meta) {
  const url = abs(meta.path);
  const image = absImg(meta.image);
  const robots = meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  let h = template;
  const set = (re, val) => {
    if (!re.test(h)) console.warn(`[prerender] pattern not found: ${re}`);
    h = h.replace(re, () => val);
  };
  set(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  set(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(meta.description)}" />`);
  set(/<meta\s+name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`);
  set(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  set(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  set(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  set(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  set(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`);
  set(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(meta.title)}" />`);
  set(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${esc(meta.description)}" />`);
  set(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}" />`);
  const ld = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
  set(/<script type="application\/ld\+json" id="ld-page">[\s\S]*?<\/script>/, `<script type="application/ld+json" id="ld-page">${ld}</script>`);
  set(/<div id="root"><\/div>/, `<div id="root">${body(meta)}</div>`);
  // Non-home pages should not preload the home hero image.
  if (meta.path !== '/') h = h.replace(/\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/, '');
  return h;
}

const routes = allRoutes();
for (const meta of routes) {
  const file = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, render(meta));
}

// 404 page (noindex). Served by Vercel for unknown URLs.
const notFound = {
  path: '/404',
  title: `Page not found | ${homeMeta().title.split(' | ')[0]}`,
  description: 'The page you were looking for could not be found.',
  image: homeMeta().image,
  noindex: true,
  jsonLd: { '@context': 'https://schema.org', '@graph': [] },
  content: { h1: 'Page not found', lead: 'The page you were looking for could not be found.', sections: [], links: [{ href: '/', label: 'Back to home' }] },
};
await writeFile(path.join(dist, '404.html'), render(notFound));

const indexable = routes.filter((r) => !r.noindex);
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
  .map((r) => `  <url><loc>${abs(r.path)}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.7'}</priority></url>`)
  .join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`[prerender] ${routes.length} routes written, ${indexable.length} in sitemap, site URL ${siteUrl}`);
