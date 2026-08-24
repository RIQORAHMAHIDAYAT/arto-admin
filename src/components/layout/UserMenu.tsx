import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LogoutIcon } from '@/components/icons'
import { Badge } from '@/components/ui/Badge'

export function UserMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/auth/login', { replace: true })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!user) return null

  const initials = user.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl bg-surface px-3 py-1.5 ring-1 ring-border transition-colors hover:bg-surface-hover focus:outline-hidden focus:ring-2 focus:ring-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs">
          {initials}
        </span>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-bold text-foreground leading-tight">{user.name}</p>
          <p className="text-[10px] font-semibold text-primary">{user.role.replace('_', ' ')}</p>
        </div>
        <svg
          className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface py-2 shadow-xl ring-1 ring-border z-50 animate-in fade-in-50 zoom-in-95">
          <div className="border-b border-border px-4 pb-3 pt-1">
            <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted truncate">{user.email}</p>
            <div className="mt-2">
              <Badge tone={user.role === 'SUPER_ADMIN' ? 'info' : 'success'}>
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <div className="p-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger/10"
            >
              <LogoutIcon className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
