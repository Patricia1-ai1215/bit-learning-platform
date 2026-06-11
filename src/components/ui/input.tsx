import * as React from "react"

import { cn } from "@/lib/utils"

const baseInputClass =
  "w-full py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 transition-colors outline-none " +
  "focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white " +
  "placeholder:text-gray-400 " +
  "disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-100 " +
  "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500 " +
  "dark:focus:bg-gray-800 dark:focus:border-primary-400 dark:focus:ring-primary-400/20"

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode
}

function Input({ className, type, leftIcon, ...props }: InputProps) {
  if (leftIcon) {
    return (
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 [&>svg]:size-4 pointer-events-none">
          {leftIcon}
        </span>
        <input
          type={type}
          data-slot="input"
          className={cn(baseInputClass, "pl-10 pr-4", className)}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(baseInputClass, "px-4", className)}
      {...props}
    />
  )
}

export { Input }
