import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categoryLabel, type Project } from '../data/projects';
import Picture from './Picture';

interface Props {
  project: Project;
  index: number;
  aspect?: string;
}

export default function ProjectCard({ project, index, aspect = 'aspect-[4/3]' }: Props) {
  const to = `/projects/${project.slug}`;
  return (
    <article className="group">
      <Link to={to} tabIndex={-1} aria-hidden="true" className={`relative block overflow-hidden bg-line ${aspect}`}>
        <Picture
          image={project.images.main}
          alt=""
          sizes="(min-width:1024px) 55vw, 100vw"
          className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
        {project.placeholder && <span className="label absolute left-4 top-4 bg-paper/90 px-3 py-1.5 !text-[10px] text-ink">Sample</span>}
        <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="label text-accent-deep">
            {String(index + 1).padStart(2, '0')} — {categoryLabel(project.category)}
          </p>
          <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">{project.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-strong">{project.summary}</p>
        </div>
        <Link
          to={to}
          className="label mt-1 flex shrink-0 items-center gap-2 border-b border-ink pb-1 text-ink transition-colors hover:border-accent-deep hover:text-accent-deep"
          aria-label={`View project: ${project.title}`}
        >
          View <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
