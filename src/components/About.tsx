import { portrait } from '../data/assets';
import { aboutCopy, site } from '../data/site';
import { Reveal, RevealImage } from './Reveal';
import SectionHeading from './SectionHeading';

function PlaceholderCard({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="border border-dashed border-accent-deep/50 bg-surface/60 p-6">
      <p className="label text-accent-deep">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-strong">{hint}</p>
      <p className="label mt-4 !text-[10px] text-muted-strong">Placeholder · editable</p>
    </div>
  );
}

export default function About() {
  const { experience, qualifications } = aboutCopy;
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <RevealImage
              image={portrait}
              sizes="(min-width:1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
              imgClassName="object-[50%_20%]"
            />
            <p className="label mt-4 flex justify-between text-muted-strong">
              <span>{site.name}</span>
              <span>{site.role}</span>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <SectionHeading index="01" label="About" title={aboutCopy.heading} />
          <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-graphite">
            {aboutCopy.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-12 border-l-2 border-accent pl-6">
            <p className="label text-accent-deep">Design philosophy</p>
            <p className="mt-3 max-w-xl font-display text-2xl italic leading-snug text-ink">{aboutCopy.philosophy}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <p className="label mb-5 text-muted-strong">Technical capabilities</p>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {aboutCopy.capabilities.map((c, i) => (
                <li key={c} className="flex gap-4 border-t border-line py-4 text-sm text-graphite">
                  <span className="label text-accent-deep">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal>
              {experience.length ? (
                <div>
                  <p className="label mb-4 text-muted-strong">Experience</p>
                  <ul className="space-y-4">
                    {experience.map((e) => (
                      <li key={e.title + e.period} className="border-t border-line pt-4">
                        <p className="font-display text-xl">{e.title}</p>
                        <p className="text-sm text-muted-strong">
                          {e.org} · {e.period}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <PlaceholderCard title="Experience" hint="Add verified roles and years of experience in src/data/site.ts." />
              )}
            </Reveal>
            <Reveal delay={0.1}>
              {qualifications.length ? (
                <div>
                  <p className="label mb-4 text-muted-strong">Qualifications</p>
                  <ul className="space-y-4">
                    {qualifications.map((q) => (
                      <li key={q.title + q.year} className="border-t border-line pt-4">
                        <p className="font-display text-xl">{q.title}</p>
                        <p className="text-sm text-muted-strong">
                          {q.org} · {q.year}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <PlaceholderCard title="Qualifications" hint="Add verified degrees, certifications or registrations in src/data/site.ts." />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
