import { Link, type To } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: To;
}

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is generated in lib/routes.ts. */
export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`label flex flex-wrap items-center gap-x-3 gap-y-1 ${dark ? 'text-paper/70' : 'text-muted-strong'}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-3">
              {c.to && !last ? (
                <Link to={c.to} className="transition-colors hover:text-accent-deep">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? (dark ? 'text-paper' : 'text-ink') : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
