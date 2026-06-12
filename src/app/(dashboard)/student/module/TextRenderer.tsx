"use client";

import { TextStep } from '@/lib/mock/courseData';
import { Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TextRendererProps {
  step: TextStep;
}

export default function TextRenderer({ step }: TextRendererProps) {
  return (
    <article className="prose max-w-none text-gray-700">
      {/* Main Content */}
      <div className="prose max-w-none text-gray-700">
        <ReactMarkdown>{step.content}</ReactMarkdown>
      </div>


      {/* Pull Quote (Highlight Box) */}
      {step.pullQuote && (
        <div
          className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl my-8 shadow-sm"
          role="note"
        >
          <div className="flex items-start gap-3">
            <Quote
              size={24}
              className="text-primary-500 flex-shrink-0 mt-1"
              aria-hidden="true"
            />
            <p className="text-lg font-medium text-gray-900 italic m-0">
              {step.pullQuote}
            </p>
          </div>
        </div>
      )}

      {/* Key Terms */}
      {step.keyTerms && step.keyTerms.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Key Terms
          </h3>
          <div className="flex flex-wrap gap-2">
            {step.keyTerms.map((term, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

