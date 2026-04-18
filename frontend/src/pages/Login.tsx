import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/components/common/Toast'
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(formData)
      toast.success('Амжилттай нэвтэрлээ')
      navigate(from, { replace: true })
    } catch (err: any) {
      toast.error(err.message || 'Нэвтрэхэд алдаа гарлаа')
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-brand-base px-4 py-20 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] bg-white p-10 md:p-14 rounded-[24px] border border-brand-border shadow-2xl shadow-brand-ink/5 relative z-10"
      >
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Тавтай морил</h1>
          <p className="text-brand-sub text-[15px] font-medium">Системд нэвтэрч захиалгаа үргэлжлүүлнэ үү.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px] ml-1">И-мэйл хаяг</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-13 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px]">Нууц үг</label>
              <Link to="/forgot-password" size="sm" className="text-[11px] font-bold text-brand-ink hover:underline tracking-tight">Нууц үг мартсан?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-13 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-14 bg-brand-ink text-brand-base rounded-[12px] font-black text-[13px] tracking-[3px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-ink/20 mt-4"
          >
            Нэвтрэх
          </Button>
        </form>

        <div className="mt-12 pt-8 border-t border-brand-border text-center">
          <p className="text-brand-sub text-[14px] font-medium mb-4">Шинэ хэрэглэгч үү?</p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-ink hover:underline tracking-tight"
          >
            Бүртгүүлэх <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
