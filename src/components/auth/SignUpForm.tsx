
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BundeslandSelector from "./BundeslandSelector";
import { useAuth } from "@/context/AuthContext";
import { type Bundesland } from "@/types/auth";

const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name muss mindestens 2 Zeichen lang sein",
  }),
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein",
  }),
  password: z.string().min(8, {
    message: "Passwort muss mindestens 8 Zeichen lang sein",
  }),
  bundesland: z.string().min(1, {
    message: "Bitte wähle dein Bundesland aus",
  }) as z.ZodType<Bundesland>, // Cast to ensure type safety
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC = () => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bundesland: "Bayern" as Bundesland,
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    console.log("[SignUpForm] Form submitted:", values);
    setIsSubmitting(true);
    
    try {
      await signUp(
        values.email,
        values.password,
        values.name,
        values.bundesland as Bundesland // Type assertion here
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                E-Mail <span className="text-abitur-pink">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="max@beispiel.de" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Passwort <span className="text-abitur-pink">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
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

        <Button 
          type="submit" 
          className="w-full bg-abitur-pink hover:bg-abitur-pink/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrierung läuft..." : "Jetzt registrieren"}
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Mit der Registrierung akzeptierst du unsere{" "}
          <a href="/agb" className="text-abitur-cyan hover:text-abitur-cyan/90 underline">
            AGB
          </a>{" "}
          und{" "}
          <a href="/datenschutz" className="text-abitur-cyan hover:text-abitur-cyan/90 underline">
            Datenschutzbestimmungen
          </a>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
