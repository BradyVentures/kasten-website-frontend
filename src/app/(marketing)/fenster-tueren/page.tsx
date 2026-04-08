import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/constants';
import PageBackground from '@/components/shared/PageBackground';
import ProductHero from '@/components/products/ProductHero';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductCTA from '@/components/products/ProductCTA';

const product = PRODUCTS['fenster-tueren'];

export const metadata: Metadata = {
  title: 'Fenster & Haustüren',
  description: product.description,
};

export default function FensterTuerenPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-fenster.png" />
      <div className="relative z-[1]">
        <ProductHero title={product.title} description={product.description} image={product.image} />
        <ProductFeatures features={[...product.features]} title="Sicherheit & Komfort" subtitle="Moderne Fenster und Haustüren für höchste Ansprüche." />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-black text-center mb-8"><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">Häufige Fragen.</span></h2>
            <div className="space-y-4">
              {[
                { q: 'Welche Materialien gibt es?', a: 'Wir bieten Fenster und Türen aus PVC, Aluminium und Holz-Aluminium an. Jedes Material hat spezifische Vorteile — wir beraten Sie individuell.' },
                { q: 'Wie sicher sind Ihre Fenster?', a: 'Wir verbauen auf Wunsch zertifizierte Sicherheitsfenster nach RC2-Standard — der empfohlene Mindeststandard für Wohngebäude.' },
                { q: 'Wie gut ist die Wärmedämmung?', a: 'Moderne Mehrkammer-Profile und Dreifachverglasung sorgen für hervorragende Wärmedämmwerte (Uw-Werte bis 0,8 W/m²K).' },
                { q: 'Wird der alte Rahmen entfernt?', a: 'Ja, wir übernehmen den kompletten Austausch inklusive Entsorgung der alten Fenster und sauberer Wiederherstellung der Laibung.' },
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
