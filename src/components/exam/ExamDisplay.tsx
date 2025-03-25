
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ExamDisplayProps {
  hexCode: string;
}

const ExamDisplay = ({ hexCode }: ExamDisplayProps) => {
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hexCode) {
      setLoading(false);
      return;
    }

    console.log('[ExamDisplay] Fetching exam with hexCode:', hexCode);
    
    // Simulate fetching exam data
    const fetchExam = async () => {
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock exam data for demonstration
        const mockExam = {
          id: hexCode,
          subject: 'Mathematik',
          difficulty: 'Grundkurs',
          status: 'completed',
          content: `
            <h1>Mathematik Grundkurs</h1>
            <h2>Abiturprüfung</h2>
            <p>Diese Prüfung besteht aus mehreren Teilen. Bitte bearbeiten Sie alle Aufgaben.</p>
            <hr />
            <h3>Aufgabe 1: Funktionen</h3>
            <p>Gegeben ist die Funktion f(x) = 2x² - 3x + 1</p>
            <ol>
              <li>Bestimmen Sie die Nullstellen der Funktion.</li>
              <li>Berechnen Sie die erste Ableitung f'(x) und bestimmen Sie deren Nullstellen.</li>
              <li>Skizzieren Sie den Graphen der Funktion f.</li>
            </ol>
            <h3>Aufgabe 2: Wahrscheinlichkeitsrechnung</h3>
            <p>In einer Urne befinden sich 5 rote, 3 blaue und 2 grüne Kugeln.</p>
            <ol>
              <li>Mit welcher Wahrscheinlichkeit wird eine rote Kugel gezogen?</li>
              <li>Es werden nacheinander zwei Kugeln ohne Zurücklegen gezogen. Mit welcher Wahrscheinlichkeit sind beide Kugeln rot?</li>
            </ol>
          `,
          created_at: new Date().toISOString(),
        };
        
        console.log('[ExamDisplay] Exam data received:', mockExam);
        setExam(mockExam);
      } catch (err) {
        console.error('[ExamDisplay] Error in try/catch:', err);
        setError('Prüfung konnte nicht geladen werden');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
    
  }, [hexCode]);

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
