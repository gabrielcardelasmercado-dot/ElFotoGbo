'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description: string;
  categories: string[];
  image: string;
  href: string;
  /** Reverse the split (image on opposite side). */
  reverse?: boolean;
  /** Shrink title so long words never crop on desktop. */
  compactTitle?: boolean;
  /** Section anchor id. */
  id?: string;
};

/**
 * Split editorial section introducing one of the three portfolios.
 * Large vertical image on one side, title + categories + description +
 * "EXPLORAR →" button on the other. A circular ELFOTOGABO watermark sits
 * behind the featured image at very low opacity.
 */
export function PortfolioIntroSection({
  title,
  description,
  categories,
  image,
  href,
  reverse = false,
  compactTitle = false,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-30 md:px-10"
    >
      <div
        className={cn(
          'mx-auto grid w-full max-w-[1500px] items-center gap-16 md:grid-cols-2 md:gap-24',
          reverse && 'md:[direction:rtl]'
        )}
      >
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center [direction:ltr]"
        >
          {/* Watermark behind image */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.03]">
            <Image
              src="/logo/watermark.svg"
              alt=""
              width={460}
              height={460}
              aria-hidden
            />
          </div>

          <div className="relative z-10 aspect-[4/5] w-full max-w-[460px] overflow-hidden bg-card-ink">
            <Image
              src={image}
              alt={`${title} — fotografía`}
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover transition-transform duration-1000 ease-luxe hover:scale-[1.04]"
            />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col [direction:ltr]"
        >
          <h2
            className={cn(
              'font-bold tracking-luxe-sm text-white',
              compactTitle
                ? 'text-4xl md:text-6xl'
                : 'text-5xl md:text-7xl lg:text-8xl'
            )}
          >
            {title}
          </h2>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((c) => (
              <span
                key={c}
                className="text-[11px] tracking-luxe-sm text-muted-ink"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-ink md:text-base">
            {description}
          </p>

          <Link
            href={href}
            data-cursor="link"
            className="group mt-12 inline-flex w-fit items-center gap-3 text-[12px] tracking-luxe-sm text-white"
          >
            EXPLORAR
            <ArrowRight
              size={16}
              className="transition-transform duration-500 ease-luxe group-hover:translate-x-2"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
