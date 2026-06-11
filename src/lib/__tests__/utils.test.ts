import { describe, it, expect } from 'vitest'
import { cn, getInitials, formatFileSize, truncate, debounce } from '../utils'

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', false && 'hidden', true && 'visible')
    expect(result).toContain('base-class')
    expect(result).toContain('visible')
    expect(result).not.toContain('hidden')
  })

  it('should handle undefined and null', () => {
    const result = cn('base', undefined, null, 'end')
    expect(result).toContain('base')
    expect(result).toContain('end')
  })
})

describe('getInitials', () => {
  it('should return initials for full name', () => {
    expect(getInitials('John Doe')).toBe('JD')
  })

  it('should return first letter for single name', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('should return initials for three names', () => {
    expect(getInitials('John Michael Doe')).toBe('JD')
  })

  it('should handle lowercase names', () => {
    expect(getInitials('john doe')).toBe('JD')
  })

  it('should handle extra spaces', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD')
  })

  it('should return first letter for single name with trailing space', () => {
    expect(getInitials('John ')).toBe('J')
  })

  it('should return ? for empty string', () => {
    expect(getInitials('')).toBe('?')
  })

  it('should handle special characters', () => {
    expect(getInitials('Jean-Pierre Dubois')).toBe('JD')
  })
})

describe('formatFileSize', () => {
  it('should format bytes', () => {
    expect(formatFileSize(500)).toBe('500 B')
  })

  it('should format kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1536)).toBe('1.5 KB')
  })

  it('should format megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1 MB')
    expect(formatFileSize(5242880)).toBe('5 MB')
  })

  it('should format gigabytes', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB')
  })

  it('should handle zero', () => {
    expect(formatFileSize(0)).toBe('0 B')
  })
})

describe('truncate', () => {
  it('should truncate long text', () => {
    const text = 'This is a very long text that needs to be truncated'
    expect(truncate(text, 20)).toBe('This is a very long ...')
  })

  it('should not truncate short text', () => {
    const text = 'Short text'
    expect(truncate(text, 20)).toBe('Short text')
  })

  it('should handle exact length', () => {
    const text = 'Exactly twenty chars'
    expect(truncate(text, 20)).toBe('Exactly twenty chars')
  })

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('')
  })
})

describe('debounce', () => {
  it('should debounce function calls', async () => {
    let callCount = 0
    const fn = () => callCount++
    const debouncedFn = debounce(fn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(callCount).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(callCount).toBe(1)
  })

  it('should pass arguments to debounced function', async () => {
    let result = ''
    const fn = (text: string) => {
      result = text
    }
    const debouncedFn = debounce(fn, 100)

    debouncedFn('hello')

    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(result).toBe('hello')
  })

  it('should only call function once after multiple rapid calls', async () => {
    let callCount = 0
    const fn = () => callCount++
    const debouncedFn = debounce(fn, 50)

    for (let i = 0; i < 10; i++) {
      debouncedFn()
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(callCount).toBe(1)
  })
})
