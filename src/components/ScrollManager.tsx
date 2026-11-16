import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../lib/analytics';

/** Scrolls to #hash targets or resets to top on route change, and sends one page_view per route. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  useEffect(() => {
    // Wait a tick so the page's <Seo> has updated document.title first.
    const t = window.setTimeout(() => track('page_view', { page_path: pathname, page_title: document.title }), 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
