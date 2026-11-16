import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { categories, projects, type CategoryId } from '../data/projects';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';

// Asymmetric editorial rhythm (large / small alternating) on wide screens.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
const aspects = ['aspect-[16/11]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[16/11]'];

export default function Portfolio() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');

  const visible = useMemo(() => (active === 'all' ? projects : projects.filter((p) => p.category === active)), [active]);
  const count = (id: CategoryId | 'all') => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);

  return (
    <section id="projects" className="py-28 md:py-40" aria-labelledby="projects-title">
      <div className="container-page">
        <SectionHeading index="01" label="Selected Work" title="Project Portfolio" />
        <span id="projects-title" className="sr-only">
          Project Portfolio
        </span>

        <div role="group" aria-label="Filter projects by category" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
          {categories.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.id)}
                className={`label border-b-2 pb-4 pt-1 transition-colors ${on ? 'border-ink text-ink' : 'border-transparent text-muted-strong hover:text-ink'}`}
              >
                {c.label} <sup className="ml-0.5 text-[9px]">{count(c.id)}</sup>
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} project{visible.length === 1 ? '' : 's'}
        </p>

        <m.ul
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid items-start gap-x-8 gap-y-20 lg:grid-cols-12"
        >
          {visible.map((p, i) => (
            <li key={p.slug} className={spans[i % spans.length]}>
              <ProjectCard project={p} index={i} aspect={aspects[i % aspects.length]} />
            </li>
          ))}
        </m.ul>

        {visible.length === 0 && <p className="mt-16 text-muted-strong">No projects in this category yet.</p>}
      </div>
    </section>
  );
}
