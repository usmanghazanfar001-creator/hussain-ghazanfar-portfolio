# Hussain Ghazanfar — Architecture & CAD Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide + React Router.
Editorial, minimalist architecture-studio design using the supplied logo and portrait.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist (also regenerates sitemap.xml & robots.txt)
npm run preview    # serve the production build locally
```

Requires Node 18.18+ (Node 20/22 recommended).

## Where to edit things

| What | File |
| --- | --- |
| Name, role, hero/about copy, services, process, skills, **contact details** | `src/data/site.ts` |
| Projects (titles, descriptions, objectives, which images they use) | `src/data/projects.ts` |
| **Every image path** (hero, portrait, logo, all project images) | `src/data/assets.ts` |
| Colors / fonts | `tailwind.config.js` |
| Production domain (canonical, Open Graph, sitemap) | `.env` → `VITE_SITE_URL` |

### Replacing placeholder images
1. Put your file in `public/assets/<folder>/` (`hero`, `architecture`, `autocad-2d`, `autocad-3d`, `map-planning`, `master-planning`, `about`, `icons`).
2. Open `src/data/assets.ts`, change that image's `src` (and `alt`, `width`, `height`).
3. Done — every page that uses it updates.

The 16 placeholder drawings in `public/assets/**.svg` are **original generated placeholders** (not client work, no third-party imagery), each stamped "PLACEHOLDER VISUAL". Only use real images you own or that are licensed / public domain / explicitly cleared for commercial use. Never hot-link Pinterest pages.

### Publishing a real project
In `src/data/projects.ts`: replace the text and images, set `placeholder: false` (the badge disappears). Delete placeholder projects you don't need — the sitemap updates on next build.

### Contact details (all empty until verified)
In `src/data/site.ts` → `contact`: `email`, `phone`, `whatsapp` (digits with country code, e.g. `923001234567`), `linkedin` (full URL), `location`. Empty fields show a visible "Placeholder" tag; the WhatsApp button activates once a number is added.

The contact form validates in the browser, then either:
- POSTs JSON to `contact.formEndpoint` (e.g. a Formspree/Basin/Getform URL), or
- opens the visitor's email app addressed to `contact.email`, or
- (if neither is set) shows a "nothing sent" notice.

### Skill levels
Proficiency bars are hidden. Add `level: 0–100` to a skill in `site.ts` only after the client confirms it.

## Deploy to Vercel

**Option A — GitHub (recommended)**
1. Push this folder to a new GitHub repository.
2. On vercel.com → *Add New → Project* → import the repo. Vercel detects Vite automatically (settings are also in `vercel.json`).
3. Under *Settings → Environment Variables* add `VITE_SITE_URL` = your real domain (e.g. `https://hussainghazanfar.com`).
4. Deploy. Add the custom domain under *Settings → Domains*.

**Option B — CLI**
```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

`vercel.json` already contains the SPA rewrite (so `/projects/...` URLs work on refresh) and long-term caching for `/assets`.

## Before launch checklist
- [ ] Confirm the spelling of the name (**Hussain** per the logo vs **Hussnain** in the brief) — one line in `src/data/site.ts`, plus `index.html` and `public/site.webmanifest`.
- [ ] Set `VITE_SITE_URL`, then rebuild.
- [ ] Add verified contact details and (optionally) a form endpoint.
- [ ] Replace placeholder projects/images; set `placeholder: false`.
- [ ] Fill Experience & Qualifications (or leave as placeholders) — nothing has been invented.
- [ ] Add `sameAs` (LinkedIn etc.) to the JSON-LD in `index.html` once profiles are verified.
- [ ] Run Lighthouse on the deployed URL.

## Supplied reference images
The six images you supplied are in use as **sample** content (optimized WebP, with `-sm` variants for mobile): modern residence (hero + Residential Concept), urban massing model, construction collage, furnished 3D plan, dark 2D plan, and reference 2D plan. They are still flagged `placeholder: true` in `src/data/projects.ts`. Before launch, confirm you own them or have commercial rights. The dark 2D plan carries a visible third-party studio watermark ("STHAAYI") and the reference plan has a "REFERENCE SKETCH" title block — replace both with your own drawings.

## Showreel videos
Two supplied clips are compressed in `public/assets/video/` and listed in `src/data/videos.ts` (lazy-loaded; they only download when played). Both are flagged as samples. The AutoCAD clip shows a third-party "YouTube: adamdereli" credit, so replace it with your own recording unless you have permission to publish it.

## Favicon
Circular favicons are in `public/assets/icons/` plus `public/favicon.ico`. The Apple touch icon is intentionally square because iOS applies its own mask.

## Google Search Console
The verification meta tag is already in `index.html`. After deploying, verify in Search Console, then submit `https://YOUR-DOMAIN/sitemap.xml`.

## Notes
- **SEO:** `index.html` carries full static metadata + Person JSON-LD (only verified facts). Per-page title/description/canonical/Open Graph are set at runtime by `Seo.tsx`. Because this is a client-rendered SPA, social-media crawlers read only the static `index.html` tags; if per-project link previews matter, add pre-rendering later.
- **Contrast:** the brief's muted `#858585` and accent `#B69A70` are too light for small text on `#F5F3EF`, so the site uses darker tones (`muted-strong #666`, `accent-deep #7E6540`) for small text and keeps the original colors for large/decorative use.
- **Fonts** load from Google Fonts (Cormorant Garamond, Inter, IBM Plex Mono). Self-host via `@fontsource` if you need zero third-party requests.
- Animations respect `prefers-reduced-motion`.
