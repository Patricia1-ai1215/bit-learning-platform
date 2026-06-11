"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserFooter } from "@/components/shared/UserFooter"
import { LecturerNav } from "@/components/lecturer/LecturerNav"
import { StudentNav } from "@/components/student/StudentNav"
import { AdminNav } from "@/components/admin/AdminNav"
import { useAuth } from "@/hooks/useAuth"

/**
 * Main application sidebar with role-based navigation
 * 
 * Features:
 * - BIT Learning logo at top
 * - Role-specific navigation content
 * - User footer at bottom
 * - Responsive collapse on mobile
 * - Keyboard accessible
 * 
 * Navigation by role:
 * - LECTURER: Stepper + course creation links
 * - STUDENT: Course list with progress
 * - SUPER_ADMIN: User management + analytics
 */
export function AppSidebar() {
  const { user, role, isLoading } = useAuth()

  return (
    <Sidebar>
      {/* Header with Logo and Toggle */}
      <SidebarHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                BIT Learning
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Platform
              </span>
            </div>
          </div>
          {/* Mobile toggle button */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      {/* Role-based Navigation Content */}
      <SidebarContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8" role="status" aria-label="Loading navigation">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <nav aria-label="Main navigation">
            {role === "LECTURER" && <LecturerNav />}
            {role === "STUDENT" && <StudentNav />}
            {role === "SUPER_ADMIN" && <AdminNav />}
          </nav>
        )}
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter>
        {user && <UserFooter user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
