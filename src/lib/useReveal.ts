import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, shown]. `shown` turns true once the element is on screen.
 * Uses IntersectionObserver AND a plain geometry check every 400 ms, so content can never
 * stay hidden if the observer is unavailable or does not fire (some browsers, embeds, screenshots).
 */
export function useReveal<T extends HTMLElement>(margin = 60) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom > 0 && r.top < vh - margin) setShown(true);
    };
    check();
    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) setShown(true);
        },
        { rootMargin: `0px 0px -${margin}px 0px` },
      );
      io.observe(el);
    }
    const id = window.setInterval(check, 400);
    window.addEventListener('scroll', check, { passive: true });
    return () => {
      io?.disconnect();
      window.clearInterval(id);
      window.removeEventListener('scroll', check);
    };
  }, [shown, margin]);

  return [ref, shown] as const;
}
