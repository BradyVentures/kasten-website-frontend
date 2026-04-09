import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Container from '../shared/Container';

export default function Footer() {
  return (
    <footer className="relative z-[2] bg-black/40 backdrop-blur-xl border-t border-white/[0.08] text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <Image
              src="/images/OKB_Logo_Light.svg"
              alt="Olaf Kasten Bauelemente"
              width={180}
              height={54}
              className="h-12 w-auto mb-2"
            />
            <p className="text-gray-300 font-body text-sm leading-relaxed">
              Ihr Fachbetrieb für Rollläden, Terrassendächer, Fenster und Haustüren in Boizenburg und Umgebung. Beratung, Verkauf und Montage — alles aus einer Hand.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Produkte</h4>
            <ul className="space-y-2">
              <li><Link href="/rolllaeden" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Rollläden & Sonnenschutz</Link></li>
              <li><Link href="/terrassendaecher" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Terrassendächer</Link></li>
              <li><Link href="/fenster-tueren" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Fenster & Haustüren</Link></li>
              <li><Link href="/reparatur" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Reparaturservice</Link></li>
              <li><Link href="/visualizer" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Produktvorschau</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Informationen</h4>
            <ul className="space-y-2">
              <li><Link href="/ueber-uns" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Über uns</Link></li>
              <li><Link href="/galerie" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Galerie</Link></li>
              <li><Link href="/kontakt" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Kontakt</Link></li>
              <li><Link href="/impressum" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-gray-300 hover:text-brand-red transition font-body text-sm">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-red mt-0.5 shrink-0" />
                <span className="text-gray-300 font-body text-sm">
                  {COMPANY.address.street}<br />
                  {COMPANY.address.zip} {COMPANY.address.city}
                </span>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-gray-300 hover:text-brand-red transition">
                  <Phone size={18} className="text-brand-red shrink-0" />
                  <span className="font-body text-sm">{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.mobile.replace(/\s/g, '')}`} className="flex items-center gap-3 text-gray-300 hover:text-brand-red transition">
                  <Phone size={18} className="text-brand-red shrink-0" />
                  <span className="font-body text-sm">{COMPANY.mobile}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-gray-300 hover:text-brand-red transition">
                  <Mail size={18} className="text-brand-red shrink-0" />
                  <span className="font-body text-sm">{COMPANY.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm font-body">
            &copy; {new Date().getFullYear()} {COMPANY.fullName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4 text-xs font-body">
            <a href="https://kasten-crm.brady-digital.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition">Verwaltung</a>
            <span className="text-white/70">Website von <a href="https://brady-digital.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition">Brady Digital</a></span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
