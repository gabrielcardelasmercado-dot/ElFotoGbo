import fs from 'node:fs';
import path from 'node:path';

export type PortfolioId = 'creativo' | 'social' | 'gastronomia';

export type PortfolioMeta = {
  id: PortfolioId;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  heroImage: string;
  /** Ordered list of vertical (4:5) gallery images, loaded from disk. */
  gallery: string[];
};

/**
 * Auto-loads every image file from /public/images/<slug>/ at build time.
 *
 * To replace a photograph, simply overwrite or add a file inside the folder —
 * no code changes are required. Files are sorted alphabetically, so you can
 * control the gallery order with zero-padded names (01.jpg, 02.jpg, …).
 *
 * The hero image is the first image in the folder. If a folder is empty, the
 * gallery falls back to an empty array so the page still renders.
 */

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function loadGalleryImages(slug: string): string[] {
  const dir = path.join(IMAGES_DIR, slug);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((file) =>
        IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
      .map((file) => `/images/${slug}/${file}`);
    return files;
  } catch {
    return [];
  }
}

function buildPortfolio(
  id: PortfolioId,
  title: string,
  description: string,
  categories: string[]
): PortfolioMeta {
  const gallery = loadGalleryImages(id);
  return {
    id,
    slug: id,
    title,
    description,
    categories,
    heroImage: gallery[0] ?? '',
    gallery,
  };
}

export const PORTFOLIOS: Record<PortfolioId, PortfolioMeta> = {
  creativo: buildPortfolio('creativo', 'CREATIVO', 'Donde las ideas toman forma.', [
    'Cosplay',
    'Editorial',
    'Retratos Creativos',
    'Conceptual',
    'Arte',
  ]),
  social: buildPortfolio(
    'social',
    'SOCIAL',
    'Historias reales. Momentos que permanecen.',
    ['Bodas', 'XV Años', 'Eventos', 'Retratos']
  ),
  gastronomia: buildPortfolio(
    'gastronomia',
    'GASTRONOMÍA',
    'Fotografía que despierta el apetito.',
    ['Restaurantes', 'Cafeterías', 'Food Styling', 'Productos']
  ),
};

export const PORTFOLIO_ORDER: PortfolioId[] = ['creativo', 'social', 'gastronomia'];
