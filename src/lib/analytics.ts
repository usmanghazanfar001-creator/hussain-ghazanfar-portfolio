type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;

/**
 * Loads Google Analytics 4 only when VITE_GA_ID is set. With no ID nothing is loaded and
 * every track() call is a no-op, so no analytics code runs by default.
 */
export function initAnalytics(): void {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(..._args: unknown[]) {
    // gtag.js expects the `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent manually on every route change (see ScrollManager).
  window.gtag('config', GA_ID, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

/**
 * Event plan (see docs/analytics-event-plan.md):
 * page_view, view_project, view_service, contact_form_submit, whatsapp_click, email_click, phone_click, cv_download
 */
export function track(event: string, params: Params = {}): void {
  if (typeof window !== 'undefined') window.gtag?.('event', event, params);
}
