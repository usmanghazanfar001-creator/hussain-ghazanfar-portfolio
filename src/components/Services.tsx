import { services } from '../data/site';
import { iconMap } from './icons';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export default function Services() {
  return (
    <section id="services" className="bg-surface py-28 md:py-40">
      <div className="container-page">
        <SectionHeading index="02" label="Services" title="Design, drafting and planning — from one desk." />

        <ul className="mt-20 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <li key={s.id} className={`${spans[i]} bg-surface`}>
                <Reveal delay={i * 0.06} className="group relative h-full p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                  <div className="flex items-start justify-between">
                    <Icon size={30} strokeWidth={1.2} className="text-accent-deep transition-colors group-hover:text-accent" aria-hidden="true" />
                    <span className="label text-muted-strong transition-colors group-hover:text-paper/60">0{i + 1}</span>
                  </div>
                  <h3 className="mt-16 font-display text-3xl font-medium text-ink transition-colors group-hover:text-paper">{s.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-graphite transition-colors group-hover:text-paper/80">
                        <span className="h-px w-4 bg-accent-deep transition-colors group-hover:bg-accent" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
