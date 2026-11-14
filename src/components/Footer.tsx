import { Link } from 'react-router-dom';
import { brand } from '../data/assets';
import { navLinks, site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={brand.logoFull.src}
            alt={brand.logoFull.alt}
            width={brand.logoFull.width}
            height={brand.logoFull.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-56"
          />
        </div>
        <nav className="md:col-span-4" aria-label="Footer">
          <p className="label mb-5 text-muted-strong">Navigate</p>
          <ul className="grid grid-cols-2 gap-3">
            {navLinks.map((l) => (
              <li key={l.hash}>
                <Link to={{ pathname: '/', hash: `#${l.hash}` }} className="font-display text-xl text-ink transition-colors hover:text-accent-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="label mb-5 text-muted-strong">Focus</p>
          <p className="text-sm leading-relaxed text-muted-strong">
            {site.role} · {site.specialties.join(' · ')}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col justify-between gap-2 py-6 sm:flex-row">
          <p className="label text-muted-strong">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href="#top" className="label text-muted-strong transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
