import { Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Container from '../shared/Container';

interface ProductCTAProps {
  title?: string;
  subtitle?: string;
}

export default function ProductCTA({
  title = 'Interessiert?',
  subtitle = 'Lassen Sie sich kostenlos und unverbindlich von uns beraten.',
}: ProductCTAProps) {
  return (
    <section className="py-16 bg-brand-red">
      <Container className="text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-white/80 font-body mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/kontakt" className="inline-flex items-center justify-center px-8 py-4 text-lg font-heading font-bold text-brand-red bg-white rounded-xl hover:bg-white/[0.06] transition">
            Jetzt anfragen
          </a>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-heading font-bold text-white border-2 border-white rounded-xl hover:bg-white hover:text-brand-red transition"
          >
            <Phone size={20} />
            {COMPANY.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
