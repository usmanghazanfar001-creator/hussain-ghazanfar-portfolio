import { aboutCopy, site } from '../data/site';
import { portrait } from '../data/assets';
import { Reveal, RevealImage } from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  const dev = import.meta.env.DEV;
  const showExperience = aboutCopy.experience.length > 0;
  const showQualifications = aboutCopy.qualifications.length > 0;
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <RevealImage image={portrait} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5]" />
          <p className="label mt-4 text-muted-strong">
            {site.name} — {site.role}
          </p>
        </div>

        <div className="lg:col-span-7 lg:pt-8">
          <SectionHeading index="03" label="About" title={aboutCopy.heading} />
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-graphite">
              {aboutCopy.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="font-display text-2xl italic text-ink">{aboutCopy.philosophy}</p>
            </div>

            <ul className="mt-10 grid max-w-2xl gap-3 border-t border-line pt-8">
              {aboutCopy.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-4 text-graphite">
                  <span className="h-px w-8 bg-accent-deep" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>

            {showExperience && (
              <div className="mt-12 max-w-2xl">
                <h3 className="label text-accent-deep">Experience</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {aboutCopy.experience.map((e) => (
                    <li key={e.title + e.period} className="flex justify-between gap-6 py-4">
                      <span>
                        {e.title} — <span className="text-muted-strong">{e.org}</span>
                      </span>
                      <span className="label text-muted-strong">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showQualifications && (
              <div className="mt-12 max-w-2xl">
                <h3 className="label text-accent-deep">Qualifications</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {aboutCopy.qualifications.map((q) => (
                    <li key={q.title + q.year} className="flex justify-between gap-6 py-4">
                      <span>
                        {q.title} — <span className="text-muted-strong">{q.org}</span>
                      </span>
                      <span className="label text-muted-strong">{q.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {dev && (!showExperience || !showQualifications) && (
              <p className="mt-10 max-w-2xl border border-dashed border-accent-deep p-4 text-sm text-accent-deep">
                Dev only: experience and qualifications are hidden until real entries are added to <code>aboutCopy</code> in src/data/site.ts.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
