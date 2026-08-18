import type { AdminOverview, AdminTransactionStats, AdminUserStat } from '@/types'
import { request } from './client'

export async function getOverview(): Promise<AdminOverview> {
  return request<AdminOverview>('/admin/overview')
}

export async function getUsersStatistics(): Promise<AdminUserStat[]> {
  return request<AdminUserStat[]>('/admin/users/statistics')
}

export async function getTransactionsStatistics(): Promise<AdminTransactionStats> {
  return request<AdminTransactionStats>('/admin/transactions/statistics')
}