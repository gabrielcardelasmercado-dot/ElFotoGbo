'use client';

import { useEffect, useRef, useState } from 'react';

export type CursorState = 'default' | 'view' | 'link';

/**
 * Custom premium cursor: outlined circle that follows the pointer with
 * smooth spring lag. Expands over images (showing "EXPLORAR") and enlarges
 * subtly over links/buttons.
 *
 * Returns refs/handlers to attach to interactive elements, plus the element
 * to render. On touch devices the cursor stays hidden.
 */
export function useCustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string>('');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Reveal label when state changes
  useEffect(() => {
    if (state === 'view') setLabel('EXPLORAR');
    else setLabel('');
  }, [state]);

  return { state, setState, visible, label, dotRef, ringRef };
}
