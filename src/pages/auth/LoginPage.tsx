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
        <button
          type="button"
          onClick={() => {
            setEmail(ADMIN_EMAIL)
            setPassword(ADMIN_PASSWORD)
          }}
          className="mb-5 w-full rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
        >
          Isi otomatis akun admin (hasil seed)
        </button>
      )}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <Input
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div role="alert" className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={submitting}
          className="mt-6 uppercase tracking-wide shadow-md"
        >
          {submitting ? 'Memproses…' : 'Masuk'}
        </Button>
      </form>
    </AuthLayout>
  )
}
