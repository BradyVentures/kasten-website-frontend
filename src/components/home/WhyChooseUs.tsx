import { Award, Users, Zap, HeartHandshake } from 'lucide-react';
import Container from '../shared/Container';
import SectionHeading from '../shared/SectionHeading';

const usps = [
  { icon: <Award size={28} />, title: 'Fachkompetenz', description: 'Jahrelange Erfahrung in Beratung und Montage von Bauelementen.' },
  { icon: <Users size={28} />, title: 'Persönliche Betreuung', description: 'Direkter Ansprechpartner für individuelle Lösungen.' },
  { icon: <Zap size={28} />, title: 'Qualitätsprodukte', description: 'Nur hochwertige Markenprodukte namhafter Hersteller.' },
  { icon: <HeartHandshake size={28} />, title: 'Kostenlose Beratung', description: 'Unverbindliche Beratung vor Ort — ohne versteckte Kosten.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 border-t border-white/[0.04]">
      <Container>
        <SectionHeading
          title="Warum Bauelemente Kasten?"
          subtitle="Ihr lokaler Fachbetrieb mit persönlichem Service und höchsten Qualitätsansprüchen."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map(usp => (
            <div key={usp.title} className="text-center p-6 rounded-2xl border border-white/[0.18] bg-white/[0.12]">
              <div className="w-14 h-14 bg-brand-red rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                {usp.icon}
              </div>
              <h3 className="text-base font-heading font-bold text-white mb-2">{usp.title}</h3>
              <p className="text-white/70 font-body text-sm">{usp.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
