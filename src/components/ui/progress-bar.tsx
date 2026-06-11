import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  height?: "sm" | "md" | "lg"
  showLabel?: boolean
  label?: string
}

const heightClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

function ProgressBar({
  value,
  max = 100,
  height = "md",
  showLabel = false,
  label,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div data-slot="progress-bar" className={cn("w-full space-y-1", className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>}
          {showLabel && (
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700/50",
          heightClasses[height]
        )}
      >
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-in-out dark:bg-primary-400"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export { ProgressBar }
