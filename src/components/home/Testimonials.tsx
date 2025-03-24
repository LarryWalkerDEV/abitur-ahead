
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Nach nur 2 Wochen mit Abitur AI konnte ich meine Matheschwäche komplett überwinden. Die KI hat präzise die Themen identifiziert, die ich nicht verstanden hatte, und mir alles so erklärt, dass ich es endlich begriffen habe.",
    name: "Lukas M.",
    location: "Bayern",
    subject: "Mathematik"
  },
  {
    quote: "Die Prüfungssimulationen waren unglaublich präzise! In meinem Englisch-Abitur kamen tatsächlich mehrere Themen vor, die die KI vorhergesagt hatte. Ohne diese Vorbereitung hätte ich niemals eine 1,3 geschafft.",
    name: "Sophie K.",
    location: "Baden-Württemberg",
    subject: "Englisch"
  },
  {
    quote: "Mein KI-Tutor hat mir komplexe Biochemie-Prozesse so erklärt, wie es kein Lehrer je geschafft hat. Ich konnte endlich die Zusammenhänge verstehen und nicht nur auswendig lernen. Das Ergebnis: Note 1,0 im Bio-Abitur!",
    name: "Jonas F.",
    location: "Nordrhein-Westfalen",
    subject: "Biologie"
  },
  {
    quote: "Abitur AI hat mir die Angst vor dem Geschichte-Abitur genommen. Die KI hat mir gezeigt, welche historischen Ereignisse mit hoher Wahrscheinlichkeit drankommen würden – und lag damit goldrichtig. Meine Note: 1,7 statt erwarteter 3,0!",
    name: "Emma L.",
    location: "Niedersachsen",
    subject: "Geschichte"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    console.log('[Testimonials] Komponente montiert');
    return () => {
      console.log('[Testimonials] Komponente demontiert');
    };
  }, []);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 w-full bg-abitur-darker relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-abitur-pink/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-abitur-cyan/10 to-transparent"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Was unsere Nutzer sagen</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Tausende von Schülern haben mit Abitur AI ihren Schulabschluss erfolgreich gemeistert
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 -left-6 text-abitur-pink opacity-50">
            <Quote size={60} />
          </div>
          
          <Card className="border-0 bg-white/[0.03] backdrop-blur-sm shadow-xl relative overflow-hidden opacity-0 animate-scale-in">
            <CardContent className="pt-10 pb-8 px-8 md:px-12">
              <div className="min-h-[200px] flex flex-col justify-between">
                <p className="text-lg md:text-xl text-white/90 italic mb-8">
                  {testimonials[activeIndex].quote}
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-white/60 text-sm">{testimonials[activeIndex].location} • {testimonials[activeIndex].subject}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-white/20 hover:bg-white/5"
                      onClick={handlePrev}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-white/60">
                      {activeIndex + 1} / {testimonials.length}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-white/20 hover:bg-white/5"
                      onClick={handleNext}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-white w-6' : 'bg-white/30'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
