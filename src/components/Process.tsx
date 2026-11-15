import { processSteps } from '../data/site';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

export default function Process() {
  return (
    <section id="process" className="bg-ink py-28 text-paper md:py-40" data-dark>
      <div className="container-page">
        <SectionHeading index="05" label="Design Process" title="From first sketch to final presentation." dark />

        <ol className="relative mt-24 grid gap-14 lg:grid-cols-5 lg:gap-8">
          <span className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-paper/20 max-lg:block" aria-hidden="true" />
          <span className="absolute left-0 right-0 top-[7px] hidden h-px bg-paper/20 lg:block" aria-hidden="true" />
          {processSteps.map((s, i) => (
            <li key={s.n} className="relative pl-10 lg:pl-0 lg:pt-12">
              <Reveal delay={i * 0.1}>
                <span className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-accent bg-ink lg:top-0" aria-hidden="true" />
                <p className="font-display text-6xl font-light text-accent/90">{s.n}</p>
                <h3 className="mt-4 font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
