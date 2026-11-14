import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Lightbox, { type LightboxItem } from '../components/Lightbox';
import { Reveal, RevealImage } from '../components/Reveal';
import Seo from '../components/Seo';
import { categoryLabel, getProject, projects, type Project } from '../data/projects';
import NotFound from './NotFound';

interface Section {
  id: string;
  title: string;
  items: LightboxItem[];
}

function buildSections(p: Project): Section[] {
  const { technicalDrawings, plans2d, visualizations3d, gallery } = p.images;
  return [
    { id: 'drawings', title: 'Technical Drawings', items: technicalDrawings ?? [] },
    { id: 'plans', title: '2D Plans', items: plans2d ?? [] },
    { id: 'renders', title: '3D Visualizations', items: visualizations3d ?? [] },
    { id: 'gallery', title: 'Project Gallery', items: gallery ?? [] },
  ].filter((s) => s.items.length > 0);
}

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const [open, setOpen] = useState<number | null>(null);

  const sections = useMemo(() => (project ? buildSections(project) : []), [project]);
  // One flat list so the lightbox can step through every image on the page: main image first.
  const flat: LightboxItem[] = useMemo(
    () => (project ? [{ image: project.images.main, caption: project.title }, ...sections.flatMap((s) => s.items)] : []),
    [project, sections],
  );
  const close = useCallback(() => setOpen(null), []);

  if (!project) return <NotFound />;

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  let offset = 1;

  return (
    <article>
      <Seo title={project.title} description={project.summary} path={`/projects/${project.slug}`} image={project.images.main.src} />

      <header className="container-page pb-12 pt-32 md:pt-40">
        <Link to={{ pathname: '/', hash: '#projects' }} className="label inline-flex items-center gap-2 text-muted-strong transition-colors hover:text-ink">
          <ArrowLeft size={14} aria-hidden="true" /> All projects
        </Link>
        <p className="label mt-10 text-accent-deep">{categoryLabel(project.category)}</p>
        <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] font-medium leading-[0.95]">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">{project.summary}</p>
        {project.placeholder && (
          <p className="label mt-8 inline-block border border-dashed border-accent-deep/60 px-4 py-2 !text-[10px] text-accent-deep">
            Placeholder project — not real client work
          </p>
        )}
      </header>

      <div className="container-page">
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="group relative block w-full overflow-hidden bg-line"
          aria-label={`Open ${project.title} main image full screen`}
        >
          <RevealImage image={project.images.main} eager sizes="100vw" className="aspect-[16/9] w-full md:aspect-[16/8]" />
          <span className="label absolute bottom-4 right-4 flex items-center gap-2 bg-paper px-3 py-2 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 size={14} aria-hidden="true" /> Full screen
          </span>
        </button>
      </div>

      <section className="container-page grid gap-14 py-24 lg:grid-cols-12 md:py-32">
        <Reveal className="lg:col-span-4">
          <dl className="border-t border-ink">
            {project.details.map((d) => (
              <div key={d.label} className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="label text-muted-strong">{d.label}</dt>
                <dd className={`text-right text-sm ${d.value === 'To be provided' ? 'italic text-muted-strong' : 'text-ink'}`}>{d.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="label text-accent-deep">Project overview</p>
            <p className="mt-5 font-display text-3xl leading-snug md:text-4xl">{project.overview}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <p className="label mb-5 text-accent-deep">Design objectives</p>
            <ol>
              {project.objectives.map((o, n) => (
                <li key={o} className="flex gap-5 border-t border-line py-4 text-graphite">
                  <span className="label pt-1 text-accent-deep">0{n + 1}</span>
                  {o}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {sections.map((s, n) => {
        const start = offset;
        offset += s.items.length;
        return (
          <section key={s.id} className={`py-20 md:py-28 ${n % 2 === 0 ? 'bg-surface' : ''}`} aria-labelledby={`h-${s.id}`}>
            <div className="container-page">
              <Reveal>
                <p className="label text-accent-deep">0{n + 1}</p>
                <h2 id={`h-${s.id}`} className="mt-3 font-display text-4xl font-medium md:text-5xl">
                  {s.title}
                </h2>
              </Reveal>
              <ul className={`mt-12 grid gap-8 ${s.items.length > 1 ? 'md:grid-cols-2' : ''}`}>
                {s.items.map((it, k) => (
                  <li key={it.caption + k}>
                    <button
                      type="button"
                      onClick={() => setOpen(start + k)}
                      className="group block w-full text-left"
                      aria-label={`Open full screen: ${it.caption}`}
                    >
                      <RevealImage
                        image={it.image}
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="aspect-[16/10] w-full border border-line"
                        imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="label mt-4 block text-muted-strong">{it.caption}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <nav className="border-t border-line" aria-label="More projects">
        <div className="container-page grid md:grid-cols-2">
          <Link to={`/projects/${prev.slug}`} className="group border-b border-line py-12 md:border-b-0 md:border-r md:pr-10">
            <p className="label flex items-center gap-2 text-muted-strong">
              <ArrowLeft size={14} aria-hidden="true" /> Previous
            </p>
            <p className="mt-3 font-display text-3xl transition-colors group-hover:text-accent-deep md:text-4xl">{prev.title}</p>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group py-12 md:pl-10 md:text-right">
            <p className="label flex items-center gap-2 text-muted-strong md:justify-end">
              Next <ArrowRight size={14} aria-hidden="true" />
            </p>
            <p className="mt-3 font-display text-3xl transition-colors group-hover:text-accent-deep md:text-4xl">{next.title}</p>
          </Link>
        </div>
      </nav>

      <Lightbox items={flat} index={open} onClose={close} onChange={setOpen} />
    </article>
  );
}
