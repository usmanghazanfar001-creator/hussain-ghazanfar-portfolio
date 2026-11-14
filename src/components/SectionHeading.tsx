import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  index: string;
  label: string;
  title: string;
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({ index, label, title, dark = false, className = '', children }: Props) {
  const accent = dark ? 'text-accent' : 'text-accent-deep';
  return (
    <Reveal className={className}>
      <p className={`label flex items-center gap-4 ${accent}`}>
        <span>{index}</span>
        <span className={`h-px w-12 ${dark ? 'bg-accent' : 'bg-accent-deep'}`} aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2
        className={`mt-6 max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] ${
          dark ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
