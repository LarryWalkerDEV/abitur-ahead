
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SendIcon, UploadIcon } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const TutoringPage: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hallo! Ich bin dein persönlicher Abitur-Tutor. Wie kann ich dir heute helfen?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    console.log("[TutoringPage] Komponente montiert");
    
    // Redirect to auth if not logged in
    if (!session.isLoading && !session.user) {
      console.log("[TutoringPage] Benutzer nicht angemeldet, Weiterleitung zur Auth-Seite");
      navigate("/auth");
      return;
    }

    return () => {
      console.log("[TutoringPage] Komponente demontiert");
    };
  }, [session.user, session.isLoading, navigate]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    console.log("[TutoringPage] Nachricht gesendet:", message);
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a basic response
      let response = "Ich verstehe deine Frage zu diesem Thema. ";
      
      if (message.toLowerCase().includes("mathe")) {
        response += "In der Mathematik ist es wichtig, die Grundprinzipien zu verstehen. Kann ich dir bei einer bestimmten Formel oder einem Konzept helfen?";
      } else if (message.toLowerCase().includes("englisch")) {
        response += "Bei Englisch ist regelmäßiges Üben der Schlüssel zum Erfolg. Möchtest du an deiner Grammatik, deinem Vokabular oder deinen Schreibfähigkeiten arbeiten?";
      } else if (message.toLowerCase().includes("deutsch")) {
        response += "Für Deutsch empfehle ich, viel zu lesen und die Textanalyse zu üben. Arbeitest du an einem bestimmten literarischen Werk oder einer Textform?";
      } else {
        response += "Ich kann dir bei der Vorbereitung für verschiedene Fächer helfen. Was möchtest du genauer wissen?";
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("[TutoringPage] Fehler beim Senden der Nachricht:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    console.log("[TutoringPage] Datei ausgewählt:", file.name);
    setFileUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setFileUploading(false);
      
      // Add message about the uploaded file
      const fileMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `Datei hochgeladen: ${file.name}`,
        sender: 'user',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, fileMessage]);
      
      // AI response to the uploaded file
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `Ich habe deine Datei "${file.name}" erhalten. Was möchtest du damit machen?`,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (session.isLoading) {
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
            Dein KI-Tutor
          </h1>
          <p className="text-muted-foreground">
            Stelle Fragen und lade Dokumente hoch für personalisierte Hilfe
          </p>
        </div>

        <div className="glassmorphism rounded-lg overflow-hidden flex flex-col h-[calc(100vh-250px)]">
          <div className="flex-1 overflow-y-auto p-6">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-4 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-abitur-pink/20 border border-abitur-pink/30 ml-auto' 
                      : 'bg-abitur-cyan/20 border border-abitur-cyan/30'
                  }`}
                >
                  <p className="text-white">{msg.content}</p>
                </div>
                <div 
                  className={`text-xs text-muted-foreground mt-1 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center mb-4 max-w-[80%]">
                <div className="p-3 rounded-lg bg-abitur-cyan/20 border border-abitur-cyan/30">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-abitur-cyan animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-abitur-cyan animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-abitur-cyan animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Stelle eine Frage zu deinen Abiturthemen..."
                  className="min-h-[80px] bg-white/10 border-white/20"
                  disabled={isLoading}
                />
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleFileUpload}
                    disabled={fileUploading || isLoading}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className={fileUploading ? "animate-pulse" : ""}
                    disabled={fileUploading || isLoading}
                  >
                    <UploadIcon className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  className="bg-abitur-pink hover:bg-abitur-pink/90"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                >
                  <SendIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;
