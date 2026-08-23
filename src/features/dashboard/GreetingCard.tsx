interface GreetingCardProps {
  greeting: string
  appName: string
}

export function getGreetingByHour(hour: number): string {
  if (hour >= 4 && hour < 11) return 'Selamat Pagi'
  if (hour >= 11 && hour < 15) return 'Selamat Siang'
  if (hour >= 15 && hour < 19) return 'Selamat Sore'
  return 'Selamat Malam'
}

export function GreetingIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="mx-auto mb-4 h-28 w-auto" aria-hidden="true">
      <circle cx="100" cy="60" r="46" fill="rgba(255,255,255,0.06)" />
      <circle cx="100" cy="60" r="32" fill="rgba(34,197,94,0.25)" />
      <path
        d="M84 68l10-14 7 9 5-6 12 11"
        fill="none"
        stroke="#4ADE80"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="146" cy="30" r="10" fill="#FBBF24" opacity="0.85" />
      <rect x="36" y="88" width="128" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="56" y="102" width="88" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
    </svg>
  )
}

export function GreetingCard({ greeting, appName }: GreetingCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-slate-900 p-6 shadow-[var(--shadow-card)] dark:bg-zinc-900">
      <div className="text-center">
        <GreetingIllustration />
      </div>
      <h3 className="text-lg font-bold leading-snug text-white">
        {greeting} di {appName}
      </h3>
      <p className="mt-3 text-sm font-light italic text-white/70">
        "Ngerti artone, ngerti uripe — pahami uangmu, atur hidupmu."
      </p>
    </div>
  )
}
