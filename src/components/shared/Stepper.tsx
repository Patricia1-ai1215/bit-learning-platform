import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Step } from "@/types/stepper"

interface StepperProps {
  steps: Step[]
  className?: string
}

/**
 * Horizontal stepper component for top navbar
 * 
 * Displays steps in a horizontal layout with connecting lines
 */
export function Stepper({ steps, className }: StepperProps) {
  return (
    <nav className={cn("flex items-center gap-2", className)} aria-label="Course creation progress">
      {steps.map((step, index) => {
        const isCompleted = step.state === "completed"
        const isCurrent = step.state === "current"
        const isUpcoming = step.state === "upcoming"

        return (
          <div key={step.id} className="flex items-center">
            <Link
              href={step.route}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                isCurrent && "bg-primary-600 text-white",
                isCompleted && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
                isUpcoming && "bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-600"
              )}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Step ${step.id}: ${step.label}${isCompleted ? " (completed)" : ""}${isCurrent ? " (current)" : ""}`}
            >
              {/* Step number or checkmark */}
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isCurrent && "bg-white/20",
                  isCompleted && "bg-primary-100 dark:bg-primary-900",
                  isUpcoming && "bg-gray-200 dark:bg-gray-800"
                )}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className={cn(
                    isCurrent && "text-white",
                    isCompleted && "text-primary-600",
                    isUpcoming && "text-gray-400"
                  )}>
                    {step.id}
                  </span>
                )}
              </span>

              {/* Step label */}
              <span className="whitespace-nowrap">{step.label}</span>
            </Link>

            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 mx-1",
                  isCompleted ? "bg-primary-300" : "bg-gray-200 dark:bg-gray-800"
                )}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
