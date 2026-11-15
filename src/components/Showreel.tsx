import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { videos, type VideoItem } from '../data/videos';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

function VideoCard({ v, active, onPlay, onStop }: { v: VideoItem; active: boolean; onPlay: () => void; onStop: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };
  return (
    <figure>
      <div className="group relative overflow-hidden bg-ink" style={{ aspectRatio: `${v.width} / ${v.height}` }}>
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          preload="none"
          playsInline
          controls={active}
          loop
          width={v.width}
          height={v.height}
          aria-label={v.title}
          className="h-full w-full object-cover"
          onPlay={onPlay}
          onPause={() => !ref.current?.ended && onStop()}
        />
        {!active && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Play video: ${v.title}`}
            className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/35"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:scale-110">
              <Play size={28} fill="currentColor" aria-hidden="true" className="ml-1" />
            </span>
          </button>
        )}
        {active && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Pause video: ${v.title}`}
            className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink"
          >
            <Pause size={16} fill="currentColor" aria-hidden="true" />
          </button>
        )}
        {v.sample && <span className="label absolute right-3 top-3 bg-paper/90 px-3 py-1.5 !text-[10px] text-ink">Sample</span>}
      </div>
      <figcaption className="mt-5">
        <p className="label text-accent-deep">{v.label}</p>
        <h3 className="mt-2 font-display text-3xl font-medium">{v.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-strong">{v.description}</p>
      </figcaption>
    </figure>
  );
}

export default function Showreel() {
  const [active, setActive] = useState<string | null>(null);
  // Pause any other playing video when one starts.
  const handlePlay = (id: string) => {
    document.querySelectorAll<HTMLVideoElement>('#showreel video').forEach((el) => {
      if (el.getAttribute('aria-label') !== videos.find((x) => x.id === id)?.title) el.pause();
    });
    setActive(id);
  };

  return (
    <section id="showreel" className="bg-surface py-28 md:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading index="04" label="Showreel" title="Drawings and visuals in motion." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-sm leading-relaxed text-graphite">
              A closer look at how ideas move from CAD drafting to 3D visualization. Videos load only when played, so the page stays fast.
            </p>
            <p className="label mt-6 border border-dashed border-accent-deep/50 p-4 !text-[10px] leading-relaxed text-accent-deep">
              Sample videos — replace with original work in src/data/videos.ts
            </p>
          </Reveal>
        </div>
        {videos.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.12} className={`lg:col-span-4 ${i === 1 ? 'lg:mt-24' : ''}`}>
            <VideoCard v={v} active={active === v.id} onPlay={() => handlePlay(v.id)} onStop={() => setActive((a) => (a === v.id ? null : a))} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
