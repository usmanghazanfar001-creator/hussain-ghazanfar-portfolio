import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { srcSetOf, type ImageAsset } from '../data/assets';

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
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface RevealImageProps {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
  /** 'contain' shows tall drawings (floor plans) uncropped on a paper background. */
  fit?: 'cover' | 'contain';
}

/** Masked "curtain" reveal for images; the wrapper's aspect ratio is set via className. */
export function RevealImage({ image, className = '', imgClassName = '', sizes, eager, fit = 'cover' }: RevealImageProps) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative block overflow-hidden ${fit === 'contain' ? 'bg-surface' : 'bg-line'} ${className}`}>
      <motion.span
        className="block h-full w-full"
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.img
          src={image.src}
          srcSet={srcSetOf(image)}
          sizes={sizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          style={{ objectPosition: fit === 'cover' ? image.position : undefined }}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
          initial={reduce ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.6, ease }}
        />
      </motion.span>
    </span>
  );
}
