
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const LegalNavigation: React.FC = () => {
  console.log('[LegalNavigation] Komponente gerendert');
  
  return (
    <div className="container px-4 py-4 mx-auto">
      <Link 
        to="/" 
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-display font-bold text-lg">Abitur.ai</span>
      </Link>
    </div>
  );
};

export default LegalNavigation;
