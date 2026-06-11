"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "size-9 text-xs",
  md: "size-10 text-sm",
  lg: "size-24 text-3xl",
}

interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: "sm" | "md" | "lg"
}

function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative flex shrink-0 rounded-full select-none",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends AvatarPrimitive.Fallback.Props {
  name?: string
}

function AvatarFallback({ className, name, children, ...props }: AvatarFallbackProps) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : null

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full font-bold",
        "bg-primary-100 text-primary-700 border-2 border-white shadow-sm",
        "dark:bg-primary-900/60 dark:text-primary-300 dark:border-gray-800",
        className
      )}
      {...props}
    >
      {initials ?? children}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
