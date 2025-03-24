
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';

const PrivacyPolicyPage: React.FC = () => {
  console.log('[PrivacyPolicyPage] Komponente gerendert');
  
  return (
    <div className="bg-abitur-dark min-h-screen text-white">
      <LegalNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Datenschutzerklärung</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Verantwortliche Stelle</h2>
            <p>
              Apex AI Research Labs LLC<br />
              1309 Coffeen Avenue STE 1200<br />
              Sheridan, Wyoming 82801<br />
              USA<br /><br />
              E-Mail: info@abitur.ai<br />
              Website: abitur.ai
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Datenerfassung</h2>
            <p>
              Bei der Nutzung unserer Plattform erfassen wir bestimmte Daten, die für die Bereitstellung unserer Dienstleistungen erforderlich sind. Diese Daten umfassen:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Anmeldeinformationen (Name, E-Mail-Adresse)</li>
              <li>Informationen zu Ihrem Bundesland</li>
              <li>Informationen über Ihre Nutzung unserer Dienste</li>
              <li>Eingereichte Inhalte und Lernmaterialien</li>
              <li>Technische Daten (IP-Adresse, Browsertyp, Geräteinformationen)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Zweck der Datenverarbeitung</h2>
            <p>Wir verarbeiten Ihre Daten zu folgenden Zwecken:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Bereitstellung und Verbesserung unserer Dienste</li>
              <li>Personalisierung Ihrer Lernerfahrung</li>
              <li>Kommunikation mit Ihnen</li>
              <li>Verbesserung unserer Website und Dienstleistungen</li>
              <li>Erfüllung rechtlicher Verpflichtungen</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Rechtsgrundlage</h2>
            <p>
              Die Verarbeitung Ihrer Daten erfolgt auf folgender Rechtsgrundlage:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li>
              <li>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Speicherdauer</h2>
            <p>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Zwecke, für die sie erhoben wurden, erforderlich ist oder um gesetzlichen Verpflichtungen nachzukommen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Ihre Rechte</h2>
            <p>Sie haben folgende Rechte bezüglich Ihrer Daten:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Widerspruchsrecht</li>
              <li>Recht auf Widerruf der Einwilligung</li>
            </ul>
            <p className="mt-2">
              Um diese Rechte auszuüben, kontaktieren Sie uns bitte unter info@abitur.ai.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">7. Datensicherheit</h2>
            <p>
              Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen und ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Änderungen der Datenschutzerklärung</h2>
            <p>
              Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Version finden Sie stets auf unserer Website.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">9. Kontakt</h2>
            <p>
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten kontaktieren Sie uns bitte unter:
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
