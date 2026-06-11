"use client";

import { mockCourseData } from '@/lib/mock/courseData';
import { Check, ArrowLeft, Circle } from 'lucide-react';

export default function ModuleNav() {
  const course = mockCourseData;
  const allModules = course.lessons.flatMap(l => l.modules);
  const completedCount = allModules.filter(m => m.status === 'done').length;
  const totalCount = allModules.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <nav aria-label="Course Modules" className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-gray-100">
        <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-500 mb-4 transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
          <ArrowLeft size={14} /> All courses
        </button>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{course.code}</div>
        <div className="text-lg font-bold text-gray-900 mt-1 font-heading tracking-wide">{course.title}</div>
        
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Course progress"
            />
          </div>
          <span className="text-xs font-bold text-gray-500">
            <span className="text-gray-900">{completedCount}</span> / {totalCount} modules
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4" role="list">
        {course.lessons.map((lesson, li) => (
          <div key={lesson.id} className="mb-4">
            <div className="px-5 mb-2 flex items-baseline gap-2">
              <span className="text-[10px] font-bold text-gray-900 tracking-wider">Lesson {li + 1}</span>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lesson.title}</span>
            </div>
            {lesson.modules.map((m) => {
              const isActive = m.status === 'current';
              const isDone = m.status === 'done';
              return (
                <div 
                  key={m.id} 
                  role="listitem"
                  aria-current={isActive ? "step" : undefined}
                  className={`flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-all border-l-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${isActive ? 'border-primary-500 bg-primary-50' : 'border-transparent hover:bg-gray-50'} ${isDone ? 'border-transparent' : ''}`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDone ? 'bg-green-100 text-green-700' : ''} ${isActive ? 'bg-primary-100 text-primary-600' : ''} ${!isDone && !isActive ? 'bg-gray-100 text-gray-400' : ''}`}>
                    {isDone ? <Check size={12} strokeWidth={3} /> : isActive ? <div className="w-2 h-2 rounded-full bg-primary-500" /> : <Circle size={10} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isActive ? 'text-primary-700 font-bold' : ''} ${isDone ? 'text-gray-400 line-through' : ''} ${!isDone && !isActive ? 'text-gray-800' : ''}`}>
                      {m.title}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{m.mins} min</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}