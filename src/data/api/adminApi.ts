import type { AdminOverview, AdminTransactionStats, AdminUserStat, Paginated } from '@/types'
import { request } from './client'

export async function getOverview(): Promise<AdminOverview> {
  return request<AdminOverview>('/admin/overview')
}

export async function getUsersStatistics(page = 1, limit = 20, query?: string): Promise<Paginated<AdminUserStat>> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (query) params.set('query', query)
  return request<Paginated<AdminUserStat>>(`/admin/users/statistics?${params.toString()}`)
}

export async function getTransactionsStatistics(): Promise<AdminTransactionStats> {
  return request<AdminTransactionStats>('/admin/transactions/statistics')
}