import { processSteps } from '../data/site';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

export default function Process() {
  return (
    <section id="process" className="bg-ink py-28 text-paper md:py-40" data-dark>
      <div className="container-page">
        <SectionHeading index="04" label="Process" title="From first idea to finished drawings." dark />
        <ol className="mt-20 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.n} className="bg-ink">
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full p-8">
                  <p className="font-display text-6xl font-light italic text-accent">{s.n}</p>
                  <h3 className="mt-8 font-display text-2xl font-medium">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
