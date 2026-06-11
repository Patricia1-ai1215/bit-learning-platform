import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-bold whitespace-nowrap transition-all outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white rounded-md hover:bg-primary-600 shadow-lg shadow-primary-600/20 focus-visible:ring-2 focus-visible:ring-primary-500/50 dark:bg-primary-500 dark:hover:bg-primary-400",
        secondary:
          "bg-white text-primary-500 border border-gray-200 rounded-md hover:bg-gray-50 shadow-md focus-visible:ring-2 focus-visible:ring-primary-500/30 dark:bg-gray-800 dark:text-primary-400 dark:border-gray-700 dark:hover:bg-gray-700",
        danger:
          "bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/20",
        save:
          "bg-green-500 text-white rounded-md hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-500/50 dark:bg-green-600 dark:hover:bg-green-500",
        ghost:
          "text-gray-600 bg-transparent rounded-md hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-500/20 dark:text-gray-400 dark:hover:bg-gray-800",
        outline:
          "bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-gray-500/20 dark:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
        default:
          "bg-primary-500 text-white rounded-md hover:bg-primary-600 shadow-lg shadow-primary-600/20 focus-visible:ring-2 focus-visible:ring-primary-500/50",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        xs: "h-7 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
