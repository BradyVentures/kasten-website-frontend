import Image from 'next/image';
import Link from 'next/link';
import Container from '../shared/Container';
import SectionHeading from '../shared/SectionHeading';

const services = [
  { title: 'Rollläden & Sonnenschutz', description: 'Rollläden, Markisen, Raffstore und Insektenschutz — individuell für Ihr Zuhause.', href: '/rolllaeden', image: '/images/products/rolllaeden/rollladen-haus.png' },
  { title: 'Terrassendächer', description: 'Hochwertige Terrassendächer in verschiedenen Ausführungen, Größen und Farben.', href: '/terrassendaecher', image: '/images/products/terrassendaecher/terrassendach-familie.png' },
  { title: 'Fenster & Haustüren', description: 'Moderne Fenster und Türen für Sicherheit, Wärmedämmung und Komfort.', href: '/fenster-tueren', image: '/images/products/fenster-tueren/fenster-montage.png' },
  { title: 'Reparaturservice', description: 'Schnelle und fachmännische Reparaturen an Rollläden, Fenstern und Türen.', href: '/reparatur', image: '/images/products/rolllaeden/rollladen-haus.png' },
];

export default function ServicesGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Unsere Leistungen"
          subtitle="Von der Beratung bis zur Montage — wir sind Ihr kompetenter Partner für alle Bauelemente."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(service => (
            <Link key={service.title} href={service.href} className="group">
              <div className="rounded-2xl border border-white/[0.18] bg-white/[0.12] overflow-hidden hover:border-white/15 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-heading font-bold text-white mb-1.5 group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 font-body text-sm">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
