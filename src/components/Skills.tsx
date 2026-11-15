import { motion } from 'framer-motion';
import { skills } from '../data/site';
import { iconMap } from './icons';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="bg-surface py-28 md:py-40">
      <div className="container-page">
        <SectionHeading index="06" label="Software & Skills" title="The tools and disciplines behind the drawings." />

        <ul className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <li key={s.name} className="bg-surface">
                <Reveal delay={i * 0.05} className="flex h-full min-h-[190px] flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <Icon size={28} strokeWidth={1.2} className="text-accent-deep" aria-hidden="true" />
                    <span className="label text-muted-strong">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium">{s.name}</h3>
                    {typeof s.level === 'number' && (
                      <div className="mt-4">
                        <div
                          className="h-px w-full bg-line"
                          role="progressbar"
                          aria-valuenow={s.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${s.name} proficiency`}
                        >
                          <motion.div
                            className="h-px bg-ink"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <p className="label mt-2 text-muted-strong">{s.level}%</p>
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
