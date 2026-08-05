'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Props = {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Shared lightbox for all portfolios. Black background, image centered,
 * original ratio respected (never cropped). Grows from the clicked image
 * via shared layoutId and returns on close. Keyboard: ESC, arrows.
 * Click outside closes.
 */
export function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            data-cursor="link"
            className="absolute right-6 top-6 z-10 text-white/70 transition-colors hover:text-white"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            data-cursor="link"
            className="absolute left-4 z-10 text-white/50 transition-colors hover:text-white md:left-8"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            data-cursor="link"
            className="absolute right-4 z-10 text-white/50 transition-colors hover:text-white md:right-8"
          >
            <ChevronRight size={36} />
          </button>

          {/* Image — shared layoutId grows from the clicked tile */}
          <motion.div
            layoutId={`lightbox-${index}`}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] aspect-[4/5]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={images[index]}
              alt={`Fotografía ${index + 1}`}
              fill
              className="object-contain"
              sizes="80vh"
              priority
            />
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-luxe-sm text-white/60">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
