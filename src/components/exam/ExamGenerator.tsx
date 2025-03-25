
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ExamGenerator = () => {
  const [subject, setSubject] = useState('Mathematik');
  const [difficulty, setDifficulty] = useState('Grundkurs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  // Check if the auth session is loaded and update state
  useEffect(() => {
    if (!session.isLoading) {
      setIsAuthChecked(true);
    }
  }, [session.isLoading]);

  const handleGenerateExam = async () => {
    try {
      console.log('[ExamGenerator] Button clicked, starting exam generation');
      console.log('[ExamGenerator] Parameters:', { subject, difficulty });
      console.log('[ExamGenerator] Auth status:', { 
        user: session.user ? true : false, 
        isLoading: session.isLoading,
        isAuthChecked
      });
      
      // Check if auth check has completed
      if (!isAuthChecked) {
        console.log('[ExamGenerator] Authentication check not completed yet');
        toast({
          title: 'Bitte warten',
          description: 'Authentifizierungsstatus wird überprüft...',
          duration: 3000,
        });
        return;
      }
      
      // Check if user is logged in
      if (!session.user) {
        console.error('[ExamGenerator] Not authenticated');
        toast({
          title: 'Fehler',
          description: 'Du musst angemeldet sein, um eine Prüfung zu generieren.',
          variant: 'destructive',
          duration: 5000,
        });
        return;
      }
      
      setIsGenerating(true);
      
      // Get the auth token to pass to the edge function
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      console.log('[ExamGenerator] Auth session check:', { 
        hasSession: !!authData.session, 
        error: authError ? true : false
      });
      
      if (!authData.session) {
        console.error('[ExamGenerator] No auth session found');
        toast({
          title: 'Fehler',
          description: 'Du musst angemeldet sein, um eine Prüfung zu generieren.',
          variant: 'destructive',
          duration: 5000,
        });
        setIsGenerating(false);
        return;
      }
      
      console.log('[ExamGenerator] Calling edge function with token:', 
        authData.session.access_token ? 'Token exists' : 'No token');
      
      // Add explicit timeout for the function call
      const functionPromise = supabase.functions.invoke('math-exam', {
        body: { subject, difficulty },
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`
        }
      });
      
      // Setup a 15 second timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Edge function timeout after 15 seconds')), 15000);
      });
      
      try {
        // Race the function call against the timeout
        const result = await Promise.race([
          functionPromise,
          timeoutPromise
        ]);
        
        console.log('[ExamGenerator] Edge function response:', result);
        
        // Now properly type-check the result
        if (!result.data || !result.data.hexCode) {
          console.error('[ExamGenerator] No hexCode in response:', result);
          throw new Error('Die Prüfungsgenerierung war erfolglos. Keine Prüfungs-ID erhalten.');
        }
        
        toast({
          title: 'Prüfung wird generiert',
          description: 'Die Prüfung wird im Hintergrund erstellt. Bitte warten Sie einen Moment.',
          duration: 5000,
        });
        
        // Navigate to the exam display page with the hexcode
        console.log('[ExamGenerator] Navigating to exam with hexCode:', result.data.hexCode);
        navigate(`/exam?hexCode=${result.data.hexCode}`);
      } catch (raceError: any) {
        console.error('[ExamGenerator] Race error:', raceError);
        throw raceError;
      }
      
    } catch (error: any) {
      console.error('[ExamGenerator] Error generating exam:', error);
      toast({
        title: 'Fehler',
        description: `Die Prüfung konnte nicht generiert werden: ${error.message || 'Unbekannter Fehler'}`,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 mb-8 bg-abitur-dark border-white/10">
      <div className="flex flex-col space-y-6">
        <h2 className="text-xl font-semibold">Neue Prüfung erstellen</h2>
        
        {/* Horizontal selection controls */}
        <div className="flex flex-row gap-4 items-end flex-wrap md:flex-nowrap">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="subject" className="text-sm font-medium mb-2 block">
              Fach <span className="text-abitur-pink">*</span>
            </label>
            <Select 
              value={subject} 
              onValueChange={setSubject} 
              disabled={isGenerating}
            >
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Wähle ein Fach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematik">Mathematik</SelectItem>
                <SelectItem value="Deutsch">Deutsch</SelectItem>
                <SelectItem value="Englisch">Englisch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="difficulty" className="text-sm font-medium mb-2 block">
              Schwierigkeitsgrad <span className="text-abitur-pink">*</span>
            </label>
            <Select 
              value={difficulty} 
              onValueChange={setDifficulty} 
              disabled={isGenerating}
            >
              <SelectTrigger id="difficulty" className="w-full">
                <SelectValue placeholder="Wähle einen Schwierigkeitsgrad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grundkurs">Grundkurs</SelectItem>
                <SelectItem value="Leistungskurs">Leistungskurs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerateExam} 
            disabled={isGenerating || session.isLoading}
            className="px-8 h-10 bg-abitur-pink hover:bg-abitur-pink/90 text-white mt-2 md:mt-0"
          >
            {isGenerating ? (
              <>
                <span className="mr-2">Generieren...</span>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : session.isLoading ? (
              'Laden...'
            ) : 'Prüfung generieren'}
          </Button>
        </div>
        
        {!session.user && !session.isLoading && (
          <div className="text-abitur-pink text-sm mt-2">
            Du musst angemeldet sein, um eine Prüfung zu generieren.
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExamGenerator;
