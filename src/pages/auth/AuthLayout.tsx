import type { ReactNode } from 'react'
import { LogoMark } from '@/components/icons'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex w-full flex-col items-center justify-center lg:w-7/12">
        <div className="w-full max-w-md px-6 py-12">
          <div className="mb-8 flex items-center gap-4">
            <LogoMark className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-primary leading-none">ARTO</h1>
              <p className="mt-1 text-sm font-medium text-foreground">Financial Tracker</p>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden w-5/12 flex-col items-center justify-end bg-slate-900 p-12 text-white lg:flex overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(22,163,74,0.3),transparent)]" />
        </div>
        <div className="relative z-20 w-full">
          <blockquote className="space-y-2">
            <p className="text-3xl font-bold leading-tight italic">
              "Ngerti artone, ngerti uripe."
            </p>
            <footer className="text-lg opacity-80">— Filosofi ARTO</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
