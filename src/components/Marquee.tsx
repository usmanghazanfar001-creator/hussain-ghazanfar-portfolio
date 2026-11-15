const words = [
  'Architectural Design',
  'AutoCAD 2D Drafting',
  'AutoCAD 3D Modeling',
  'Map Planning',
  'Site Planning',
  'Master Planning',
];

/** Slow-moving editorial ticker of services. Decorative; hidden from screen readers. */
export default function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w) => (
        <li key={w} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-4xl font-light italic text-ink md:text-6xl">{w}</span>
          <span className="text-accent" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-b border-line bg-paper py-8 md:py-10" role="presentation">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
