import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from '@/components/common/Toast'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/common/Button'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login, user: storeUser } = useAuthStore()
  const loading = useAuthStore(state => state.isLoading)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ email: '', password: '' })
    
    let hasError = false
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'И-мэйл хаягаа оруулна уу' }))
      hasError = true
    }
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Нууц үгээ оруулна уу' }))
      hasError = true
    }

    if (hasError) return

    try {
      await login({ email: formData.email, password: formData.password })
      // user is set in authStore after login
      const user = useAuthStore.getState().user
      toast.success(user?.role === 'admin' ? 'Админ амжилттай нэвтэрлээ' : 'Амжилттай нэвтэрлээ')
      navigate(user?.role === 'admin' ? '/admin/dashboard' : '/')
    } catch (err: any) {
      toast.error(err.message || 'Нэвтрэхэд алдаа гарлаа')
    }
  }

  return (
    <div className="bg-white border border-brand-border rounded-[10px] p-9 w-full max-w-[400px] shadow-none mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <h2 className="text-2xl font-normal text-brand-ink normal-case tracking-[2px]">Нэвтрэх</h2>
        <p className="text-brand-sub text-[13px]">Enola Shop ертөнцөд тавтай морил.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">И-мэйл хаяг</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.com"
              className={`w-full h-11 bg-brand-surface border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px] ${errors.email ? 'border-brand-danger' : 'border-brand-border'}`}
            />
          </div>
          {errors.email && <p className="text-brand-danger text-[11px] ml-1">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">Нууц үг</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
              <Lock className="w-3.5 h-3.5" />
            </span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className={`w-full h-11 bg-brand-surface border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px] ${errors.password ? 'border-brand-danger' : 'border-brand-border'}`}
            />
          </div>
          {errors.password && <p className="text-brand-danger text-[11px] ml-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 border-brand-border rounded accent-brand-ink" id="remember" />
            <label htmlFor="remember" className="text-[12px] text-brand-sub font-normal cursor-pointer">Сануулах</label>
          </div>
          <Link to="/forgot-password" type="button" className="text-[12px] text-brand-ink font-medium hover:underline">Мартсан?</Link>
        </div>

        <Button 
          type="submit"
          isLoading={loading}
          className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all"
        >
          Нэвтрэх <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-brand-border" />
        </div>
        <div className="relative flex justify-center text-[10px]">
          <span className="bg-white px-4 text-brand-hint normal-case tracking-[2px] font-medium">ЭСВЭЛ</span>
        </div>
      </div>

      <button
        onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`}
        className="w-full flex items-center justify-center gap-3 border border-brand-border rounded-[6px] h-11 px-4 hover:bg-brand-surface transition-all group"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="grayscale group-hover:grayscale-0 transition-all">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="text-[12px] font-medium text-brand-ink normal-case tracking-[1px]">Google-ээр нэвтрэх</span>
      </button>

      <div className="mt-8 pt-8 border-t border-brand-border text-center">
        <p className="text-brand-sub text-[13px]">
          Шинэ хэрэглэгч үү?{' '}
          <Link to="/register" className="text-brand-ink font-medium hover:underline">Бүртгүүлэх</Link>
        </p>
      </div>
    </div>
  )
}
