'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description: string;
  categories: string[];
  heroImage: string;
  /** When true, shrink the title so long words (e.g. GASTRONOMÍA) never crop. */
  compactTitle?: boolean;
};

/**
 * Fullscreen hero shared by every portfolio page. One elegant vertical
 * placeholder image (~45% screen height), never cropped. Title + description.
 * The hero continues naturally into the gallery below.
 */
export function PortfolioHero({
  title,
  description,
  categories,
  heroImage,
  compactTitle = false,
}: Props) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 md:px-10">
      {/* Vertical hero image — centered, ~45vh, never cropped */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 mb-16 aspect-[4/5] h-[45vh] w-auto overflow-hidden bg-card-ink"
      >
        <Image
          src={heroImage}
          alt={`${title} — fotografía de portada`}
          fill
          priority
          sizes="45vh"
          className="animate-slow-zoom object-cover"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={cn(
          'text-center font-bold tracking-luxe-sm text-white',
          compactTitle
            ? 'text-4xl md:text-6xl lg:text-7xl'
            : 'text-6xl md:text-8xl lg:text-9xl'
        )}
      >
        {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="mt-8 text-center text-sm tracking-luxe-sm text-muted-ink md:text-base"
      >
        {description}
      </motion.p>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
      >
        {categories.map((c) => (
          <span
            key={c}
            className="text-[10px] tracking-luxe-sm text-muted-ink/70"
          >
            {c}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
