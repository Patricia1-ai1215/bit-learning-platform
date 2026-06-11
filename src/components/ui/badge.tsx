import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap",
  {
    variants: {
      variant: {
        success:
          "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
        danger:
          "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
        warning:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
        info:
          "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
        purple:
          "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
        gray:
          "bg-gray-100 text-gray-600 dark:bg-gray-700/40 dark:text-gray-300",
        default:
          "bg-gray-100 text-gray-600 dark:bg-gray-700/40 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:size-3">{icon}</span>}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
