import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/components/common/Toast'
import { UserPlus, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Нууц үг зөрүүтэй байна')
    }
    try {
      await register(formData)
      toast.success('Амжилттай бүртгүүллээ')
      navigate('/')
    } catch (err: any) {
      toast.error(err.message || 'Бүртгүүлэхэд алдаа гарлаа')
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-brand-base px-4 py-20 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[520px] bg-white p-10 md:p-14 rounded-[24px] border border-brand-border shadow-2xl shadow-brand-ink/5 relative z-10"
      >
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Бүртгүүлэх</h1>
          <p className="text-brand-sub text-[15px] font-medium">Enola Shop-ийн гишүүн болж давуу талуудыг эдлээрэй.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px] ml-1">Бүтэн нэр</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                placeholder="Таны нэр"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px] ml-1">И-мэйл хаяг</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px] ml-1">Нууц үг</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-brand-hint uppercase tracking-[2px] ml-1">Дахин нууц үг</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[12px] text-[15px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-14 bg-brand-ink text-brand-base rounded-[12px] font-black text-[13px] tracking-[3px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-ink/20 mt-6"
          >
            Бүртгүүлэх
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-brand-border text-center">
          <p className="text-brand-sub text-[14px] font-medium mb-4">Бүртгэлтэй юу?</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-ink hover:underline tracking-tight"
          >
            Нэвтрэх <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
