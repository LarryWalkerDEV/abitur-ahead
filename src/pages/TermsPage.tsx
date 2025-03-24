
import React from 'react';
import LegalNavigation from '@/components/layout/LegalNavigation';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  console.log('[TermsPage] Komponente gerendert');
  
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
        
        <h1 className="text-3xl font-bold mb-8 text-abitur-pink">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Allgemeines</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen ("AGB") regeln die Nutzung der von Apex AI Research Labs LLC ("wir", "uns", "Abitur.ai") bereitgestellten Dienste, zugänglich über die Website abitur.ai und alle damit verbundenen Domains (der "Service").
            </p>
            <p className="mt-2">
              Durch die Nutzung unseres Services erklären Sie sich mit diesen AGB einverstanden. Bitte lesen Sie diese sorgfältig durch.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">2. Beschreibung des Services</h2>
            <p>
              Abitur.ai ist eine Lernplattform, die KI-gestützte Prüfungsvorbereitungsmaterialien und personalisierte Tutoring-Dienste für Abiturienten in Deutschland anbietet.
            </p>
            <p className="mt-2">
              Unsere Dienste umfassen:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Generierung von Übungsprüfungen basierend auf vergangenen Abiturprüfungen</li>
              <li>KI-gestütztes Tutoring und Hilfestellung bei Fragen</li>
              <li>Personalisierte Lernpläne basierend auf dem Bundesland des Nutzers</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">3. Nutzungsbedingungen</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">3.1 Registrierung</h3>
            <p>
              Um unseren Service nutzen zu können, müssen Sie sich registrieren und ein Benutzerkonto erstellen. Sie sind verpflichtet, genaue, aktuelle und vollständige Informationen während des Registrierungsprozesses anzugeben und diese Informationen aktuell zu halten.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">3.2 Kontosicherheit</h3>
            <p>
              Sie sind für die Wahrung der Vertraulichkeit Ihres Kontos und Passworts verantwortlich und für die Einschränkung des Zugriffs auf Ihren Computer. Sie stimmen zu, die Verantwortung für alle Aktivitäten zu übernehmen, die unter Ihrem Konto oder Passwort stattfinden.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">3.3 Zulässige Nutzung</h3>
            <p>
              Sie dürfen den Service nur für rechtmäßige Zwecke und in Übereinstimmung mit diesen AGB nutzen. Sie verpflichten sich, den Service nicht zu verwenden:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>In einer Weise, die gegen geltende Gesetze oder Vorschriften verstößt</li>
              <li>Um Material zu übermitteln, das schädlich, beleidigend, betrügerisch oder anderweitig anstößig ist</li>
              <li>Um sich an unerwünschter Werbung oder anderen Formen von unautorisierter Kommunikation zu beteiligen</li>
              <li>Um sich als eine andere Person oder Einheit auszugeben</li>
              <li>Um Viren oder anderen schädlichen Code zu übertragen</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">4. Abonnements und Zahlungen</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">4.1 Preisgestaltung</h3>
            <p>
              Wir bieten eine kostenlose 3-tägige Testphase an, nach deren Ablauf Sie ein 6-monatiges Abonnement für 49 € erwerben können. Die Preise sind in Euro angegeben und beinhalten alle anwendbaren Steuern.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">4.2 Zahlungsbedingungen</h3>
            <p>
              Wir akzeptieren verschiedene Zahlungsmethoden, die auf unserer Website angezeigt werden. Die Zahlung wird vor Beginn des Abonnementzeitraums in Rechnung gestellt. Das Abonnement verlängert sich nicht automatisch.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">4.3 Rückerstattungen</h3>
            <p>
              Bitte beachten Sie unsere separate Rückerstattungsrichtlinie für Informationen über Rückerstattungen und Stornierungen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">5. Geistiges Eigentum</h2>
            <p>
              Der Service und seine ursprünglichen Inhalte, Funktionen und Funktionalität sind und bleiben das ausschließliche Eigentum von Abitur.ai und seinen Lizenzgebern. Der Service ist durch Urheberrecht, Markenrecht und andere Gesetze geschützt.
            </p>
            <p className="mt-2">
              Die von unserer Plattform generierten Inhalte dürfen ausschließlich für Ihren persönlichen, nicht-kommerziellen Gebrauch verwendet werden.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. Haftungsbeschränkung</h2>
            <p>
              In keinem Fall haftet Abitur.ai für indirekte, zufällige, besondere, Folge- oder Strafschäden, einschließlich, aber nicht beschränkt auf entgangenen Gewinn, Datenverlust, Ersatzkosten oder andere immaterielle Verluste, die aus Ihrer Nutzung oder Unfähigkeit zur Nutzung des Services resultieren.
            </p>
            <p className="mt-2">
              Obwohl wir uns bemühen, akkurate und qualitativ hochwertige Inhalte zu liefern, übernehmen wir keine Garantie für die Vollständigkeit, Richtigkeit oder Zuverlässigkeit der von unserem Service generierten Inhalte.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">7. Änderungen der AGB</h2>
            <p>
              Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern oder zu ersetzen. Die aktuellste Version wird stets auf unserer Website verfügbar sein. Es liegt in Ihrer Verantwortung, die AGB regelmäßig auf Änderungen zu überprüfen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Anwendbares Recht</h2>
            <p>
              Diese AGB unterliegen den Gesetzen des Staates Wyoming, USA, ohne Berücksichtigung von Kollisionsnormen.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">9. Kontakt</h2>
            <p>
              Bei Fragen zu diesen AGB kontaktieren Sie uns bitte unter:
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

export default TermsPage;
