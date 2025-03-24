
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("login");

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (session.user && !session.isLoading) {
      console.log("[AuthPage] User already authenticated, redirecting to home");
      navigate("/");
    }
  }, [session.user, session.isLoading, navigate]);

  if (session.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="abitur-grid-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
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
            onValueChange={setActiveTab}
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
              onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
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
