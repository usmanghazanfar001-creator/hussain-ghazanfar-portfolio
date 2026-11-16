import { Link } from 'react-router-dom';
import { navLinks, site, contact } from '../data/site';
import { services } from '../data/services';
import { track } from '../lib/analytics';

export default function Footer() {
  const socials = [...(contact.linkedin ? [{ label: 'LinkedIn', url: contact.linkedin }] : []), ...contact.socials];
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-3xl font-medium uppercase tracking-[0.18em]">
            Hussnain <span className="text-accent-deep">Ghazanfar</span>
          </p>
          <p className="label mt-4 text-muted-strong">{site.role}</p>
          <p className="mt-6 font-display text-xl italic text-graphite">{site.tagline}</p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="label mb-5 text-muted-strong">Navigate</p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.hash}>
                <Link to={{ pathname: '/', hash: `#${l.hash}` }} className="font-display text-xl text-ink transition-colors hover:text-accent-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Services">
          <p className="label mb-5 text-muted-strong">Services</p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-sm text-graphite transition-colors hover:text-accent-deep">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="label mb-5 text-muted-strong">Contact</p>
          <ul className="space-y-3 text-sm text-graphite">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} onClick={() => track('email_click', { location: 'footer' })} className="break-all transition-colors hover:text-accent-deep">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} onClick={() => track('phone_click', { location: 'footer' })} className="transition-colors hover:text-accent-deep">
                  {contact.phone}
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-deep">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page py-6">
          <p className="label text-muted-strong">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
