
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BackToHomeLink from "@/components/layout/BackToHomeLink";
import { Skeleton } from "@/components/ui/skeleton";

const TutoringPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    console.log("[TutoringPage] Component mounted, checking authentication");
    
    const checkAuth = () => {
      // If session loading is complete
      if (!session.isLoading) {
        if (!session.user) {
          console.log("[TutoringPage] User not authenticated, redirecting to auth page");
          navigate("/auth");
        } else {
          console.log("[TutoringPage] User authenticated, loading page");
          setPageLoaded(true);
        }
      }
    };
    
    // Check auth immediately
    checkAuth();
    
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log("[TutoringPage] Loading timeout reached, forcing page to load");
      setPageLoaded(true);
    }, 3000);
    
    return () => {
      clearTimeout(loadingTimeout);
      console.log("[TutoringPage] Component unmounted");
    };
  }, [session.user, session.isLoading, navigate]);

  // Show loading screen while checking auth
  if ((session.isLoading || !pageLoaded) && !session.user) {
    console.log("[TutoringPage] Showing loading screen");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  // If we don't have a user at this point, the useEffect will handle redirect
  // But let's add a backup check
  if (!session.user && !session.isLoading) {
    console.log("[TutoringPage] No user found after loading, redirecting to auth");
    navigate("/auth");
    return null; // Return null while redirecting
  }

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="absolute top-4 left-4">
          <BackToHomeLink />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Nachhilfe
          </h1>
          <p className="text-muted-foreground">
            Finde Nachhilfe für deine Abiturprüfung
          </p>
        </div>

        <div className="glassmorphism p-6 rounded-lg">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Nachhilfe-Funktionalität</h2>
            <p className="text-muted-foreground mb-6">
              Hier findest du bald eine Übersicht von Nachhilfelehrern in deiner Region.
            </p>
            <p className="text-muted-foreground">
              Diese Funktion ist derzeit in Entwicklung und wird in Kürze verfügbar sein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;
