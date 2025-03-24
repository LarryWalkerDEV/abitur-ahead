
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BundeslandSelector from "@/components/auth/BundeslandSelector";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Profile } from "@/types/auth";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name muss mindestens 2 Zeichen lang sein",
  }),
  bundesland: z.string().min(1, {
    message: "Bitte wähle dein Bundesland aus",
  }),
});

type ProfileValues = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { session, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session.profile?.name || "",
      bundesland: session.profile?.bundesland || "Bayern",
    },
  });

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!session.isLoading && !session.user) {
      console.log("[ProfilePage] User not authenticated, redirecting to auth");
      navigate("/auth");
    }
  }, [session.user, session.isLoading, navigate]);

  // Update form when profile data changes
  useEffect(() => {
    if (session.profile) {
      form.reset({
        name: session.profile.name || "",
        bundesland: session.profile.bundesland,
      });
    }
  }, [session.profile, form]);

  const onSubmit = async (values: ProfileValues) => {
    console.log("[ProfilePage] Form submitted:", values);
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        name: values.name,
        bundesland: values.bundesland,
      } as Partial<Profile>);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  if (!session.user || !session.profile) {
    return null; // Will redirect in the useEffect
  }

  const trialEndDate = new Date(session.profile.trial_end_date);
  const formattedTrialEndDate = format(trialEndDate, "dd. MMMM yyyy", { locale: de });
  const isTrialActive = new Date() < trialEndDate;

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Mein Profil
          </h1>
          <p className="text-muted-foreground">
            Verwalte deine persönlichen Daten und Einstellungen
          </p>
        </div>

        <div className="glassmorphism p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Kontoinformationen</h2>
            <div className={`${isTrialActive ? 'abitur-badge-green' : 'abitur-badge-orange'}`}>
              {isTrialActive 
                ? `Testphase aktiv bis ${formattedTrialEndDate}` 
                : "Testphase abgelaufen"}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground mb-1">E-Mail</p>
            <p className="text-foreground font-medium">{session.user.email}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-abitur-pink">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Max Mustermann" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <BundeslandSelector
                control={form.control}
                name="bundesland"
                label="Bundesland"
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-abitur-pink hover:bg-abitur-pink/90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Speichern..." : "Änderungen speichern"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="glassmorphism p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Account-Optionen</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Zurück zur Startseite
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={signOut}
              className="flex-1"
            >
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
