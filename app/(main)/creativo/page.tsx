import type { Metadata } from 'next';
import { PortfolioHero } from '@/components/gallery/PortfolioHero';
import { EditorialGallery } from '@/components/gallery/EditorialGallery';
import { PORTFOLIOS } from '@/lib/portfolios';

const portfolio = PORTFOLIOS.creativo;

export const metadata: Metadata = {
  title: 'Creativo · Fotografía Editorial y Conceptual',
  description:
    'Donde las ideas toman forma. Cosplay, editorial, retratos creativos, conceptual y arte por ELFOTOGABO.',
  alternates: { canonical: '/creativo' },
  openGraph: {
    title: 'Creativo · ELFOTOGABO',
    description: 'Donde las ideas toman forma.',
    images: [{ url: portfolio.heroImage, width: 1000, height: 1250 }],
  },
};

export default function CreativoPage() {
  return (
    <>
      <PortfolioHero
        title={portfolio.title}
        description={portfolio.description}
        categories={portfolio.categories}
        heroImage={portfolio.heroImage}
      />
      <EditorialGallery images={portfolio.gallery} title={portfolio.title} />
    </>
  );
}
