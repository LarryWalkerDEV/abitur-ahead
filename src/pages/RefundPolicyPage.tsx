
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import LegalNavigation from "@/components/layout/LegalNavigation";

const RefundPolicyPage: React.FC = () => {
  useEffect(() => {
    console.log("[RefundPolicyPage] Komponente montiert");
    return () => {
      console.log("[RefundPolicyPage] Komponente demontiert");
    };
  }, []);

  return (
    <div className="min-h-screen bg-abitur-dark">
      <LegalNavigation />
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Rückerstattungsrichtlinie</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6">
            Letzte Aktualisierung: 01.06.2024
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">1. Allgemeine Informationen</h2>
          <p className="mb-4">
            Diese Rückerstattungsrichtlinie regelt die Bedingungen, unter denen Nutzer der Dienstleistungen von Abitur.ai eine Rückerstattung ihrer Zahlungen beantragen können. Wir sind bestrebt, unseren Kunden einen fairen und transparenten Umgang mit Rückerstattungen zu bieten.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Kostenlose Testphase</h2>
          <p className="mb-4">
            2.1 Neue Nutzer haben Zugang zu einer 3-tägigen kostenlosen Testphase, wie auf unserer Website angegeben.
          </p>
          <p className="mb-4">
            2.2 Während der kostenlosen Testphase fallen keine Kosten an, daher sind für diesen Zeitraum keine Rückerstattungen möglich.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Abonnementkosten und Laufzeit</h2>
          <p className="mb-4">
            3.1 Nach Ablauf der kostenlosen Testphase beträgt der Preis für ein Halbjahresabonnement 49 Euro.
          </p>
          <p className="mb-4">
            3.2 Das Abonnement hat eine Laufzeit von 6 Monaten und endet automatisch ohne Verlängerung.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Rückerstattungsbedingungen</h2>
          <p className="mb-4">
            4.1 Nach dem Kauf eines Abonnements werden keine Rückerstattungen gewährt, es sei denn, es liegt ein schwerwiegender technischer Fehler vor, der die Nutzung der Dienstleistung unmöglich macht.
          </p>
          <p className="mb-4">
            4.2 Wir empfehlen daher, die kostenlose Testphase zu nutzen, um die Dienstleistung ausgiebig zu testen, bevor ein kostenpflichtiges Abonnement abgeschlossen wird.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Ausnahmen</h2>
          <p className="mb-4">
            5.1 In Ausnahmefällen können Rückerstattungen unter folgenden Umständen gewährt werden:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nachweisbare technische Probleme, die die Nutzung der Dienstleistung erheblich beeinträchtigen und nicht innerhalb einer angemessenen Frist behoben werden können</li>
            <li>Fehlerhafte Abrechnung oder Doppelbelastungen</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Kontakt</h2>
          <p className="mb-4">
            Bei Fragen zur Rückerstattungsrichtlinie kontaktiere uns bitte unter info@abitur.ai.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
