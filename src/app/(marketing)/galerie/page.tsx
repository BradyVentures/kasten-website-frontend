import type { Metadata } from 'next';
import Container from '@/components/shared/Container';
import PageBackground from '@/components/shared/PageBackground';
import PageHeader from '@/components/shared/PageHeader';
import ProductCTA from '@/components/products/ProductCTA';
import Gallery3DCarousel from '@/components/gallery/Gallery3DCarousel';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Bildergalerie unserer realisierten Projekte — Rollläden, Terrassendächer, Fenster und Haustüren.',
};

const galleryItems = [
  { title: 'Rollladen am Haus', category: 'Rollläden', image: '/images/products/rolllaeden/rollladen-haus.png' },
  { title: 'Terrassendach mit Familie', category: 'Terrassendächer', image: '/images/products/terrassendaecher/terrassendach-familie.png' },
  { title: 'Fenstermontage', category: 'Fenster', image: '/images/products/fenster-tueren/fenster-montage.png' },
  { title: 'Terrassendach Monteur', category: 'Terrassendächer', image: '/images/hero/terrassendach-hero.png' },
  { title: 'Terrassendach Innenansicht', category: 'Terrassendächer', image: '/images/products/terrassendaecher/terrassendach-innen.png' },
  { title: 'Montagefahrzeug', category: 'Service', image: '/images/gallery/montage-van.png' },
  { title: 'Fenster Einbau', category: 'Fenster', image: '/images/products/fenster-tueren/fenster-einbau.png' },
  { title: 'Terrassendach Aufbau', category: 'Terrassendächer', image: '/images/hero/terrassendach-bau.png' },
  { title: 'Fenster Außenansicht', category: 'Fenster', image: '/images/products/fenster-tueren/fenster-aussen.png' },
  { title: 'Fenster Innenansicht', category: 'Fenster', image: '/images/gallery/fenster-innen.png' },
];

export default function GaleriePage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-rolllaeden.png" />
      <div className="relative z-[1]">
        <PageHeader
          badge="Unsere Arbeit"
          title="Galerie."
          subtitle="Eine Auswahl unserer realisierten Projekte. Jedes wird individuell nach Kundenwunsch umgesetzt."
        />

        <section className="pb-20 overflow-hidden">
          <Container>
            <Gallery3DCarousel items={galleryItems} />
          </Container>
        </section>

        <ProductCTA title="Ihr Projekt ist das nächste." subtitle="Kontaktieren Sie uns für ein unverbindliches Angebot." />
      </div>
    </>
  );
}
