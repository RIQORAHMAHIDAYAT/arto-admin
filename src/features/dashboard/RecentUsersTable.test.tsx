import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RecentUsersTable } from './RecentUsersTable'

vi.mock('@/data/api/adminApi', () => ({
  getUsersStatistics: vi.fn(async () => ({
    items: [
      { id: 'u-1', name: 'Rina', email: 'rina@example.com', role: 'ADMIN', transactionCount: 12, createdAt: '2026-08-01T00:00:00.000Z' },
      { id: 'u-2', name: 'Budi', email: 'budi@example.com', role: 'USER', transactionCount: 3, createdAt: '2026-09-01T00:00:00.000Z' },
    ],
    total: 150,
    page: 1,
    limit: 6,
  })),
}))

describe('RecentUsersTable', () => {
  it('memuat dan menampilkan daftar pengguna setelah data tersedia', async () => {
    render(<RecentUsersTable limit={6} />)

    expect(await screen.findByText('Rina')).toBeInTheDocument()
    expect(screen.getByText('rina@example.com')).toBeInTheDocument()
    expect(screen.getByText('Budi')).toBeInTheDocument()

    expect(screen.getByText('ADMIN')).toBeInTheDocument()
    expect(screen.getByText('USER')).toBeInTheDocument()

    expect(screen.getByText('150 pengguna terdaftar')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })
})