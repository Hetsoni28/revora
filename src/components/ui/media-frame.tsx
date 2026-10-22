'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { expoOut } from '@/lib/easings';

interface MediaFrameProps {
  /** Photo — or, with `video`, the still shown before the video plays. */
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  /** Small glass label in the corner. */
  caption?: React.ReactNode;
  className?: string;
  /** Muted looping clip shown in place of the photo. */
  video?: { mp4: string; webm?: string };
}

/** Rounded photo (or muted video) that wipes up into view and settles from a slight zoom. */
export function MediaFrame({ src, alt, aspect = 'aspect-[4/3]', sizes = '(min-width: 1024px) 50vw, 100vw', caption, className, video }: MediaFrameProps) {
  // Observe the unclipped figure: a fully clipped element reports zero visibility.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const shown = inView || reduce;

  return (
    <figure ref={ref} className={`relative ${aspect} ${className ?? ''}`}>
      <motion.div
        initial={false}
        animate={{ clipPath: shown ? 'inset(0% 0 0 0 round 28px)' : 'inset(100% 0 0 0 round 28px)' }}
        transition={{ duration: 1.2, ease: expoOut }}
        className="absolute inset-0 overflow-hidden rounded-[28px] bg-revora-sky"
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: shown ? 1 : 1.15 }}
          transition={{ duration: 1.6, ease: expoOut }}
        >
          {video ? (
            <FrameVideo video={video} poster={src} label={alt} reduce={!!reduce} />
          ) : (
            /* eager: these large photos are often the LCP element, depending on where the page is opened */
            <Image src={src} alt={alt} fill sizes={sizes} loading="eager" className="object-cover" />
          )}
        </motion.div>
        {caption && (
          <figcaption className="absolute bottom-4 left-4 right-4 w-fit rounded-2xl border border-white/50 bg-white/85 px-4 py-2.5 font-sans text-[13px] text-revora-slate backdrop-blur-md">
            {caption}
          </figcaption>
        )}
      </motion.div>
    </figure>
  );
}

/**
 * Plays only while on screen (saves battery and data), never with sound, and always offers a
 * pause button — moving content longer than 5 seconds must be pausable. With reduced motion it
 * starts paused on the poster.
 */
function FrameVideo({ video, poster, label, reduce }: { video: { mp4: string; webm?: string }; poster: string; label: string; reduce: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  // start downloading a little before it scrolls into view, so it is ready to play — not a still poster
  const near = useInView(ref, { once: true, margin: '600px 0px' });
  const [choice, setChoice] = useState<boolean | null>(null); // the visitor's play/pause, once they press it
  const [isPlaying, setIsPlaying] = useState(false); // what the video is actually doing
  const wantPlay = choice ?? !reduce;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => {
      if (wantPlay && visible && document.visibilityState === 'visible') {
        v.muted = true;
        // may still be refused (e.g. battery saver) — the button then offers Play
        v.play().catch(() => {});
      } else v.pause();
    };
    sync();
    // browsers pause video in background tabs; pick it up again on return
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [wantPlay, visible]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    setChoice(!isPlaying);
    // call play() inside the tap itself so phones in low-power mode allow it
    if (isPlaying) v.pause();
    else v.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload={near ? 'auto' : 'none'}
        poster={poster}
        aria-label={label}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/85 text-revora-slate backdrop-blur-md transition-colors hover:bg-white"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
    </>
  );
}
