import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryPhoto } from '../../data/gallery';
import { lockScroll, unlockScroll } from '../../lib/lenis';

interface LightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  photos,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const isOpen = activeIndex !== null && photos[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    lockScroll('lightbox');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      unlockScroll('lightbox');
    };
  }, [isOpen, activeIndex, photos.length, onClose, onChangeIndex]);

  if (!isOpen || activeIndex === null) return null;

  const photo = photos[activeIndex];
  const prev = () => onChangeIndex((activeIndex - 1 + photos.length) % photos.length);
  const next = () => onChangeIndex((activeIndex + 1) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-[960] bg-[#05060A]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 max-w-6xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs text-[#4D9BFF] tabular-nums shrink-0">
            {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
          <span className="font-display text-sm sm:text-base font-bold text-white truncate">
            {photo.title}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery preview"
          className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white hover:border-[#1F6BFF] hover:text-[#4D9BFF] transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image */}
      <div
        className="flex-1 min-h-0 flex items-center justify-center relative max-w-6xl w-full mx-auto py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="hidden sm:flex w-11 h-11 items-center justify-center border border-white/15 bg-[#0B0D14]/90 text-white hover:border-[#1F6BFF] hover:bg-[#1F6BFF] transition-colors mr-4 shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[78dvh] max-w-full w-auto h-auto object-contain border border-white/10"
          />
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="hidden sm:flex w-11 h-11 items-center justify-center border border-white/15 bg-[#0B0D14]/90 text-white hover:border-[#1F6BFF] hover:bg-[#1F6BFF] transition-colors ml-4 shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Nav & Caption */}
      <div
        className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto pt-3 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs sm:text-sm text-[#A9B0B8]">{photo.category} · Loveland</span>
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
