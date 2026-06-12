"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavProps {
  currentStep: number;
  totalSteps: number;
  isQuizLocked: boolean; // True if on Quiz step and not all questions answered
  onPrev: () => void;
  onNext: () => void;
}

export default function StepNav({ currentStep, totalSteps, isQuizLocked, onPrev, onNext }: StepNavProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center gap-4 z-10">
      <button 
        onClick={onPrev} 
        disabled={isFirstStep}
        className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Previous step"
      >
        <ChevronLeft size={16} /> Previous
      </button>

      <div className="flex-1 flex items-center justify-center gap-3 text-xs font-bold text-gray-500">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span 
              key={i} 
              className={`h-1 rounded-full transition-all ${i < currentStep ? 'w-4 bg-gray-900' : ''} ${i === currentStep ? 'w-6 bg-primary-500' : ''} ${i > currentStep ? 'w-4 bg-gray-200' : ''}`}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={onNext} 
        disabled={isQuizLocked}
        className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-primary-500 text-white shadow-md shadow-primary-500/20 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={isLastStep ? "Finish module" : "Next step"}
      >
        {isLastStep ? 'Finish' : 'Next'} <ChevronRight size={16} />
      </button>
    </div>
  );
}

