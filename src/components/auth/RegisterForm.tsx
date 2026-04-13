import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from '@/components/common/Toast'

import { useAuthStore } from '@/store/authStore'

export default function RegisterForm() {
  const navigate = useNavigate()
  const register = useAuthStore(state => state.register)
  const loading = useAuthStore(state => state.isLoading)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ name: '', email: '', password: '' })
    
    let hasError = false
    if (!formData.name) {
      setErrors(prev => ({ ...prev, name: 'Нэрээ оруулна уу' }))
      hasError = true
    }
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
      await register({ name: formData.name, email: formData.email, password: formData.password })
      toast.success('Бүртгэл амжилттай үүслээ')
      navigate('/')
    } catch (err: any) {
      toast.error(err.message || 'Бүртгүүлэхэд алдаа гарлаа')
    }
  }

  return (
    <div className="bg-white border border-brand-border rounded-[10px] p-9 w-full max-w-[400px] shadow-none mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <h2 className="text-2xl font-normal text-brand-ink normal-case tracking-[2px]">Бүртгүүлэх</h2>
        <p className="text-brand-sub text-[13px]">Манай хамт олонд нэгдээрэй.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">Овог нэр</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
              <User className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Таны нэр"
              className={`w-full h-11 bg-brand-surface border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px] ${errors.name ? 'border-brand-danger' : 'border-brand-border'}`}
            />
          </div>
          {errors.name && <p className="text-brand-danger text-[11px] ml-1">{errors.name}</p>}
        </div>

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

        <div className="py-2">
          <p className="text-[11px] text-brand-hint leading-relaxed">
            "Бүртгүүлэх" товчийг дарснаар та манай <span className="text-brand-ink cursor-pointer hover:underline">Үйлчилгээний нөхцөл</span> болон <span className="text-brand-ink cursor-pointer hover:underline">Нууцлалын бодлогыг</span> зөвшөөрч байна гэж үзнэ.
          </p>
        </div>

        <button 
          disabled={loading}
          className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Бүртгүүлэх <ArrowRight className="w-3.5 h-3.5" /></>}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-brand-border text-center">
        <p className="text-brand-sub text-[13px]">
          Бүртгэлтэй юу?{' '}
          <Link to="/login" className="text-brand-ink font-medium hover:underline">Нэвтрэх</Link>
        </p>
      </div>
    </div>
  )
}
