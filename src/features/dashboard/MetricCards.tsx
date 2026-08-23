import type { ReactNode } from 'react'

export interface MetricItem {
  title: string
  value: number
  icon: ReactNode
  gradient: string
}

interface MetricCardsProps {
  items: MetricItem[]
}

export function MetricCards({ items }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white [&>svg]:h-6 [&>svg]:w-6"
            style={{ background: item.gradient }}
            aria-hidden="true"
          >
            {item.icon}
          </span>
          <div className="min-w-0">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {item.value.toLocaleString('id-ID')}
            </p>
            <p className="mt-1 truncate text-sm font-light text-muted">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
