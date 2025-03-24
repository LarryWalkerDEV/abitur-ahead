
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  console.log('[PrivacyPolicyPage] Komponente gerendert');
  
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
        
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Datenschutzerklärung</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Verantwortlicher</h2>
            <p>
              Apex AI Research Labs LLC<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan Wyoming 82801<br />
              USA
            </p>
            <p className="mt-2">
              E-Mail: info@abitur.ai<br />
              Website: abitur.ai
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Welche Daten wir sammeln</h2>
            <p>
              Bei der Nutzung unserer Dienste erfassen wir verschiedene Arten von Informationen:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Persönliche Informationen: Name, E-Mail-Adresse, Bundesland</li>
              <li>Nutzungsdaten: Informationen über Ihre Interaktion mit unserer Plattform</li>
              <li>Geräte- und Verbindungsinformationen: IP-Adresse, Browsertyp, Gerätetyp</li>
              <li>Von Ihnen hochgeladene Dokumente und Inhalte</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Wie wir Ihre Daten verwenden</h2>
            <p>
              Wir nutzen die gesammelten Informationen für folgende Zwecke:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Bereitstellung und Verbesserung unserer Dienste</li>
              <li>Personalisierung des Lernerlebnisses</li>
              <li>Kommunikation mit Ihnen bezüglich Ihres Kontos oder unserer Dienstleistungen</li>
              <li>Analyse und Verbesserung der Leistung und Funktionalität unserer Plattform</li>
              <li>Schutz der Sicherheit und Integrität unserer Dienste</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Rechtsgrundlage für die Verarbeitung</h2>
            <p>
              Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf folgender Rechtsgrundlage:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Erfüllung eines Vertrags (Nutzungsbedingungen)</li>
              <li>Berechtigtes Interesse (z.B. Verbesserung unserer Dienste)</li>
              <li>Ihre Einwilligung</li>
              <li>Gesetzliche Verpflichtungen</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Datenspeicherung und -sicherheit</h2>
            <p>
              Wir speichern Ihre Daten so lange, wie es für die Erbringung unserer Dienste erforderlich ist oder gesetzliche Aufbewahrungsfristen dies erfordern. Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Ihre Rechte</h2>
            <p>
              Als Nutzer haben Sie folgende Rechte:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Widerspruchsrecht</li>
              <li>Recht auf Widerruf der Einwilligung</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">7. Cookies und ähnliche Technologien</h2>
            <p>
              Wir verwenden Cookies und ähnliche Tracking-Technologien, um Ihre Nutzererfahrung zu verbessern und unsere Dienste zu optimieren. Sie können Ihre Browser-Einstellungen so konfigurieren, dass Cookies blockiert oder gelöscht werden, was jedoch die Funktionalität unserer Dienste beeinträchtigen kann.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Version wird stets auf unserer Website verfügbar sein. Bei wesentlichen Änderungen werden wir Sie angemessen informieren.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">9. Kontakt</h2>
            <p>
              Bei Fragen oder Anliegen bezüglich dieser Datenschutzerklärung oder der Verarbeitung Ihrer Daten kontaktieren Sie uns bitte unter:
            </p>
            <p className="mt-2">
              E-Mail: info@abitur.ai
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

export default PrivacyPolicyPage;
