import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { hero } from '../data/assets';
import { srcSetOf } from '../data/assets';
import { heroCopy, site } from '../data/site';
import { SplitChars } from './AnimatedText';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper" data-dark>
      <motion.img
        src={hero.src}
        srcSet={srcSetOf(hero)}
        sizes="100vw"
        fetchPriority="high"
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: hero.position }}
        initial={reduce ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" aria-hidden="true" />

      <div className="container-page flex min-h-[100svh] flex-col justify-end pb-12 pt-36 md:pb-16">
        <motion.p {...rise(0.2)} className="label mb-8 flex items-center gap-4 text-accent">
          <span className="h-px w-12 bg-accent" aria-hidden="true" />
          {heroCopy.eyebrow}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,10vw,9rem)] font-medium leading-[0.9] tracking-tight" aria-label={heroCopy.headline.join(' ')}>
          {heroCopy.headline.map((line, i) => (
            <span key={line} aria-hidden="true" className={`block pb-[0.08em] ${i === 1 ? 'italic' : ''}`}>
              <SplitChars text={line} delay={0.35 + i * 0.35} charClassName={i === 1 ? 'text-shimmer' : ''} />
            </span>
          ))}
        </h1>

        <motion.p {...rise(0.9)} className="mt-8 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
          {heroCopy.text}
        </motion.p>

        <motion.div {...rise(1.05)} className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn btn-light">
            Explore Projects <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          {...rise(1.25)}
          className="mt-16 flex flex-col justify-between gap-8 border-t border-paper/20 pt-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="label mt-2 max-w-md leading-relaxed text-paper/70">
              {[site.role, ...site.specialties].join(' | ')}
            </p>
          </div>
          <a href="#about" className="label group flex items-center gap-3 text-paper/80 transition-colors hover:text-accent" aria-label="Scroll to About">
            Scroll
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 group-hover:border-accent">
              <ChevronDown size={16} className={reduce ? '' : 'animate-bounce'} aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
