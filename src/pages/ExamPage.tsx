
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ExamGenerator from "@/components/exam/ExamGenerator";
import ExamDisplay from "@/components/exam/ExamDisplay";
import ExamHistory from "@/components/exam/ExamHistory";
import BackToHomeLink from "@/components/layout/BackToHomeLink";
import { toast } from "@/hooks/use-toast";

const ExamPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hexCode = searchParams.get('hexCode');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    console.log("[ExamPage] Component mounted, checking authentication", {
      user: session.user ? true : false,
      isLoading: session.isLoading,
      hexCode: hexCode
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
          toast({
            title: "Nicht angemeldet",
            description: "Bitte melden Sie sich an, um auf die Prüfungen zuzugreifen.",
            variant: "destructive",
          });
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
  }, [session.user, session.isLoading, navigate, hexCode]);

  // Show loading state while checking authentication
  if (session.isLoading && !pageLoaded) {
    console.log("[ExamPage] Showing loading screen");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-abitur-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
        
        {/* Show exam history if no hexCode */}
        {!hexCode && (
          <ExamHistory />
        )}
      </div>
    </div>
  );
};

export default ExamPage;
