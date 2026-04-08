import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/shared/Container';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: `Datenschutzerklärung von ${COMPANY.fullName}`,
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm p-8 md:p-12">
            <div className="prose prose-lg font-body text-white/80 prose-headings:font-heading prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80 prose-a:text-brand-red prose-strong:text-white prose-hr:border-white/10 [&_p]:!text-white/80 [&_li]:!text-white/80">
              <h1 className="text-4xl font-heading font-black"><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">Datenschutz.</span></h1>

              <h2 className="font-heading text-white">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-heading text-white">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
                Sie persönlich identifiziert werden können.
              </p>

              <h2 className="font-heading text-white">2. Verantwortliche Stelle</h2>
              <p>
                {COMPANY.fullName}<br />
                {COMPANY.address.street}<br />
                {COMPANY.address.zip} {COMPANY.address.city}<br />
                Telefon: {COMPANY.phone}<br />
                E-Mail: {COMPANY.email}
              </p>

              <h2 className="font-heading text-white">3. Datenerfassung auf dieser Website</h2>

              <h3 className="font-heading text-white">Cookies</h3>
              <p>
                Diese Website verwendet Cookies. Technisch notwendige Cookies werden automatisch gesetzt.
                Analyse-Cookies werden nur mit Ihrer ausdrücklichen Einwilligung aktiviert. Sie können Ihre
                Einwilligung jederzeit über den Cookie-Banner widerrufen.
              </p>

              <h3 className="font-heading text-white">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Formular (Name, E-Mail, Telefon, Nachricht) zur Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p>
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen).
              </p>

              <h3 className="font-heading text-white">Produktvorschau</h3>
              <p>
                Unsere Produktvorschau ermöglicht es Ihnen, ein Foto Ihres Hauses hochzuladen, um eine
                Vorschau unserer Produkte zu erhalten. Dabei werden folgende Daten verarbeitet:
              </p>
              <ul>
                <li>Das von Ihnen hochgeladene Foto</li>
                <li>Ihre Produktauswahl und Wünsche (Farbe, Material, Stil)</li>
                <li>Ihre Kontaktdaten (Name, E-Mail, Telefon)</li>
              </ul>
              <p>
                <strong>Wichtiger Hinweis:</strong> Das hochgeladene Foto wird zur Erstellung der
                Produktvorschau an einen externen Dienstleister übermittelt und dort ausschließlich zur
                Erstellung der Visualisierung verarbeitet. Die Übermittlung erfolgt auf Grundlage Ihrer
                ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie vor dem Upload erteilen.
              </p>
              <p>
                Hochgeladene Fotos und generierte Bilder werden nach 90 Tagen automatisch gelöscht.
                Sie können die Löschung jederzeit vorab per E-Mail an {COMPANY.email} anfordern.
              </p>

              <h2 className="font-heading text-white">4. Hosting</h2>
              <p>
                Diese Website wird bei Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, gehostet.
                Details zur Datenverarbeitung finden Sie in der Datenschutzerklärung von Hetzner:
                {' '}<a href="https://www.hetzner.com/de/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  hetzner.com/legal/privacy-policy
                </a>
              </p>

              <h2 className="font-heading text-white">5. E-Mail-Versand</h2>
              <p>
                Für den Versand von E-Mails (Bestätigungen, Benachrichtigungen) nutzen wir den Dienst
                Brevo (Sendinblue GmbH, Köpenicker Str. 126, 10179 Berlin). Die Verarbeitung erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. b DSGVO und Art. 28 DSGVO (Auftragsverarbeitung).
              </p>

              <h2 className="font-heading text-white">6. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht:</p>
              <ul>
                <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                <li>Erteilte Einwilligungen zu widerrufen (Art. 7 Abs. 3 DSGVO)</li>
                <li>Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)</li>
              </ul>
              <p>
                Die zuständige Aufsichtsbehörde ist der Landesbeauftragte für Datenschutz und Informationsfreiheit
                Mecklenburg-Vorpommern.
              </p>

              <h2 className="font-heading text-white">7. SSL-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung
                erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
