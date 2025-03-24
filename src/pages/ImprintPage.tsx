
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import LegalNavigation from "@/components/layout/LegalNavigation";

const ImprintPage: React.FC = () => {
  useEffect(() => {
    console.log("[ImprintPage] Komponente montiert");
    return () => {
      console.log("[ImprintPage] Komponente demontiert");
    };
  }, []);

  return (
    <div className="min-h-screen bg-abitur-dark">
      <LegalNavigation />
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Impressum</h1>
        
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4 mt-8">Angaben gemäß § 5 TMG</h2>
          <p className="mb-4">
            Apex AI Research Labs LLC<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan Wyoming 82801<br />
            USA
          </p>
          
          <p className="mb-4">
            Registrierungsnummer: 32-0798359<br />
            Registrierungsbehörde: Wyoming, USA
          </p>
          
          <p className="mb-4">
            Vertreten durch:<br />
            Olga Görtz (Geschäftsführerin)
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Kontakt</h2>
          <p className="mb-4">
            E-Mail: info@abitur.ai<br />
            Website: abitur.ai
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Umsatzsteuer-ID</h2>
          <p className="mb-4">
            Die Umsatzsteuer wird durch Paddle für die EU abgewickelt.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="mb-4">
            Olga Görtz<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan Wyoming 82801<br />
            USA
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Streitschlichtung</h2>
          <p className="mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" className="text-abitur-cyan underline ml-1" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mb-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Haftung für Inhalte</h2>
          <p className="mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mb-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Haftung für Links</h2>
          <p className="mb-4">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p className="mb-4">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Urheberrecht</h2>
          <p className="mb-4">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="mb-4">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ImprintPage;
