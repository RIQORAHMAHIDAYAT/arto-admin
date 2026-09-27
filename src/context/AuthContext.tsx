import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Credentials, Session } from '@/types'
import * as authApi from '@/data/api/authApi'
import { AuthContext } from '@/context/auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    let cancelled = false
    authApi
      .getSession()
      .then((value) => {
        if (!cancelled) setSession(value)
      })
      .finally(() => {
        if (!cancelled) setInitializing(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (credentials: Credentials) => {
    const result = await authApi.login(credentials)
    setSession(result)
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ user: session?.user ?? null, initializing, login, logout }),
    [session, initializing, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}