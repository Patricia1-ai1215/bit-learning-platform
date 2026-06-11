"use client";

import { useState } from 'react';
import { Module } from '@/lib/mock/courseData';
import { ChevronRight } from 'lucide-react';

interface ModuleHeaderProps {
  module: Module;
  isFirstInLesson: boolean;
  currentStep: number;
  totalSteps: number;
}

export default function ModuleHeader({ module, isFirstInLesson, currentStep, totalSteps }: ModuleHeaderProps) {
  const [objOpen, setObjOpen] = useState(isFirstInLesson);
  const progressPct = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <header className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-3xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${module.category === 'Pre-class' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
            {module.category}
          </span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{module.mins} min</span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{totalSteps} steps</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-wide mb-4">{module.title}</h1>
        
        <div className="flex items-center gap-4 mb-5">
          <span className="text-xs font-bold text-gray-900">Step {currentStep} <span className="text-gray-500 font-medium">of {totalSteps}</span></span>
          
          <div 
            className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Module progress"
          >
            <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>

          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i < currentStep ? 'w-4 bg-gray-900' : ''} ${i === currentStep ? 'w-6 bg-primary-500' : ''} ${i > currentStep ? 'w-4 bg-gray-200' : ''}`} />
            ))}
          </div>
        </div>

        <div>
          <button 
            className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            onClick={() => setObjOpen(!objOpen)}
            aria-expanded={objOpen}
            aria-controls="learning-objectives-list"
          >
            <ChevronRight size={12} className={`transition-transform ${objOpen ? 'rotate-90' : ''}`} /> Learning objectives
          </button>
          
          {objOpen && (
            <ul id="learning-objectives-list" className="mt-3 space-y-2">
              {module.objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[9px] font-bold text-gray-800">{i + 1}</span>
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