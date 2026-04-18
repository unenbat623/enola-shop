import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/components/common/Toast'
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'

// SVG Icon for Google
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
    />
  </svg>
)

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

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    window.location.href = `${apiUrl}/api/auth/google`
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-brand-base px-4 py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-surface rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] bg-white p-8 md:p-12 rounded-[32px] border border-brand-border shadow-2xl shadow-gray-200 relative z-10"
      >
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Эргэн тавтай морил</h1>
          <p className="text-brand-sub text-[14px] font-medium leading-relaxed">Системд нэвтэрч streetwear цуглуулгаа үргэлжлүүлэн үзээрэй.</p>
        </div>

        <div className="space-y-4 mb-10">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-13 bg-white border border-brand-border text-brand-ink rounded-[14px] font-bold text-[14px] hover:bg-brand-surface hover:border-brand-hint transition-all shadow-sm"
          >
            <GoogleIcon />
            <span>Google-ээр нэвтрэх</span>
          </Button>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-brand-border"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[2.5px]">
              <span className="bg-white px-5 text-brand-hint">Эсвэл и-мэйлээр</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-brand-hint uppercase tracking-[2px] ml-1">И-мэйл хаяг</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-13 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[14px] text-[14px] font-medium focus:border-brand-ink focus:bg-white outline-none transition-all placeholder:text-brand-ghost"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-brand-hint uppercase tracking-[2px]">Нууц үг</label>
              <Link to="/forgot-password" className="text-[10px] font-bold text-brand-ink hover:underline tracking-tight uppercase">Нууц үг мартсан?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-13 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[14px] text-[14px] font-medium focus:border-brand-ink focus:bg-white outline-none transition-all placeholder:text-brand-ghost"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-14 bg-brand-ink text-brand-base rounded-[14px] font-black text-[13px] tracking-[3px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-brand-ink/10 mt-4 h-14"
          >
            Нэвтрэх
          </Button>
        </form>

        <div className="mt-12 pt-8 border-t border-brand-border text-center">
          <p className="text-brand-sub text-[13px] font-medium mb-4">Бүртгэлгүй юу?</p>
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
