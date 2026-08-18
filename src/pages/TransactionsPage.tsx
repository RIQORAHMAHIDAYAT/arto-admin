import { useAsync } from '@/hooks/useAsync'
import { getTransactionsStatistics } from '@/data/api/adminApi'
import { PageHeader } from './PageHeader'
import { StatCard } from '@/components/admin/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { TrendDownIcon, TrendUpIcon, TransactionIcon } from '@/components/icons'
import { formatNumber, formatRupiah } from '@/lib/currency'
import { getErrorMessage } from '@/lib/errorMessage'

export function TransactionsPage() {
  const { data, loading, error, refetch } = useAsync(getTransactionsStatistics, [])

  if (loading) {
    return (
      <>
        <PageHeader title="Transaksi" description="Statistik transaksi agregat seluruh aplikasi." />
        <LoadingBlock label="Menghitung statistik…" />
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <PageHeader title="Transaksi" description="Statistik transaksi agregat seluruh aplikasi." />
        <ErrorState title="Gagal memuat data" message={getErrorMessage(error)} onRetry={refetch} />
      </>
    )
  }

  const totalAmount = data.totalIncomeAmount + data.totalExpenseAmount

  return (
    <>
      <PageHeader title="Transaksi" description="Statistik transaksi agregat seluruh aplikasi." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Pemasukan"
          value={formatRupiah(data.totalIncomeAmount, { compact: true })}
          icon={<TrendUpIcon />}
          tone="success"
          hint={`${formatNumber(data.totalIncomeCount)} transaksi`}
        />
        <StatCard
          label="Total Pengeluaran"
          value={formatRupiah(data.totalExpenseAmount, { compact: true })}
          icon={<TrendDownIcon />}
          tone="danger"
          hint={`${formatNumber(data.totalExpenseCount)} transaksi`}
        />
        <StatCard
          label="Transaksi Bulan Ini"
          value={formatNumber(data.transactionsThisMonth)}
          icon={<TransactionIcon />}
          tone="info"
          hint={`${formatRupiah(totalAmount, { compact: true })} total nominal tercatat`}
        />
      </div>

      <Card className="mt-6">
        <CardHeader title="Pengeluaran per Kategori" subtitle="Diurutkan dari nominal terbesar." />
        {data.expenseByCategory.length === 0 ? (
          <EmptyState icon="🧾" title="Belum ada pengeluaran" description="Belum ada transaksi pengeluaran yang tercatat." />
        ) : (
          <ul className="flex flex-col gap-4">
            {data.expenseByCategory.map((item) => {
              const max = data.expenseByCategory[0]?.amount ?? 1
              const percentage = max > 0 ? Math.round((item.amount / max) * 100) : 0
              return (
                <li key={item.categoryId} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-lg" role="img" aria-hidden="true">
                    {item.categoryIcon || '📦'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">{item.categoryName}</p>
                      <p className="text-sm font-bold text-foreground">{formatRupiah(item.amount)}</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-hover">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${percentage}%` }}
                        role="img"
                        aria-label={`${item.categoryName}: ${formatRupiah(item.amount)}`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted">{formatNumber(item.count)} transaksi</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </>
  )
}