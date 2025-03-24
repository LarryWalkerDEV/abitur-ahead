
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FilePenLine, Brain, MapPin } from 'lucide-react';

const featureItems = [
  {
    icon: <FilePenLine className="w-8 h-8 mb-2 text-abitur-pink" />,
    title: "Prüfungsgenerierung",
    description: "Erhalte fachspezifische Prüfungssimulationen mit 73,49% Übereinstimmung zu echten Abiturprüfungen. Trainiere mit Fragen, die mit hoher Wahrscheinlichkeit in Deiner Prüfung vorkommen werden.",
    color: "pink",
    delay: 0
  },
  {
    icon: <Brain className="w-8 h-8 mb-2 text-abitur-green" />,
    title: "KI-Tutoring",
    description: "Dein persönlicher KI-Tutor erklärt Dir komplexe Konzepte, beantwortet Deine Fragen und hilft Dir, Wissenslücken zu schließen – jederzeit verfügbar, wenn Du ihn brauchst.",
    color: "green",
    delay: 200
  },
  {
    icon: <MapPin className="w-8 h-8 mb-2 text-abitur-cyan" />,
    title: "Bundeslandspezifisch",
    description: "Unsere KI passt sich automatisch an die spezifischen Anforderungen Deines Bundeslandes an. Keine Zeit mehr mit irrelevanten Inhalten verschwenden – fokussiere Dich nur auf das, was für DICH wichtig ist.",
    color: "cyan",
    delay: 400
  }
];

const Features: React.FC = () => {
  useEffect(() => {
    console.log('[Features] Komponente montiert');
    return () => {
      console.log('[Features] Komponente demontiert');
    };
  }, []);

  return (
    <section className="py-24 w-full abitur-grid-bg relative">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dein Weg zum erfolgreichen Abitur</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Unsere innovative KI-Plattform unterstützt Dich mit diesen leistungsstarken Funktionen:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <Card key={index} 
                  className={`border-0 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 
                            shadow-lg relative overflow-hidden opacity-0 animate-fade-up`}
                  style={{ animationDelay: `${feature.delay + 400}ms` }}>
              <div className={`absolute inset-0 bg-gradient-to-br opacity-10 from-abitur-${feature.color} via-transparent to-transparent`} />
              <div className={`absolute h-1 top-0 left-0 right-0 bg-abitur-${feature.color}`} />
              
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl md:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-white/70 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
