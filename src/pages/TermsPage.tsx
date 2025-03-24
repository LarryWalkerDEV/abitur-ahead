
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';

const TermsPage: React.FC = () => {
  console.log('[TermsPage] Komponente gerendert');
  
  return (
    <div className="bg-abitur-dark min-h-screen text-white">
      <LegalNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Allgemeines</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der von Apex AI Research Labs LLC (im Folgenden "Abitur.ai", "wir" oder "uns") bereitgestellten Dienstleistungen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Vertragsschluss und Leistungsumfang</h2>
            <p>
              Mit der Registrierung auf unserer Plattform kommt ein Nutzungsvertrag zwischen Ihnen und Abitur.ai zustande. Wir bieten Ihnen Zugang zu einer KI-gestützten Lernplattform zur Vorbereitung auf das Abitur.
            </p>
            <p className="mt-2">
              Unsere Leistungen umfassen:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Personalisierte Abiturprüfungen und Übungsaufgaben</li>
              <li>KI-gestützte Tutoring-Funktionen</li>
              <li>Lernmaterialien und Erklärungen</li>
              <li>Fortschrittsverfolgung und Analysen</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Abonnement und Zahlungsbedingungen</h2>
            <p>
              Nach Ablauf der kostenlosen Testphase von 3 Tagen bieten wir ein Halbjahresabonnement für 49 Euro an.
            </p>
            <p className="mt-2">
              Das Abonnement verlängert sich nicht automatisch und endet nach Ablauf des Zeitraums. Eine Kündigung ist nicht erforderlich.
            </p>
            <p className="mt-2">
              Die Zahlungsabwicklung erfolgt über unseren Zahlungsdienstleister Paddle.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Nutzungsbedingungen</h2>
            <p>
              Als Nutzer verpflichten Sie sich:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Die Plattform nur für Ihre persönliche Lernvorbereitung zu nutzen</li>
              <li>Keine rechtswidrigen oder anstößigen Inhalte hochzuladen oder zu teilen</li>
              <li>Ihr Konto und Ihre Zugangsdaten sicher zu verwahren</li>
              <li>Die Plattform nicht in einer Weise zu nutzen, die die Funktionalität beeinträchtigt</li>
              <li>Keine Urheberrechte oder andere Schutzrechte zu verletzen</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Gewährleistung und Haftung</h2>
            <p>
              Wir bemühen uns, eine hohe Qualität und Verfügbarkeit unserer Dienste sicherzustellen, können jedoch keine ununterbrochene oder fehlerfreie Bereitstellung garantieren.
            </p>
            <p className="mt-2">
              Unsere Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit gesetzlich zulässig.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Datenschutz</h2>
            <p>
              Der Schutz Ihrer Daten liegt uns am Herzen. Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer Datenschutzerklärung.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">7. Rückerstattung</h2>
            <p>
              Nach Ablauf der kostenlosen Testphase und Zahlung des Abonnements besteht kein Anspruch auf Rückerstattung. Während der Testphase können Sie jederzeit kündigen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Laufzeit und Kündigung</h2>
            <p>
              Das Abonnement endet automatisch nach 6 Monaten und muss nicht gekündigt werden. Wir behalten uns das Recht vor, Ihr Konto bei Verstoß gegen diese AGB zu sperren oder zu löschen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">9. Anwendbares Recht</h2>
            <p>
              Es gilt das Recht der Vereinigten Staaten von Amerika unter Ausschluss des UN-Kaufrechts. Für Verbraucher aus der EU gelten zusätzlich die zwingenden Verbraucherschutzbestimmungen ihres Wohnsitzstaates.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">10. Änderungen der AGB</h2>
            <p>
              Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Die aktuellen AGB sind stets auf unserer Website einsehbar.
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

export default TermsPage;
