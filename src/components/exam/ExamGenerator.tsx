
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

const ExamGenerator = () => {
  const [subject, setSubject] = useState('Mathematik');
  const [difficulty, setDifficulty] = useState('Grundkurs');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleGenerateExam = async () => {
    try {
      if (!session.user) {
        toast({
          title: 'Fehler',
          description: 'Du musst angemeldet sein, um eine Prüfung zu generieren.',
          variant: 'destructive',
        });
        return;
      }

      console.log('[ExamGenerator] Starting exam generation, subject:', subject, 'difficulty:', difficulty);
      setIsGenerating(true);
      
      // Get the auth token to pass to the edge function
      const { data: authData } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke('math-exam', {
        body: { subject, difficulty },
        headers: {
          Authorization: `Bearer ${authData.session?.access_token || ''}`
        }
      });
      
      if (error) {
        console.error('[ExamGenerator] Error invoking math-exam function:', error);
        throw error;
      }
      
      console.log('[ExamGenerator] Exam generation response:', data);
      
      if (!data.hexCode) {
        throw new Error('Die Prüfungsgenerierung war erfolglos.');
      }
      
      toast({
        title: 'Prüfung wird generiert',
        description: 'Die Prüfung wird im Hintergrund erstellt. Bitte warten Sie einen Moment.',
      });
      
      // Navigate to the exam display page with the hexcode
      navigate(`/exam?hexCode=${data.hexCode}`);
      
    } catch (error) {
      console.error('[ExamGenerator] Error generating exam:', error);
      toast({
        title: 'Fehler',
        description: 'Die Prüfung konnte nicht generiert werden. Bitte versuchen Sie es später erneut.',
        variant: 'destructive',
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
            disabled={isGenerating || !session.user}
            className="px-8 h-10 bg-abitur-pink hover:bg-abitur-pink/90 text-white mt-2 md:mt-0"
          >
            {isGenerating ? 'Generieren...' : 'Prüfung generieren'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExamGenerator;
