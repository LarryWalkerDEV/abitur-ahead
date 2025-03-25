
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExamGenerator from "@/components/exam/ExamGenerator";
import ExamDisplay from "@/components/exam/ExamDisplay";
import ExamHistory from "@/components/exam/ExamHistory";
import BackToHomeLink from "@/components/layout/BackToHomeLink";

const ExamPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const hexCode = searchParams.get('hexCode');

  return (
    <div className="abitur-grid-bg min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="absolute top-4 left-4">
          <BackToHomeLink />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Abiturprüfung Generieren
          </h1>
          <p className="text-muted-foreground">
            Erstelle eine maßgeschneiderte Prüfung basierend auf deinen Vorlieben
          </p>
        </div>

        {/* Show exam generator when no hexCode is provided */}
        {!hexCode && <ExamGenerator />}
        
        {/* Show exam display if hexCode is provided */}
        {hexCode && <ExamDisplay hexCode={hexCode} />}
        
        {/* Show exam history when no hexCode is provided */}
        {!hexCode && <ExamHistory />}
      </div>
    </div>
  );
};

export default ExamPage;
