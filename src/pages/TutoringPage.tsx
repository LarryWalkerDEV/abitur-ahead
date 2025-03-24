import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Paperclip, 
  Send, 
  RotateCw, 
  FileText, 
  X,
  UserCircle2 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const TutoringPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("[TutoringPage] Component mounted", {
      user: session.user,
      isLoading: session.isLoading
    });
    
    // Check authentication state
    const checkAuth = async () => {
      // Redirect to auth if not logged in
      if (!session.isLoading && !session.user) {
        console.log("[TutoringPage] User not authenticated, redirecting to auth page");
        navigate("/auth");
        return;
      }
      
      if (!session.isLoading && session.user) {
        console.log("[TutoringPage] User authenticated, page loaded");
        setPageLoaded(true);
      }
    };
    
    checkAuth();

    return () => {
      console.log("[TutoringPage] Component unmounted");
    };
  }, [session.user, session.isLoading, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[TutoringPage] Dateien ausgewählt:", e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      try {
        const newFiles = Array.from(e.target.files).map(file => ({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          file
        }));
        setAttachments(prev => [...prev, ...newFiles]);
      } catch (error) {
        console.error("[TutoringPage] Fehler beim Verarbeiten der Dateien:", error);
        toast({
          title: "Fehler beim Hochladen",
          description: "Die ausgewählten Dateien konnten nicht verarbeitet werden.",
          variant: "destructive",
        });
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    console.log("[TutoringPage] Anhang entfernt:", id);
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    
    console.log("[TutoringPage] Nachricht gesendet:", message);
    console.log("[TutoringPage] Anhänge:", attachments);
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsSubmitting(true);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Ich bin dein Abitur AI Tutor. Wie kann ich dir bei deiner Prüfungsvorbereitung helfen? Ich kann dir Übungsaufgaben erklären oder Zusammenfassungen zu bestimmten Themen geben.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setAttachments([]);
      
    } catch (error) {
      console.error("[TutoringPage] Fehler beim Senden der Nachricht:", error);
      toast({
        title: "Fehler",
        description: "Beim Senden deiner Nachricht ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session.isLoading || !pageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Abitur Tutoring
          </h1>
          <p className="text-muted-foreground">
            Stelle Fragen zu deinen Übungen und erhalte personalisierte Unterstützung
          </p>
        </div>

        <div className="glassmorphism rounded-lg flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <FileText className="h-16 w-16 mb-4 text-abitur-pink/50" />
                <h3 className="text-lg font-medium">Keine Nachrichten</h3>
                <p className="max-w-md">
                  Stelle eine Frage zu deinem Lernmaterial oder lade ein Dokument hoch, um Hilfe zu bekommen.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.sender === 'user' 
                        ? 'bg-abitur-pink/20 text-white' 
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {msg.sender === 'ai' && (
                        <span className="text-abitur-cyan font-semibold mr-2">Abitur AI</span>
                      )}
                      {msg.sender === 'user' && (
                        <span className="text-abitur-pink font-semibold ml-auto">Du</span>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <div className="text-xs text-muted-foreground text-right mt-1">
                      {msg.timestamp.toLocaleTimeString('de-DE', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachments.map(attachment => (
                  <div key={attachment.id} className="bg-white/10 rounded px-3 py-1 flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <span className="truncate max-w-[150px]">{attachment.name}</span>
                    <button 
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-white/70 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                multiple
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Stelle eine Frage zum Lernmaterial..."
                className="min-h-10 flex-1 resize-none"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 shrink-0 rounded-full bg-abitur-pink hover:bg-abitur-pink/90"
                disabled={isSubmitting || (!message.trim() && attachments.length === 0)}
              >
                {isSubmitting ? <RotateCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;
