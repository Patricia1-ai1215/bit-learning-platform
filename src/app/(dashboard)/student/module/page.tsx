"use client";

import { useState, useMemo } from 'react';

import Sidebar from "./Sidebar";
import ModuleNav from "./ModuleNav";
import ModuleHeader from "./ModuleHeader";
import StepRunner from "./StepRunner";
import CompletionScreen from "./CompletionScreen";
import { mockCourseData } from "@/lib/mock/courseData";

export default function ModulePage() {
  const activeModuleId = 'm2';
  
  let activeModule = null;
  let isFirstInLesson = false;

  for (const lesson of mockCourseData.lessons) {
    for (let i = 0; i < lesson.modules.length; i++) {
      if (lesson.modules[i].id === activeModuleId) {
        activeModule = lesson.modules[i];
        isFirstInLesson = i === 0;
        break;
      }
    }
    if (activeModule) break;
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isQuizLocked, setIsQuizLocked] = useState(false);
  
  // Completion & Stats States
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [quizScore, setQuizScore] = useState("0/0");
  const [seenFlashcards, setSeenFlashcards] = useState<Set<number>>(new Set([0])); // ICI
  const [startTime] = useState(Date.now()); 

  // Optimistic UI Progress Saving State
  const [isProgressSaving, setIsProgressSaving] = useState(false);

  if (!activeModule || !activeModule.steps || activeModule.steps.length === 0) {
    return <div>Module not found or has no steps</div>;
  }

  const saveProgress = (stepIndex: number, completed: boolean = false) => {
    setIsProgressSaving(true);
    setTimeout(() => {
      console.log(`Progress saved: Step ${stepIndex}, Completed: ${completed}`);
      setIsProgressSaving(false);
    }, 800);
  };

  const handleStepChange = (newIndex: number) => {
    setCurrentStepIndex(newIndex);
    setIsQuizLocked(activeModule.steps[newIndex].type === 'QUIZ');
    saveProgress(newIndex);
  };

  const handleQuizUnlock = () => {
    setIsQuizLocked(false);
  };

  const handleModuleComplete = () => {
    setIsModuleComplete(true);
    saveProgress(currentStepIndex, true);
  };

  const handleBackToCourse = () => {
    alert("Navigating back to course overview...");
  };

  const handleStartNextModule = (moduleId: string) => {
    alert(`Starting next module: ${moduleId}`);
  };

  const timeSpentString = useMemo(() => {
    const timeSpentMinutes = Math.round((Date.now() - startTime) / 60000);
    return timeSpentMinutes === 0 ? "< 1 min" : `${timeSpentMinutes} min`;
  }, [startTime]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <ModuleNav />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <ModuleHeader 
          module={activeModule} 
          isFirstInLesson={isFirstInLesson}
          currentStep={currentStepIndex + 1}
          totalSteps={activeModule.steps.length}
          isProgressSaving={isProgressSaving}
        />
        
        {isModuleComplete ? (
          <CompletionScreen 
            course={mockCourseData}
            currentModule={activeModule}
            quizScore={quizScore}
            flashcardsSeen={seenFlashcards.size} // ICI
            timeSpent={timeSpentString}
            onBackToCourse={handleBackToCourse}
            onStartNextModule={handleStartNextModule}
          />
        ) : (
          <StepRunner 
            steps={activeModule.steps} 
            currentStepIndex={currentStepIndex}
            isQuizLocked={isQuizLocked}
            onStepChange={handleStepChange}
            onQuizUnlock={handleQuizUnlock}
            onModuleComplete={handleModuleComplete}
            setQuizScore={setQuizScore}
            seenFlashcards={seenFlashcards} // ICI
            setSeenFlashcards={setSeenFlashcards} // ICI
          />
        )}
      </main>
    </div>
  );
}


