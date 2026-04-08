import type { Metadata } from 'next';
import { MapPin, Clock, Shield, Users } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Container from '@/components/shared/Container';
import PageBackground from '@/components/shared/PageBackground';
import PageHeader from '@/components/shared/PageHeader';
import ProductCTA from '@/components/products/ProductCTA';

export const metadata: Metadata = {
  title: 'Über uns',
  description: `${COMPANY.fullName} — Ihr Fachbetrieb für Bauelemente in Boizenburg und Umgebung.`,
};

export default function UeberUnsPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-terrassendach.png" />
      <div className="relative z-[1]">
        <PageHeader
          badge="Inhabergeführter Betrieb"
          title="Über uns."
          subtitle="Ihr lokaler Partner für hochwertige Bauelemente in Boizenburg und Umgebung."
        />

        <section className="pb-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm p-6 md:p-10 mb-10">
                <div className="text-white/60 font-body text-base leading-relaxed space-y-4">
                  <p><strong className="font-heading text-white">{COMPANY.fullName}</strong> ist Ihr zuverlässiger Fachbetrieb für Rollläden, Terrassendächer, Fenster und Haustüren in Boizenburg und der gesamten Region Ludwigslust-Parchim.</p>
                  <p>Als inhabergeführter Betrieb legen wir besonderen Wert auf persönliche Beratung, handwerkliche Qualität und die Zufriedenheit unserer Kunden. Von der ersten Beratung über die Produktauswahl bis hin zur fachgerechten Montage — bei uns bekommen Sie alles aus einer Hand.</p>
                  <p>Wir arbeiten ausschließlich mit namhaften Herstellern zusammen und garantieren erstklassige Qualität bei jedem Projekt.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <MapPin size={22} />, title: 'Lokaler Betrieb', text: `Ansässig in ${COMPANY.address.city} — kurze Wege, schneller Service.` },
                  { icon: <Shield size={22} />, title: 'Qualitätsgarantie', text: 'Nur Markenprodukte namhafter Hersteller für langlebige Ergebnisse.' },
                  { icon: <Users size={22} />, title: 'Persönliche Beratung', text: 'Direkter Kontakt mit dem Inhaber — keine Callcenter, keine Wartezeiten.' },
                  { icon: <Clock size={22} />, title: 'Zuverlässig & Pünktlich', text: 'Termingerecht und sauber — wir halten, was wir versprechen.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm">
                    <div className="w-11 h-11 bg-brand-red/15 rounded-lg flex items-center justify-center shrink-0 text-brand-red">{item.icon}</div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-sm mb-0.5">{item.title}</h3>
                      <p className="text-white/70 font-body text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <ProductCTA title="Lernen Sie uns kennen." subtitle="Vereinbaren Sie einen kostenlosen Beratungstermin — vor Ort oder telefonisch." />
      </div>
    </>
  );
}
