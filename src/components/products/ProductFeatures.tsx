import { CheckCircle } from 'lucide-react';
import Container from '../shared/Container';
import SectionHeading from '../shared/SectionHeading';

interface Feature {
  title: string;
  description: string;
}

interface ProductFeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export default function ProductFeatures({ features, title = 'Unsere Leistungen', subtitle }: ProductFeaturesProps) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map(feature => (
            <div key={feature.title} className="flex gap-4 p-5 rounded-xl border border-white/[0.18] bg-white/[0.12]">
              <div className="shrink-0">
                <CheckCircle size={22} className="text-brand-red mt-0.5" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-white/70 font-body text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
