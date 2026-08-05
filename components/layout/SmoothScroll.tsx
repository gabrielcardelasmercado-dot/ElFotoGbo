'use client';

import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

/**
 * Mount this once near the root to enable Lenis smooth scrolling.
 */
export function SmoothScroll() {
  useSmoothScroll();
  return null;
}
