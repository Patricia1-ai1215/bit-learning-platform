import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: string | number
}

/**
 * Reusable navigation item component
 * 
 * Features:
 * - Active state based on current route
 * - Icon support
 * - Optional badge (for notifications, counts, etc.)
 * - Hover effects
 * 
 * Usage:
 * ```tsx
 * <NavItem
 *   href="/dashboard"
 *   icon={<HomeIcon />}
 *   label="Dashboard"
 *   badge={3}
 * />
 * ```
 */
export function NavItem({ href, icon, label, badge }: NavItemProps) {
  const pathname = usePathname()
  
  // Exact match for the href
  const isExactMatch = pathname === href
  
  // Check if this is a parent route (but exclude more specific routes)
  const isParentRoute = pathname.startsWith(href + "/") && !isExactMatch
  
  // Only consider active if exact match OR if it's a direct child (not a specific workflow route)
  // Special handling: /dashboard/lecturer should NOT be active when on /dashboard/lecturer/upload, /outline, /publish
  const isWorkflowRoute = pathname.match(/\/(upload|outline|publish)$/)
  const isActive = isExactMatch || (isParentRoute && !isWorkflowRoute)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      )}
    >
      <span className="shrink-0 w-5 h-5">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full",
            isActive
              ? "bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}
