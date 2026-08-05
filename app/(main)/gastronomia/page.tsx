import type { Metadata } from 'next';
import { PortfolioHero } from '@/components/gallery/PortfolioHero';
import { EditorialGallery } from '@/components/gallery/EditorialGallery';
import { PORTFOLIOS } from '@/lib/portfolios';

const portfolio = PORTFOLIOS.gastronomia;

export const metadata: Metadata = {
  title: 'Gastronomía · Fotografía de Alimentos y Restaurantes',
  description:
    'Fotografía que despierta el apetito. Restaurantes, cafeterías, food styling y productos por ELFOTOGABO.',
  alternates: { canonical: '/gastronomia' },
  openGraph: {
    title: 'Gastronomía · ELFOTOGABO',
    description: 'Fotografía que despierta el apetito.',
    images: [{ url: portfolio.heroImage, width: 1000, height: 1250 }],
  },
};

export default function GastronomiaPage() {
  return (
    <>
      <PortfolioHero
        title={portfolio.title}
        description={portfolio.description}
        categories={portfolio.categories}
        heroImage={portfolio.heroImage}
        compactTitle
      />
      <EditorialGallery images={portfolio.gallery} title={portfolio.title} />
    </>
  );
}
