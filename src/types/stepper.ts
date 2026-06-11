/**
 * Stepper types for lecturer workflow
 */

export type StepState = "completed" | "current" | "upcoming"

export interface Step {
  id: number
  label: string
  route: string
  state: StepState
}

export interface StepperConfig {
  steps: Array<{
    id: number
    label: string
    route: string
  }>
}
