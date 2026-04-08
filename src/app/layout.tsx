import type { Metadata } from 'next';
import './globals.css';
import CookieBanner from '@/components/layout/CookieBanner';

export const metadata: Metadata = {
  title: {
    default: 'Bauelemente Kasten — Rollläden, Terrassendächer & Fenster in Boizenburg',
    template: '%s | Bauelemente Kasten Boizenburg',
  },
  description: 'Olaf Kasten Bauelemente — Ihr Fachbetrieb für Rollläden, Terrassendächer, Fenster und Haustüren in Boizenburg. Beratung, Verkauf und Montage aus einer Hand.',
  keywords: ['Rollläden Boizenburg', 'Terrassendach Boizenburg', 'Fenster Boizenburg', 'Haustüren Boizenburg', 'Bauelemente Boizenburg', 'Sonnenschutz'],
  authors: [{ name: 'Olaf Kasten Bauelemente' }],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://bauelemente-kasten.de',
    siteName: 'Bauelemente Kasten',
    title: 'Bauelemente Kasten — Rollläden, Terrassendächer & Fenster in Boizenburg',
    description: 'Ihr Fachbetrieb für Rollläden, Terrassendächer, Fenster und Haustüren in Boizenburg und Umgebung.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased bg-brand-navy">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
