import { createContext, useContext } from 'react'
import type { Credentials, User } from '@/types'

export interface AuthContextValue {
  user: User | null
  initializing: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
}