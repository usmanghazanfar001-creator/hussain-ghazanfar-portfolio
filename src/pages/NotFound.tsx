import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { site } from '../data/site';
import { brand } from '../data/assets';
import type { RouteMeta } from '../lib/routes';

const meta: RouteMeta = {
  path: '/404',
  title: `Page not found | ${site.name}`,
  description: 'The page you were looking for could not be found.',
  image: brand.og,
  noindex: true,
  jsonLd: { '@context': 'https://schema.org', '@graph': [] },
  content: { h1: 'Page not found', lead: 'The page you were looking for could not be found.', sections: [], links: [{ href: '/', label: 'Home' }] },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <Seo meta={meta} />
      <div className="container-page">
        <p className="label text-accent-deep">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] font-light italic leading-none">Page not found</h1>
        <p className="mt-6 max-w-md text-muted-strong">This page does not exist or has moved. Return to the portfolio to continue exploring.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/" className="btn btn-solid">Back to home</Link>
          <Link to={{ pathname: '/', hash: '#projects' }} className="btn btn-outline">View projects</Link>
        </div>
      </div>
    </section>
  );
}
