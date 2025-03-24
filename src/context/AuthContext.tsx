
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type { UserSession, Profile } from "@/types/auth";

interface AuthContextType {
  session: UserSession;
  signUp: (email: string, password: string, name: string, bundesland: string) => Promise<void>;
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

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[AuthContext] Error fetching profile:", error);
        return null;
      }

      return profile;
    } catch (error) {
      console.error("[AuthContext] Exception fetching profile:", error);
      return null;
    }
  };

  // Update session with user and profile
  const refreshSession = async (userId: string | undefined, email: string | undefined) => {
    if (!userId || !email) {
      setSession({
        user: null,
        profile: null,
        isLoading: false,
      });
      return;
    }

    const profile = await fetchProfile(userId);
    
    setSession({
      user: {
        id: userId,
        email,
      },
      profile,
      isLoading: false,
    });
  };

  // Initialize session
  useEffect(() => {
    console.log("[AuthContext] Setting up auth state listener");
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[AuthContext] Auth state changed:", event);
        
        await refreshSession(
          session?.user?.id, 
          session?.user?.email
        );
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      refreshSession(
        session?.user?.id, 
        session?.user?.email
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up
  const signUp = async (email: string, password: string, name: string, bundesland: string) => {
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
        console.error("[AuthContext] Sign up error:", error);
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
      
      navigate("/");
    } catch (error) {
      console.error("[AuthContext] Sign up exception:", error);
      toast({
        title: "Registrierung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
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

      toast({
        title: "Anmeldung erfolgreich",
        description: "Willkommen zurück!",
      });
      
      navigate("/");
    } catch (error) {
      console.error("[AuthContext] Sign in exception:", error);
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Sign out
  const signOut = async () => {
    try {
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

      toast({
        title: "Abmeldung erfolgreich",
        description: "Auf Wiedersehen!",
      });
      
      navigate("/auth");
    } catch (error) {
      console.error("[AuthContext] Sign out exception:", error);
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: "Es ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  // Update profile
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
