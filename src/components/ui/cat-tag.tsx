"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Category = "pre-class" | "post-class"

interface CatTagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category: Category
}

const categoryConfig: Record<Category, { label: string; className: string }> = {
  "pre-class": {
    label: "Pre-class",
    // bg-primary-50 = #eef7ff, text-primary-700 = #1f57b3 — matches design tokens
    className:
      "bg-primary-50 text-primary-700 focus-visible:ring-primary-500 " +
      "dark:bg-primary-500/15 dark:text-primary-300",
  },
  "post-class": {
    label: "Post-class",
    // bg-purple-50 = #fdf7ff, text-purple-700 = #8c42c4 — matches design tokens
    className:
      "bg-purple-50 text-purple-700 focus-visible:ring-purple-500 " +
      "dark:bg-purple-500/15 dark:text-purple-400",
  },
}

function CatTag({ category, className, children, ...props }: CatTagProps) {
  const config = categoryConfig[category]

  return (
    <button
      data-slot="cat-tag"
      data-category={category}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80 outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        config.className,
        className
      )}
      {...props}
    >
      {children ?? config.label}
    </button>
  )
}

export { CatTag, type Category }
