
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedBadge from '@/components/ui/AnimatedBadge';
import StarElement from '@/components/ui/StarElement';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  useEffect(() => {
    console.log('[Hero] Komponente montiert');
    return () => {
      console.log('[Hero] Komponente demontiert');
    };
  }, []);

  const handleCtaClick = () => {
    console.log('[Hero] CTA-Button geklickt');
    
    if (session.user) {
      console.log('[Hero] Benutzer ist angemeldet, Weiterleitung zur Exam-Seite');
      navigate('/exam');
    } else {
      console.log('[Hero] Benutzer ist nicht angemeldet, Weiterleitung zur Auth-Seite');
      navigate('/auth');
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 flex items-center justify-center overflow-hidden abitur-grid-bg">
      {/* Decorative elements */}
      <StarElement 
        color="pink" 
        size="md" 
        className="absolute top-20 left-[10%]" 
      />
      <StarElement 
        color="green" 
        size="lg" 
        className="absolute bottom-32 right-[15%]" 
      />
      <StarElement 
        color="cyan" 
        size="sm" 
        className="absolute top-40 right-[20%]" 
      />
      
      {/* Hero spotlight */}
      <div className="abitur-hero-spotlight top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Animated badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <AnimatedBadge variant="pink" delay={300}>73,49% Trefferquote</AnimatedBadge>
            <AnimatedBadge variant="green" delay={500}>KI-Tutoring</AnimatedBadge>
            <AnimatedBadge variant="orange" delay={700}>Bundeslandspezifisch</AnimatedBadge>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight opacity-0 animate-fade-up">
            ABITUR MEISTERN
          </h1>
          
          {/* Main visual - Person with hoodie */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 overflow-hidden rounded-full 
                         bg-gradient-to-br from-white/10 to-transparent border border-white/20
                         opacity-0 animate-scale-in"
               style={{ animationDelay: '400ms' }}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-abitur-pink/20 via-abitur-cyan/10 to-transparent animate-spin-slow" 
                 style={{ animationDuration: '20s' }}></div>
            
            {/* This would be replaced by an actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  className="w-32 h-32 text-white/90">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M12 2a3 3 0 0 0-3 3v1.5a3 3 0 1 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M19 9H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M12 14v8"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M8 22h8"/>
              </svg>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl max-w-3xl mb-8 text-white/80 opacity-0 animate-fade-up"
             style={{ animationDelay: '600ms' }}>
            Während <span className="text-white font-semibold">82%</span> aller Abiturienten im Dunkeln tappen, 
            kennst <span className="text-white font-semibold">DU</span> bereits <span className="text-abitur-pink font-semibold">73,49%</span> der kommenden Prüfungsfragen. 
            Unsere KI analysiert 10 Jahre Abiturprüfungen und prognostiziert mit verblüffender Genauigkeit, was <span className="text-white font-semibold">DICH</span> erwartet.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
               style={{ animationDelay: '800ms' }}>
            <Button className="bg-abitur-pink hover:bg-abitur-pink/90 text-white px-8 py-6 rounded-md font-semibold text-lg 
                            transition-all duration-300 shadow-lg hover:shadow-abitur-pink/20 hover:translate-y-[-2px]"
                    onClick={handleCtaClick}>
              Jetzt kostenlos testen
            </Button>
            <Button variant="outline" 
                    className="border-white/20 hover:bg-white/5 text-white px-8 py-6 rounded-md font-semibold text-lg"
                    onClick={() => {
                      console.log('[Hero] "Mehr erfahren" Button geklickt');
                      // Scroll to FAQ section or navigate to a details page
                    }}>
              Mehr erfahren
            </Button>
          </div>
          
          {/* Urgency note */}
          <p className="mt-6 text-white/60 text-sm opacity-0 animate-fade-up"
             style={{ animationDelay: '1000ms' }}>
            Die Zeit läuft. Sichere Dir jetzt Deinen Vorsprung.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
