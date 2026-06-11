import * as React from "react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
}

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("inline-block", className)}
      {...props}
    >
      <span
        className={cn(
          "block rounded-full border-primary-500 border-t-transparent animate-spin",
          "dark:border-primary-400 dark:border-t-transparent",
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Loading…</span>
    </span>
  )
}

export { Spinner }
