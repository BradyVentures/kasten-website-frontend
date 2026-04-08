import { Camera, Palette, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Container from '../shared/Container';
import SectionHeading from '../shared/SectionHeading';

const steps = [
  { icon: <Palette size={24} />, title: 'Produkt wählen', description: 'Wählen Sie Kategorie, Farbe und Stil.' },
  { icon: <Camera size={24} />, title: 'Foto hochladen', description: 'Laden Sie ein Foto Ihres Hauses hoch.' },
  { icon: <Eye size={24} />, title: 'Vorschau erhalten', description: 'Sehen Sie, wie es aussehen könnte.' },
];

export default function VisualizerTeaser() {
  return (
    <section className="py-20 border-t border-white/[0.04]">
      <Container>
        <SectionHeading
          title="Produktvorschau"
          subtitle="Laden Sie ein Foto Ihres Hauses hoch und sehen Sie in Sekunden, wie unsere Produkte an Ihrem Zuhause aussehen würden."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center p-6 rounded-2xl border border-white/[0.18] bg-white/[0.12]">
              <div className="w-14 h-14 bg-brand-red/15 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-red">
                {step.icon}
              </div>
              <div className="text-xs text-brand-red font-heading font-bold mb-1">Schritt {i + 1}</div>
              <h3 className="text-base font-heading font-bold text-white mb-1.5">{step.title}</h3>
              <p className="text-white/70 font-body text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/visualizer" className="inline-flex items-center gap-2 px-8 py-4 text-base font-heading font-bold text-white bg-brand-red rounded-xl hover:bg-brand-red-dark transition shadow-lg shadow-brand-red/20">
            Jetzt ausprobieren <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
