import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { SidebarContent, type NavItem } from './Sidebar'

function Icon() {
  return <svg data-testid="icon" />
}

const items: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <Icon />, end: true },
  { to: '/users', label: 'Pengguna', icon: <Icon /> },
]

describe('SidebarContent', () => {
  it('merender semua item navigasi dengan label', () => {
    render(
      <MemoryRouter>
        <SidebarContent items={items} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('navigation', { name: /Navigasi utama/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pengguna' })).toBeInTheDocument()
  })

  it('memanggil onNavigate saat item diklik', async () => {
    const onNavigate = vi.fn()
    render(
      <MemoryRouter>
        <SidebarContent items={items} onNavigate={onNavigate} />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: 'Pengguna' })
    link.click()
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})