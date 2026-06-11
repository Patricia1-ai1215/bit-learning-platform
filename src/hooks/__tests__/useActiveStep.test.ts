import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActiveStep } from '../useActiveStep'
import * as navigation from 'next/navigation'

describe('useActiveStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return step 1 as current when on upload route', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/dashboard/lecturer/upload')
    
    const { result } = renderHook(() => useActiveStep())
    
    expect(result.current.steps).toHaveLength(3)
    expect(result.current.steps[0].state).toBe('current')
    expect(result.current.steps[1].state).toBe('upcoming')
    expect(result.current.steps[2].state).toBe('upcoming')
    expect(result.current.currentStepIndex).toBe(1)
  })

  it('should return step 2 as current and step 1 as completed when on outline route', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/dashboard/lecturer/outline')
    
    const { result } = renderHook(() => useActiveStep())
    
    expect(result.current.steps[0].state).toBe('completed')
    expect(result.current.steps[1].state).toBe('current')
    expect(result.current.steps[2].state).toBe('upcoming')
    expect(result.current.currentStepIndex).toBe(2)
  })

  it('should return step 3 as current and steps 1-2 as completed when on publish route', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/dashboard/lecturer/publish')
    
    const { result } = renderHook(() => useActiveStep())
    
    expect(result.current.steps[0].state).toBe('completed')
    expect(result.current.steps[1].state).toBe('completed')
    expect(result.current.steps[2].state).toBe('current')
    expect(result.current.currentStepIndex).toBe(3)
  })

  it('should default to step 1 when on unknown route', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/dashboard/lecturer')
    
    const { result } = renderHook(() => useActiveStep())
    
    expect(result.current.steps[0].state).toBe('current')
    expect(result.current.currentStepIndex).toBe(1)
  })

  it('should have correct step labels and routes', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/dashboard/lecturer/upload')
    
    const { result } = renderHook(() => useActiveStep())
    
    expect(result.current.steps[0]).toMatchObject({
      id: 1,
      label: 'Upload & Brief',
      route: '/dashboard/lecturer/upload',
    })
    expect(result.current.steps[1]).toMatchObject({
      id: 2,
      label: 'Review Outline',
      route: '/dashboard/lecturer/outline',
    })
    expect(result.current.steps[2]).toMatchObject({
      id: 3,
      label: 'Edit & Publish',
      route: '/dashboard/lecturer/publish',
    })
  })
})
