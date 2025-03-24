import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  useEffect(() => {
    console.log('[FAQ] Komponente montiert');
    return () => {
      console.log('[FAQ] Komponente demontiert');
    };
  }, []);

  const handleCtaClick = () => {
    console.log('[FAQ] CTA-Button geklickt');
    
    if (session.user) {
      console.log('[FAQ] Benutzer ist angemeldet, Weiterleitung zur Exam-Seite');
      navigate('/exam');
    } else {
      console.log('[FAQ] Benutzer ist nicht angemeldet, Weiterleitung zur Auth-Seite');
      navigate('/auth');
    }
  };

  const faqItems = [
    {
      question: "Was ist Abitur.ai?",
      answer: "Abitur.ai ist eine innovative Plattform, die KI-gestützte Tools und Ressourcen zur Verfügung stellt, um Schülern bei der Vorbereitung auf ihr Abitur zu helfen. Wir bieten personalisierte Lernpfade, Übungsprüfungen und Echtzeit-Feedback, um den Lernerfolg zu maximieren."
    },
    {
      question: "Wie funktioniert die KI-basierte Prüfungserstellung?",
      answer: "Unsere KI analysiert vergangene Abiturprüfungen und identifiziert wiederkehrende Themen und Fragetypen. Basierend auf diesen Daten erstellt sie realistische Übungsprüfungen, die auf den individuellen Lernbedarf zugeschnitten sind."
    },
    {
      question: "Kann ich Abitur.ai kostenlos testen?",
      answer: "Ja, wir bieten eine kostenlose Testphase an, in der du unsere Plattform und einige unserer wichtigsten Funktionen ausprobieren kannst. Um alle Vorteile nutzen zu können, ist ein Abonnement erforderlich."
    },
    {
      question: "Welche Fächer werden unterstützt?",
      answer: "Aktuell unterstützen wir Mathematik, Deutsch und Englisch. Wir arbeiten kontinuierlich daran, unser Angebot zu erweitern und weitere Fächer hinzuzufügen."
    },
    {
      question: "Wie kann ich mein Abonnement kündigen?",
      answer: "Du kannst dein Abonnement jederzeit über dein Benutzerkonto kündigen. Die Kündigung wird zum Ende des aktuellen Abrechnungszeitraums wirksam."
    },
    {
      question: "Wo finde ich weitere Hilfe und Unterstützung?",
      answer: "Unser Kundensupport-Team steht dir jederzeit zur Verfügung. Du erreichst uns per E-Mail unter support@abitur.ai oder über unser Kontaktformular auf der Webseite."
    }
  ];
  
  return (
    <section className="py-24 px-4 md:px-6 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Häufig gestellte Fragen</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hier findest du Antworten auf die wichtigsten Fragen zu unserem Abitur-Vorbereitungssystem
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="glassmorphism p-6 rounded-lg animate-fade-up opacity-0" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{item.question}</h3>
              <p className="text-white/80">{item.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-fade-up opacity-0" style={{ animationDelay: '800ms' }}>
          <h3 className="text-2xl font-semibold mb-6">Bereit, dein Abitur zu meistern?</h3>
          <Button 
            onClick={handleCtaClick}
            className="bg-abitur-pink hover:bg-abitur-pink/90 text-white px-8 py-6 rounded-md font-semibold text-lg"
          >
            Jetzt kostenlos starten
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
