import { useEffect } from 'react';
import { brand } from '../data/assets';
import { site } from '../data/site';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Per-route <head> management for the SPA (title, description, canonical, Open Graph, JSON-LD). */
export default function Seo({ title, description = site.seo.description, path = '/', image = brand.og, jsonLd }: SeoProps) {
  useEffect(() => {
    const base = site.url.replace(/\/$/, '');
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.seo.titleSuffix}`;
    const url = `${base}${path === '/' ? '/' : path}`;
    // Social crawlers need a raster image: fall back to the brand card for SVG placeholders.
    const raster = image.endsWith('.svg') ? brand.og : image;
    const abs = raster.startsWith('http') ? raster : `${base}${raster}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', abs);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', abs);
    setMeta('name', 'robots', path === '/404' ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setCanonical(url);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageJsonld = 'true';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [title, description, path, image, jsonLd]);

  return null;
}
