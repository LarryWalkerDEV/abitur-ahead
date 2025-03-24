
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';
import { Link } from 'react-router-dom';

const ImprintPage: React.FC = () => {
  console.log('[ImprintPage] Komponente gerendert');
  
  return (
    <div className="bg-abitur-dark min-h-screen text-white">
      <LegalNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-abitur-cyan hover:text-abitur-cyan/90 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Impressum</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Apex AI Research Labs LLC<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan Wyoming 82801<br />
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
            <h2 className="text-xl font-semibold mb-4">Vertretungsberechtigte</h2>
            <p>
              Olga Görtz, Geschäftsführerin
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Registereintrag</h2>
            <p>
              Registriert in Wyoming, USA<br />
              Registernummer: 32-0798359
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
            <p>
              Die Umsatzsteuer wird über Paddle für die EU abgewickelt.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Inhaltlich Verantwortlicher</h2>
            <p>
              Olga Görtz<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan Wyoming 82801<br />
              USA
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Hinweis zur EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-abitur-cyan underline">https://ec.europa.eu/consumers/odr/</a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
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
        </div>
      </div>
    </div>
  );
};

export default ImprintPage;
