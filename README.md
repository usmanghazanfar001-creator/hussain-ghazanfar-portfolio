# Hussnain Ghazanfar — Architecture Portfolio

React + Vite + TypeScript + Tailwind + Framer Motion. Deployed on Vercel.

## Run

```
npm install
npm run dev
npm run build
```

`npm run build` type-checks, builds, then runs `scripts/prerender.mjs`, which writes crawlable HTML for every page plus `sitemap.xml`, `robots.txt` and `404.html`.

## Before going live

1. In Vercel (Settings → Environment Variables) and in a local `.env`, set `VITE_SITE_URL=https://hussnainghazanfar.vercel.app` (no trailing slash). Without it, canonicals and the sitemap use `example.com`.
2. Google Search Console: DNS verification is not available for a `vercel.app` subdomain. Add a **URL-prefix** property for `https://hussnainghazanfar.vercel.app/` and verify with the **HTML tag** method. The tag is already in `index.html`. Then submit `/sitemap.xml`.
3. Optional: `VITE_GA_ID` (GA4) and `VITE_BING_VERIFICATION`. Nothing loads without them. See `docs/analytics-event-plan.md`.

## Editing content

- `src/data/site.ts` — name, contact details, about text, process, skills. Empty fields (location, socials, CV, form endpoint) stay hidden.
- `src/data/projects.ts` — projects. All current entries are **samples** (`placeholder: true`): they are marked noindex and left out of the sitemap. Replace text and images, set `placeholder: false` to publish.
- `src/data/services.ts` — service pages.
- Contact form: with no `formEndpoint` it opens the visitor's email app addressed to `contact.email`. Add a Formspree-style endpoint for direct sending.

## Images

Add raster images to `public/assets/...` as AVIF + WebP (full and `-sm` variants) and register them in `src/data/assets.ts`. Every image needs real alt text.

## Rights

Original SVG drawings, the OG card and the animations were generated for this site. The two hero images, portrait and logo were supplied by the owner, who should confirm they hold the rights to them.
