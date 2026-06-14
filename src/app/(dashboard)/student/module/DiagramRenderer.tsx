"use client";

import { DiagramStep } from '@/lib/mock/courseData';

interface DiagramRendererProps {
  step: DiagramStep;
}

export default function DiagramRenderer({ step }: DiagramRendererProps) {
  return (
    <figure className="flex flex-col items-center my-4">
      {/* SVG Container */}
      <div
        className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm w-full max-w-2xl flex items-center justify-center"
        role="img"
        aria-label={step.ariaLabel}
        dangerouslySetInnerHTML={{ __html: step.svgContent }}
      />

      {/* Caption */}
      <figcaption className="mt-4 text-sm text-gray-500 text-center italic">
        {step.caption}
      </figcaption>
    </figure>
  );
}

