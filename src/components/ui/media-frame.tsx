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
  const [choice, setChoice] = useState<boolean | null>(null); // the visitor's play/pause, once they press it
  const playing = choice ?? !reduce;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing && visible) v.play().catch(() => {});
    else v.pause();
  }, [playing, visible]);

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => setChoice(!playing)}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/85 text-revora-slate backdrop-blur-md transition-colors hover:bg-white"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
    </>
  );
}
