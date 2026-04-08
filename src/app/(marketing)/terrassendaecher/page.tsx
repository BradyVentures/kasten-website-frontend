import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/constants';
import PageBackground from '@/components/shared/PageBackground';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductCTA from '@/components/products/ProductCTA';

const product = PRODUCTS.terrassendaecher;

export const metadata: Metadata = {
  title: 'Terrassendächer',
  description: product.description,
};

export default function TerrassendachPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-terrassendach.png" />
      <div className="relative z-[1]">
        <ProductHero title={product.title} description={product.description} image={product.image} />
        <ProductFeatures features={[...product.features]} title="Ihr perfektes Terrassendach" subtitle="Genießen Sie Ihre Terrasse bei jedem Wetter — mit einem maßgefertigten Terrassendach." />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-black text-center mb-8"><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">Häufige Fragen.</span></h2>
            <div className="space-y-4">
              {[
                { q: 'Welche Farben sind verfügbar?', a: 'Unsere Terrassendächer sind in Weiß, Anthrazit (DB703) und weiteren RAL-Farben erhältlich. Lassen Sie sich beraten!' },
                { q: 'Brauche ich eine Baugenehmigung?', a: 'In den meisten Fällen ist ein Terrassendach genehmigungsfrei. Wir prüfen das für Sie und unterstützen bei Bedarf bei der Antragstellung.' },
                { q: 'Wie wird das Terrassendach befestigt?', a: 'Die Konstruktion wird an der Hauswand und auf stabilen Pfosten montiert. Wir sorgen für sichere Verankerung und korrekte Statik.' },
                { q: 'Kann ich Seitenwände ergänzen?', a: 'Ja, wir bieten Glas-Schiebewände und feste Seitenteile als Ergänzung an. So wird Ihre Terrasse zum ganzjährig nutzbaren Wintergarten.' },
              ].map(faq => (
                <details key={faq.q} className="group border border-white/[0.08] rounded-xl bg-white/[0.14] backdrop-blur-sm">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-heading font-bold text-white/80 group-open:text-brand-red transition">{faq.q}<span className="ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span></summary>
                  <p className="px-5 pb-5 text-white/70 font-body">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <ProductCTA />
      </div>
    </>
  );
}
