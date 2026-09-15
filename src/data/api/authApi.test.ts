import { beforeEach, describe, expect, it, vi } from 'vitest'
import { login, logout, getSession } from './authApi'
import type { User } from '@/types'

const { mockClient, ApiErrorMock } = vi.hoisted(() => {
  const ApiErrorMock = vi.fn(function (this: { status: number }, _message: string, status = 400) {
    this.status = status
  })
  return {
    ApiErrorMock,
    mockClient: {
      request: vi.fn(),
      setTokens: vi.fn(),
      clearTokens: vi.fn(),
      getAccessToken: vi.fn(),
      getRefreshToken: vi.fn(),
    },
  }
})

vi.mock('./client', () => ({
  ...mockClient,
  ApiError: ApiErrorMock,
}))

const user: User = { id: 'u-1', name: 'Admin', email: 'admin@example.com', theme: 'light', role: 'SUPER_ADMIN', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' }

describe('authApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockClient.getAccessToken.mockReturnValue(null)
    mockClient.getRefreshToken.mockReturnValue(null)
  })

  it('login menyimpan token dan mengembalikan sesi', async () => {
    mockClient.request.mockResolvedValue({ accessToken: 'at', refreshToken: 'rt', user })

    const session = await login({ email: 'admin@example.com', password: 'rahasia' })

    expect(mockClient.request).toHaveBeenCalledWith('/auth/login', { method: 'POST', body: { email: 'admin@example.com', password: 'rahasia' }, auth: false })
    expect(mockClient.setTokens).toHaveBeenCalledWith('at', 'rt')
    expect(session.user.name).toBe('Admin')
  })

  it('getSession mengembalikan null ketika tidak ada token', async () => {
    expect(await getSession()).toBeNull()
    expect(mockClient.request).not.toHaveBeenCalled()
  })

  it('getSession mengembalikan null dan membersihkan token saat sesi 401', async () => {
    mockClient.getAccessToken.mockReturnValue('expired')
    mockClient.request.mockRejectedValue(new ApiErrorMock('Unauthorized', 401))

    const session = await getSession()

    expect(session).toBeNull()
    expect(mockClient.clearTokens).toHaveBeenCalled()
  })

  it('logout selalu membersihkan token lokal meskipun server gagal', async () => {
    mockClient.getRefreshToken.mockReturnValue('rt')
    mockClient.request.mockRejectedValue(new Error('network'))

    await logout()

    expect(mockClient.clearTokens).toHaveBeenCalled()
  })
})