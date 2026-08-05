'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { VerticalImage } from '@/components/gallery/VerticalImage';
import { Lightbox } from '@/components/gallery/Lightbox';
import { cn } from '@/lib/utils';

type Props = {
  images: string[];
  /** Title used for alt text. */
  title: string;
};

/**
 * Editorial gallery with a deliberate rhythm (never masonry / pinterest):
 * 1 large → 3 vertical → 1 large → 2 vertical → 1 large → 3 vertical → 1 final
 * Total = 15 images. Generous spacing, perfect alignment.
 *
 * Layout is driven by a pattern array describing each "row":
 *  - 'feature' = one large centered image (col-span full / 8/12)
 *  - 'pair'    = two images side by side
 *  - 'trio'    = three images side by side
 */
const PATTERN: RowType[] = [
  'feature',
  'trio',
  'feature',
  'pair',
  'feature',
  'trio',
  'feature',
];
type RowType = 'feature' | 'pair' | 'trio';

export function EditorialGallery({ images, title }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () =>
    setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () =>
    setActive((i) => (i === null ? i : (i + 1) % images.length));

  // Slice images into rows according to the pattern
  const rows: { type: RowType; items: string[] }[] = [];
  let cursor = 0;
  for (const type of PATTERN) {
    const count = type === 'feature' ? 1 : type === 'pair' ? 2 : 3;
    rows.push({ type, items: images.slice(cursor, cursor + count) });
    cursor += count;
  }

  return (
    <section className="px-6 pb-30 pt-8 md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 md:gap-24">
        {rows.map((row, ri) => {
          const startIndex = rows
            .slice(0, ri)
            .reduce((acc, r) => acc + r.items.length, 0);

          if (row.type === 'feature') {
            return (
              <div
                key={ri}
                className="mx-auto flex w-full max-w-[760px] justify-center"
              >
                <VerticalImage
                  src={row.items[0]}
                  alt={`${title} — fotografía ${startIndex + 1}`}
                  feature
                  priority={ri === 0}
                  watermark
                  onClick={() => open(startIndex)}
                />
              </div>
            );
          }

          const cols = row.type === 'pair' ? 2 : 3;
          return (
            <div
              key={ri}
              className={cn(
                'grid gap-6 md:gap-10',
                cols === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-3'
              )}
            >
              {row.items.map((src, ci) => (
                <VerticalImage
                  key={ci}
                  src={src}
                  alt={`${title} — fotografía ${startIndex + ci + 1}`}
                  priority={ri === 0 && ci === 0}
                  onClick={() => open(startIndex + ci)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <Lightbox
        images={images}
        index={active}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
