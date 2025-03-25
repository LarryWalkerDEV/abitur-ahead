
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [session, setSession] = useState<UserSession>({
    user: null,
    profile: null,
    isLoading: true,
  });

  // Fetch user profile with better error handling
  const fetchProfile = async (userId: string) => {
    try {
      console.log("[AuthContext] Fetching profile for user ID:", userId);
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[AuthContext] Error fetching profile:", error);
        return null;
      }

      if (!profileData) {
        console.error("[AuthContext] No profile data found for user:", userId);
        return null;
      }

      console.log("[AuthContext] Profile data retrieved:", profileData);
      
      // Validate bundesland with fallback
      let bundesland: Bundesland;
      try {
        bundesland = profileData.bundesland as Bundesland;
        if (!bundesland) {
          console.warn("[AuthContext] Bundesland not found, defaulting to Bayern");
          bundesland = "Bayern";
        }
      } catch (e) {
        console.error("[AuthContext] Error parsing bundesland:", e);
        bundesland = "Bayern";
      }
      
      // Create properly typed profile with fallbacks for missing data
      const profile: Profile = {
        id: profileData.id,
        name: profileData.name || null,
        bundesland: bundesland,
        subscription_status: profileData.subscription_status as 'trial' | 'active' | 'expired' || 'trial',
        trial_end_date: profileData.trial_end_date || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      return profile;
    } catch (error) {
      console.error("[AuthContext] Exception fetching profile:", error);
      return null;
    }
  };

  // Update session with user and profile - more robust implementation
  const refreshSession = async (userId: string | undefined, email: string | undefined, forceReset = false) => {
    console.log("[AuthContext] Refreshing session for:", { userId, email, forceReset });
    
    // If forceReset is true or no userId/email, clear the session
    if (forceReset || !userId || !email) {
      console.log("[AuthContext] No user ID or email, or force reset requested. Setting session to null");
      setSession({
        user: null,
        profile: null,
        isLoading: false,
      });
      return;
    }

    try {
      const profile = await fetchProfile(userId);
      console.log("[AuthContext] Profile fetched:", profile);
      
      setSession({
        user: {
          id: userId,
          email,
        },
        profile,
        isLoading: false,
      });
      
      console.log("[AuthContext] Session updated:", { 
        userId, 
        email, 
        profile: profile ? "exists" : "null",
        isLoading: false 
      });
    } catch (error) {
      console.error("[AuthContext] Error refreshing session:", error);
      // On error, reset session to prevent stale state
      setSession({
        user: null,
        profile: null,
        isLoading: false,
      });
    }
  };

  // Initialize session with improved event handling
  useEffect(() => {
    console.log("[AuthContext] Setting up auth state listener");
    let mounted = true;
    
    // Handle auth changes with event-specific logic
    const handleAuthChange = async (event: string, sessionData: any) => {
      console.log("[AuthContext] Auth state changed:", event);
      
      if (!mounted) {
        console.log("[AuthContext] Component unmounted, skipping state update");
        return;
      }
      
      // Handle different auth events
      switch (event) {
        case "SIGNED_IN":
          console.log("[AuthContext] Handling SIGNED_IN event");
          await refreshSession(
            sessionData?.user?.id, 
            sessionData?.user?.email
          );
          break;
        
        case "SIGNED_OUT":
          console.log("[AuthContext] Handling SIGNED_OUT event");
          // Force reset on sign out
          await refreshSession(undefined, undefined, true);
          break;
          
        case "TOKEN_REFRESHED":
          console.log("[AuthContext] Handling TOKEN_REFRESHED event");
          // Just refresh the session with current user data
          await refreshSession(
            sessionData?.user?.id, 
            sessionData?.user?.email
          );
          break;
          
        case "USER_UPDATED":
          console.log("[AuthContext] Handling USER_UPDATED event");
          await refreshSession(
            sessionData?.user?.id, 
            sessionData?.user?.email
          );
          break;
          
        default:
          console.log("[AuthContext] Unhandled auth event:", event);
          // For unhandled events, check if we have a session and refresh accordingly
          if (sessionData?.user?.id) {
            await refreshSession(
              sessionData.user.id, 
              sessionData.user.email
            );
          } else {
            // If no user in the session data, reset
            await refreshSession(undefined, undefined, true);
          }
      }
    };
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Then check for existing session
    const initializeSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("[AuthContext] Error getting session:", error);
          if (mounted) {
            setSession({
              user: null,
              profile: null,
              isLoading: false,
            });
          }
          return;
        }
        
        console.log("[AuthContext] Initial session check:", 
          currentSession ? "Session exists" : "No session");
        
        if (mounted) {
          await refreshSession(
            currentSession?.user?.id, 
            currentSession?.user?.email
          );
        }
      } catch (error) {
        console.error("[AuthContext] Exception during initialization:", error);
        if (mounted) {
          setSession({
            user: null,
            profile: null,
            isLoading: false,
          });
        }
      }
    };
    
    initializeSession();

    // Cleanup function
    return () => {
      console.log("[AuthContext] Cleaning up auth state listener");
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with improved error handling
  const signUp = async (email: string, password: string, name: string, bundesland: Bundesland) => {
    try {
      console.log("[AuthContext] Attempting to sign up user:", email);
      
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
        console.error("[AuthContext] Sign up error:", error);
        toast({
          title: "Registrierung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("[AuthContext] Sign up successful:", data);

      // Only navigate and show success toast if we actually have a session
      if (data.user) {
        toast({
          title: "Registrierung erfolgreich",
          description: "Bitte überprüfe deine E-Mail für weitere Anweisungen.",
        });
        
        // Add slight delay to ensure state updates before navigation
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        console.warn("[AuthContext] Sign up completed but no user returned");
        toast({
          title: "Registrierung abgeschlossen",
          description: "Bitte überprüfe deine E-Mail und bestätige deine Anmeldung.",
        });
      }
    } catch (error) {
      console.error("[AuthContext] Sign up exception:", error);
      toast({
        title: "Registrierung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Sign in with improved error handling and state management
  const signIn = async (email: string, password: string) => {
    try {
      console.log("[AuthContext] Attempting to sign in user:", email);
      
      // First sign out to ensure clean state
      await supabase.auth.signOut();
      
      // Brief pause to ensure clean slate
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[AuthContext] Sign in error:", error);
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("[AuthContext] Sign in successful:", data);

      toast({
        title: "Anmeldung erfolgreich",
        description: "Willkommen zurück!",
      });
      
      // Add slight delay to ensure state updates before navigation
      setTimeout(() => {
        navigate("/exam");
      }, 500);
    } catch (error) {
      console.error("[AuthContext] Sign in exception:", error);
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Sign out with improved cleanup
  const signOut = async () => {
    try {
      console.log("[AuthContext] Signing out user");
      
      // Clear session state first to prevent flashes of authenticated content
      setSession({
        user: null,
        profile: null,
        isLoading: true,
      });
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("[AuthContext] Sign out error:", error);
        toast({
          title: "Abmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Force clear local storage to ensure no stale tokens remain
      try {
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.removeItem('supabase.auth.token');
      } catch (e) {
        console.warn("[AuthContext] Error clearing storage:", e);
      }

      console.log("[AuthContext] Sign out successful");
      
      toast({
        title: "Abmeldung erfolgreich",
        description: "Auf Wiedersehen!",
      });
      
      // Delay navigation slightly to ensure state updates
      setTimeout(() => {
        navigate("/auth");
      }, 100);
    } catch (error) {
      console.error("[AuthContext] Sign out exception:", error);
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Update profile with improved error handling
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
        console.error("[AuthContext] Update profile error:", error);
        toast({
          title: "Profil-Update fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Refresh the session
      refreshSession(session.user.id, session.user.email);

      toast({
        title: "Profil aktualisiert",
        description: "Dein Profil wurde erfolgreich aktualisiert.",
      });
    } catch (error) {
      console.error("[AuthContext] Update profile exception:", error);
      toast({
        title: "Profil-Update fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
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
