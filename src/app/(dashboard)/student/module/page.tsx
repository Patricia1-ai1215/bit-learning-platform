"use client";

import { useState } from 'react';
import Sidebar from "./Sidebar";
import ModuleNav from "./ModuleNav";
import ModuleHeader from "./ModuleHeader";
import StepRunner from "./StepRunner";
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

  // THE FIX: The Step State now lives here!
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isQuizLocked, setIsQuizLocked] = useState(false);

  if (!activeModule || !activeModule.steps || activeModule.steps.length === 0) {
    return <div>Module not found or has no steps</div>;
  }

  const handleStepChange = (newIndex: number) => {
    setCurrentStepIndex(newIndex);
    setIsQuizLocked(activeModule.steps[newIndex].type === 'QUIZ');
  };

  const handleQuizUnlock = () => {
    setIsQuizLocked(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <ModuleNav />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* THE FIX: Now passing dynamic currentStepIndex! */}
        <ModuleHeader
          module={activeModule}
          isFirstInLesson={isFirstInLesson}
          currentStep={currentStepIndex + 1}
          totalSteps={activeModule.steps.length}
        />

        <StepRunner
          steps={activeModule.steps}
          currentStepIndex={currentStepIndex}
          isQuizLocked={isQuizLocked}
          onStepChange={handleStepChange}
          onQuizUnlock={handleQuizUnlock}
        />
      </main>
    </div>
  );
}

