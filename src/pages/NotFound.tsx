
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import StarElement from "@/components/ui/StarElement";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-abitur-dark abitur-grid-bg relative">
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
      
      <div className="abitur-hero-spotlight top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 font-display text-white">404</h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8">
          Oops! Diese Seite existiert nicht.
        </p>
        <Link to="/">
          <Button className="bg-abitur-pink hover:bg-abitur-pink/90 text-white px-6 py-5 rounded-md font-semibold text-lg
                          transition-all duration-300 shadow-lg hover:shadow-abitur-pink/20 hover:translate-y-[-2px]">
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
