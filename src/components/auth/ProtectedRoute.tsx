
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!session.isLoading && !session.user) {
      console.log("[ProtectedRoute] User not authenticated, showing toast and redirecting to /auth");
      toast({
        title: "Nicht angemeldet",
        description: "Bitte melden Sie sich an, um auf diese Seite zuzugreifen.",
        variant: "destructive",
      });
    }
  }, [session.isLoading, session.user]);

  // Show loading state during authentication check
  if (session.isLoading) {
    console.log("[ProtectedRoute] Authentication is being checked...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-abitur-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Authentifizierung wird überprüft...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!session.user) {
    console.log("[ProtectedRoute] User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  console.log("[ProtectedRoute] User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
