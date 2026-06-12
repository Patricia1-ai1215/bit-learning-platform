"use client";

import { Step } from '@/lib/mock/courseData';
import TextRenderer from './TextRenderer';
import DiagramRenderer from './DiagramRenderer';
import FlashcardRenderer from './FlashcardRenderer';
import QuizRenderer from './QuizRenderer';
import StepNav from './StepNav';

interface StepRunnerProps {
  steps: Step[];
  currentStepIndex: number;
  isQuizLocked: boolean;
  onStepChange: (index: number) => void;
  onQuizUnlock: () => void;
}

export default function StepRunner({
  steps,
  currentStepIndex,
  isQuizLocked,
  onStepChange,
  onQuizUnlock,
}: StepRunnerProps) {
  const currentStep = steps[currentStepIndex];

  const renderStep = () => {
    switch (currentStep.type) {
      case 'TEXT':
        return <TextRenderer step={currentStep} />;
      case 'DIAGRAM':
        return <DiagramRenderer step={currentStep} />;
      case 'FLASHCARD':
        return <FlashcardRenderer step={currentStep} />;
      case 'QUIZ':
        return <QuizRenderer step={currentStep} onQuizComplete={onQuizUnlock} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
        <div className="mb-6 text-[10px] font-bold text-primary-500 uppercase tracking-widest">
          Step {currentStepIndex + 1} · {currentStep.type}
        </div>
        {renderStep()}
      </div>

      <StepNav
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        isQuizLocked={isQuizLocked}
        onPrev={() => onStepChange(currentStepIndex - 1)}
        onNext={() => onStepChange(currentStepIndex + 1)}
      />
    </div>
  );
}

