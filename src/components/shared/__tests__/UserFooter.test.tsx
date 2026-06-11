import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserFooter } from '../UserFooter'
import type { User } from '@/types/auth'

describe('UserFooter', () => {
  const mockUser: User = {
    id: 'user-001',
    email: 'john.doe@bit.com',
    name: 'John Doe',
    role: 'STUDENT',
  }

  it('should render user name', () => {
    render(<UserFooter user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should render user role', () => {
    render(<UserFooter user={mockUser} />)
    
    expect(screen.getByText('student')).toBeInTheDocument()
  })

  it('should render user initials', () => {
    render(<UserFooter user={mockUser} />)
    
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should format role with spaces', () => {
    const adminUser: User = {
      ...mockUser,
      role: 'SUPER_ADMIN',
    }
    
    render(<UserFooter user={adminUser} />)
    
    expect(screen.getByText('super admin')).toBeInTheDocument()
  })

  it('should render menu button', () => {
    render(<UserFooter user={mockUser} />)
    
    const menuButton = screen.getByRole('button', { name: /user menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<UserFooter user={mockUser} className="custom-class" />)
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('custom-class')
  })

  it('should render avatar with correct styling', () => {
    render(<UserFooter user={mockUser} />)
    
    const avatar = screen.getByText('JD')
    expect(avatar.className).toContain('bg-primary-500')
    expect(avatar.className).toContain('rounded-full')
  })

  it('should handle single name', () => {
    const singleNameUser: User = {
      ...mockUser,
      name: 'Madonna',
    }
    
    render(<UserFooter user={singleNameUser} />)
    
    expect(screen.getByText('Madonna')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('should handle long names with truncation', () => {
    const longNameUser: User = {
      ...mockUser,
      name: 'Very Long Name That Should Be Truncated',
    }
    
    render(<UserFooter user={longNameUser} />)
    
    const nameElement = screen.getByText('Very Long Name That Should Be Truncated')
    expect(nameElement.className).toContain('truncate')
  })
})
