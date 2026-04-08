import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/shared/Container';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum von ${COMPANY.fullName}, ${COMPANY.address.street}, ${COMPANY.address.zip} ${COMPANY.address.city}`,
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm p-8 md:p-12">
            <div className="prose prose-lg font-body text-white/80 prose-headings:font-heading prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80 prose-a:text-brand-red prose-strong:text-white prose-hr:border-white/10 [&_p]:!text-white/80 [&_li]:!text-white/80">
              <h1 className="text-4xl font-heading font-black"><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">Impressum.</span></h1>

              <h2 className="font-heading text-white">Angaben gemäß § 5 TMG</h2>
              <p>
                {COMPANY.fullName}<br />
                {COMPANY.address.street}<br />
                {COMPANY.address.zip} {COMPANY.address.city}
              </p>

              <h2 className="font-heading text-white">Kontakt</h2>
              <p>
                Telefon: {COMPANY.phone}<br />
                Mobil: {COMPANY.mobile}<br />
                E-Mail: {COMPANY.email}
              </p>

              <h2 className="font-heading text-white">Steuernummer</h2>
              <p>{COMPANY.taxId}</p>

              <h2 className="font-heading text-white">Freistellungsbescheinigung</h2>
              <p>Nr. {COMPANY.clearanceCert} gem. § 48b EStG</p>

              <h2 className="font-heading text-white">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                {COMPANY.owner}<br />
                {COMPANY.address.street}<br />
                {COMPANY.address.zip} {COMPANY.address.city}
              </p>

              <h2 className="font-heading text-white">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                {' '}<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <h2 className="font-heading text-white">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h2 className="font-heading text-white">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h2 className="font-heading text-white">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers.
              </p>

              <hr />
              <p className="text-sm text-white/50">
                Website erstellt von <a href="https://brady-digital.com" target="_blank" rel="noopener noreferrer">Brady Digital</a>
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
