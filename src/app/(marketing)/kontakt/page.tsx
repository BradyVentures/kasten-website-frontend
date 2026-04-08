import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import Container from '@/components/shared/Container';
import ContactForm from '@/components/shared/ContactForm';
import PageBackground from '@/components/shared/PageBackground';
import PageHeader from '@/components/shared/PageHeader';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Kontaktieren Sie ${COMPANY.fullName} in Boizenburg. Telefon: ${COMPANY.phone}, E-Mail: ${COMPANY.email}`,
};

export default function KontaktPage() {
  return (
    <>
      <PageBackground image="/images/hero/hero-fenster.png" />
      <div className="relative z-[1]">
        <PageHeader
          badge="Wir freuen uns auf Sie"
          title="Kontaktieren Sie uns."
          subtitle="Nutzen Sie das Formular oder kontaktieren Sie uns direkt — wir antworten schnell."
        />

        <section className="pb-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="space-y-4">
                {[
                  { icon: <MapPin size={18} />, label: 'Adresse', text: <>{COMPANY.address.street}<br />{COMPANY.address.zip} {COMPANY.address.city}</> },
                  { icon: <Phone size={18} />, label: 'Telefon', text: <><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-brand-red transition">{COMPANY.phone}</a><br /><a href={`tel:${COMPANY.mobile.replace(/\s/g, '')}`} className="hover:text-brand-red transition">{COMPANY.mobile} (Mobil)</a></> },
                  { icon: <Mail size={18} />, label: 'E-Mail', text: <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-red transition">{COMPANY.email}</a> },
                  { icon: <Clock size={18} />, label: 'Erreichbarkeit', text: <>Mo - Fr: 8:00 - 17:00 Uhr<br />Termine nach Vereinbarung</> },
                ].map(item => (
                  <div key={item.label} className="flex gap-4 p-4 rounded-xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm">
                    <div className="w-10 h-10 bg-brand-red/15 rounded-lg flex items-center justify-center shrink-0 text-brand-red">{item.icon}</div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-sm">{item.label}</h3>
                      <p className="text-white/70 font-body text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl overflow-hidden border border-white/[0.18]">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.5!2d10.7!3d53.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDIyJzQ4LjAiTiAxMMKwNDInMDAuMCJF!5e0!3m2!1sde!2sde!4v1" width="100%" height="180" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Standort" />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm p-6 md:p-8">
                  <h3 className="text-lg font-heading font-bold text-white mb-6">Anfrage senden</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
