import { useState, type ReactNode } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { SidebarContent, type NavItem } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'
import {
  DashboardIcon,
  LogoMark,
  LogoutIcon,
  MenuIcon,
  TransactionIcon,
  UsersIcon,
} from '@/components/icons'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'

const navItems: NavItem[] = [
  { to: '/', label: 'Overview', icon: <DashboardIcon />, end: true },
  { to: '/users', label: 'Pengguna', icon: <UsersIcon /> },
  { to: '/transactions', label: 'Transaksi', icon: <TransactionIcon /> },
]

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2.5">
      <LogoMark className="h-8 w-8 text-primary" />
      <span className="text-lg font-extrabold tracking-tight text-foreground">ARTO</span>
      <Badge tone="info" className="mt-0.5">
        Admin
      </Badge>
    </button>
  )
}

function ShellSidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/auth/login', { replace: true })
  }
  return (
    <div className={cn('flex h-full flex-col gap-6 p-5', className)}>
      <Brand onClick={onNavigate} />
      <SidebarContent items={navItems} onNavigate={onNavigate} />
      <div className="mt-auto space-y-3 border-t border-border pt-4">
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-hover hover:text-danger"
        >
          <LogoutIcon className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children?: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-surface lg:block">
        <ShellSidebar />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">
            <ShellSidebar onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Buka menu" className="rounded-lg p-2 text-muted hover:bg-surface-hover hover:text-foreground lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="lg:hidden">
              <Brand />
            </div>
          </div>
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}