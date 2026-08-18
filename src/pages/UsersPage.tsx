import { useMemo, useState } from 'react'
import { useAsync } from '@/hooks/useAsync'
import { getUsersStatistics } from '@/data/api/adminApi'
import { PageHeader } from './PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { formatDateShort } from '@/lib/date'
import { roleLabel, roleTone } from '@/lib/role'
import { formatNumber } from '@/lib/currency'
import { getErrorMessage } from '@/lib/errorMessage'

export function UsersPage() {
  const { data, loading, error, refetch } = useAsync(getUsersStatistics, [])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q),
    )
  }, [data, query])

  if (loading) {
    return (
      <>
        <PageHeader title="Pengguna" description="Daftar pengguna ARTO beserta metrik aktivitas." />
        <LoadingBlock label="Memuat daftar pengguna…" />
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <PageHeader title="Pengguna" description="Daftar pengguna ARTO beserta metrik aktivitas." />
        <ErrorState title="Gagal memuat data" message={getErrorMessage(error)} onRetry={refetch} />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Pengguna"
        description={`${formatNumber(data.length)} pengguna terdaftar.`}
        action={
          <Input
            type="search"
            placeholder="Cari nama, email, atau peran…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-72"
            aria-label="Cari pengguna"
          />
        }
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Pengguna tidak ditemukan"
          description={query ? `Tidak ada pengguna yang cocok dengan "${query}".` : 'Belum ada pengguna terdaftar.'}
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-semibold">Pengguna</th>
                  <th className="px-5 py-3 font-semibold">Peran</th>
                  <th className="px-5 py-3 font-semibold">Bergabung</th>
                  <th className="px-5 py-3 text-center font-semibold">Transaksi</th>
                  <th className="px-5 py-3 text-center font-semibold">Akun</th>
                  <th className="px-5 py-3 text-center font-semibold">Budget</th>
                  <th className="px-5 py-3 text-center font-semibold">Goals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-surface-hover">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">{u.name}</p>
                          <p className="truncate text-xs text-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={roleTone(u.role)}>{roleLabel(u.role)}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-muted">{formatDateShort(u.createdAt)}</td>
                    <td className="px-5 py-3 text-center tabular-nums text-foreground">{formatNumber(u.transactionCount)}</td>
                    <td className="px-5 py-3 text-center tabular-nums text-foreground">{formatNumber(u.accountCount)}</td>
                    <td className="px-5 py-3 text-center tabular-nums text-foreground">{formatNumber(u.budgetCount)}</td>
                    <td className="px-5 py-3 text-center tabular-nums text-foreground">{formatNumber(u.goalCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  )
}