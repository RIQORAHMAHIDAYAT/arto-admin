import { useAsync } from '@/hooks/useAsync'
import { getUsersStatistics } from '@/data/api/adminApi'
import { Badge } from '@/components/ui/Badge'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { getErrorMessage } from '@/lib/errorMessage'
import type { UserRole } from '@/types'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function roleBadgeTone(role: UserRole): 'success' | 'info' | 'neutral' {
  if (role === 'SUPER_ADMIN') return 'info'
  if (role === 'ADMIN') return 'success'
  return 'neutral'
}

export function RecentUsersTable({ limit = 6 }: { limit?: number }) {
  const { data, loading, error, refetch } = useAsync(() => getUsersStatistics(1, limit), [])

  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-border">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Pengguna Terbaru</h3>
        <span className="text-xs text-muted">{data ? `${data.total} pengguna terdaftar` : ''}</span>
      </div>

      {loading && <LoadingBlock label="Memuat pengguna…" />}
      {error && <ErrorState title="Gagal memuat pengguna" message={getErrorMessage(error)} onRetry={refetch} className="py-6" />}

      {data && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                <th className="pb-2 pr-4 font-semibold">Nama</th>
                <th className="pb-2 pr-4 font-semibold">Peran</th>
                <th className="pb-2 pr-4 font-semibold">Transaksi</th>
                <th className="pb-2 font-semibold">Bergabung</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((user) => (
                <tr key={user.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">{user.name}</p>
                        <p className="truncate text-xs text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge tone={roleBadgeTone(user.role)}>{user.role.replace('_', ' ')}</Badge>
                  </td>
                  <td className="py-3 pr-4 font-medium tabular-nums text-foreground">{user.transactionCount}</td>
                  <td className="py-3 whitespace-nowrap text-muted">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
