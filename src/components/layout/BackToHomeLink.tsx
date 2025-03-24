
import React from 'react';
import { Link } from 'react-router-dom';

const BackToHomeLink: React.FC = () => {
  console.log('[BackToHomeLink] Komponente gerendert');
  
  return (
    <Link 
      to="/" 
      className="text-abitur-cyan hover:text-abitur-cyan/90 flex items-center"
      onClick={() => console.log('[BackToHomeLink] Zurück zur Startseite geklickt')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Zurück zur Startseite
    </Link>
  );
};

export default BackToHomeLink;
