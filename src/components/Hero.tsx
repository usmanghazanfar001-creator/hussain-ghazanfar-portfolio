import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Pause, Play } from 'lucide-react';
import { heroSlides } from '../data/assets';
import { heroCopy, site } from '../data/site';
import { SplitChars } from './AnimatedText';
import Picture from './Picture';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  // The second slide is only mounted after the first has had time to load, so it never competes with the LCP image.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduce || !playing || !ready) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % heroSlides.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, [reduce, playing, ready]);

  const rise = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  const select = (i: number) => {
    setReady(true);
    setIndex(i);
  };

  return (
    <section id="top" aria-label="Introduction" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper" data-dark>
      <div className="absolute inset-0 -z-20">
        {heroSlides.map((s, i) => {
          if (i > 0 && !ready) return null;
          const active = i === index;
          return (
            <div
              key={s.id}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${active ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className={`h-full w-full ${active && !reduce ? 'hero-zoom' : ''}`}>
                <Picture image={s.image} eager={i === 0} sizes="100vw" className="h-full w-full" alt={active ? s.image.alt : ''} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/5" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" aria-hidden="true" />

      <div className="container-page flex min-h-[100svh] flex-col justify-end pb-10 pt-36 md:pb-14">
        <m.p {...rise(0.2)} className="label mb-8 flex items-center gap-4 text-accent">
          <span className="h-px w-12 bg-accent" aria-hidden="true" />
          {heroCopy.eyebrow}
        </m.p>

        <h1
          aria-label={heroCopy.headline.join(' ')}
          className="font-display text-[clamp(2.7rem,8.2vw,8.5rem)] font-medium leading-[0.92] tracking-tight"
        >
          {heroCopy.headline.map((line, i) => (
            <span key={line} aria-hidden="true" className={`block pb-[0.08em] ${i === 1 ? 'italic' : ''}`}>
              <SplitChars text={line} delay={0.3 + i * 0.4} charClassName={i === 1 ? 'text-shimmer' : ''} />
            </span>
          ))}
        </h1>

        <m.p {...rise(1.0)} className="mt-6 font-display text-2xl italic text-accent md:text-3xl">
          {site.tagline}
        </m.p>
        <m.p {...rise(1.1)} className="mt-4 max-w-xl text-base leading-relaxed text-paper/85 md:text-lg">
          {heroCopy.text}
        </m.p>

        <m.div {...rise(1.25)} className="mt-9 flex flex-wrap gap-4">
          <a href="#projects" className="btn btn-light">
            Explore Projects <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            Get in Touch
          </a>
        </m.div>

        <m.div {...rise(1.4)} className="mt-14 flex flex-col justify-between gap-8 border-t border-paper/25 pt-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="label mt-2 max-w-md leading-relaxed text-paper/75">{[site.role, ...site.specialties].join(' | ')}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3" role="group" aria-label="Hero images">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show image ${i + 1}: ${s.label}`}
                  aria-pressed={i === index}
                  className="group flex items-center gap-2 py-3"
                >
                  <span className={`block h-px transition-all duration-500 ${i === index ? 'w-12 bg-accent' : 'w-6 bg-paper/50 group-hover:bg-paper'}`} />
                  <span className={`label !text-[10px] transition-colors ${i === index ? 'text-accent' : 'text-paper/60'}`}>0{i + 1}</span>
                </button>
              ))}
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pause hero slideshow' : 'Play hero slideshow'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 transition-colors hover:border-accent hover:text-accent"
                >
                  {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                </button>
              )}
            </div>
            <a href="#projects" className="label group flex items-center gap-3 text-paper/85 transition-colors hover:text-accent" aria-label="Scroll to projects">
              Scroll
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 group-hover:border-accent">
                <ChevronDown size={16} className={reduce ? '' : 'animate-bounce'} aria-hidden="true" />
              </span>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
