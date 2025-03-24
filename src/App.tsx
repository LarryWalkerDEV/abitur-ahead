
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ExamPage from "./pages/ExamPage";
import TutoringPage from "./pages/TutoringPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ImprintPage from "./pages/ImprintPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

// Create a new query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Route logger component to track navigation
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log(`[App] Navigated to: ${location.pathname}`);
  }, [location]);
  
  return null;
};

const App = () => {
  console.log("[App] Initializing application");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <RouteLogger />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/exam" element={<ExamPage />} />
              <Route path="/tutoring" element={<TutoringPage />} />
              <Route path="/datenschutz" element={<PrivacyPolicyPage />} />
              <Route path="/agb" element={<TermsPage />} />
              <Route path="/rueckerstattung" element={<RefundPolicyPage />} />
              <Route path="/impressum" element={<ImprintPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
