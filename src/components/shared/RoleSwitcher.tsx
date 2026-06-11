"use client"

import { useState, useEffect } from "react"
import { switchMockRole, getCurrentMockRole } from "@/hooks/useAuth"
import { Button } from "@/components/ui"
import type { Role } from "@/types/auth"

/**
 * Development-only component to switch between user roles
 * 
 * This component should NOT be included in production builds
 */
export function RoleSwitcher() {
  const [currentRole, setCurrentRole] = useState<Role | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentRole(getCurrentMockRole())
  }, [])

  if (process.env.NODE_ENV === "production" || !mounted) {
    return null
  }

  const roles: Array<{ role: Role; label: string }> = [
    { role: "STUDENT", label: "Student" },
    { role: "LECTURER", label: "Lecturer" },
    { role: "SUPER_ADMIN", label: "Admin" },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Dev: Switch Role
      </p>
      <div className="flex gap-2">
        {roles.map(({ role, label }) => (
          <Button
            key={role}
            size="sm"
            variant={currentRole === role ? "primary" : "outline"}
            onClick={() => switchMockRole(role)}
          >
            {label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Current: <span className="font-semibold">{currentRole}</span>
      </p>
    </div>
  )
}
