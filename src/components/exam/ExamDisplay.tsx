
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface ExamDisplayProps {
  hexCode: string;
}

const ExamDisplay = ({ hexCode }: ExamDisplayProps) => {
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!hexCode || !session.user) {
      setLoading(false);
      setError('Keine gültige Prüfungs-ID gefunden oder nicht eingeloggt.');
      return;
    }

    console.log('[ExamDisplay] Fetching exam with hexCode:', hexCode);
    
    const fetchExam = async () => {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('hexcode', hexCode)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          throw new Error('Prüfung konnte nicht gefunden werden');
        }
        
        console.log('[ExamDisplay] Exam data received:', data);
        setExam(data);
        
        // If the exam is still generating, set up polling
        if (data.status === 'generating') {
          const pollingInterval = setInterval(async () => {
            console.log('[ExamDisplay] Polling for exam status updates...');
            
            const { data: updatedExam, error: pollingError } = await supabase
              .from('exams')
              .select('*')
              .eq('hexcode', hexCode)
              .single();
              
            if (pollingError) {
              console.error('[ExamDisplay] Polling error:', pollingError);
              clearInterval(pollingInterval);
              return;
            }
            
            if (updatedExam && updatedExam.status !== 'generating') {
              console.log('[ExamDisplay] Exam generation completed:', updatedExam.status);
              setExam(updatedExam);
              clearInterval(pollingInterval);
            }
          }, 10000); // Poll every 10 seconds
          
          // Clean up interval on component unmount
          return () => clearInterval(pollingInterval);
        }
      } catch (err) {
        console.error('[ExamDisplay] Error in try/catch:', err);
        setError('Prüfung konnte nicht geladen werden');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
    
  }, [hexCode, session.user]);

  if (loading) {
    return (
      <Card className="p-6 mb-8 bg-abitur-dark border-white/10">
        <h2 className="text-xl font-semibold mb-4">Prüfung laden...</h2>
        <Skeleton className="h-[600px] w-full rounded-md" />
      </Card>
    );
  }

  if (error || !exam) {
    return (
      <Card className="p-6 mb-8 bg-abitur-dark border-white/10">
        <Alert variant="destructive">
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>
            {error || 'Prüfung konnte nicht gefunden werden'}
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-8 bg-abitur-dark border-white/10">
      <h2 className="text-xl font-semibold mb-4">
        {exam.subject} ({exam.difficulty})
      </h2>
      
      {/* White background container for exam content */}
      <div className="bg-white rounded-md shadow p-6 text-black">
        {exam.status === 'generating' ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-4">Prüfung wird generiert...</h3>
            <p className="text-gray-600">
              Dieser Vorgang kann einige Minuten dauern. Die Seite aktualisiert sich automatisch.
            </p>
          </div>
        ) : exam.status === 'error' ? (
          <div className="text-red-600 p-4">
            <h3 className="text-xl font-bold mb-2">Fehler bei der Generierung</h3>
            <p>{exam.error_message || 'Ein unbekannter Fehler ist aufgetreten'}</p>
          </div>
        ) : (
          <div 
            className="exam-content" 
            dangerouslySetInnerHTML={{ __html: exam.content }} 
          />
        )}
      </div>
    </Card>
  );
};

export default ExamDisplay;
