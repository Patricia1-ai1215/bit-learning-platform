"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Dashboard root - redirects to role-specific dashboard
 */
export default function DashboardPage() {
  const { role, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && role) {
      switch (role) {
        case "LECTURER":
          router.push("/dashboard/lecturer")
          break
        case "STUDENT":
          router.push("/dashboard/student")
          break
        case "SUPER_ADMIN":
          router.push("/dashboard/admin")
          break
      }
    }
  }, [role, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    )
  }

  return null
}
