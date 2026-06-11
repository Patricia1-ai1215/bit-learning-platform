/**
 * Authentication types for BIT Learning Platform
 */

export type Role = "STUDENT" | "LECTURER" | "SUPER_ADMIN"

export interface User {
  id: string
  email: string
  name: string
  role: Role
  image?: string
  lifecycleId?: string
  studentId?: string
}

export interface AuthSession {
  user: User
  expires: string
}

export interface AuthState {
  user: User | null
  role: Role | null
  isLoading: boolean
  isAuthenticated: boolean
}
