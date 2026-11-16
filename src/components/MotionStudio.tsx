import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CYCLE_MS = 11000;
const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;
const dt = (s: number, t: number) => ({ '--d': `${s}s`, '--t': `${t}s` }) as React.CSSProperties;

/** Floor plan drawn line by line. pathLength=1 lets one dash rule animate every path. */
function PlanDrawing() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Animated sample floor plan being drawn: outer walls, partitions, door swings and room labels" className="h-full w-full">
      <rect width="400" height="300" fill="#171717" />
      <g fill="none" stroke="#B69A70" strokeLinecap="square" strokeLinejoin="miter">
        <path className="draw-item" pathLength={1} strokeWidth={3} style={dt(0.2, 2.2)} d="M40 40H360V260H40Z" />
        <path className="draw-item" pathLength={1} strokeWidth={2} style={dt(1.8, 1.4)} d="M200 40V170M40 170H200M200 130H360M280 130V260" />
        <path className="draw-item" pathLength={1} strokeWidth={1} stroke="#F4F0E9" style={dt(3, 1.2)} d="M200 90A30 30 0 0 1 230 130M120 170A30 30 0 0 0 150 200M280 200A30 30 0 0 1 310 230" />
        <path className="draw-item" pathLength={1} strokeWidth={1} stroke="#77736D" style={dt(3.8, 1.4)} d="M40 20H360M40 14V26M360 14V26M380 40V260M374 40H386M374 260H386" />
      </g>
      <g fill="#F4F0E9" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5">
        <text className="fade-item" style={d(4.6)} x="90" y="110">LIVING</text>
        <text className="fade-item" style={d(4.8)} x="260" y="90">KITCHEN</text>
        <text className="fade-item" style={d(5)} x="95" y="225">BED 01</text>
        <text className="fade-item" style={d(5.2)} x="205" y="225">BATH</text>
        <text className="fade-item" style={d(5.4)} x="305" y="200">BED 02</text>
      </g>
    </svg>
  );
}

/** Isometric massing that builds up floor by floor. */
function MassingBuild() {
  const floor = (i: number) => {
    const y = 220 - i * 34;
    return (
      <g key={i} className="rise-item" style={d(0.3 + i * 0.7)}>
        <path d={`M110 ${y}L200 ${y + 40}V${y}L110 ${y - 40}Z`} fill="#303030" stroke="#B69A70" strokeWidth="1.2" transform="translate(0 0)" />
        <path d={`M200 ${y + 40}L290 ${y}V${y - 40}L200 ${y}Z`} fill="#222" stroke="#B69A70" strokeWidth="1.2" />
        <path d={`M110 ${y - 40}L200 ${y - 80}L290 ${y - 40}L200 ${y}Z`} fill="#F4F0E9" fillOpacity={0.9 - i * 0.12} stroke="#B69A70" strokeWidth="1.2" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Animated sample isometric massing model rising floor by floor" className="h-full w-full">
      <rect width="400" height="300" fill="#171717" />
      <path className="draw-item" pathLength={1} d="M60 250L200 285L340 250L200 215Z" fill="none" stroke="#77736D" strokeWidth="1" style={dt(0, 1.2)} />
      <g transform="translate(0 -20)">{[0, 1, 2, 3, 4].map(floor)}</g>
      <text className="fade-item" style={d(4.2)} x="20" y="28" fill="#B69A70" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5">
        MASSING — 5 LEVELS (SAMPLE)
      </text>
    </svg>
  );
}

export default function MotionStudio() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce || !playing) return;
    const id = window.setInterval(() => setRun((r) => r + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, playing]);

  const cls = reduce ? 'motion-static' : playing ? '' : 'motion-paused';

  return (
    <section id="motion" className="bg-ink py-28 text-paper md:py-40" data-dark aria-labelledby="motion-title">
      <div className="container-page">
        <SectionHeading index="05" label="In Motion" title="Drawings that build themselves." dark />
        <span id="motion-title" className="sr-only">
          In Motion
        </span>
        <p className="mt-6 max-w-xl text-paper/75">Two short original sample animations made for this site: a plan drawn line by line, and a massing model built up floor by floor. They are illustrations, not client projects.</p>

        <div className={`mt-14 grid gap-6 md:grid-cols-2 ${cls}`}>
          <figure key={`a${run}`} className="border border-paper/15">
            <div className="aspect-[4/3]">
              <PlanDrawing />
            </div>
            <figcaption className="label border-t border-paper/15 px-5 py-4 text-paper/70">Sample floor plan — drawn in sequence</figcaption>
          </figure>
          <figure key={`b${run}`} className="border border-paper/15">
            <div className="aspect-[4/3]">
              <MassingBuild />
            </div>
            <figcaption className="label border-t border-paper/15 px-5 py-4 text-paper/70">Sample massing — built floor by floor</figcaption>
          </figure>
        </div>

        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause animations' : 'Play animations'}
            className="btn btn-ghost-light mt-8"
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {playing ? 'Pause' : 'Play'}
          </button>
        )}
      </div>
    </section>
  );
}
