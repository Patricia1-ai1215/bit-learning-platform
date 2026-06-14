"use client";

import * as React from 'react';

export interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden" aria-label="Progress">
      <div
        className="h-full bg-primary-500 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

