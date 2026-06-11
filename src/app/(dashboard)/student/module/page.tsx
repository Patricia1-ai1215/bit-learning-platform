"use client";

import Sidebar from "./Sidebar";
import ModuleNav from "./ModuleNav";
import ModuleHeader from "./ModuleHeader";
import { mockCourseData } from "@/lib/mock/courseData";

export default function ModulePage() {
  // TODO (BIT-811): Replace mock data with fetch to GET /api/courses/:id/modules when backend is ready
  const activeModuleId = "m2";

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

  // TODO (BIT-811): Wire this to actual step progression logic in BIT-812/813
  const currentStep = 2;
  const totalSteps = 4;

  if (!activeModule) return <div>Module not found</div>;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Far Left App Shell Sidebar */}
      <Sidebar />

      {/* Course Module List Sidebar */}
      <ModuleNav />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Module Header */}
        <ModuleHeader
          module={activeModule}
          isFirstInLesson={isFirstInLesson}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        {/* Step Body Placeholder (This will be Task 812) */}
        <div className="flex-1 flex items-center justify-center text-gray-400 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading text-gray-900 tracking-wide">
              Step Content Area
            </h2>
            <p className="mt-2 text-sm">
              Flashcards, Quizzes, and Text will go here (BIT-812)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

