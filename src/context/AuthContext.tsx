
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
    
    // Set up auth listener first
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
        
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", newSession.user.id)
            .single();
          
          if (profileData) {
            // Type casting for bundesland and subscription_status
            const profile: Profile = {
              ...profileData,
              bundesland: profileData.bundesland as Bundesland,
              subscription_status: profileData.subscription_status as 'trial' | 'active' | 'expired',
            };
            
            setSession({
              user: {
                id: newSession.user.id,
                email: newSession.user.email || ""
              },
              profile,
              isLoading: false
            });
          } else {
            setSession({
              user: {
                id: newSession.user.id,
                email: newSession.user.email || ""
              },
              profile: null,
              isLoading: false
            });
          }
        } catch (error) {
          console.error("[AuthContext] Error handling auth state change:", error);
          // Even on error, we should update loading state
          setSession(prev => ({ ...prev, isLoading: false }));
        }
      }
    );
    
    // Then check for existing session
    const checkSession = async () => {
      try {
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        if (existingSession) {
          console.log("[AuthContext] Existing session found:", existingSession.user.id);
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", existingSession.user.id)
            .single();
          
          if (profileData) {
            // Type casting for bundesland and subscription_status
            const profile: Profile = {
              ...profileData,
              bundesland: profileData.bundesland as Bundesland,
              subscription_status: profileData.subscription_status as 'trial' | 'active' | 'expired',
            };
            
            setSession({
              user: {
                id: existingSession.user.id,
                email: existingSession.user.email || ""
              },
              profile,
              isLoading: false
            });
          } else {
            setSession({
              user: {
                id: existingSession.user.id,
                email: existingSession.user.email || ""
              },
              profile: null,
              isLoading: false
            });
          }
        } else {
          console.log("[AuthContext] No existing session found");
          setSession(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("[AuthContext] Error checking session:", error);
        setSession(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    checkSession();
    
    return () => {
      console.log("[AuthContext] Cleaning up auth listener");
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
      const { data: updatedProfileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (updatedProfileData) {
        // Type casting for bundesland and subscription_status
        const updatedProfile: Profile = {
          ...updatedProfileData,
          bundesland: updatedProfileData.bundesland as Bundesland,
          subscription_status: updatedProfileData.subscription_status as 'trial' | 'active' | 'expired',
        };
        
        setSession({
          ...session,
          profile: updatedProfile,
        });

        toast({
          title: "Profil aktualisiert",
          description: "Dein Profil wurde erfolgreich aktualisiert.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Profil-Update fehlgeschlagen",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // For debugging
  console.log("[AuthContext] Current session state:", 
    session.isLoading ? "Loading" : session.user ? "Authenticated" : "Not authenticated");

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
