import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { categories, projects, type CategoryId } from '../data/projects';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';

// Asymmetric editorial rhythm (large / small alternating) on wide screens.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
const aspects = ['aspect-[16/11]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[16/11]'];

export default function Portfolio() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );
  const count = (id: CategoryId | 'all') => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);

  return (
    <section id="projects" className="py-28 md:py-40">
      <div className="container-page">
        <SectionHeading index="03" label="Selected Work" title="Project Portfolio" />

        <div role="group" aria-label="Filter projects by category" className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-b border-line pb-5">
          {categories.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.id)}
                className={`label relative pb-2 transition-colors ${on ? 'text-ink' : 'text-muted-strong hover:text-ink'}`}
              >
                {c.label} <sup className="ml-0.5 text-[9px]">{count(c.id)}</sup>
                {on && <motion.span layoutId="filter-underline" className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-ink" />}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} project{visible.length === 1 ? '' : 's'}
        </p>

        <motion.ul layout={!reduce} className="mt-14 grid items-start gap-x-8 gap-y-20 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`${spans[i % spans.length]}`}
              >
                <ProjectCard project={p} index={i} aspect={aspects[i % aspects.length]} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && <p className="mt-16 text-muted-strong">No projects in this category yet.</p>}
      </div>
    </section>
  );
}
