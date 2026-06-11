"use client"

import { useState, useEffect } from "react"
import type { User, Role, AuthState } from "@/types/auth"

/**
 * Mock authentication hook for development
 * 
 * TODO: Replace with Better Auth integration when backend is ready
 * 
 * Usage:
 * ```tsx
 * const { user, role, isLoading, isAuthenticated } = useAuth()
 * ```
 * 
 * To switch roles during development, use localStorage:
 * ```js
 * localStorage.setItem('mock-role', 'LECTURER')
 * ```
 */

// Mock users for each role
const MOCK_USERS: Record<Role, User> = {
  STUDENT: {
    id: "student-001",
    email: "student@bit.com",
    name: "Jane Student",
    role: "STUDENT",
    studentId: "STU2024001",
    lifecycleId: "lc_student_001",
  },
  LECTURER: {
    id: "lecturer-001",
    email: "lecturer@bit.com",
    name: "John Lecturer",
    role: "LECTURER",
    lifecycleId: "lc_lecturer_001",
  },
  SUPER_ADMIN: {
    id: "admin-001",
    email: "admin@bit.com",
    name: "Super Admin",
    role: "SUPER_ADMIN",
  },
}

// Default role for development
const DEFAULT_ROLE: Role = "STUDENT"

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Simulate auth check delay
    const timer = setTimeout(() => {
      // Check localStorage for mock role (for testing)
      const mockRole = (localStorage.getItem("mock-role") as Role) || DEFAULT_ROLE
      
      // Validate role
      const role = ["STUDENT", "LECTURER", "SUPER_ADMIN"].includes(mockRole)
        ? mockRole
        : DEFAULT_ROLE

      const user = MOCK_USERS[role]

      setAuthState({
        user,
        role,
        isLoading: false,
        isAuthenticated: true,
      })
    }, 300) // Simulate network delay

    // Cleanup function to prevent memory leaks
    return () => clearTimeout(timer)
  }, [])

  return authState
}

/**
 * Helper function to switch mock user role (dev only)
 * 
 * Usage:
 * ```tsx
 * import { switchMockRole } from '@/hooks/useAuth'
 * 
 * <button onClick={() => switchMockRole('LECTURER')}>
 *   Switch to Lecturer
 * </button>
 * ```
 */
export function switchMockRole(role: Role) {
  if (process.env.NODE_ENV === "production") {
    console.warn("switchMockRole should not be used in production")
    return
  }

  localStorage.setItem("mock-role", role)
  
  // Redirect to the appropriate dashboard based on role
  const dashboardRoutes: Record<Role, string> = {
    STUDENT: "/dashboard/student",
    LECTURER: "/dashboard/lecturer",
    SUPER_ADMIN: "/dashboard/admin",
  }
  
  window.location.href = dashboardRoutes[role]
}

/**
 * Get current mock role from localStorage
 */
export function getCurrentMockRole(): Role {
  if (typeof window === "undefined") return DEFAULT_ROLE
  return (localStorage.getItem("mock-role") as Role) || DEFAULT_ROLE
}
