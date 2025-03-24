
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';
import { Link } from 'react-router-dom';

const RefundPolicyPage: React.FC = () => {
  console.log('[RefundPolicyPage] Komponente gerendert');
  
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
        
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Rückerstattungsrichtlinie</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Kostenlose Testphase</h2>
            <p>
              Abitur.ai bietet eine kostenlose Testphase von 3 Tagen an. Während dieser Zeit können Sie alle Funktionen unserer Plattform ohne Verpflichtung nutzen.
            </p>
            <p className="mt-2">
              Die Testphase endet automatisch und geht nicht in ein kostenpflichtiges Abonnement über.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Abonnementgebühren</h2>
            <p>
              Nach Ablauf der kostenlosen Testphase können Sie ein Halbjahresabonnement für 49 Euro erwerben.
            </p>
            <p className="mt-2">
              Das Abonnement hat eine feste Laufzeit von 6 Monaten und verlängert sich nicht automatisch.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Rückerstattungsbedingungen</h2>
            <p>
              Nach dem Kauf eines Abonnements und Zahlung der Gebühr besteht grundsätzlich kein Anspruch auf Rückerstattung.
            </p>
            <p className="mt-2">
              Da wir eine kostenlose Testphase anbieten, haben Sie die Möglichkeit, unsere Dienste vor dem Kauf ausführlich zu testen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Ausnahmen</h2>
            <p>
              In folgenden Fällen können wir nach eigenem Ermessen eine Rückerstattung in Betracht ziehen:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Technische Probleme, die die Nutzung der Plattform über einen längeren Zeitraum unmöglich machen und die wir nicht beheben können</li>
              <li>Versehentliche doppelte Zahlung</li>
              <li>Gesetzlich vorgeschriebene Widerrufsrechte, sofern anwendbar</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Anfragen zur Rückerstattung</h2>
            <p>
              Sollten Sie der Meinung sein, dass ein Anspruch auf Rückerstattung besteht, kontaktieren Sie uns bitte unter:
            </p>
            <p className="mt-2">
              E-Mail: info@abitur.ai
            </p>
            <p className="mt-2">
              Bitte geben Sie dabei folgende Informationen an:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Ihre E-Mail-Adresse, mit der Sie registriert sind</li>
              <li>Datum der Zahlung</li>
              <li>Grund für die Rückerstattungsanfrage</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Bearbeitungszeit</h2>
            <p>
              Wir bemühen uns, Rückerstattungsanfragen innerhalb von 14 Tagen zu bearbeiten. Die tatsächliche Gutschrift auf Ihrem Konto kann je nach Zahlungsmethode und Bank weitere Zeit in Anspruch nehmen.
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

export default RefundPolicyPage;
