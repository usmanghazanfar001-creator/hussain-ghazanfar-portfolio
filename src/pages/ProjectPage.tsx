import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox, { type LightboxItem } from '../components/Lightbox';
import Picture from '../components/Picture';
import { Reveal } from '../components/Reveal';
import Seo from '../components/Seo';
import { categoryLabel, getProject, projects, type Project } from '../data/projects';
import { serviceForCategory } from '../data/services';
import { contact } from '../data/site';
import { track } from '../lib/analytics';
import { projectMeta } from '../lib/routes';
import NotFound from './NotFound';

type Group = { title: string; items: LightboxItem[] };

function groups(p: Project): Group[] {
  const i = p.images;
  return [
    { title: 'Technical drawings', items: i.technicalDrawings ?? [] },
    { title: '2D plans', items: i.plans2d ?? [] },
    { title: '3D visualizations', items: i.visualizations3d ?? [] },
    { title: 'Gallery', items: i.gallery ?? [] },
  ].filter((g) => g.items.length > 0);
}

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  return <Detail project={project} />;
}

function Detail({ project }: { project: Project }) {
  const meta = useMemo(() => projectMeta(project), [project]);
  const sets = useMemo(() => groups(project), [project]);
  const all = useMemo(() => [{ image: project.images.main, caption: project.title }, ...sets.flatMap((g) => g.items)], [sets, project]);
  const [open, setOpen] = useState<number | null>(null);
  const service = serviceForCategory(project.category);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    track('view_project', { project: project.slug, category: project.category });
  }, [project.slug, project.category]);

  let offset = 1;
  return (
    <article>
      <Seo meta={meta} />
      <header className="bg-ink pb-16 pt-36 text-paper" data-dark>
        <div className="container-page">
          <Breadcrumbs dark items={[{ label: 'Home', to: '/' }, { label: 'Projects', to: { pathname: '/', hash: '#projects' } }, { label: project.title }]} />
          <p className="label mt-10 text-accent">{categoryLabel(project.category)}</p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-none">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80">{project.summary}</p>
          {project.placeholder && <p className="label mt-6 inline-block border border-accent px-3 py-2 text-accent">Sample project — replace with real work</p>}
        </div>
      </header>

      <div className="container-page -mt-px">
        {project.video ? (
          <figure className="bg-ink">
            <video
              controls
              playsInline
              preload="none"
              poster={project.video.poster.src}
              width={project.video.width}
              height={project.video.height}
              className="mx-auto block max-h-[85vh] w-auto max-w-full"
              aria-label={project.video.caption}
            >
              <source src={project.video.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <figcaption className="label px-4 py-3 text-center text-paper/75">{project.video.caption}</figcaption>
          </figure>
        ) : (
          <button type="button" onClick={() => setOpen(0)} className="group relative block aspect-[16/9] w-full overflow-hidden bg-line" aria-label={`Open image viewer for ${project.title}`}>
            <Picture
              image={project.images.main}
              eager
              sizes="100vw"
              fit={project.images.main.width / project.images.main.height < 1.4 ? 'contain' : 'cover'}
              className="h-full w-full"
            />
          </button>
        )}
      </div>

      <div className="container-page grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-4xl">Project overview</h2>
          <p className="mt-5 text-lg leading-relaxed text-graphite">{project.overview}</p>
          {project.objectives.length > 0 && (
            <>
              <h2 className="mt-14 font-display text-4xl">Design objectives</h2>
              <ul className="mt-5 space-y-3">
                {project.objectives.map((o) => (
                  <li key={o} className="flex gap-4 text-graphite"><span className="mt-3 h-px w-6 shrink-0 bg-accent-deep" aria-hidden="true" />{o}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="lg:col-span-5" aria-label="Project details">
          <dl className="divide-y divide-line border-y border-line">
            {project.details.map((d) => (
              <div key={d.label} className="flex justify-between gap-6 py-4">
                <dt className="label text-muted-strong">{d.label}</dt>
                <dd className="text-right">{d.value}</dd>
              </div>
            ))}
          </dl>
          {service && (
            <Link to={`/services/${service.slug}`} className="label mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 hover:text-accent-deep">
              Related service: {service.title} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </aside>
      </div>

      {sets.map((g) => {
        const start = offset;
        offset += g.items.length;
        return (
          <section key={g.title} className="container-page pb-20" aria-label={g.title}>
            <Reveal><h2 className="font-display text-4xl">{g.title}</h2></Reveal>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {g.items.map((it, i) => (
                <li key={it.caption}>
                  <button type="button" onClick={() => setOpen(start + i)} className="block w-full text-left" aria-label={`Enlarge: ${it.caption}`}>
                    <span className="block aspect-[4/3] overflow-hidden bg-line"><Picture image={it.image} sizes="(min-width:640px) 50vw, 100vw" className="h-full w-full transition-transform duration-700 hover:scale-[1.03]" /></span>
                    <span className="label mt-3 block text-muted-strong">{it.caption}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="bg-surface py-16">
        <div className="container-page flex flex-wrap items-center justify-between gap-8">
          <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-3"><ArrowLeft size={18} aria-hidden="true" /><span><span className="label block text-muted-strong">Previous</span>{prev.title}</span></Link>
          <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-solid">{contact.cta}</Link>
          <Link to={`/projects/${next.slug}`} className="group flex items-center gap-3 text-right"><span><span className="label block text-muted-strong">Next</span>{next.title}</span><ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      {open !== null && (
        <Lightbox
          items={all}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </article>
  );
}
