"use client";

import { Course, Module } from '@/lib/mock/courseData';
import { Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { CatTag, type Category } from '@/components/ui/cat-tag';

interface CompletionScreenProps {
  course: Course;
  currentModule: Module;
  quizScore: string;
  flashcardsSeen: number;
  timeSpent: string;
  onBackToCourse: () => void;
  onStartNextModule: (moduleId: string) => void;
}

export default function CompletionScreen({
  course,
  currentModule,
  quizScore,
  flashcardsSeen,
  timeSpent,
  onBackToCourse,
  onStartNextModule,
}: CompletionScreenProps) {
  const allModules = course.lessons.flatMap((l) => l.modules);
  const currentModuleIndex = allModules.findIndex((m) => m.id === currentModule.id);
  const nextModule =
    currentModuleIndex < allModules.length - 1
      ? allModules[currentModuleIndex + 1]
      : null;

  return (
    <div className="flex flex-col items-center text-center py-16 px-8 max-w-2xl mx-auto">
      <div
        className="w-20 h-20 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 mb-8"
        aria-hidden="true"
      >
        <Trophy size={40} />
      </div>

      <h2 className="text-4xl font-heading font-bold text-gray-900 tracking-wide mb-2">
        Module Complete!
      </h2>
      <p className="text-gray-500 mb-10">
        Nice work — you’ve finished <strong>{currentModule.title}</strong>.
      </p>

      <div className="grid grid-cols-3 gap-4 w-full mb-12 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-r border-gray-100">
          <b className="block text-2xl font-heading text-gray-900 tracking-wide">{quizScore}</b>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
            Quiz Score
          </span>
        </div>
        <div className="p-6 border-r border-gray-100">
          <b className="block text-2xl font-heading text-gray-900 tracking-wide">{flashcardsSeen} seen</b>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
            Flashcards
          </span>
        </div>
        <div className="p-6">
          <b className="block text-2xl font-heading text-gray-900 tracking-wide">{timeSpent}</b>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
            Time Spent
          </span>
        </div>
      </div>

      {nextModule ? (
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Up next</span>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} />
              </div>
              <div className="text-left">
                <CatTag category={nextModule.category.toLowerCase() as Category} />
                <h4 className="text-sm font-bold text-gray-900 mt-1">{nextModule.title}</h4>
              </div>
            </div>
            <button
              onClick={() => onStartNextModule(nextModule.id)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-bold text-sm rounded-xl shadow-md hover:bg-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Start <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-6 mb-6 text-green-800 font-bold">
          Course complete 🎉
        </div>
      )}

      <button
        onClick={onBackToCourse}
        className="text-sm font-bold text-gray-500 hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
      >
        ← Back to course
      </button>
    </div>
  );
}

