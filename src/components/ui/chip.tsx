"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  onRemove?: () => void
  label: string
}

function Chip({ active = false, onRemove, label, className, ...props }: ChipProps) {
  return (
    <button
      data-slot="chip"
      data-active={active}
      className={cn(
        "group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all outline-none",
        active
          ? "bg-primary-100 text-primary-700 border border-primary-200 dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/30"
          : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation()
              onRemove()
            }
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="size-3" />
        </span>
      )}
    </button>
  )
}

export { Chip }
