export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'
export type ThemePreference = 'light' | 'dark' | 'system'

export interface User {
  id: string
  email: string
  name: string
  theme: ThemePreference
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface Credentials {
  email: string
  password: string
}

export interface Session {
  accessToken: string
  refreshToken: string
  user: User
}

export interface AdminOverview {
  user: {
    totalUsers: number
    usersThisMonth: number
    active7Days: number
  }
  transaction: {
    totalTransactions: number
  }
  account: {
    totalAccounts: number
  }
  category: {
    systemCategories: number
  }
}

export interface Paginated<T> {
  items: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export type AdminUserStat = {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
  transactionCount: number
  accountCount: number
  budgetCount: number
  goalCount: number
}

export interface AdminExpenseByCategory {
  categoryId: string
  categoryName: string
  categoryIcon: string
  count: number
  amount: number
}

export interface AdminTransactionStats {
  totalIncomeCount: number
  totalIncomeAmount: number
  totalExpenseCount: number
  totalExpenseAmount: number
  transactionsThisMonth: number
  expenseByCategory: AdminExpenseByCategory[]
}