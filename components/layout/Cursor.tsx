'use client';

import { useEffect, useState } from 'react';
import { useCustomCursor } from '@/hooks/use-custom-cursor';

/**
 * Global custom cursor. Mounted once in the app shell.
 * Listens for data-cursor attributes on hovered elements to switch states.
 */
export function Cursor() {
  const { state, setState, visible, label, dotRef, ringRef } =
    useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Delegate hover detection via event delegation
  useEffect(() => {
    if (!mounted) return;
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        '[data-cursor]'
      );
      if (target) {
        const val = target.getAttribute('data-cursor') as
          | 'view'
          | 'link'
          | null;
        if (val === 'view') setState('view');
        else if (val === 'link') setState('link');
      } else {
        setState('default');
      }
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, [mounted, setState]);

  if (!mounted) return null;

  const ringSize =
    state === 'view' ? 96 : state === 'link' ? 52 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 300ms ease' }}
    >
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 will-change-transform"
        style={{
          width: ringSize,
          height: ringSize,
          transition:
            'width 400ms cubic-bezier(0.16,1,0.3,1), height 400ms cubic-bezier(0.16,1,0.3,1), background-color 400ms ease, border-color 400ms ease',
        }}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-full border border-white/60"
          style={{
            backgroundColor:
              state === 'view' ? 'rgba(255,255,255,0.92)' : 'transparent',
            borderColor:
              state === 'view' ? 'rgba(255,255,255,0.0)' : 'rgba(255,255,255,0.5)',
          }}
        >
          {state === 'view' && (
            <span className="text-[10px] font-medium tracking-luxe-sm text-ink">
              {label}
            </span>
          )}
        </div>
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 rounded-full bg-white will-change-transform"
        style={{ opacity: state === 'view' ? 0 : 1 }}
      />
    </div>
  );
}
