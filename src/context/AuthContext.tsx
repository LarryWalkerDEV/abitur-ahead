
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { UserSession, Profile, Bundesland } from "@/types/auth";

interface AuthContextType {
  session: UserSession;
  signUp: (email: string, password: string, name: string, bundesland: Bundesland) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple state with clear defaults
  const [session, setSession] = useState<UserSession>({
    user: null,
    profile: null,
    isLoading: true,
  });

  // Initialize auth state once on mount
  useEffect(() => {
    console.log("[AuthContext] Initializing auth");
    
    // 1. Set up auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("[AuthContext] Auth state changed:", event);
        
        if (event === "SIGNED_OUT" || !newSession) {
          setSession({
            user: null,
            profile: null,
            isLoading: false
          });
          return;
        }
        
        if (newSession) {
          // Simple user object
          const user = {
            id: newSession.user.id,
            email: newSession.user.email || "",
          };
          
          // Basic profile fetch
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          
          setSession({
            user,
            profile: profile || null,
            isLoading: false
          });
        }
      }
    );
    
    // 2. Check initial session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        console.log("[AuthContext] No initial session found");
        setSession({
          user: null,
          profile: null,
          isLoading: false
        });
        return;
      }
      
      console.log("[AuthContext] Initial session found");
      const user = {
        id: data.session.user.id,
        email: data.session.user.email || "",
      };
      
      // Fetch profile data
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data: profile }) => {
          setSession({
            user,
            profile: profile || null,
            isLoading: false
          });
        });
    });
    
    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Simple sign up function
  const signUp = async (email: string, password: string, name: string, bundesland: Bundesland) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, bundesland },
        },
      });

      if (error) {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Registrierung erfolgreich",
        description: "Bitte überprüfe deine E-Mail für weitere Anweisungen.",
      });
    } catch (error: any) {
      toast({
        title: "Registrierung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Simple sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Anmeldung erfolgreich",
        description: "Willkommen zurück!",
      });
    } catch (error: any) {
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Simple sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Abmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Abmeldung erfolgreich",
        description: "Auf Wiedersehen!",
      });
    } catch (error: any) {
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Simple profile update function
  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!session.user) {
        toast({
          title: "Profil-Update fehlgeschlagen",
          description: "Du bist nicht angemeldet.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", session.user.id);

      if (error) {
        toast({
          title: "Profil-Update fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Refresh profile after update
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setSession({
        ...session,
        profile: updatedProfile || null,
      });

      toast({
        title: "Profil aktualisiert",
        description: "Dein Profil wurde erfolgreich aktualisiert.",
      });
    } catch (error: any) {
      toast({
        title: "Profil-Update fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Simple hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
