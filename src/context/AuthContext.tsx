
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
  // Simplified state with clear initial values
  const [session, setSession] = useState<UserSession>({
    user: null,
    profile: null,
    isLoading: true,
  });

  // Simplified profile fetching
  const fetchProfile = async (userId: string) => {
    try {
      console.log("[AuthContext] Fetching profile for user:", userId);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[AuthContext] Error fetching profile:", error);
        return null;
      }

      return data ? {
        id: data.id,
        name: data.name || null,
        bundesland: (data.bundesland as Bundesland) || "Bayern",
        subscription_status: data.subscription_status as 'trial' | 'active' | 'expired' || 'trial',
        trial_end_date: data.trial_end_date || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      } as Profile : null;
    } catch (error) {
      console.error("[AuthContext] Exception fetching profile:", error);
      return null;
    }
  };

  // Simplified session initialization
  useEffect(() => {
    console.log("[AuthContext] Initializing authentication");
    
    const checkSession = async () => {
      try {
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        console.log("[AuthContext] Initial session check:", 
          sessionError ? "Error" : (sessionData.session ? "Session found" : "No session"));
        
        if (sessionError || !sessionData.session) {
          setSession({
            user: null,
            profile: null,
            isLoading: false
          });
          return;
        }
        
        // Session exists, fetch profile
        const user = sessionData.session.user;
        const profile = await fetchProfile(user.id);
        
        setSession({
          user: {
            id: user.id,
            email: user.email || "",
          },
          profile,
          isLoading: false
        });
      } catch (error) {
        console.error("[AuthContext] Error during initialization:", error);
        setSession({
          user: null,
          profile: null,
          isLoading: false
        });
      }
    };
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("[AuthContext] Auth state changed:", event);
        
        if (event === "SIGNED_OUT" || !newSession) {
          // Clear session state on sign out
          setSession({
            user: null,
            profile: null,
            isLoading: false
          });
          return;
        }
        
        if (event === "SIGNED_IN" && newSession) {
          // Update session state on sign in
          const user = newSession.user;
          const profile = await fetchProfile(user.id);
          
          setSession({
            user: {
              id: user.id,
              email: user.email || "",
            },
            profile,
            isLoading: false
          });
        }
      }
    );
    
    // Perform initial session check
    checkSession();
    
    // Clean up the subscription
    return () => {
      console.log("[AuthContext] Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  // Simplified sign up
  const signUp = async (email: string, password: string, name: string, bundesland: Bundesland) => {
    console.log("[AuthContext] Attempting to sign up:", email);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            bundesland,
          },
        },
      });

      if (error) {
        console.error("[AuthContext] Signup error:", error);
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
      console.error("[AuthContext] Signup exception:", error);
      toast({
        title: "Registrierung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Simplified sign in
  const signIn = async (email: string, password: string) => {
    console.log("[AuthContext] Attempting to sign in:", email);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[AuthContext] Signin error:", error);
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
      console.error("[AuthContext] Signin exception:", error);
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Simplified sign out
  const signOut = async () => {
    console.log("[AuthContext] Signing out user");
    
    try {
      // Clear state first to immediately update UI
      setSession({
        user: null,
        profile: null,
        isLoading: true,
      });
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("[AuthContext] Signout error:", error);
        toast({
          title: "Abmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        
        // Reset loading state on error
        setSession(prev => ({...prev, isLoading: false}));
        return;
      }

      // Auth state listener will update the state
      toast({
        title: "Abmeldung erfolgreich",
        description: "Auf Wiedersehen!",
      });
    } catch (error: any) {
      console.error("[AuthContext] Signout exception:", error);
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
      
      // Reset loading state on error
      setSession(prev => ({...prev, isLoading: false}));
    }
  };

  // Simplified profile update
  const updateProfile = async (data: Partial<Profile>) => {
    console.log("[AuthContext] Updating profile");
    
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
        console.error("[AuthContext] Profile update error:", error);
        toast({
          title: "Profil-Update fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Refresh profile data
      if (session.user) {
        const updatedProfile = await fetchProfile(session.user.id);
        setSession({
          ...session,
          profile: updatedProfile,
        });
      }

      toast({
        title: "Profil aktualisiert",
        description: "Dein Profil wurde erfolgreich aktualisiert.",
      });
    } catch (error: any) {
      console.error("[AuthContext] Profile update exception:", error);
      toast({
        title: "Profil-Update fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Simplified hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
