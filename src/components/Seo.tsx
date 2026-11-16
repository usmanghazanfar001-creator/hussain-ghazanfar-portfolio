import { useEffect } from 'react';
import { abs, type RouteMeta } from '../lib/routes';

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

/** Per-route <head> management for client-side navigation. The same values are prerendered at build time. */
export default function Seo({ meta }: { meta: RouteMeta }) {
  useEffect(() => {
    const url = abs(meta.path);
    const image = meta.image.startsWith('http') ? meta.image : abs(meta.image);
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);
    setCanonical(url);

    let script = document.getElementById('ld-page') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-page';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd);
  }, [meta.path, meta.title, meta.description, meta.image, meta.noindex, meta.jsonLd]);

  return null;
}
