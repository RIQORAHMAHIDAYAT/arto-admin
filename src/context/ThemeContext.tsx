import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ThemePreference } from '@/types'
import { ThemeContext } from '@/context/theme-context'

const STORAGE_KEY = 'arto.theme'

function readPreference(): ThemePreference {
  if (typeof localStorage === 'undefined') return 'system'
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system'
}

function systemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(readPreference)
  const media = useRef<MediaQueryList | null>(null)

  if (typeof window !== 'undefined' && !media.current) {
    media.current = window.matchMedia('(prefers-color-scheme: dark)')
  }

  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? (systemDark() ? 'dark' : 'light') : theme

  useEffect(() => {
    const root = document.documentElement
    if (resolvedTheme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [resolvedTheme])

  useEffect(() => {
    if (theme !== 'system' || !media.current) return
    const onChange = () => {
      const root = document.documentElement
      if (systemDark()) root.classList.add('dark')
      else root.classList.remove('dark')
    }
    media.current.addEventListener('change', onChange)
    return () => media.current?.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next)
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}