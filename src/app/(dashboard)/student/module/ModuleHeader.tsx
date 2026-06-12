"use client";

import { useState } from 'react';
import { Module } from '@/lib/mock/courseData';
import { ChevronRight } from 'lucide-react';

import { CatTag, type Category } from '@/components/ui/cat-tag';






interface ModuleHeaderProps {
  module: Module;
  isFirstInLesson: boolean;
  currentStep: number;
  totalSteps: number;
  isProgressSaving: boolean; // NEW
}

export default function ModuleHeader({ module, isFirstInLesson, currentStep, totalSteps, isProgressSaving }: ModuleHeaderProps) {
  const [objOpen, setObjOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('objectives-open');
      return saved !== null ? JSON.parse(saved) : isFirstInLesson;
    }
    return isFirstInLesson;
  });

  const handleToggle = () => {
    const newState = !objOpen;
    setObjOpen(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('objectives-open', JSON.stringify(newState));
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 py-6 relative">
      <div className="max-w-3xl mx-auto px-8">
        {/* TOP LINE: CatTag + Time + Steps + Progress Pulse */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <CatTag category={module.category.toLowerCase() as Category} />



            <span className="text-gray-300" aria-hidden="true">
              ·
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {module.mins} min
            </span>
            <span className="text-gray-300" aria-hidden="true">
              ·
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {totalSteps} steps
            </span>
          </div>

          {/* BIT-813: Progress Saved Pulse Indicator */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400" aria-live="polite">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isProgressSaving ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'
              }`}
            />
            {isProgressSaving ? 'Saving...' : 'Progress saved'}
          </div>
        </div>

        {/* Module Title */}
        <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-wide mb-4">
          {module.title}
        </h1>

        {/* Progress Row */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-xs font-bold text-gray-900">
            Step {currentStep} <span className="text-gray-500 font-medium">of {totalSteps}</span>
          </span>

          {/* TODO (BIT-791): Replace custom ProgressBar with design system component once exported */}
          <div
            className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={(currentStep / totalSteps) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Module progress"
          >
            <div
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < currentStep ? 'w-4 bg-gray-900' : ''
                } ${i === currentStep ? 'w-6 bg-primary-500' : ''} ${
                  i > currentStep ? 'w-4 bg-gray-200' : ''
                }`}
              />
            ))}
          </div>
        </div>


        <div>
          <button
            className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            onClick={handleToggle}
            aria-expanded={objOpen}
            aria-controls="learning-objectives-list"
          >
            <ChevronRight size={12} className={`transition-transform ${objOpen ? 'rotate-90' : ''}`} />
            {' '}Learning objectives
          </button>

          {objOpen && (
            <ul id="learning-objectives-list" className="mt-3 space-y-2">
              {module.objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[9px] font-bold text-gray-800">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}