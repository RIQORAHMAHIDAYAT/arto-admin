import { useState, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarContent, type NavItem } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'
import {
  DashboardIcon,
  LogoMark,
  MenuIcon,
  TransactionIcon,
  UsersIcon,
} from '@/components/icons'
import { cn } from '@/lib/cn'

const navItems: NavItem[] = [
  { to: '/', label: 'Overview', icon: <DashboardIcon />, end: true },
  { to: '/users', label: 'Pengguna', icon: <UsersIcon /> },
  { to: '/transactions', label: 'Transaksi', icon: <TransactionIcon /> },
]

function ShellSidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col justify-between p-6 bg-white dark:bg-zinc-900 transition-colors', className)}>
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md">
            <LogoMark className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white leading-none">ARTO Admin</h2>
            <span className="text-xs text-primary font-medium">Control Panel</span>
          </div>
        </div>
        <div className="pt-2">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Menu Utama</p>
          <SidebarContent items={navItems} onNavigate={onNavigate} />
        </div>
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
            <nav aria-label="Lokasi halaman" className="hidden items-center gap-2 text-sm text-muted lg:flex">
              <span>ARTO Admin</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-foreground">Dashboard</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <UserMenu />
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}