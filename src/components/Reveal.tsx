import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import type { ImageAsset } from '../data/assets';
import { useReveal } from '../lib/useReveal';
import Picture from './Picture';

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts content in once, when it scrolls into view. */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLDivElement>(80);
  return (
    <m.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </m.div>
  );
}

interface RevealImageProps {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** Above-the-fold image: loads immediately and skips the reveal so it can paint (and count as LCP) at once. */
  eager?: boolean;
  fit?: 'cover' | 'contain';
}

/** Masked "curtain" reveal for images. The wrapper's aspect ratio is set via className. */
export function RevealImage({ image, className = '', imgClassName = '', sizes, eager, fit = 'cover' }: RevealImageProps) {
  const reduce = useReducedMotion();
  const animate = !reduce && !eager;
  const [ref, shown] = useReveal<HTMLSpanElement>(60);
  return (
    <span ref={ref} className={`relative block overflow-hidden ${fit === 'contain' ? 'bg-surface' : 'bg-line'} ${className}`}>
      <m.span
        className="block h-full w-full"
        initial={animate ? { clipPath: 'inset(0 0 100% 0)' } : false}
        animate={shown || !animate ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 1.1, ease }}
      >
        <m.span
          className="block h-full w-full"
          initial={animate ? { scale: 1.1 } : false}
          animate={shown || !animate ? { scale: 1 } : undefined}
          transition={{ duration: 1.6, ease }}
        >
          <Picture image={image} sizes={sizes} eager={eager} fit={fit} className={`h-full w-full ${imgClassName}`} />
        </m.span>
      </m.span>
    </span>
  );
}
