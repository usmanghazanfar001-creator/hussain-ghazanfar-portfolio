import { m, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Per-character rise-in for large display headings (plays on load).
 * Give the heading an aria-label and mark the wrapper aria-hidden.
 */
export function SplitChars({ text, delay = 0, charClassName = '' }: { text: string; delay?: number; charClassName?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  let n = 0;
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {[...w].map((c) => {
            const i = n++;
            return (
              <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <m.span
                  className={`inline-block ${charClassName}`}
                  initial={reduce ? false : { y: '115%', rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: delay + i * 0.03, ease }}
                >
                  {c}
                </m.span>
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.25em]" />}
        </span>
      ))}
    </>
  );
}

/** Per-word masked rise-in that plays when the heading scrolls into view. */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden="true">
      {text.split(' ').map((w, i) => (
        <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
          <m.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease }}
          >
            {w}&nbsp;
          </m.span>
        </span>
      ))}
    </span>
  );
}
