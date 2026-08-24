import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

export interface NavItem {
  to: string
  label: string
  icon: ReactNode
  end?: boolean
}

export function SidebarContent({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav aria-label="Navigasi utama" className="flex flex-col gap-1.5">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all',
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/30 font-semibold'
                : 'text-zinc-600 hover:bg-primary/10 hover:text-primary dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white',
            )
          }
        >
          <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5" aria-hidden="true">
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}