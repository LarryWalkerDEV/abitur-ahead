
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const ExamHistory = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    if (!session.user) {
      setLoading(false);
      return;
    }

    const fetchExams = async () => {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          throw error;
        }

        console.log('[ExamHistory] Fetched exams:', data);
        setExams(data || []);
      } catch (err) {
        console.error('[ExamHistory] Error fetching exams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [session.user]);

  if (loading) {
    return (
      <Card className="glassmorphism p-6 rounded-lg text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Frühere Prüfungen</h2>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    );
  }

  if (!session.user) {
    return (
      <Card className="glassmorphism p-6 rounded-lg text-center py-8 text-muted-foreground">
        <h2 className="text-xl font-semibold mb-4">Frühere Prüfungen</h2>
        <p>Bitte melde dich an, um deine Prüfungen zu sehen.</p>
      </Card>
    );
  }

  if (exams.length === 0) {
    return (
      <Card className="glassmorphism p-6 rounded-lg text-center py-8 text-muted-foreground">
        <h2 className="text-xl font-semibold mb-4">Frühere Prüfungen</h2>
        <p>Wähle ein Fach und einen Schwierigkeitsgrad, um eine neue Prüfung zu generieren.</p>
        <p className="mt-4">Deine generierten Prüfungen werden hier angezeigt.</p>
      </Card>
    );
  }

  return (
    <Card className="glassmorphism p-6 rounded-lg py-8">
      <h2 className="text-xl font-semibold mb-6 text-center">Frühere Prüfungen</h2>
      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-abitur-dark/50 rounded-lg">
            <div className="mb-2 sm:mb-0">
              <div className="font-medium">{exam.subject} - {exam.difficulty}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(exam.created_at), 'dd. MMMM yyyy, HH:mm', { locale: de })}
              </div>
            </div>
            <div className="flex items-center">
              {exam.status === 'generating' ? (
                <span className="text-amber-400 text-sm">Generierung läuft...</span>
              ) : exam.status === 'error' ? (
                <span className="text-red-400 text-sm">Fehler</span>
              ) : (
                <Link to={`/exam?hexCode=${exam.hexcode}`}>
                  <Button size="sm" className="bg-abitur-cyan hover:bg-abitur-cyan/90">
                    Öffnen
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExamHistory;
