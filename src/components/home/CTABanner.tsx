import { Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Container from '../shared/Container';
import Button from '../shared/Button';

export default function CTABanner() {
  return (
    <section className="py-16 bg-brand-red">
      <Container className="text-center text-white">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Bereit für Ihre neuen Bauelemente?
        </h2>
        <p className="text-xl font-body mb-8 opacity-90">
          Kontaktieren Sie uns für eine kostenlose und unverbindliche Beratung.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/kontakt" variant="white" size="lg">
            Jetzt anfragen
          </Button>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-heading font-bold text-white border-2 border-white rounded-lg hover:bg-white hover:text-brand-red transition"
          >
            <Phone size={20} />
            {COMPANY.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
