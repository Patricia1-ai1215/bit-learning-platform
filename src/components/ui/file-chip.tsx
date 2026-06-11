import * as React from "react"
import { FileText, Presentation } from "lucide-react"

import { cn } from "@/lib/utils"

type FileType = "pdf" | "pptx"

interface FileChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: FileType
  filename: string
  size?: string
}

const fileConfig: Record<FileType, { icon: React.ElementType; className: string }> = {
  pdf: {
    icon: FileText,
    className:
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  },
  pptx: {
    icon: Presentation,
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
}

function FileChip({ type, filename, size, className, ...props }: FileChipProps) {
  const config = fileConfig[type]
  const Icon = config.icon

  return (
    <span
      data-slot="file-chip"
      data-type={type}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold",
        config.className,
        className
      )}
      {...props}
    >
      <Icon className="size-3 shrink-0" />
      <span className="max-w-[140px] truncate">{filename}</span>
      {size && <span className="shrink-0 opacity-60">· {size}</span>}
    </span>
  )
}

export { FileChip, type FileType }
