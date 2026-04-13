import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from '@/components/common/Toast'
import { useAuthStore } from '@/store/authStore'

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
          <button type="button" className="text-[12px] text-brand-ink font-medium hover:underline">Мартсан?</button>
        </div>

        <button 
          disabled={loading}
          className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Нэвтрэх <ArrowRight className="w-3.5 h-3.5" /></>}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-brand-border text-center">
        <p className="text-brand-sub text-[13px]">
          Шинэ хэрэглэгч үү?{' '}
          <Link to="/register" className="text-brand-ink font-medium hover:underline">Бүртгүүлэх</Link>
        </p>
      </div>
    </div>
  )
}
