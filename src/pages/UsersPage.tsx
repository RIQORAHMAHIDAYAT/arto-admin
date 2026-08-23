import { useEffect, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useAsync } from '@/hooks/useAsync'
import { getUsersStatistics } from '@/data/api/adminApi'
import { PageHeader } from './PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { formatDateShort } from '@/lib/date'
import { roleLabel, roleTone } from '@/lib/role'
import { formatNumber } from '@/lib/currency'
import { getErrorMessage } from '@/lib/errorMessage'

const PAGE_SIZE = 20

export function UsersPage() {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setQuery(searchInput), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { data, loading, error, refetch } = useAsync(
    () => getUsersStatistics(page, PAGE_SIZE, query || undefined),
    [page, query],
  )

  if (loading && !data) {
    return (
      <>
        <PageHeader title="Pengguna" description="Daftar pengguna ARTO beserta metrik aktivitas." />
        <LoadingBlock label="Memuat daftar pengguna…" />
      </>
    )
  }

  if (error && !data) {
    return (
      <>
        <PageHeader title="Pengguna" description="Daftar pengguna ARTO beserta metrik aktivitas." />
        <ErrorState title="Gagal memuat data" message={getErrorMessage(error)} onRetry={refetch} />
      </>
    )
  }

  const items = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <>
      <PageHeader
        title="Pengguna"
        description={`${formatNumber(data?.total ?? 0)} pengguna terdaftar.`}
        action={
          <Input
            type="search"
            placeholder="Cari nama atau email…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setPage(1)
            }}
            className="w-full sm:w-72"
            aria-label="Cari pengguna"
          />
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Pengguna tidak ditemukan"
          description={
            query
              ? `Tidak ada pengguna yang cocok dengan "${query}".`
              : 'Belum ada pengguna terdaftar.'
          }
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
                {items.map((u) => (
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

          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
            <p className="text-xs text-muted">
              Halaman {page} dari {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <IconChevronLeft size={16} stroke={2} />
                Sebelumnya
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Berikutnya
                <IconChevronRight size={16} stroke={2} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
