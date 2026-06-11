"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/AppSidebar"
import { RoleSwitcher } from "@/components/shared/RoleSwitcher"
import { LecturerTopNav } from "@/components/shared/LecturerTopNav"
import { TopNav } from "@/components/shared/TopNav"
import { useAuth } from "@/hooks/useAuth"

/**
 * Dashboard layout with persistent sidebar
 * 
 * This layout wraps all dashboard routes and provides:
 * - Persistent sidebar navigation
 * - Top navigation bar (role-specific)
 * - Role-based content
 * - Responsive behavior
 * 
 * Routes using this layout:
 * - /dashboard/student/*
 * - /dashboard/lecturer/*
 * - /dashboard/admin/*
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role } = useAuth()

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative flex h-screen w-full">
        {/* Persistent Sidebar */}
        <AppSidebar />

        {/* Main Content Area - with left padding for sidebar */}
        <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-64">
          {/* Top Navigation - Role-specific */}
          {role === "LECTURER" && <LecturerTopNav />}
          {(role === "STUDENT" || role === "SUPER_ADMIN") && <TopNav />}
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto p-6 md:p-8">
              {children}
            </div>
          </main>
        </div>

        {/* Dev-only Role Switcher */}
        <RoleSwitcher />
      </div>
    </SidebarProvider>
  )
}
