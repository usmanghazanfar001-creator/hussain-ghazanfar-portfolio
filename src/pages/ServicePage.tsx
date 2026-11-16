import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';
import { projects } from '../data/projects';
import { getService, services, type Service } from '../data/services';
import { contact, scopeNote } from '../data/site';
import { track } from '../lib/analytics';
import { serviceMeta } from '../lib/routes';
import NotFound from './NotFound';

export default function ServicePage() {
  const { slug = '' } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;
  return <Detail service={service} />;
}

function Detail({ service }: { service: Service }) {
  const meta = useMemo(() => serviceMeta(service), [service]);
  const related = projects.filter((p) => service.categories.includes(p.category)).slice(0, 4);
  useEffect(() => {
    track('view_service', { service: service.slug });
  }, [service.slug]);

  return (
    <article>
      <Seo meta={meta} />
      <header className="bg-ink pb-20 pt-36 text-paper" data-dark>
        <div className="container-page">
          <Breadcrumbs dark items={[{ label: 'Home', to: '/' }, { label: 'Services', to: { pathname: '/', hash: '#services' } }, { label: service.title }]} />
          <h1 className="mt-10 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-none">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80">{service.short}</p>
        </div>
      </header>

      <div className="container-page grid gap-16 py-20 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed text-graphite lg:col-span-7">
          {service.intro.map((p) => <p key={p}>{p}</p>)}
          <p className="border-l-2 border-accent-deep pl-5 text-base text-muted-strong">{scopeNote}</p>
        </div>
        <div className="space-y-12 lg:col-span-5">
          <div>
            <h2 className="label text-accent-deep">What this includes</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">{service.points.map((p) => <li key={p} className="py-3">{p}</li>)}</ul>
          </div>
          <div>
            <h2 className="label text-accent-deep">Typical deliverables</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">{service.deliverables.map((p) => <li key={p} className="py-3">{p}</li>)}</ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-surface py-20" aria-labelledby="related-title">
          <div className="container-page">
            <h2 id="related-title" className="font-display text-4xl">Related work</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {related.map((p, i) => <li key={p.slug}><ProjectCard project={p} index={i} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container-page flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="label border-b border-line pb-1 hover:border-accent-deep hover:text-accent-deep">{s.title}</Link>
            ))}
          </div>
          <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-solid">{contact.cta} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </article>
  );
}
