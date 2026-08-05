import type { Metadata } from 'next';
import { PortfolioHero } from '@/components/gallery/PortfolioHero';
import { EditorialGallery } from '@/components/gallery/EditorialGallery';
import { PORTFOLIOS } from '@/lib/portfolios';

const portfolio = PORTFOLIOS.social;

export const metadata: Metadata = {
  title: 'Social · Bodas, XV Años y Eventos',
  description:
    'Historias reales. Momentos que permanecen. Bodas, XV años, eventos y retratos por ELFOTOGABO.',
  alternates: { canonical: '/social' },
  openGraph: {
    title: 'Social · ELFOTOGABO',
    description: 'Historias reales. Momentos que permanecen.',
    images: [{ url: portfolio.heroImage, width: 1000, height: 1250 }],
  },
};

export default function SocialPage() {
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
