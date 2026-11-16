import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { iconMap } from './icons';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

export default function Services() {
  return (
    <section id="services" className="bg-surface py-28 md:py-40">
      <div className="container-page">
        <SectionHeading index="02" label="Services" title="Design, drafting and planning — from one desk." />

        <ul className="mt-20 border-t border-ink">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <li key={s.slug} className="border-b border-line">
                <Reveal delay={i * 0.04}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group grid gap-6 py-10 transition-colors hover:bg-paper md:grid-cols-12 md:items-center md:px-4"
                    aria-label={`${s.title} — view service`}
                  >
                    <span className="label flex items-center gap-4 text-accent-deep md:col-span-2">
                      0{i + 1}
                      <Icon size={22} strokeWidth={1.2} aria-hidden="true" />
                    </span>
                    <div className="md:col-span-5">
                      <h3 className="font-display text-4xl font-medium transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{s.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-strong">{s.short}</p>
                    </div>
                    <ul className="grid gap-1.5 text-sm text-graphite md:col-span-3">
                      {s.points.slice(0, 4).map((p) => (
                        <li key={p} className="flex items-center gap-3">
                          <span className="h-px w-4 bg-accent-deep" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="label flex items-center gap-2 text-ink md:col-span-2 md:justify-end">
                      Explore <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
