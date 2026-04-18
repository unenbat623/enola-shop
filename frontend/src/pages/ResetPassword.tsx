import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from '@/components/common/Toast'
import { authApi } from '@/api/auth'
import { Button } from '@/components/common/Button'
import { useAuthStore } from '@/store/authStore'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { setToken, fetchMe } = useAuthStore()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' })

  useEffect(() => {
    if (!token) {
      toast.error('Хүчингүй холбоос')
      navigate('/login')
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ password: '', confirmPassword: '' })
    
    let hasError = false
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Шинэ нууц үгээ оруулна уу' }))
      hasError = true
    } else if (formData.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' }))
      hasError = true
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Нууц үгүүд таарахгүй байна' }))
      hasError = true
    }

    if (hasError || !token) return

    try {
      setLoading(true)
      const res = await authApi.resetPassword(token, formData.password)
      
      // Автоматаар нэвтрүүлэх
      localStorage.setItem('token', res.token)
      setToken(res.token)
      await fetchMe()
      
      toast.success('Нууц үг амжилттай солигдлоо')
      navigate('/')
    } catch (err: any) {
      toast.error(err.message || 'Алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-brand-base min-h-screen py-20 px-4">
      <div className="bg-white border border-brand-border rounded-[10px] p-9 w-full max-w-[400px] shadow-none mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <h2 className="text-2xl font-normal text-brand-ink normal-case tracking-[2px]">Нууц үг шинэчлэх</h2>
          <p className="text-brand-sub text-[13px]">Шинэ нууц үгээ оруулаад баталгаажуулна уу.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">Шинэ нууц үг</label>
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

          <div className="space-y-1.5">
            <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">Нууц үг давтах</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className={`w-full h-11 bg-brand-surface border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px] ${errors.confirmPassword ? 'border-brand-danger' : 'border-brand-border'}`}
              />
            </div>
            {errors.confirmPassword && <p className="text-brand-danger text-[11px] ml-1">{errors.confirmPassword}</p>}
          </div>

          <Button 
            type="submit"
            isLoading={loading}
            className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all mt-4"
          >
            Нууц үг солих <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
