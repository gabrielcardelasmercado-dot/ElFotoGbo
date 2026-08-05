'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Landing hero — 100vh, black background, one elegant vertical image
 * (~45vh, never cropped) with a very slow cinematic zoom. Centered title,
 * subtitle, and a minimal scroll indicator. No buttons, no social icons.
 */
export function LandingHero() {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full flex-col items-center justify-center overflow-hidden bg-ink px-6">
      {/* Vertical placeholder image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-0 mb-14 aspect-[4/5] h-[45vh] w-auto overflow-hidden bg-card-ink"
      >
        <Image
          src="/images/landing-hero.jpg"
          alt="ELFOTOGABO — portada"
          fill
          priority
          sizes="45vh"
          className="animate-slow-zoom object-cover"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="relative z-10 text-center text-5xl font-bold tracking-luxe-sm text-white md:text-7xl lg:text-8xl"
      >
        ELFOTOGABO
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="relative z-10 mt-8 text-center text-sm tracking-luxe-sm text-muted-ink md:text-base"
      >
        No busco momentos.
        <br />
        Busco lo que permanece.
      </motion.p>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-[1px] items-start justify-center bg-white/20">
          <div className="h-3 w-[1px] animate-scroll-hint bg-white" />
        </div>
      </motion.div>
    </section>
  );
}
