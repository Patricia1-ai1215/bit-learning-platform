"use client"

import { usePathname } from "next/navigation"
import type { Step, StepState } from "@/types/stepper"

/**
 * Lecturer workflow steps configuration
 */
const LECTURER_STEPS = [
  {
    id: 1,
    label: "Upload & Brief",
    route: "/dashboard/lecturer/upload",
  },
  {
    id: 2,
    label: "Review Outline",
    route: "/dashboard/lecturer/outline",
  },
  {
    id: 3,
    label: "Edit & Publish",
    route: "/dashboard/lecturer/publish",
  },
] as const

/**
 * Hook to determine active step based on current route
 * 
 * Usage:
 * ```tsx
 * const { steps, currentStep } = useActiveStep()
 * ```
 * 
 * Returns steps with computed states:
 * - completed: step before current
 * - current: active step
 * - upcoming: steps after current
 */
export function useActiveStep() {
  const pathname = usePathname()

  // Find current step index based on route
  const currentStepIndex = LECTURER_STEPS.findIndex((step) =>
    pathname.startsWith(step.route)
  )

  // If no match, default to first step
  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0

  // Map steps with computed states
  const steps: Step[] = LECTURER_STEPS.map((step, index) => {
    let state: StepState = "upcoming"

    if (index < activeIndex) {
      state = "completed"
    } else if (index === activeIndex) {
      state = "current"
    }

    return {
      ...step,
      state,
    }
  })

  return {
    steps,
    currentStep: steps[activeIndex],
    currentStepIndex: activeIndex + 1, // 1-indexed for display
    totalSteps: LECTURER_STEPS.length,
  }
}
