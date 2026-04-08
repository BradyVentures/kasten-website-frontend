import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/constants';
import PageBackground from '@/components/shared/PageBackground';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductCTA from '@/components/products/ProductCTA';

const product = PRODUCTS.reparatur;

export const metadata: Metadata = {
  title: 'Reparaturservice',
  description: product.description,
};

export default function ReparaturPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-rolllaeden.png" />
      <div className="relative z-[1]">
        <ProductHero title={product.title} description={product.description} image={product.image} ctaText="Reparatur anfragen" />
        <ProductFeatures features={[...product.features]} title="Unser Reparaturservice" subtitle="Schnell, zuverlässig und zu fairen Preisen." />
        <ProductCTA title="Reparatur nötig?" subtitle="Rufen Sie uns an oder senden Sie eine Anfrage — wir helfen schnell." />
      </div>
    </>
  );
}
