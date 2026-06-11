import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AppSidebar } from '../AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import * as useAuthModule from '@/hooks/useAuth'

// Mock the navigation components
vi.mock('@/components/lecturer/LecturerNav', () => ({
  LecturerNav: () => <div data-testid="lecturer-nav">Lecturer Navigation</div>,
}))

vi.mock('@/components/student/StudentNav', () => ({
  StudentNav: () => <div data-testid="student-nav">Student Navigation</div>,
}))

vi.mock('@/components/admin/AdminNav', () => ({
  AdminNav: () => <div data-testid="admin-nav">Admin Navigation</div>,
}))

// Helper to render with SidebarProvider
const renderWithProvider = (component: React.ReactElement) => {
  return render(<SidebarProvider>{component}</SidebarProvider>)
}

describe('AppSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render BIT Learning logo', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'student-001',
        email: 'student@bit.com',
        name: 'Jane Student',
        role: 'STUDENT',
      },
      role: 'STUDENT',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      expect(screen.getByText('BIT Learning')).toBeInTheDocument()
      expect(screen.getByText('Platform')).toBeInTheDocument()
    })
  })

  it('should show loading spinner when auth is loading', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      role: null,
      isLoading: true,
      isAuthenticated: false,
    })

    renderWithProvider(<AppSidebar />)

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render LecturerNav for LECTURER role', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'lecturer-001',
        email: 'lecturer@bit.com',
        name: 'John Lecturer',
        role: 'LECTURER',
      },
      role: 'LECTURER',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      expect(screen.getByTestId('lecturer-nav')).toBeInTheDocument()
      expect(screen.queryByTestId('student-nav')).not.toBeInTheDocument()
      expect(screen.queryByTestId('admin-nav')).not.toBeInTheDocument()
    })
  })

  it('should render StudentNav for STUDENT role', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'student-001',
        email: 'student@bit.com',
        name: 'Jane Student',
        role: 'STUDENT',
      },
      role: 'STUDENT',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      expect(screen.getByTestId('student-nav')).toBeInTheDocument()
      expect(screen.queryByTestId('lecturer-nav')).not.toBeInTheDocument()
      expect(screen.queryByTestId('admin-nav')).not.toBeInTheDocument()
    })
  })

  it('should render AdminNav for SUPER_ADMIN role', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'admin-001',
        email: 'admin@bit.com',
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
      role: 'SUPER_ADMIN',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      expect(screen.getByTestId('admin-nav')).toBeInTheDocument()
      expect(screen.queryByTestId('lecturer-nav')).not.toBeInTheDocument()
      expect(screen.queryByTestId('student-nav')).not.toBeInTheDocument()
    })
  })

  it('should render UserFooter when user is loaded', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'student-001',
        email: 'student@bit.com',
        name: 'Jane Student',
        role: 'STUDENT',
      },
      role: 'STUDENT',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      expect(screen.getByText('Jane Student')).toBeInTheDocument()
    })
  })

  it('should not render UserFooter when user is null', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
    })

    renderWithProvider(<AppSidebar />)

    expect(screen.queryByText('Jane Student')).not.toBeInTheDocument()
  })

  it('should have proper navigation landmark', async () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: {
        id: 'student-001',
        email: 'student@bit.com',
        name: 'Jane Student',
        role: 'STUDENT',
      },
      role: 'STUDENT',
      isLoading: false,
      isAuthenticated: true,
    })

    renderWithProvider(<AppSidebar />)

    await waitFor(() => {
      const nav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(nav).toBeInTheDocument()
    })
  })
})
