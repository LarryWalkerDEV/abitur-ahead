
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import BackToHomeLink from "@/components/layout/BackToHomeLink";

const examSchema = z.object({
  subject: z.string().min(1, {
    message: "Bitte wähle ein Fach aus",
  }),
  difficulty: z.string().min(1, {
    message: "Bitte wähle einen Schwierigkeitsgrad aus",
  }),
});

type ExamValues = z.infer<typeof examSchema>;

const ExamPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previousExams, setPreviousExams] = useState<any[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  const form = useForm<ExamValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      subject: "",
      difficulty: "",
    },
  });

  useEffect(() => {
    console.log("[ExamPage] Component mounted, checking authentication", {
      user: session.user,
      isLoading: session.isLoading
    });
    
    // Make sure we're setting loading state correctly
    const checkAuth = async () => {
      // Redirect to auth if not logged in
      if (!session.isLoading && !session.user) {
        console.log("[ExamPage] User not authenticated, redirecting to auth page");
        navigate("/auth");
        return;
      }
      
      if (!session.isLoading && session.user) {
        console.log("[ExamPage] User authenticated, loading exams");
        
        // Fetch previous exams if we were to implement this functionality
        try {
          // This would be implemented with a Supabase query
          setPreviousExams([]);
          console.log("[ExamPage] Previous exams successfully loaded");
        } catch (error) {
          console.error("[ExamPage] Error fetching previous exams:", error);
          toast({
            title: "Error",
            description: "Previous exams could not be loaded",
            variant: "destructive",
          });
        } finally {
          setPageLoaded(true);
        }
      }
    };

    checkAuth();

    return () => {
      console.log("[ExamPage] Component unmounted");
    };
  }, [session.user, session.isLoading, navigate]);

  const onSubmit = async (values: ExamValues) => {
    console.log("[ExamPage] Formular eingereicht:", values);
    setIsGenerating(true);
    
    try {
      // Simulate exam generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("[ExamPage] Prüfung generiert");
      
      // Add to previous exams (this would typically come from the backend)
      const newExam = {
        id: Date.now().toString(),
        subject: values.subject,
        difficulty: values.difficulty,
        date: new Date().toISOString(),
        title: `${values.subject} ${values.difficulty} Prüfung`
      };
      
      setPreviousExams(prev => [newExam, ...prev]);
      
      toast({
        title: "Prüfung erfolgreich generiert",
        description: `Deine ${values.subject} Prüfung (${values.difficulty}) ist bereit.`,
      });
    } catch (error) {
      console.error("[ExamPage] Fehler bei der Prüfungsgenerierung:", error);
      toast({
        title: "Fehler bei der Generierung",
        description: "Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Show loading screen while checking auth or loading page data
  if (session.isLoading || !pageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Abiturprüfung Generieren
          </h1>
          <p className="text-muted-foreground">
            Erstelle eine maßgeschneiderte Prüfung basierend auf deinen Vorlieben
          </p>
        </div>

        <div className="glassmorphism p-6 rounded-lg mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fach <span className="text-abitur-pink">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle ein Fach" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mathematik">Mathematik</SelectItem>
                        <SelectItem value="Englisch">Englisch</SelectItem>
                        <SelectItem value="Deutsch">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Schwierigkeitsgrad <span className="text-abitur-pink">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle einen Schwierigkeitsgrad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Grundkurs">Grundkurs</SelectItem>
                        <SelectItem value="Leistungskurs">Leistungskurs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-abitur-pink hover:bg-abitur-pink/90" 
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generierung läuft..." : "Prüfung generieren"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="glassmorphism p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Frühere Prüfungen</h2>
          
          {previousExams.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {previousExams.map((exam) => (
                <Card key={exam.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>
                      Erstellt am {new Date(exam.date).toLocaleDateString('de-DE')}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Anzeigen
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Du hast noch keine Prüfungen generiert.</p>
              <p className="mt-2">Erstelle deine erste Prüfung oben.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
