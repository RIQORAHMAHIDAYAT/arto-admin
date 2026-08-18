import { useAsync } from '@/hooks/useAsync'
import { getOverview } from '@/data/api/adminApi'
import { PageHeader } from './PageHeader'
import { StatCard } from '@/components/admin/StatCard'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { DashboardIcon, TransactionIcon, UsersIcon } from '@/components/icons'
import { formatNumber } from '@/lib/currency'
import { getErrorMessage } from '@/lib/errorMessage'

export function OverviewPage() {
  const { data, loading, error, refetch } = useAsync(getOverview, [])

  if (loading) {
    return (
      <>
        <PageHeader title="Overview" description="Ringkasan statistik aplikasi ARTO." />
        <LoadingBlock label="Menyiapkan statistik…" />
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <PageHeader title="Overview" description="Ringkasan statistik aplikasi ARTO." />
        <ErrorState title="Gagal memuat data" message={getErrorMessage(error)} onRetry={refetch} />
      </>
    )
  }

  return (
    <>
      <PageHeader title="Overview" description="Ringkasan statistik aplikasi ARTO." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Pengguna"
          value={formatNumber(data.user.totalUsers)}
          icon={<UsersIcon />}
          tone="primary"
        />
        <StatCard
          label="Pengguna Baru Bulan Ini"
          value={formatNumber(data.user.usersThisMonth)}
          icon={<UsersIcon />}
          tone="info"
          hint="Terhitung sejak awal bulan berjalan"
        />
        <StatCard
          label="Aktif 7 Hari Terakhir"
          value={formatNumber(data.user.active7Days)}
          icon={<DashboardIcon />}
          tone="success"
          hint="Pengguna dengan aktivitas transaksi/budget"
        />
        <StatCard
          label="Total Transaksi"
          value={formatNumber(data.transaction.totalTransactions)}
          icon={<TransactionIcon />}
          tone="secondary"
        />
        <StatCard
          label="Akun Tercatat"
          value={formatNumber(data.account.totalAccounts)}
          icon={<TransactionIcon />}
          tone="warning"
          hint="Cash, bank, dan e-wallet"
        />
        <StatCard
          label="Kategori Sistem"
          value={formatNumber(data.category.systemCategories)}
          icon={<DashboardIcon />}
          tone="danger"
          hint="Kategori bawaan ARTO"
        />
      </div>
    </>
  )
}