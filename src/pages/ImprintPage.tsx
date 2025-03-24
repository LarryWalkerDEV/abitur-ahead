
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';

const ImprintPage: React.FC = () => {
  console.log('[ImprintPage] Komponente gerendert');
  
  return (
    <div className="bg-abitur-dark min-h-screen text-white">
      <LegalNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Impressum</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Apex AI Research Labs LLC<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan, Wyoming 82801<br />
              USA
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
            <p>
              E-Mail: info@abitur.ai<br />
              Website: abitur.ai
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Vertretungsberechtigte Person</h2>
            <p>
              Olga Görtz, Geschäftsführerin
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Registrierung</h2>
            <p>
              Registrierungsnummer: 32-0798359<br />
              Registriert in: Wyoming, USA
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
            <p>
              Die Umsatzsteuer wird über Paddle für die EU abgewickelt.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Olga Görtz<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan, Wyoming 82801<br />
              USA
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-abitur-cyan hover:text-abitur-cyan/90 ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-2">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-sm text-white/70">
          <p>Letzte Aktualisierung: 9. November 2023</p>
        </div>
      </div>
    </div>
  );
};

export default ImprintPage;
