import { skills } from '../data/site';
import { iconMap } from './icons';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-40">
      <div className="container-page">
        <SectionHeading index="06" label="Skills" title="Tools and disciplines." />
        <ul className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <li key={s.name} className="bg-paper">
                <Reveal delay={i * 0.05} className="h-full">
                  <div className="flex h-full flex-col gap-6 p-8">
                    <Icon size={28} strokeWidth={1.1} className="text-accent-deep" aria-hidden="true" />
                    <p className="font-display text-2xl font-medium">{s.name}</p>
                    {typeof s.level === 'number' && (
                      <div
                        role="meter"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={s.level}
                        aria-label={`${s.name} proficiency`}
                        className="h-px w-full bg-line"
                      >
                        <div className="h-px bg-accent-deep" style={{ width: `${s.level}%` }} />
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
