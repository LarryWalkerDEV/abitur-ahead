
import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const faqItems = [
  {
    question: "Wie genau ist die Prognose der KI wirklich?",
    answer: "Unsere KI analysiert die letzten 10 Jahre der Abiturprüfungen in Deinem Bundesland und identifiziert wiederkehrende Muster, Themen und Fragetypen. Die Prognosegenauigkeit von 73,49% wurde durch Vergleiche mit tatsächlichen Prüfungsergebnissen der letzten Jahre ermittelt. Dies bedeutet, dass rund 3 von 4 Themen, die unsere KI als wahrscheinlich einstuft, tatsächlich in den Prüfungen vorkommen."
  },
  {
    question: "Was kostet die Nutzung von Abitur AI?",
    answer: "Wir bieten eine kostenlose 7-tägige Testphase an, in der Du uneingeschränkten Zugriff auf alle Funktionen erhältst. Danach gibt es flexible Abonnements: 19,99€/Monat für den Standard-Zugang oder 39,99€/Monat für den Premium-Zugang mit zusätzlichen Funktionen wie unbegrenzten KI-Tutoring-Sessions und erweiterten Prüfungssimulationen. Für Abiturienten bieten wir auch ein spezielles Paket an, das bis zum Ende des Abiturs gültig ist."
  },
  {
    question: "Funktioniert Abitur AI für alle Bundesländer?",
    answer: "Ja, Abitur AI ist vollständig auf die spezifischen Anforderungen und Lehrpläne aller 16 deutschen Bundesländer angepasst. Die KI berücksichtigt automatisch die regionalen Unterschiede in den Prüfungsanforderungen und -formaten. Du wählst einfach Dein Bundesland aus, und die Plattform passt sich entsprechend an."
  },
  {
    question: "Wie unterscheidet sich der KI-Tutor von normalen Erklärvideos?",
    answer: "Im Gegensatz zu statischen Erklärvideos ist unser KI-Tutor interaktiv und passt sich Deinem persönlichen Lernstand an. Er kann komplexe Konzepte auf verschiedene Arten erklären, bis Du sie verstehst, Fragen in Echtzeit beantworten und Deine individuellen Schwächen identifizieren. Der KI-Tutor lernt kontinuierlich aus Deinen Interaktionen und optimiert seine Erklärungen für Deinen persönlichen Lernstil."
  },
  {
    question: "Kann ich mit Abitur AI auch nachts um 3 Uhr lernen?",
    answer: "Absolut! Einer der größten Vorteile von Abitur AI ist die 24/7-Verfügbarkeit. Egal ob Du ein Nachtmensch bist oder früh morgens am produktivsten arbeitest – Dein KI-Tutor steht Dir rund um die Uhr zur Verfügung. Keine Terminvereinbarungen, keine Wartezeiten – lerne genau dann, wenn Du am aufnahmefähigsten bist."
  },
  {
    question: "Wie kann ich kündigen, wenn ich nicht zufrieden bin?",
    answer: "Die Kündigung ist jederzeit mit nur wenigen Klicks in Deinem Konto möglich. Es gibt keine versteckten Gebühren oder Mindestzeiträume. Wenn Du während der 7-tägigen Testphase kündigst, entstehen Dir keinerlei Kosten. Wir bieten zudem eine 30-Tage-Geld-zurück-Garantie, falls Du mit dem Service nicht vollständig zufrieden bist."
  }
];

const FAQ: React.FC = () => {
  useEffect(() => {
    console.log('[FAQ] Komponente montiert');
    return () => {
      console.log('[FAQ] Komponente demontiert');
    };
  }, []);

  const handleCtaClick = () => {
    console.log('[FAQ] CTA-Button geklickt');
    // Navigation logic here
  };

  return (
    <section className="py-24 w-full abitur-grid-bg">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Häufig gestellte Fragen</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Noch Zweifel? Das verstehen wir. Hier findest Du Antworten auf die häufigsten Fragen.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:text-abitur-cyan transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 text-base pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-6 italic">
              "Ich hatte nur 2 Wochen bis zu meinem Abitur und war völlig im Stress.
              Abitur AI hat mir genau gezeigt, worauf ich mich konzentrieren sollte. 
              Das Ergebnis: 1,8 statt erwarteter 3,0!"
            </p>
            
            <Button 
              className="bg-abitur-pink hover:bg-abitur-pink/90 text-white px-8 py-6 rounded-md font-semibold text-lg
                      transition-all duration-300 shadow-lg hover:shadow-abitur-pink/20 hover:translate-y-[-2px]"
              onClick={handleCtaClick}
            >
              Jetzt 7 Tage kostenlos testen
            </Button>
            
            <p className="mt-4 text-white/60 text-sm">
              Keine Kreditkarte erforderlich. Jederzeit kündbar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
