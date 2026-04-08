import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/constants';
import PageBackground from '@/components/shared/PageBackground';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductCTA from '@/components/products/ProductCTA';

const product = PRODUCTS.rolllaeden;

export const metadata: Metadata = {
  title: 'Rollläden & Sonnenschutz',
  description: product.description,
};

export default function RollladenPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-rolllaeden.png" />
      <div className="relative z-[1]">
        <ProductHero title={product.title} description={product.description} image={product.image} />
        <ProductFeatures features={[...product.features]} title="Unser Sonnenschutz-Sortiment" subtitle="Von Rollläden bis Insektenschutz — wir haben die passende Lösung für jedes Fenster." />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-black text-center mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">Häufige Fragen.</span>
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Welche Rollladen-Materialien gibt es?', a: 'Wir bieten Rollläden aus Aluminium und PVC an. Aluminium ist besonders robust und langlebig, während PVC eine kostengünstige Alternative mit guter Wärmedämmung darstellt.' },
                { q: 'Können Rollläden nachträglich eingebaut werden?', a: 'Ja, mit Vorbau-Rollläden ist ein nachträglicher Einbau problemlos möglich. Wir beraten Sie vor Ort über die beste Lösung für Ihre Fenster.' },
                { q: 'Wie lange dauert die Montage?', a: 'Die Montage eines Rollladens dauert in der Regel 2-4 Stunden pro Fenster. Bei größeren Aufträgen planen wir die Montage so, dass Sie möglichst wenig gestört werden.' },
                { q: 'Bieten Sie auch elektrische Rollläden an?', a: 'Selbstverständlich. Wir verbauen motorisierte Rollläden mit Schalter, Fernbedienung oder auch Smart-Home-Integration.' },
              ].map(faq => (
                <details key={faq.q} className="group border border-white/[0.08] rounded-xl bg-white/[0.14] backdrop-blur-sm">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-heading font-bold text-white/80 group-open:text-brand-red transition">
                    {faq.q}
                    <span className="ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
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
