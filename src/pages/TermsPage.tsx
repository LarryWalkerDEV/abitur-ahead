
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import LegalNavigation from "@/components/layout/LegalNavigation";

const TermsPage: React.FC = () => {
  useEffect(() => {
    console.log("[TermsPage] Komponente montiert");
    return () => {
      console.log("[TermsPage] Komponente demontiert");
    };
  }, []);

  return (
    <div className="min-h-screen bg-abitur-dark">
      <LegalNavigation />
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6">
            Letzte Aktualisierung: 01.06.2024
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">1. Geltungsbereich</h2>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Apex AI Research Labs LLC (im Folgenden "Anbieter") und den Nutzern (im Folgenden "Nutzer") der Dienstleistungen und Services der Webseite abitur.ai.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Vertragsgegenstand</h2>
          <p className="mb-4">
            Gegenstand des Vertrages ist die Nutzung der auf der Webseite abitur.ai angebotenen Dienstleistungen, insbesondere die Bereitstellung von Lernmaterialien, Prüfungssimulationen und KI-gestützten Tutoring-Diensten zur Vorbereitung auf das Abitur.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Registrierung und Benutzerkonto</h2>
          <p className="mb-4">
            3.1 Für die Nutzung bestimmter Dienste ist eine Registrierung erforderlich. Der Nutzer verpflichtet sich, bei der Registrierung wahrheitsgemäße Angaben zu machen und diese bei Änderungen zu aktualisieren.
          </p>
          <p className="mb-4">
            3.2 Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich. Er haftet für alle Aktivitäten, die unter Verwendung seines Benutzerkontos vorgenommen werden.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Dienstleistungen und Preise</h2>
          <p className="mb-4">
            4.1 Der Umfang der angebotenen Dienstleistungen und die dafür anfallenden Gebühren ergeben sich aus der Leistungsbeschreibung auf der Webseite zum Zeitpunkt der Bestellung.
          </p>
          <p className="mb-4">
            4.2 Die Nutzung beginnt mit einer 3-tägigen kostenlosen Testphase. Nach Ablauf der Testphase beträgt der Preis für ein Halbjahresabonnement 49 Euro. Es erfolgt keine automatische Verlängerung des Abonnements.
          </p>
          <p className="mb-4">
            4.3 Sofern nicht anders angegeben, verstehen sich alle Preisangaben inklusive der gesetzlichen Mehrwertsteuer.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Zahlungsbedingungen</h2>
          <p className="mb-4">
            5.1 Die Zahlung erfolgt im Voraus entsprechend der auf der Webseite angegebenen Zahlungsmethoden.
          </p>
          <p className="mb-4">
            5.2 Bei Zahlungsverzug behält sich der Anbieter das Recht vor, den Zugang zu den Diensten zu sperren.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Vertragslaufzeit und Kündigung</h2>
          <p className="mb-4">
            6.1 Die Laufzeit des Vertrages richtet sich nach dem gewählten Abonnement. Die Laufzeit beträgt 6 Monate und endet automatisch ohne Verlängerung.
          </p>
          <p className="mb-4">
            6.2 Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt hiervon unberührt.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">7. Pflichten des Nutzers</h2>
          <p className="mb-4">
            7.1 Der Nutzer verpflichtet sich, die Dienste nicht missbräuchlich zu nutzen und die Rechte Dritter zu beachten.
          </p>
          <p className="mb-4">
            7.2 Das Kopieren, Verbreiten oder anderweitige Verwenden der bereitgestellten Inhalte außerhalb der vorgesehenen Nutzung ist untersagt.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">8. Haftung</h2>
          <p className="mb-4">
            8.1 Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen.
          </p>
          <p className="mb-4">
            8.2 Die Haftung für die Verletzung wesentlicher Vertragspflichten bleibt unberührt.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">9. Schlussbestimmungen</h2>
          <p className="mb-4">
            9.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          </p>
          <p className="mb-4">
            9.2 Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
