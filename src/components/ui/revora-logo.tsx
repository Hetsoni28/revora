import Image from 'next/image';

interface RevoraLogoProps {
  /**
   * 'color': Original Medical Cobalt Blue + Crimson Red (for light backgrounds)
   * 'white': Crisp White lettering + Crimson Red 'v' (for dark backgrounds like footer)
   * 'auto': Uses CSS inversion / switching
   */
  variant?: 'color' | 'white';
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function RevoraLogo({
  variant = 'color',
  className = 'h-8 w-auto object-contain',
  width = 160,
  height = 54,
  priority = false,
}: RevoraLogoProps) {
  const src =
    variant === 'white'
      ? '/images/revora-logo-white.png'
      : '/images/revora-logo-transparent.png';

  return (
    <Image
      src={src}
      alt="Revora Healthcare"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

