
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ExamDisplayProps {
  hexCode: string;
}

const ExamDisplay = ({ hexCode }: ExamDisplayProps) => {
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const [pollingInterval, setPollingInterval] = useState<number | null>(null);

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
          console.error('[ExamDisplay] Error fetching exam:', error);
          throw error;
        }
        
        if (!data) {
          console.error('[ExamDisplay] No exam data found for hexCode:', hexCode);
          throw new Error('Prüfung konnte nicht gefunden werden');
        }
        
        console.log('[ExamDisplay] Exam data received:', data);
        setExam(data);
        
        // If the exam is still generating, set up polling
        if (data.status === 'generating') {
          console.log('[ExamDisplay] Exam is still generating, setting up polling');
          
          // Clear any existing interval before setting a new one
          if (pollingInterval) {
            clearInterval(pollingInterval);
          }
          
          const interval = window.setInterval(async () => {
            console.log('[ExamDisplay] Polling for exam status updates...');
            
            const { data: updatedExam, error: pollingError } = await supabase
              .from('exams')
              .select('*')
              .eq('hexcode', hexCode)
              .single();
              
            if (pollingError) {
              console.error('[ExamDisplay] Polling error:', pollingError);
              clearInterval(interval);
              setPollingInterval(null);
              toast({
                title: 'Fehler',
                description: 'Es gab ein Problem beim Abrufen der Prüfungsdaten.',
                variant: 'destructive',
              });
              return;
            }
            
            if (updatedExam) {
              console.log('[ExamDisplay] Polling returned updated exam:', updatedExam);
              setExam(updatedExam);
              
              if (updatedExam.status !== 'generating') {
                console.log('[ExamDisplay] Exam generation completed, status:', updatedExam.status);
                clearInterval(interval);
                setPollingInterval(null);
                
                if (updatedExam.status === 'completed') {
                  toast({
                    title: 'Prüfung fertig',
                    description: 'Ihre Prüfung wurde erfolgreich generiert.',
                  });
                } else if (updatedExam.status === 'error') {
                  toast({
                    title: 'Fehler',
                    description: updatedExam.error_message || 'Die Prüfungsgenerierung ist fehlgeschlagen.',
                    variant: 'destructive',
                  });
                }
              }
            }
          }, 5000); // Poll every 5 seconds
          
          setPollingInterval(interval);
        }
      } catch (err: any) {
        console.error('[ExamDisplay] Error in try/catch:', err);
        setError(err.message || 'Prüfung konnte nicht geladen werden');
        toast({
          title: 'Fehler',
          description: err.message || 'Prüfung konnte nicht geladen werden',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
    
    // Clean up interval on component unmount
    return () => {
      if (pollingInterval) {
        console.log('[ExamDisplay] Cleaning up polling interval');
        clearInterval(pollingInterval);
      }
    };
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
            <p className="text-gray-600 mb-4">
              Dieser Vorgang kann einige Minuten dauern. Die Seite aktualisiert sich automatisch.
            </p>
            <div className="w-16 h-16 border-4 border-abitur-pink border-t-transparent rounded-full animate-spin mx-auto"></div>
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
