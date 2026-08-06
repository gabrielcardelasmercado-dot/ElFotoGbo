'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt: string;
  /** When provided, clicking the image opens the lightbox at this index. */
  onClick?: () => void;
  /** Larger editorial feature image vs. standard gallery tile. */
  feature?: boolean;
  /** Priority load (hero / first viewport). */
  priority?: boolean;
  className?: string;
  /** Show the circular ELFOTOGABO watermark behind the image. */
  watermark?: boolean;
};

/**
 * A single vertical (4:5) photograph. Respects composition — never crops,
 * never stretches. Subtle cinematic zoom on hover and a dark overlay.
 */
export function VerticalImage({
  src,
  alt,
  onClick,
  feature = false,
  priority = false,
  className,
  watermark = false,
}: Props) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn('group relative w-full', className)}
    >
      {/* Watermark behind image */}
      {watermark && (
        <div className="pointer-events-none absolute -inset-10 z-0 flex items-center justify-center opacity-[0.03]">
          <Image
            src="/logo/watermark.svg"
            alt=""
            width={420}
            height={420}
            aria-hidden
          />
        </div>
      )}

      <div
        className="relative z-10 overflow-hidden bg-card-ink"
        data-cursor={onClick ? 'view' : undefined}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
              unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-[1.04]"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/20" />
        </div>
      </div>
    </motion.figure>
  );
}
