
import React, { useState } from 'react';
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
import { validateSession } from '@/integrations/supabase/client';

const ExamGenerator = () => {
  const [subject, setSubject] = useState('Mathematik');
  const [difficulty, setDifficulty] = useState('Grundkurs');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleGenerateExam = async () => {
    try {
      console.log('[ExamGenerator] Button clicked, starting exam generation');
      console.log('[ExamGenerator] Parameters:', { subject, difficulty });
      
      // Check if user is authenticated
      if (!session.user) {
        console.error('[ExamGenerator] Not authenticated');
        toast({
          title: 'Fehler',
          description: 'Du musst angemeldet sein, um eine Prüfung zu generieren.',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }
      
      // Validate session token
      const isSessionValid = await validateSession();
      if (!isSessionValid) {
        console.error('[ExamGenerator] Session validation failed');
        toast({
          title: 'Sitzung abgelaufen',
          description: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
          variant: 'destructive',
        });
        navigate('/auth');
        return;
      }
      
      setIsGenerating(true);
      
      // Get the auth token
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError || !authData.session) {
        console.error('[ExamGenerator] Auth error:', authError);
        throw new Error('Fehler bei der Authentifizierung. Bitte melde dich erneut an.');
      }
      
      console.log('[ExamGenerator] Calling edge function');
      
      // Add explicit timeout for the function call
      const functionPromise = supabase.functions.invoke('math-exam', {
        body: { subject, difficulty },
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`
        }
      });
      
      // Increase timeout to 4 minutes (240000 ms)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Edge function timeout after 4 minutes')), 240000);
      });
      
      // Race the function call against the timeout
      const result = await Promise.race([functionPromise, timeoutPromise]);
      
      console.log('[ExamGenerator] Edge function response:', result);
      
      if (!result || !('data' in result) || !result.data || !('hexCode' in result.data)) {
        throw new Error('Die Prüfungsgenerierung war erfolglos. Keine Prüfungs-ID erhalten.');
      }
      
      toast({
        title: 'Prüfung wird generiert',
        description: 'Die Prüfung wird im Hintergrund erstellt. Bitte warten Sie einen Moment.',
        duration: 5000,
      });
      
      // Navigate to the exam display page with the hexcode
      navigate(`/exam?hexCode=${result.data.hexCode}`);
      
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
              disabled={isGenerating || session.isLoading}
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
              disabled={isGenerating || session.isLoading}
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
            disabled={isGenerating || session.isLoading || !session.user}
            className="px-8 h-10 bg-abitur-pink hover:bg-abitur-pink/90 text-white mt-2 md:mt-0"
          >
            {isGenerating ? (
              <>
                <span className="mr-2">Generieren...</span>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
            ) : session.isLoading ? (
              <>
                <span className="mr-2">Laden...</span>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </>
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
