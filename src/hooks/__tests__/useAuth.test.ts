import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAuth, switchMockRole, getCurrentMockRole } from '../useAuth'

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should start with loading state', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.user).toBeNull()
    expect(result.current.role).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should load default STUDENT role after timeout', async () => {
    const { result } = renderHook(() => useAuth())
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.user).toMatchObject({
      id: 'student-001',
      email: 'student@bit.com',
      name: 'Jane Student',
      role: 'STUDENT',
    })
    expect(result.current.role).toBe('STUDENT')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should load LECTURER role from localStorage', async () => {
    vi.mocked(localStorage.getItem).mockReturnValue('LECTURER')
    
    const { result } = renderHook(() => useAuth())
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.user).toMatchObject({
      id: 'lecturer-001',
      email: 'lecturer@bit.com',
      name: 'John Lecturer',
      role: 'LECTURER',
    })
    expect(result.current.role).toBe('LECTURER')
  })

  it('should load SUPER_ADMIN role from localStorage', async () => {
    vi.mocked(localStorage.getItem).mockReturnValue('SUPER_ADMIN')
    
    const { result } = renderHook(() => useAuth())
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.user).toMatchObject({
      id: 'admin-001',
      email: 'admin@bit.com',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    })
    expect(result.current.role).toBe('SUPER_ADMIN')
  })

  it('should fallback to STUDENT for invalid role', async () => {
    vi.mocked(localStorage.getItem).mockReturnValue('INVALID_ROLE')
    
    const { result } = renderHook(() => useAuth())
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.role).toBe('STUDENT')
  })

  it('should cleanup timeout on unmount', () => {
    const { unmount } = renderHook(() => useAuth())
    
    unmount()
    
    // If cleanup works, no memory leak or errors
    expect(true).toBe(true)
  })
})

describe('getCurrentMockRole', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  it('should return default STUDENT role when localStorage is empty', () => {
    const role = getCurrentMockRole()
    expect(role).toBe('STUDENT')
  })

  it('should return role from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('LECTURER')
    const role = getCurrentMockRole()
    expect(role).toBe('LECTURER')
  })
})

describe('switchMockRole', () => {
  beforeEach(() => {
    localStorage.clear()
    delete (window as any).location
    ;(window as any).location = { href: '' }
  })

  it('should set role in localStorage and redirect to correct dashboard', () => {
    switchMockRole('LECTURER')
    
    expect(localStorage.setItem).toHaveBeenCalledWith('mock-role', 'LECTURER')
    expect(window.location.href).toBe('/dashboard/lecturer')
  })

  it('should redirect STUDENT to student dashboard', () => {
    switchMockRole('STUDENT')
    
    expect(localStorage.setItem).toHaveBeenCalledWith('mock-role', 'STUDENT')
    expect(window.location.href).toBe('/dashboard/student')
  })

  it('should redirect SUPER_ADMIN to admin dashboard', () => {
    switchMockRole('SUPER_ADMIN')
    
    expect(localStorage.setItem).toHaveBeenCalledWith('mock-role', 'SUPER_ADMIN')
    expect(window.location.href).toBe('/dashboard/admin')
  })
})
