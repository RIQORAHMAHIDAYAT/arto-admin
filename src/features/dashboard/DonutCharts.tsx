import { lazy, Suspense } from 'react'
import type { ApexOptions } from 'apexcharts'

const ReactApexChart = lazy(() => import('react-apexcharts'))

interface DonutChartProps {
  title: string
  labels: string[]
  series: number[]
  colors: string[]
}

function defaultOptions(labels: string[], colors: string[]): ApexOptions {
  return {
    chart: { type: 'donut', height: 240 },
    labels,
    colors,
    legend: { position: 'bottom' },
    dataLabels: { enabled: true },
    stroke: { width: 0 },
  }
}

export function DonutChart({ title, labels, series, colors }: DonutChartProps) {
  return (
    <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-card)] ring-1 ring-border">
      <h3 className="mb-3 text-base font-bold text-foreground">{title}</h3>
      <Suspense fallback={<div className="flex h-[240px] items-center justify-center text-sm text-muted">Memuat grafik…</div>}>
        <ReactApexChart
          type="donut"
          height={240}
          options={defaultOptions(labels, colors)}
          series={series}
        />
      </Suspense>
    </div>
  )
}
