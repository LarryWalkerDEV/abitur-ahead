
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    console.log("[PrivacyPolicyPage] Komponente montiert");
    return () => {
      console.log("[PrivacyPolicyPage] Komponente demontiert");
    };
  }, []);

  return (
    <div className="min-h-screen bg-abitur-dark">
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Datenschutzerklärung</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6">
            Letzte Aktualisierung: 01.03.2024
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">1. Einleitung</h2>
          <p className="mb-4">
            Willkommen bei Abitur.ai. Der Schutz deiner persönlichen Daten ist für uns von größter Bedeutung. In dieser Datenschutzerklärung informieren wir dich über die Erhebung, Verarbeitung und Nutzung deiner Daten bei der Nutzung unserer Webseite und Dienste.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Verantwortliche Stelle</h2>
          <p className="mb-4">
            Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p className="mb-4">
            Abitur.ai GmbH<br />
            Musterstraße 123<br />
            10115 Berlin<br />
            Deutschland<br />
            E-Mail: datenschutz@abitur.ai
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Arten der verarbeiteten Daten</h2>
          <p className="mb-4">
            Wir verarbeiten folgende personenbezogene Daten, die du uns mitteilst oder die bei der Nutzung unserer Dienste anfallen:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Bestandsdaten (z.B. Namen, Adressen)</li>
            <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
            <li>Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos)</li>
            <li>Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten)</li>
            <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Zwecke der Datenverarbeitung</h2>
          <p className="mb-4">
            Wir verarbeiten deine personenbezogenen Daten zu folgenden Zwecken:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Bereitstellung unserer Website und Dienste</li>
            <li>Kommunikation mit dir</li>
            <li>Beantwortung von Kontaktanfragen</li>
            <li>Durchführung von Marketing- und Werbemaßnahmen</li>
            <li>Verbesserung unseres Angebots</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Speicherdauer</h2>
          <p className="mb-4">
            Wir verarbeiten und speichern deine personenbezogenen Daten nur für den Zeitraum, der zur Erfüllung des Speicherungszwecks erforderlich ist oder sofern dies in Gesetzen oder Vorschriften vorgesehen wurde.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Deine Rechte</h2>
          <p className="mb-4">
            Du hast jederzeit das Recht:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Auskunft über deine bei uns gespeicherten Daten zu erhalten</li>
            <li>Die Berichtigung unrichtiger Daten zu verlangen</li>
            <li>Die Löschung oder Einschränkung der Verarbeitung deiner Daten zu verlangen</li>
            <li>Der Datenverarbeitung zu widersprechen</li>
            <li>Deine Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">7. Kontakt</h2>
          <p className="mb-4">
            Bei Fragen zum Datenschutz kontaktiere uns bitte unter datenschutz@abitur.ai.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
