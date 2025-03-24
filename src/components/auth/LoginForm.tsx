
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein",
  }),
  password: z.string().min(1, {
    message: "Bitte gib dein Passwort ein",
  }),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    console.log("[LoginForm] Form submitted");
    setIsSubmitting(true);
    
    try {
      await signIn(values.email, values.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        
        <div className="flex justify-end">
          <a 
            href="#" 
            className="text-sm text-abitur-cyan hover:text-abitur-cyan/90"
            onClick={(e) => {
              e.preventDefault();
              console.log("[LoginForm] Password reset requested");
              // Implement password reset functionality here
            }}
          >
            Passwort vergessen?
          </a>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-abitur-pink hover:bg-abitur-pink/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Anmeldung läuft..." : "Anmelden"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
