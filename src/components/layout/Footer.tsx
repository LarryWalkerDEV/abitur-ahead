
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('[Footer] Komponente gerendert');
  
  return (
    <footer className="w-full py-12 bg-abitur-darker">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="font-display font-bold text-xl mb-2">Abitur.ai</div>
            <p className="text-white/60 text-sm">
              © 2024 Abitur.ai. Alle Rechte vorbehalten.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <Link to="/datenschutz" className="hover:text-white transition-colors animated-underline pb-1">
              Datenschutzerklärung
            </Link>
            <Link to="/agb" className="hover:text-white transition-colors animated-underline pb-1">
              AGB
            </Link>
            <Link to="/rueckerstattung" className="hover:text-white transition-colors animated-underline pb-1">
              Rückerstattungsrichtlinie
            </Link>
            <Link to="/impressum" className="hover:text-white transition-colors animated-underline pb-1">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
