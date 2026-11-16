import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { ImageAsset } from '../data/assets';
import Picture from './Picture';

export interface LightboxItem {
  image: ImageAsset;
  caption: string;
}

interface Props {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/** Accessible modal image viewer: focus trap, Esc/arrow keys, click-to-zoom following the pointer. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const dialog = useRef<HTMLDivElement>(null);
  const item = items[index];
  const many = items.length > 1;

  const go = useCallback(
    (delta: number) => {
      setZoom(false);
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('button')?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && many) go(1);
      else if (e.key === 'ArrowLeft' && many) go(-1);
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>('button');
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
  }, [go, many, onClose]);

  const track = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  if (!item) return null;
  const btn = 'flex h-11 w-11 items-center justify-center border border-paper/40 text-paper transition-colors hover:border-accent hover:text-accent';

  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={`Image viewer: ${item.caption}`} className="fixed inset-0 z-[100] flex flex-col bg-ink/95">
      <div className="flex items-center justify-between p-4 md:p-6">
        <p className="label text-paper/80">
          {index + 1} / {items.length}
        </p>
        <div className="flex gap-3">
          <button type="button" className={btn} onClick={() => setZoom((z) => !z)} aria-label={zoom ? 'Zoom out' : 'Zoom in'} aria-pressed={zoom}>
            {zoom ? <ZoomOut size={18} aria-hidden="true" /> : <ZoomIn size={18} aria-hidden="true" />}
          </button>
          <button type="button" className={btn} onClick={onClose} aria-label="Close image viewer">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        {many && (
          <button type="button" className={`${btn} absolute left-3 z-10 md:left-6`} onClick={() => go(-1)} aria-label="Previous image">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
        )}
        <div
          className={`h-full max-h-full w-full overflow-hidden ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onMouseMove={zoom ? track : undefined}
          onClick={(e) => {
            track(e);
            setZoom((z) => !z);
          }}
        >
          <div
            className="h-full w-full transition-transform duration-300"
            style={{ transform: zoom ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}
          >
            <Picture image={item.image} fit="contain" sizes="100vw" eager alt={item.image.alt} />
          </div>
        </div>
        {many && (
          <button type="button" className={`${btn} absolute right-3 z-10 md:right-6`} onClick={() => go(1)} aria-label="Next image">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      <p className="p-4 text-center text-sm text-paper/80 md:p-6">{item.caption}</p>
    </div>
  );
}
