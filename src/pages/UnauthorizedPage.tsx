import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { ShieldIcon } from '@/components/icons'

export function UnauthorizedPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
        <ShieldIcon className="h-7 w-7" />
      </span>
      <h1 className="text-xl font-extrabold text-foreground">Akses ditolak</h1>
      <p className="max-w-md text-sm text-muted">
        Akun kamu tidak memiliki peran admin. Dashboard administrasi ARTO hanya dapat diakses oleh pengguna
        dengan peran Admin atau Super Admin.
      </p>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={handleLogout}>
          Ganti akun
        </Button>
        <Button onClick={handleLogout}>Keluar</Button>
      </div>
    </div>
  )
}