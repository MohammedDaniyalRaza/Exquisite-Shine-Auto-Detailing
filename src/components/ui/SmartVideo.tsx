import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, X } from 'lucide-react';
import { SITE } from '../../data/site';
import { VideoItem } from '../../data/videos';
import { lockScroll, unlockScroll } from '../../lib/lenis';

interface VideoCardProps {
  video: VideoItem;
  onOpen: (video: VideoItem) => void;
  pausedByModal?: boolean;
  className?: string;
}

export function VideoCard({
  video,
  onOpen,
  pausedByModal = false,
  className = '',
}: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.7] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed) return;

    if (inView && !pausedByModal) {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay blocked silently; poster stays visible
        });
      }
    } else {
      vid.pause();
    }
  }, [inView, pausedByModal, videoFailed]);

  if (videoFailed) {
    return (
      <div
        ref={cardRef}
        className={`group flex flex-col border border-white/10 bg-[#0B0D14] overflow-hidden ${className}`}
      >
        <div className="relative aspect-video bg-gradient-to-br from-[#0F172A] via-[#0B0D14] to-[#05060A] flex flex-col items-center justify-center p-6 text-center gap-4">
          <img
            src={video.poster}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            loading="lazy"
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#A9B0B8]">
              {video.title}
            </span>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#1F6BFF] text-white hover:bg-[#4D9BFF] transition-colors whitespace-nowrap"
            >
              <span>Watch on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="p-5 border-t border-white/10 flex-1 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">{video.number}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6B727A]">
              Loveland
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">{video.title}</h3>
          <p className="text-sm text-[#A9B0B8]">{video.caption}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      data-cursor="play"
      className={`group flex flex-col border border-white/10 bg-[#0B0D14] hover:border-[#1F6BFF]/50 transition-colors duration-300 overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen(video)}
        aria-label={`Play ${video.title}`}
        className="relative aspect-video w-full overflow-hidden bg-[#05060A] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05060A]/85 via-[#05060A]/15 to-transparent pointer-events-none"
        />
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
            Clip {video.number}
          </span>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white group-hover:bg-[#1F6BFF] group-hover:border-[#4D9BFF] transition-colors">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </span>
        </div>
      </button>

      <div className="p-5 border-t border-white/10 flex-1 flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">{video.number}</span>
          <button
            type="button"
            onClick={() => onOpen(video)}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A9B0B8] hover:text-white transition-colors"
          >
            Play with sound
          </button>
        </div>
        <h3 className="font-display text-lg font-bold text-white tracking-tight">
          {video.title}
        </h3>
        <p className="text-sm text-[#A9B0B8] leading-relaxed">{video.caption}</p>
      </div>
    </div>
  );
}

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    setModalError(false);
    if (!video) return;

    lockScroll('video-modal');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      unlockScroll('video-modal');
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[960] bg-[#05060A]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between gap-4 border-b border-white/10 pb-3">
          <div className="min-w-0">
            <span className="font-mono text-xs text-[#4D9BFF] mr-3 tabular-nums">
              {video.number}
            </span>
            <span className="font-display text-base sm:text-lg font-bold text-white truncate">
              {video.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white hover:border-[#1F6BFF] hover:text-[#4D9BFF] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full flex items-center justify-center bg-[#0B0D14] border border-white/10 overflow-hidden">
          {!modalError ? (
            <video
              key={video.src}
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              onError={() => setModalError(true)}
              className="max-h-[85dvh] max-w-full w-auto h-auto object-contain mx-auto block"
            />
          ) : (
            <div className="relative w-full aspect-video max-h-[75dvh] flex flex-col items-center justify-center p-8 text-center gap-4">
              <img
                src={video.poster}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <p className="text-base text-white font-medium">
                  Video preview could not be loaded here.
                </p>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F6BFF] text-white text-sm font-medium hover:bg-[#4D9BFF] transition-colors"
                >
                  <span>Watch on Facebook</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
