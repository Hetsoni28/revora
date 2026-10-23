import Image from 'next/image';

/**
 * Pale, decorative image behind an inner-page hero (the section must be `relative isolate`).
 * The copy stays dark: images keep their left side near-white, phones get a light wash because the
 * copy sits over the busier right side there, and the bottom blends into the page colour.
 */
export function HeroBackdrop({ src }: { src: string }) {
  return (
    <>
      <Image src={src} alt="" fill loading="eager" sizes="100vw" className="-z-20 object-cover object-right" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/55 tablet-lg:bg-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-b from-transparent to-[#F6F9FC]" />
    </>
  );
}
