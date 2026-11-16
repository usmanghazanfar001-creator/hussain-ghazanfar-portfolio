/**
 * ROUTE METADATA — single source of truth for titles, descriptions, canonical paths and
 * JSON-LD. Used by the pages at runtime (Seo.tsx) AND by scripts/prerender.mjs at build time,
 * so crawlers and visitors always see the same data.
 */
import { brand } from '../data/assets';
import { categoryLabel, projects, TBP, type Project } from '../data/projects';
import { services, type Service } from '../data/services';
import { heroCopy, site } from '../data/site';

export interface Section {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  /** Sample (placeholder) projects are kept out of search results until real content is added. */
  noindex: boolean;
  jsonLd: Record<string, unknown>;
  /** Plain-text content used for the prerendered HTML that crawlers read before JavaScript runs. */
  content: { h1: string; lead: string; sections: Section[]; links: { href: string; label: string }[] };
}

export const abs = (path: string) => `${site.url}${path === '/' ? '/' : path}`;
const absImage = (src: string) => (src.startsWith('http') ? src : `${site.url}${src}`);
const personRef = { '@id': `${site.url}/#person` };
const websiteRef = { '@id': `${site.url}/#website` };

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

const webPage = (path: string, title: string, description: string) => ({
  '@type': 'WebPage',
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name: title,
  description,
  isPartOf: websiteRef,
  about: personRef,
  inLanguage: 'en',
});

const graph = (...nodes: Record<string, unknown>[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

const serviceLinks = () => services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }));
const projectLinks = () => projects.map((p) => ({ href: `/projects/${p.slug}`, label: p.title }));

export function homeMeta(): RouteMeta {
  return {
    path: '/',
    title: site.seo.title,
    description: site.seo.description,
    image: brand.og,
    noindex: false,
    jsonLd: graph(webPage('/', site.seo.title, site.seo.description)),
    content: {
      h1: `${heroCopy.headline.join(' ')} — ${site.name}`,
      lead: heroCopy.text,
      sections: [
        { heading: 'Services', items: services.map((s) => `${s.title}: ${s.short}`) },
        { heading: 'Projects', paragraphs: ['Sample project pages showing how architectural design, AutoCAD drawings, visualization and planning work is presented.'] },
      ],
      links: [...serviceLinks(), ...projectLinks()],
    },
  };
}

export function serviceMeta(s: Service): RouteMeta {
  const path = `/services/${s.slug}`;
  const title = `${s.seoTitle} | ${site.name}`;
  return {
    path,
    title,
    description: s.seoDescription,
    image: brand.og,
    noindex: false,
    jsonLd: graph(
      webPage(path, title, s.seoDescription),
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Services', path: '/#services' }, { name: s.title, path }]),
      { '@type': 'Service', '@id': `${abs(path)}#service`, name: s.title, description: s.seoDescription, serviceType: s.title, provider: personRef, url: abs(path) },
    ),
    content: {
      h1: s.title,
      lead: s.short,
      sections: [
        { heading: 'Overview', paragraphs: s.intro },
        { heading: 'What this includes', items: s.points },
        { heading: 'Typical deliverables', items: s.deliverables },
      ],
      links: [{ href: '/', label: 'Home' }, ...serviceLinks()],
    },
  };
}

export function projectMeta(p: Project): RouteMeta {
  const path = `/projects/${p.slug}`;
  const title = `${p.title} — ${categoryLabel(p.category)} | ${site.name}`;
  const image = p.images.main.src.endsWith('.svg') ? brand.og : p.images.main.src;
  return {
    path,
    title,
    description: p.summary,
    image,
    noindex: p.placeholder,
    jsonLd: graph(
      webPage(path, title, p.summary),
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/#projects' }, { name: p.title, path }]),
      { '@type': 'CreativeWork', '@id': `${abs(path)}#work`, name: p.title, description: p.summary, genre: categoryLabel(p.category), creator: personRef, image: absImage(image), url: abs(path) },
    ),
    content: {
      h1: p.title,
      lead: p.summary,
      sections: [
        { heading: 'Project overview', paragraphs: [p.overview] },
        { heading: 'Design objectives', items: p.objectives },
        { heading: 'Project details', items: p.details.filter((d) => d.value !== TBP).map((d) => `${d.label}: ${d.value}`) },
      ],
      links: [{ href: '/', label: 'Home' }, ...projectLinks()],
    },
  };
}

export function allRoutes(): RouteMeta[] {
  return [homeMeta(), ...services.map(serviceMeta), ...projects.map(projectMeta)];
}
