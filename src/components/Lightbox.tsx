import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ImageAsset } from '../data/assets';

export interface LightboxItem {
  image: ImageAsset;
  caption: string;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

/** Full-screen image viewer: Esc to close, ← → to navigate, focus is trapped and restored. */
export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null && items[index] !== undefined;
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open || index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      else if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
      else if (e.key === 'Tab' && root.current) {
        const f = root.current.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onClose, onChange]);

  const item = index !== null ? items[index] : undefined;
  const multi = items.length > 1;

  return (
    <AnimatePresence>
      {open && item && index !== null && (
        <motion.div
          ref={root}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${item.caption}`}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-6 py-4" onClick={(e) => e.stopPropagation()}>
            <p className="label text-paper/70">
              {index + 1} / {items.length}
            </p>
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close image viewer" className="flex h-11 w-11 items-center justify-center hover:text-accent">
              <X size={26} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            {multi && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index - 1 + items.length) % items.length);
                }}
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center bg-ink/60 hover:text-accent md:left-6"
              >
                <ChevronLeft size={28} />
              </button>
            )}
            <motion.img
              key={item.image.src}
              src={item.image.src}
              alt={item.image.alt}
              className="max-h-full max-w-full bg-paper object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
            {multi && (
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index + 1) % items.length);
                }}
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center bg-ink/60 hover:text-accent md:right-6"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>

          <p className="px-6 py-5 text-center text-sm text-paper/80" onClick={(e) => e.stopPropagation()}>
            {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
