import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MetricCards, type MetricItem } from './MetricCards'

const items: MetricItem[] = [
  { title: 'Pengguna Aktif', value: 1250, icon: <span>x</span>, gradient: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { title: 'Transaksi Bulan Ini', value: 982, icon: <span>y</span>, gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
]

describe('MetricCards', () => {
  it('menampilkan nilai terformat lokal Indonesia dan judul', () => {
    render(<MetricCards items={items} />)
    expect(screen.getByText('1.250')).toBeInTheDocument()
    expect(screen.getByText('Pengguna Aktif')).toBeInTheDocument()
    expect(screen.getByText('982')).toBeInTheDocument()
    expect(screen.getByText('Transaksi Bulan Ini')).toBeInTheDocument()
  })
})