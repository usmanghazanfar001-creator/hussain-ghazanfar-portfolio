import type { ImageAsset } from '../data/assets';

interface PictureProps {
  image: ImageAsset;
  sizes?: string;
  eager?: boolean;
  className?: string;
  fit?: 'cover' | 'contain';
  /** Pass '' for purely decorative images. */
  alt?: string;
}

/**
 * Responsive image: AVIF first, then WebP, with srcset/sizes, explicit width/height and lazy loading
 * (set `eager` for the LCP image only).
 */
export default function Picture({ image, sizes = '100vw', eager = false, className = '', fit = 'cover', alt }: PictureProps) {
  const small = image.smallWidth ?? 640;
  const webp = image.srcSmall ? `${image.srcSmall} ${small}w, ${image.src} ${image.width}w` : undefined;
  const avif = image.avif ? (image.avifSmall ? `${image.avifSmall} ${small}w, ${image.avif} ${image.width}w` : image.avif) : undefined;
  return (
    <picture className="block h-full w-full">
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        src={image.src}
        alt={alt ?? image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
        style={{ objectPosition: fit === 'cover' ? image.position : undefined }}
      />
    </picture>
  );
}
