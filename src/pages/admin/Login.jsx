import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store'

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const res = await authApi.login(data)
      login(res.data.token, res.data.user)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    padding: '14px 16px',
    color: 'var(--fg)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    borderRadius: '2px',
    transition: 'border-color 0.3s',
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ padding: 'var(--section-px)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="font-display font-extrabold text-3xl mb-2">
            MB<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)' }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>
              Username
            </label>
            <input
              {...register('username', { required: true })}
              type="text"
              placeholder="admin"
              style={{ ...inputStyle, borderColor: errors.username ? '#ff6b6b' : 'var(--border-color)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
              onBlur={(e) => { e.target.style.borderColor = errors.username ? '#ff6b6b' : 'var(--border-color)' }}
            />
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>
              Password
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="••••••••"
              style={{ ...inputStyle, borderColor: errors.password ? '#ff6b6b' : 'var(--border-color)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
              onBlur={(e) => { e.target.style.borderColor = errors.password ? '#ff6b6b' : 'var(--border-color)' }}
            />
          </div>

          {error && (
            <p className="font-mono text-xs" style={{ color: '#ff6b6b' }}>✕ {error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded font-bold text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-60 mt-2"
            style={{ padding: '16px', background: 'var(--accent)', color: '#111' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
