"use client";

import { useRouter } from 'next/navigation';
import { Home, BookOpen, Calendar, BarChart3, Settings } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  return (
    // STRICTEMENT 72px comme l'Epic
    <aside aria-label="App Navigation" className="w-[72px] bg-gray-900 text-gray-400 flex flex-col items-center py-4 h-screen flex-shrink-0 overflow-hidden">

      <div
        className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-6 shadow-lg shadow-primary-500/20"
        aria-hidden="true"
      >
        B
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-800 transition text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Home"
          onClick={() => router.push('/dashboard/student')}
        >
          <Home size={20} />
        </button>

        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-500 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Courses (Active)"
          aria-current="page"
        >
          <BookOpen size={20} />
        </button>

        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-800 transition text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Calendar"
        >
          <Calendar size={20} />
        </button>

        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-800 transition text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Analytics"
        >
          <BarChart3 size={20} />
        </button>
      </nav>

      <div className="flex flex-col gap-3 items-center mt-auto">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-800 transition text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>

        <div
          className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-xs flex items-center justify-center"
          aria-label="User profile: E M"
        >
          EM
        </div>
      </div>
    </aside>
  );
}

