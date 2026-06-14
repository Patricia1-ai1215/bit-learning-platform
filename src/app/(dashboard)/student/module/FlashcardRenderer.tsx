"use client";

import { useState } from 'react';
import { FlashcardStep } from '@/lib/mock/courseData';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FlashcardRendererProps {
  step: FlashcardStep;
  seenFlashcards: Set<number>;
  setSeenFlashcards: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export default function FlashcardRenderer({
  step,
  seenFlashcards,
  setSeenFlashcards,
}: FlashcardRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = step.cards[currentIndex];

  const markSeen = (index: number) => {
    setSeenFlashcards((prev) => new Set(prev).add(index));
  };

  const handleNextCard = () => {
    if (currentIndex < step.cards.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
      markSeen(nextIndex);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setIsFlipped(false);
      markSeen(prevIndex);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Keyboard Navigation for QA
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault(); // Prevent page scroll
      handleFlip();
    } else if (e.key === 'ArrowRight') {
      handleNextCard();
    } else if (e.key === 'ArrowLeft') {
      handlePrevCard();
    }
  };

  return (
    <div
      className="flex flex-col items-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Flashcards"
    >
      {/* The Flip Card */}
      <div
        className="w-full max-w-xl h-72 cursor-pointer perspective-[1000px]"
        onClick={handleFlip}
        role="button"
        aria-label={`Flashcard ${currentIndex + 1} of ${step.cards.length}. Press Space to flip, arrow keys to navigate.`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face */}
          <div className="absolute inset-0 bg-white rounded-2xl border border-gray-100 shadow-lg p-8 flex flex-col justify-center backface-hidden">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Question · Card {currentIndex + 1}
            </span>
            <h3 className="text-xl font-bold text-gray-900 text-center leading-snug">
              {currentCard.front}
            </h3>
            <div className="mt-auto flex items-center justify-center gap-2 text-xs text-gray-400 self-center">
              <RotateCcw size={12} /> Click to flip
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col justify-center backface-hidden rotate-y-180">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
              Answer
            </span>
            <p className="text-lg text-white text-center leading-relaxed">{currentCard.back}</p>
            <div className="mt-auto flex items-center justify-center gap-2 text-xs text-gray-500 self-center">
              <RotateCcw size={12} /> Click to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Card Navigation Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrevCard}
          disabled={currentIndex === 0}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Previous card"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm font-bold text-gray-700">
          <span className="text-primary-500">{currentIndex + 1}</span> / {step.cards.length}
        </span>

        <button
          onClick={handleNextCard}
          disabled={currentIndex === step.cards.length - 1}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Seen Pips */}
      <div className="flex gap-2 mt-4" aria-hidden="true">
        {step.cards.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              seenFlashcards.has(i)
                ? i === currentIndex
                  ? 'w-6 bg-primary-500'
                  : 'w-1.5 bg-green-500'
                : 'w-1.5 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

