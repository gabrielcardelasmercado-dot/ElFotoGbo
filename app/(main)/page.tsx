import type { Metadata } from 'next';
import { LandingHero } from '@/components/sections/LandingHero';
import { PortfolioIntroSection } from '@/components/sections/PortfolioIntroSection';
import { SobreMi } from '@/components/sections/SobreMi';
import { PORTFOLIOS } from '@/lib/portfolios';

export const metadata: Metadata = {
  title: 'ELFOTOGABO · Gabriel Cardelas — Fotografía Editorial',
  description:
    'No busco momentos. Busco lo que permanece. Tres mundos fotográficos: Creativo, Social y Gastronomía.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <LandingHero />

      <PortfolioIntroSection
        id="creativo"
        title="CREATIVO"
        description="Donde las ideas toman forma."
        categories={PORTFOLIOS.creativo.categories}
        image={PORTFOLIOS.creativo.heroImage}
        href="/creativo"
      />

      <PortfolioIntroSection
        id="social"
        title="SOCIAL"
        description="Historias reales. Momentos que permanecen."
        categories={PORTFOLIOS.social.categories}
        image={PORTFOLIOS.social.heroImage}
        href="/social"
        reverse
      />

      <PortfolioIntroSection
        id="gastronomia"
        title="GASTRONOMÍA"
        description="Fotografía que despierta el apetito."
        categories={PORTFOLIOS.gastronomia.categories}
        image={PORTFOLIOS.gastronomia.heroImage}
        href="/gastronomia"
        compactTitle
      />

      <SobreMi />
    </>
  );
}
