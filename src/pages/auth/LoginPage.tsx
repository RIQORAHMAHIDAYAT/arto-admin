import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AuthLayout } from './AuthLayout'
import { getErrorMessage } from '@/lib/errorMessage'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/data/api/authApi'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login({ email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Gagal masuk. Periksa email dan password.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Selamat Datang"
      subtitle="Silakan masukkan email dan password Anda untuk melanjutkan."
    >
      {import.meta.env.DEV && (
        <div className="mb-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-primary">
          <p className="mb-2 font-semibold">Development Helper</p>
          <button
            type="button"
            onClick={() => {
              setEmail(ADMIN_EMAIL)
              setPassword(ADMIN_PASSWORD)
            }}
            className="flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 border border-primary/20"
          >
            Isi otomatis akun admin
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          type="email"
          label="Email Address"
          required
          autoComplete="email"
          placeholder="admin@arto.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div role="alert" className="flex items-center rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={submitting}
          className="mt-6 font-bold tracking-wide shadow-lg shadow-primary/20"
        >
          {submitting ? 'Memproses…' : 'Masuk ke Dashboard'}
        </Button>
      </form>
    </AuthLayout>
  )
}
