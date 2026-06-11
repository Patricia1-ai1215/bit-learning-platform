"use client"

import { useEffect, useState } from "react"
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"

function Toaster() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const update = () => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      )
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <SonnerToaster
      theme={theme}
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !font-body !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] !max-w-[380px]",
          title: "!font-bold !text-sm",
          description: "!text-xs !opacity-80",
          success:
            "!bg-green-50 !border-green-200 !text-green-900 " +
            "dark:!bg-green-950/60 dark:!border-green-800/50 dark:!text-green-100",
          error:
            "!bg-red-50 !border-red-200 !text-red-900 " +
            "dark:!bg-red-950/60 dark:!border-red-800/50 dark:!text-red-100",
          warning:
            "!bg-amber-50 !border-amber-200 !text-amber-900 " +
            "dark:!bg-amber-950/60 dark:!border-amber-800/50 dark:!text-amber-100",
          info:
            "!bg-blue-50 !border-blue-200 !text-blue-900 " +
            "dark:!bg-blue-950/60 dark:!border-blue-800/50 dark:!text-blue-100",
        },
      }}
    />
  )
}

const toast = {
  success: (message: string, description?: string) =>
    sonnerToast.success(message, { description }),
  error: (message: string, description?: string) =>
    sonnerToast.error(message, { description }),
  warning: (message: string, description?: string) =>
    sonnerToast.warning(message, { description }),
  info: (message: string, description?: string) =>
    sonnerToast.info(message, { description }),
}

export { Toaster, toast }
