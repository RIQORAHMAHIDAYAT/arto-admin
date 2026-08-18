import type { UserRole } from '@/types'

export function roleLabel(role: UserRole): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Super Admin'
    case 'ADMIN':
      return 'Admin'
    default:
      return 'User'
  }
}

export function roleTone(role: UserRole): 'danger' | 'warning' | 'info' | 'neutral' {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'warning'
    case 'ADMIN':
      return 'info'
    default:
      return 'neutral'
  }
}