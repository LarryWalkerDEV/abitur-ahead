
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackToHomeLink from "@/components/layout/BackToHomeLink";

const AuthPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isNavigating, setIsNavigating] = useState(false);

  // Improved redirect handling with debounce
  useEffect(() => {
    console.log("[AuthPage] Component mounted, checking authentication state", {
      user: session.user ? true : false,
      isLoading: session.isLoading,
      isNavigating
    });
    
    // Only proceed if we're not currently navigating to avoid loops
    if (isNavigating) {
      return;
    }
    
    // If user is authenticated and session loading is complete, redirect to exam page
    if (!session.isLoading && session.user) {
      console.log("[AuthPage] User authenticated, redirecting to exam page");
      setIsNavigating(true);
      
      // Add a small delay to ensure all state updates are processed
      const redirectTimer = setTimeout(() => {
        navigate("/exam");
      }, 100);
      
      return () => clearTimeout(redirectTimer);
    }
    
    // If session has finished loading and no user is found, just stay on the auth page
    if (!session.isLoading && !session.user) {
      console.log("[AuthPage] Authentication check complete, no user found");
    }
  }, [session.user, session.isLoading, navigate, isNavigating]);

  const handleTabChange = (value: string) => {
    console.log(`[AuthPage] Tab changed to ${value}`);
    setActiveTab(value);
  };

  // Show a loading state while checking authentication, but with a maximum duration
  if (session.isLoading) {
    console.log("[AuthPage] Session is loading");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-abitur-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Authentifizierung wird überprüft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="abitur-grid-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="absolute top-4 left-4">
          <BackToHomeLink />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-abitur-pink mb-2">
            {activeTab === "login" ? "Willkommen zurück!" : "Erstelle deinen Account"}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === "login" 
              ? "Melde dich an, um deine Abitur-Vorbereitung fortzusetzen." 
              : "Registriere dich für den Zugang zu deinem maßgeschneiderten Abitur-Trainer."}
          </p>
        </div>

        <div className="glassmorphism p-6 rounded-lg">
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6 w-full bg-abitur-dark">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="signup">Registrieren</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {activeTab === "login" 
              ? "Noch kein Konto?" 
              : "Bereits registriert?"}{" "}
            <button
              className="text-abitur-cyan hover:text-abitur-cyan/90 underline"
              onClick={() => {
                console.log("[AuthPage] Toggle between login and signup");
                handleTabChange(activeTab === "login" ? "signup" : "login");
              }}
            >
              {activeTab === "login" ? "Jetzt registrieren" : "Jetzt anmelden"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
