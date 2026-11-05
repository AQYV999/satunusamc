import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../data/gallery';

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

export function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  // Keyboard + kunci scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    const prevActive = document.activeElement as HTMLElement | null;

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    const root = document.getElementById('root');
    if (root) root.setAttribute('aria-hidden', 'true');

    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (root) root.removeAttribute('aria-hidden');
      prevActive?.focus();
    };
  }, [open, go, onClose]);

  // Preload gambar tetangga + geser thumbnail aktif ke tengah
  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = items[(index + d + items.length) % items.length].src;
    });
    thumbsRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [index, items]);

  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau: ${item.title}`}
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Bar atas */}
          <div
            className="flex items-center justify-between px-4 pb-2 text-sm text-slate-300"
            style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
          >
            <span className="tabular-nums">{(index ?? 0) + 1} / {items.length}</span>
            <button
              ref={closeRef}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Tutup"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Gambar */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20">
            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Sebelumnya"
                className="hidden md:flex absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <m.img
                key={item.src}
                src={item.src}
                alt={item.title}
                draggable={false}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                drag="x"
                dragSnapToOrigin
                dragElastic={0.35}
                style={{ touchAction: 'pan-y' }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
              />
            </AnimatePresence>

            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Berikutnya"
                className="hidden md:flex absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Caption */}
          <div className="px-4 pt-3 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-semibold">{item.title}</p>
            <p className="text-sm text-slate-400">{item.desc}</p>
            <p className="md:hidden mt-1 text-[11px] text-slate-600">Geser kiri/kanan untuk berpindah</p>
          </div>

          {/* Thumbnail */}
          {items.length > 1 && (
            <div
              ref={thumbsRef}
              onClick={(e) => e.stopPropagation()}
              className="flex gap-2 overflow-x-auto px-4 pt-3 justify-start sm:justify-center"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              {items.map((t, i) => (
                <button
                  key={t.src + i}
                  onClick={() => onChange(i)}
                  aria-label={`Lihat ${t.title}`}
                  aria-current={i === index}
                  className={`shrink-0 w-12 h-16 md:w-14 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    i === index ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={t.src} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}