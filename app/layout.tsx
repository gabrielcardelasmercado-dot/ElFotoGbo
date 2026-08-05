import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/site-config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elfotogabo.com'),
  title: {
    default: SITE_CONFIG.name,
    template: `%s · ${SITE_CONFIG.name}`,
  },
  description:
    'ELFOTOGABO — Gabriel Cardelas. Fotografía editorial, social y gastronómica. No busco momentos. Busco lo que permanece.',
  keywords: [
    'ELFOTOGABO',
    'Gabriel Cardelas',
    'fotografía editorial',
    'fotografía social',
    'fotografía gastronómica',
    'fotógrafo',
  ],
  authors: [{ name: 'Gabriel Cardelas' }],
  creator: 'Gabriel Cardelas',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://elfotogabo.com',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description:
      'No busco momentos. Busco lo que permanece. Fotografía editorial, social y gastronómica.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description:
      'No busco momentos. Busco lo que permanece. Fotografía editorial, social y gastronómica.',
    images: ['/images/og.jpg'],
  },
  icons: {
    icon: '/logo/favicon.ico',
    shortcut: '/logo/favicon.ico',
    apple: '/logo/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: '#090909',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-ink text-white antialiased">{children}</body>
    </html>
  );
}
