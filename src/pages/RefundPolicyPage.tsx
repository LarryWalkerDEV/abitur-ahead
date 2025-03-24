
import React, { useEffect } from "react";
import Footer from "@/components/layout/Footer";

const RefundPolicyPage: React.FC = () => {
  useEffect(() => {
    console.log("[RefundPolicyPage] Komponente montiert");
    return () => {
      console.log("[RefundPolicyPage] Komponente demontiert");
    };
  }, []);

  return (
    <div className="min-h-screen bg-abitur-dark">
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Rückerstattungsrichtlinie</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="mb-6">
            Letzte Aktualisierung: 01.03.2024
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">1. Allgemeine Informationen</h2>
          <p className="mb-4">
            Diese Rückerstattungsrichtlinie regelt die Bedingungen, unter denen Nutzer der Dienstleistungen von Abitur.ai eine Rückerstattung ihrer Zahlungen beantragen können. Wir sind bestrebt, unseren Kunden einen fairen und transparenten Umgang mit Rückerstattungen zu bieten.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Kostenlose Testphase</h2>
          <p className="mb-4">
            2.1 Neue Nutzer haben Zugang zu einer kostenlosen Testphase, wie auf unserer Website angegeben.
          </p>
          <p className="mb-4">
            2.2 Während der kostenlosen Testphase fallen keine Kosten an, daher sind für diesen Zeitraum keine Rückerstattungen möglich.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Rückerstattungszeitraum</h2>
          <p className="mb-4">
            3.1 Nach Abschluss einer kostenpflichtigen Mitgliedschaft oder nach dem Kauf einer Dienstleistung gewähren wir eine Zufriedenheitsgarantie von 14 Tagen ab dem Kaufdatum.
          </p>
          <p className="mb-4">
            3.2 Innerhalb dieses Zeitraums kann der Nutzer eine vollständige Rückerstattung beantragen, ohne einen Grund angeben zu müssen.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Bedingungen für Rückerstattungen</h2>
          <p className="mb-4">
            4.1 Nach Ablauf der 14-tägigen Zufriedenheitsgarantie können Rückerstattungen nur unter folgenden Umständen gewährt werden:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Technische Probleme, die die Nutzung der Dienstleistung erheblich beeinträchtigen und nicht innerhalb einer angemessenen Frist behoben werden können</li>
            <li>Nichtverfügbarkeit des versprochenen Dienstes oder wesentlicher Funktionen</li>
            <li>Fehlerhafte Abrechnung oder Doppelbelastungen</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Ausschlüsse</h2>
          <p className="mb-4">
            5.1 Keine Rückerstattung erfolgt in folgenden Fällen:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Bei Verstößen gegen unsere Nutzungsbedingungen</li>
            <li>Bei Nichtnutzung des Dienstes nach dessen Aktivierung</li>
            <li>Bei Änderungen der persönlichen Umstände des Nutzers (z.B. Zeitmangel, veränderter Bedarf)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Rückerstattungsprozess</h2>
          <p className="mb-4">
            6.1 Um eine Rückerstattung zu beantragen, muss der Nutzer eine E-Mail an support@abitur.ai senden oder das Kontaktformular auf unserer Website nutzen.
          </p>
          <p className="mb-4">
            6.2 Der Antrag sollte folgende Informationen enthalten:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Vollständiger Name</li>
            <li>E-Mail-Adresse, die mit dem Konto verknüpft ist</li>
            <li>Kaufdatum und Bestellnummer</li>
            <li>Grund für die Rückerstattung (bei Anträgen nach der 14-tägigen Zufriedenheitsgarantie)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">7. Bearbeitungszeit</h2>
          <p className="mb-4">
            7.1 Rückerstattungsanträge werden innerhalb von 5 Werktagen bearbeitet.
          </p>
          <p className="mb-4">
            7.2 Die Gutschrift erfolgt auf demselben Zahlungsweg, der für die ursprüngliche Zahlung verwendet wurde, und kann je nach Zahlungsanbieter bis zu 14 Tage dauern.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
