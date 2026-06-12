"use client";

import { useState } from 'react';
import { QuizStep } from '@/lib/mock/courseData';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizRendererProps {
  step: QuizStep;
  onQuizComplete: () => void; // To unlock the Next button
}

export default function QuizRenderer({ step, onQuizComplete }: QuizRendererProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQuestion = step.questions[currentQuestionIndex];
  const letters = ['A', 'B', 'C', 'D'];

  const handleSelect = (index: number) => {
    if (isSubmitted) return; // Lock if already submitted
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const newAnsweredCount = answeredCount + 1;
    setAnsweredCount(newAnsweredCount);

    // If all questions are answered, tell the StepRunner to unlock the Next button
    if (newAnsweredCount === step.questions.length) {
      onQuizComplete();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < step.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div
      role="region"
      aria-label={`Quiz question ${currentQuestionIndex + 1} of ${step.questions.length}`}
    >
      {/* Question Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-bold text-gray-700">
          Question {currentQuestionIndex + 1} of {step.questions.length}
        </span>
        <div className="flex gap-1">
          {step.questions.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full ${
                i < currentQuestionIndex
                  ? 'w-4 bg-green-500'
                  : i === currentQuestionIndex
                    ? 'w-6 bg-primary-500'
                    : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* The Question */}
      <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
        <span className="text-primary-500 mr-2">Q{currentQuestionIndex + 1}.</span>
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, i) => {
          let optionStyle = 'border-gray-200 bg-white hover:border-gray-400';
          if (isSubmitted) {
            if (i === currentQuestion.correctIndex)
              optionStyle = 'border-green-500 bg-green-50';
            else if (i === selectedOption)
              optionStyle = 'border-red-500 bg-red-50';
          } else if (i === selectedOption) {
            optionStyle =
              'border-primary-500 bg-primary-50 ring-2 ring-primary-100';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isSubmitted}
              className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left transition focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed ${optionStyle}`}
              aria-pressed={i === selectedOption}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isSubmitted && i === currentQuestion.correctIndex
                    ? 'bg-green-500 text-white'
                    : isSubmitted && i === selectedOption
                      ? 'bg-red-500 text-white'
                      : i === selectedOption
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isSubmitted && i === currentQuestion.correctIndex ? (
                  <CheckCircle size={16} />
                ) : isSubmitted && i === selectedOption ? (
                  <XCircle size={16} />
                ) : (
                  letters[i]
                )}
              </span>
              <span className="text-sm font-medium text-gray-800">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Submit / Feedback / Next Question */}
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full py-3 bg-primary-500 text-white font-bold rounded-xl shadow-md hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Submit Answer
        </button>
      ) : (
        <>
          {/* Explanation Box */}
          <div
            className={`p-4 rounded-xl border ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div
              className={`flex items-center gap-2 mb-2 font-bold text-sm ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </div>
            <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
          </div>

          {currentQuestionIndex < step.questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}

