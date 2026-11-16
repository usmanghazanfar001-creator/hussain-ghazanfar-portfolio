import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { site } from '../data/site';
import { Reveal } from './Reveal';

/** Full-width typographic statement on a blueprint grid. */
export default function Statement() {
  return (
    <section aria-label="Design statement" className="blueprint-bg relative overflow-hidden bg-ink py-32 text-paper md:py-48" data-dark>
      <div className="container-page">
        <Reveal>
          <p className="label flex items-center gap-4 text-accent">
            <span className="h-px w-12 bg-accent" aria-hidden="true" />
            Design philosophy
          </p>
          <blockquote className="mt-10">
            <p className="max-w-5xl font-display text-[clamp(2.8rem,8vw,7.5rem)] font-light italic leading-[0.98]">{site.tagline}</p>
          </blockquote>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-paper/20 pt-8">
            <p className="max-w-md text-paper/75">
              Every drawing, model and plan is made to be understood — by clients, builders and the people who will use the space.
            </p>
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-light">
              Start a Conversation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
