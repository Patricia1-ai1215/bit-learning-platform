"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  maxCount?: number
}

function Textarea({ className, maxCount, onChange, value, defaultValue, ...props }: TextareaProps) {
  const [count, setCount] = React.useState<number>(() => {
    if (typeof value === "string") return value.length
    if (typeof defaultValue === "string") return defaultValue.length
    return 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length)
    onChange?.(e)
  }

  const autoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div className="w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 transition-colors outline-none resize-y min-h-[80px]",
          "focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white",
          "placeholder:text-gray-400",
          "disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-100",
          "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500",
          "dark:focus:bg-gray-800 dark:focus:border-primary-400 dark:focus:ring-primary-400/20",
          className
        )}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onInput={autoResize}
        {...props}
      />
      {maxCount !== undefined && (
        <p className="mt-1 text-right text-[10px] text-gray-400 dark:text-gray-500">
          <span className={count > maxCount ? "text-red-500 dark:text-red-400" : ""}>{count}</span>
          {" / "}
          {maxCount}
        </p>
      )}
    </div>
  )
}

export { Textarea }
