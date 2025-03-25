
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
  const [session, setSession] = useState<UserSession>({
    user: null,
    profile: null,
    isLoading: true,
  });

  // Simplified profile fetching function
  const fetchProfile = async (userId: string) => {
    console.log("[AuthContext] Fetching profile for user:", userId);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[AuthContext] Error fetching profile:", error);
        return null;
      }

      if (!data) {
        console.log("[AuthContext] No profile data found for user");
        return null;
      }

      return {
        id: data.id,
        name: data.name || null,
        bundesland: (data.bundesland as Bundesland) || "Bayern",
        subscription_status: data.subscription_status as 'trial' | 'active' | 'expired' || 'trial',
        trial_end_date: data.trial_end_date || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      } as Profile;
    } catch (error) {
      console.error("[AuthContext] Exception fetching profile:", error);
      return null;
    }
  };

  // Setup auth listener and check initial session
  useEffect(() => {
    console.log("[AuthContext] Setting up auth state listener");
    
    let isMounted = true;
    
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, sessionData) => {
      console.log("[AuthContext] Auth state changed:", event);
      
      if (!isMounted) return;
      
      if (sessionData?.user) {
        // We have a user, fetch their profile
        const profile = await fetchProfile(sessionData.user.id);
        setSession({
          user: {
            id: sessionData.user.id,
            email: sessionData.user.email || '',
          },
          profile,
          isLoading: false,
        });
      } else {
        // No user, reset session
        setSession({
          user: null,
          profile: null,
          isLoading: false,
        });
      }
    });

    // Then check for existing session
    const checkExistingSession = async () => {
      try {
        console.log("[AuthContext] Checking for existing session");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("[AuthContext] Error getting session:", error);
          if (isMounted) {
            setSession({
              user: null,
              profile: null,
              isLoading: false,
            });
          }
          return;
        }
        
        if (data.session?.user) {
          console.log("[AuthContext] Found existing session for user:", data.session.user.id);
          const profile = await fetchProfile(data.session.user.id);
          if (isMounted) {
            setSession({
              user: {
                id: data.session.user.id,
                email: data.session.user.email || '',
              },
              profile,
              isLoading: false,
            });
          }
        } else {
          console.log("[AuthContext] No existing session found");
          if (isMounted) {
            setSession({
              user: null,
              profile: null,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        console.error("[AuthContext] Exception during initialization:", error);
        if (isMounted) {
          setSession({
            user: null,
            profile: null,
            isLoading: false,
          });
        }
      }
    };
    
    checkExistingSession();

    // Cleanup function
    return () => {
      console.log("[AuthContext] Cleaning up auth state listener");
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with simplified error handling
  const signUp = async (email: string, password: string, name: string, bundesland: Bundesland) => {
    console.log("[AuthContext] Signing up user with email:", email);
    try {
      const { error, data } = await supabase.auth.signUp({
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

  // Sign in with simplified flow
  const signIn = async (email: string, password: string) => {
    console.log("[AuthContext] Signing in user with email:", email);
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

  // Sign out with simplified cleanup
  const signOut = async () => {
    console.log("[AuthContext] Signing out user");
    try {
      // First update the state to prevent showing protected content momentarily
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
        
        // Reset loading state in case of error
        setSession(prev => ({...prev, isLoading: false}));
        return;
      }

      // State will be reset by the auth listener
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
      
      // Reset loading state in case of error
      setSession(prev => ({...prev, isLoading: false}));
    }
  };

  // Update profile with simplified error handling
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

  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
