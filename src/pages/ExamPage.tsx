
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ExamGenerator from "@/components/exam/ExamGenerator";
import ExamDisplay from "@/components/exam/ExamDisplay";
import ExamHistory from "@/components/exam/ExamHistory";
import BackToHomeLink from "@/components/layout/BackToHomeLink";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ExamPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hexCode = searchParams.get('hexCode');

  console.log("[ExamPage] Rendering with session state:", {
    isLoading: session.isLoading,
    isAuthenticated: Boolean(session.user),
    hasHexCode: Boolean(hexCode)
  });

  // Simple authentication guard
  useEffect(() => {
    // If authentication check is complete and user is not logged in
    if (!session.isLoading && !session.user) {
      console.log("[ExamPage] User not authenticated, redirecting to auth page");
      
      toast({
        title: "Nicht angemeldet",
        description: "Bitte melden Sie sich an, um auf die Prüfungen zuzugreifen.",
        variant: "destructive",
        duration: 5000,
      });
      
      navigate("/auth");
    }
  }, [session.isLoading, session.user, navigate]);

  // Show a simple loading state
  if (session.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-abitur-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Authentifizierung wird überprüft...</p>
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

        {/* Authentication status indicator for non-authenticated users */}
        {!session.user && (
          <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-white mb-3">Du musst angemeldet sein, um Prüfungen zu erstellen.</p>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-abitur-pink hover:bg-abitur-pink/90"
            >
              Zur Anmeldung
            </Button>
          </div>
        )}

        {/* Show exam generator only for authenticated users */}
        {session.user && !hexCode && <ExamGenerator />}
        
        {/* Show exam display if hexCode is provided */}
        {hexCode && (
          <ExamDisplay hexCode={hexCode} />
        )}
        
        {/* Show exam history for authenticated users when no hexCode */}
        {session.user && !hexCode && (
          <ExamHistory />
        )}
      </div>
    </div>
  );
};

export default ExamPage;
