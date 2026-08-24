import type { ReactNode } from 'react'
import { LogoMark } from '@/components/icons'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-5/12 xl:w-4/12 bg-white dark:bg-zinc-900 shadow-xl z-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner">
              <LogoMark className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">ARTO Admin</h1>
              <p className="text-xs font-semibold text-primary tracking-wider uppercase">Financial Control Panel</p>
            </div>
          </div>
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            {subtitle && <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
          </div>
          <div>{children}</div>
        </div>
      </div>
      <div className="relative hidden w-7/12 flex-col justify-end bg-zinc-900 p-16 text-white lg:flex overflow-hidden xl:w-8/12">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-90" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl z-0" />
        <div className="relative z-20 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
            <span>Admin Control Center</span>
          </div>
          <blockquote className="space-y-3">
            <p className="text-4xl font-extrabold tracking-tight leading-tight italic text-zinc-100">
              "Ngerti artone, ngerti uripe."
            </p>
            <footer>
              <strong className="text-base font-semibold text-primary">Filosofi ARTO</strong>
              <p className="text-sm text-zinc-400">Pusat kontrol dan analisis finansial personal terintegrasi.</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
