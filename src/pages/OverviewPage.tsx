import {
  IconArrowsExchange,
  IconCalendarStats,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react'
import { useAsync } from '@/hooks/useAsync'
import { getOverview, getTransactionsStatistics } from '@/data/api/adminApi'
import { PageHeader } from './PageHeader'
import { LoadingBlock } from '@/components/ui/LoadingBlock'
import { ErrorState } from '@/components/ui/ErrorState'
import { getErrorMessage } from '@/lib/errorMessage'
import { useAuth } from '@/context/AuthContext'
import { GreetingCard, getGreetingByHour } from '@/features/dashboard/GreetingCard'
import { MetricCards, type MetricItem } from '@/features/dashboard/MetricCards'
import { DonutChart } from '@/features/dashboard/DonutCharts'

const GRADIENT_PRIMARY = 'linear-gradient(180deg, #34D27B 0%, #16A34A 100%)'
const GRADIENT_SECONDARY = 'linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)'
const GRADIENT_WARNING = 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)'
const GRADIENT_ORANGE = 'linear-gradient(180deg, #FB923C 0%, #EA580C 100%)'

const CHART_COLORS = ['#16A34A', '#2563EB', '#D97706', '#EF4444', '#7C3AED', '#0891B2']

function WelcomeOnlyCard() {
  const { user } = useAuth()
  return (
    <div className="rounded-xl bg-surface p-10 text-center shadow-[var(--shadow-card)] ring-1 ring-border">
      <h2 className="text-xl font-bold text-foreground">
        Selamat Datang {user?.name ?? 'Pengguna'} — {user?.role ?? '-'}
      </h2>
      <p className="mt-2 text-sm text-muted">Anda masuk sebagai {user?.role ?? '-'}</p>
    </div>
  )
}

export function OverviewPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
  const { data, loading, error, refetch } = useAsync(
    () => Promise.all([getOverview(), getTransactionsStatistics()] as const),
    [],
  )

  if (!isAdmin) {
    return (
      <>
        <PageHeader title="Dashboard" description="Ringkasan akun Anda." />
        <WelcomeOnlyCard />
      </>
    )
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Dashboard" description="Ringkasan statistik aplikasi ARTO." />
        <LoadingBlock label="Menyiapkan statistik…" />
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <PageHeader title="Dashboard" description="Ringkasan statistik aplikasi ARTO." />
        <ErrorState title="Gagal memuat data" message={getErrorMessage(error)} onRetry={refetch} />
      </>
    )
  }

  const [overview, transactionStats] = data

  const metrics: MetricItem[] = [
    {
      title: 'Total Pengguna',
      value: overview.user.totalUsers,
      icon: <IconUsers stroke={2} />,
      gradient: GRADIENT_PRIMARY,
    },
    {
      title: 'Pengguna Baru Bulan Ini',
      value: overview.user.usersThisMonth,
      icon: <IconUserPlus stroke={2} />,
      gradient: GRADIENT_SECONDARY,
    },
    {
      title: 'Total Transaksi',
      value: transactionStats.totalIncomeCount + transactionStats.totalExpenseCount,
      icon: <IconArrowsExchange stroke={2} />,
      gradient: GRADIENT_WARNING,
    },
    {
      title: 'Transaksi Bulan Ini',
      value: transactionStats.transactionsThisMonth,
      icon: <IconCalendarStats stroke={2} />,
      gradient: GRADIENT_ORANGE,
    },
  ]

  const expenseByCategory = transactionStats.expenseByCategory.slice(0, 5)
  const greeting = `${getGreetingByHour(new Date().getHours())}, ${user?.name ?? 'Pengguna'}`

  return (
    <>
      <PageHeader title="Dashboard" description="Ringkasan statistik aplikasi ARTO." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GreetingCard greeting={greeting} appName="ARTO" />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-card)] ring-1 ring-border">
            <MetricCards items={metrics} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DonutChart
              title="Transaksi Berdasarkan Tipe"
              labels={['Pemasukan', 'Pengeluaran']}
              series={[transactionStats.totalIncomeCount, transactionStats.totalExpenseCount]}
              colors={[CHART_COLORS[0], CHART_COLORS[3]]}
            />
            <DonutChart
              title="Pengeluaran per Kategori"
              labels={expenseByCategory.map((c) => c.categoryName)}
              series={expenseByCategory.map((c) => c.count)}
              colors={CHART_COLORS}
            />
          </div>
        </div>
      </div>
    </>
  )
}
