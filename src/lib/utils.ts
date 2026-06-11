import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get user initials from full name
 * 
 * Examples:
 * - "John Doe" → "JD"
 * - "Jane Smith Johnson" → "JS"
 * - "Alice" → "A"
 * 
 * @param name - Full name
 * @returns Uppercase initials (max 2 characters)
 */
export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) {
    return "?"
  }

  const parts = name.trim().split(/\s+/)
  
  if (parts.length === 1) {
    // Single name: take first character
    return parts[0][0].toUpperCase()
  }
  
  // Multiple names: take first character of first and last name
  const firstInitial = parts[0][0]
  const lastInitial = parts[parts.length - 1][0]
  
  return (firstInitial + lastInitial).toUpperCase()
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
