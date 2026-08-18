import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface StatCardProps {
  label: string
  value: string
  icon?: ReactNode
  hint?: string
  tone?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

export function StatCard({ label, value, icon, hint, tone = 'primary' }: StatCardProps) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-border">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-1 truncate text-2xl font-extrabold tracking-tight text-foreground">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
        {icon && (
          <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg [&>svg]:h-5 [&>svg]:w-5', toneClasses[tone])} aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
    </div>
  )
}