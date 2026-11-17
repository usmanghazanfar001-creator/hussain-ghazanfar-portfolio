/**
 * Image with SEO/perf defaults baked in: always has alt, width and height,
 * lazy-loads unless `priority` (use priority only for the first screen/LCP).
 *
 *   <Img image={cover} alt="Sitara Villas Faisalabad main entrance" />
 *
 * `image` is either an object from a `?meta` import ({ src, width, height })
 * or a plain URL string (e.g. admin-uploaded photos) — for strings, pass
 * width/height props if known; the parent's aspect-ratio box prevents shift.
 */
export default function Img({ image, alt, priority = false, width, height, className, sizes, ...rest }) {
  // Prefer the mid-size fallback so tools that ignore srcset don't pull the full-size original.
  const src = typeof image === "string" ? image : image?.fallback || image?.src;
  if (!src) return null;
  const w = width ?? (typeof image === "object" ? image.width : undefined) ?? 800;
  const h = height ?? (typeof image === "object" ? image.height : undefined) ?? 600;
  return (
    <img
      src={src}
      srcSet={typeof image === "object" ? image.srcSet : undefined}
      sizes={typeof image === "object" && image.srcSet ? sizes : undefined}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
      {...rest}
    />
  );
}
