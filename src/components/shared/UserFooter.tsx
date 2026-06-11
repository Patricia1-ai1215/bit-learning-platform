import { getInitials } from "@/lib/utils"
import type { User } from "@/types/auth"

interface UserFooterProps {
  user: User
  className?: string
}

/**
 * User footer component for sidebar
 * 
 * Displays:
 * - Avatar with user initials
 * - User name
 * - User role
 * 
 * Usage:
 * ```tsx
 * const { user } = useAuth()
 * <UserFooter user={user} />
 * ```
 */
export function UserFooter({ user, className }: UserFooterProps) {
  const initials = getInitials(user.name)

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {/* Avatar with initials */}
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm">
          {initials}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate dark:text-gray-400 capitalize">
            {user.role.toLowerCase().replace("_", " ")}
          </p>
        </div>

        {/* Optional: Dropdown menu trigger */}
        <button
          type="button"
          className="shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
          aria-label="User menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
