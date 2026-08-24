import { lazy, Suspense } from 'react'
import type { ApexOptions } from 'apexcharts'
import { formatRupiah } from '@/lib/currency'

const ReactApexChart = lazy(() => import('react-apexcharts'))

interface CategoryAmountChartProps {
  title: string
  labels: string[]
  amounts: number[]
  color?: string
}

export function CategoryAmountChart({ title, labels, amounts, color = '#16A34A' }: CategoryAmountChartProps) {
  const options: ApexOptions = {
    chart: { type: 'bar', height: 280, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%',
      },
    },
    colors: [color],
    fill: {
      type: 'gradient',
      gradient: { shade: 'light', type: 'horizontal', shadeIntensity: 0.5 },
    },
    dataLabels: {
      enabled: true,
      formatter: (value: number) => formatRupiah(value, { compact: true }),
      style: { fontSize: '11px', fontWeight: 600 },
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value: string) => formatRupiah(Number(value), { compact: true }),
        style: { fontSize: '11px' },
      },
    },
    yaxis: { labels: { style: { fontSize: '12px', fontWeight: 500 } } },
    grid: { borderColor: 'rgba(148,163,184,0.2)', strokeDashArray: 4 },
    tooltip: {
      y: { formatter: (value: number) => formatRupiah(value) },
    },
  }

  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-border">
      <h3 className="mb-3 text-base font-bold text-foreground">{title}</h3>
      <Suspense fallback={<div className="flex h-[280px] items-center justify-center text-sm text-muted">Memuat grafik…</div>}>
        <ReactApexChart type="bar" height={280} options={options} series={[{ name: 'Nominal', data: amounts }]} />
      </Suspense>
    </div>
  )
}
