import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col justify-center py-40">
      <Seo title="Page not found" path="/404" />
      <p className="label text-accent-deep">404</p>
      <h1 className="mt-4 font-display text-6xl font-medium md:text-8xl">This page isn’t on the plan.</h1>
      <Link to="/" className="btn btn-solid mt-10 w-fit">
        Back to home
      </Link>
    </section>
  );
}
