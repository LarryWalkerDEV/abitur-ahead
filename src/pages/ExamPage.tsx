
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ExamGenerator from "@/components/exam/ExamGenerator";
import ExamDisplay from "@/components/exam/ExamDisplay";
import BackToHomeLink from "@/components/layout/BackToHomeLink";

const ExamPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hexCode = searchParams.get('hexCode');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    console.log("[ExamPage] Component mounted, checking authentication", {
      user: session.user ? true : false,
      isLoading: session.isLoading
    });
    
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (session.isLoading) {
        console.log("[ExamPage] Loading timeout reached, forcing page to load");
        setPageLoaded(true);
      }
    }, 5000);
    
    // Make sure we're setting loading state correctly
    const checkAuth = async () => {
      if (!session.isLoading) {
        // Clear timeout as we've loaded
        clearTimeout(loadingTimeout);
        
        // Redirect to auth if not logged in
        if (!session.user) {
          console.log("[ExamPage] User not authenticated, redirecting to auth page");
          navigate("/auth");
          return;
        }
        
        console.log("[ExamPage] User authenticated, loading exams");
        setPageLoaded(true);
      }
    };

    checkAuth();

    return () => {
      clearTimeout(loadingTimeout);
      console.log("[ExamPage] Component unmounted");
    };
  }, [session.user, session.isLoading, navigate]);

  // Show loading state while checking authentication
  if (session.isLoading && !pageLoaded) {
    console.log("[ExamPage] Showing loading screen");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="absolute top-4 left-4">
          <BackToHomeLink />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Abiturprüfung Generieren
          </h1>
          <p className="text-muted-foreground">
            Erstelle eine maßgeschneiderte Prüfung basierend auf deinen Vorlieben
          </p>
        </div>

        {/* Always show the generator at the top */}
        <ExamGenerator />
        
        {/* Show exam display if hexCode is provided */}
        {hexCode && (
          <ExamDisplay hexCode={hexCode} />
        )}
        
        {/* Show exam history or a message if no hexCode */}
        {!hexCode && (
          <div className="glassmorphism p-6 rounded-lg text-center py-8 text-muted-foreground">
            <h2 className="text-xl font-semibold mb-4">Frühere Prüfungen</h2>
            <p>Wähle ein Fach und einen Schwierigkeitsgrad, um eine neue Prüfung zu generieren.</p>
            <p className="mt-4">Deine generierten Prüfungen werden hier angezeigt.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
