import { useState } from 'react'
import { Link } from 'react-router'
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from '@/components/common/Toast'
import { authApi } from '@/api/auth'
import { Button } from '@/components/common/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('И-мэйл хаягаа оруулна уу')
      return
    }

    try {
      setLoading(true)
      await authApi.forgotPassword(email)
      setIsSubmitted(true)
      toast.success('Имэйл илгээлээ, шалгана уу')
    } catch (err: any) {
      toast.error(err.message || 'Алдаа гарлаа')
      setError(err.message || 'Алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-brand-base min-h-screen py-20 px-4">
      <div className="bg-white border border-brand-border rounded-[10px] p-9 w-full max-w-[400px] shadow-none mx-auto">
        {isSubmitted ? (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center text-brand-ink">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-normal text-brand-ink tracking-[2px]">Имэйл илгээлээ</h2>
              <p className="text-brand-sub text-[13px] leading-relaxed">
                Нууц үг сэргээх заавар бүхий имэйлийг <b>{email}</b> хаяг руу илгээлээ. Имэйлээ шалгана уу.
              </p>
            </div>
            <Link to="/login" className="inline-flex items-center gap-2 text-brand-ink font-medium text-[13px] hover:underline pt-4">
              Нэвтрэх хуудас руу буцах
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-8 text-center">
              <h2 className="text-2xl font-normal text-brand-ink normal-case tracking-[2px]">Нууц үг мартах</h2>
              <p className="text-brand-sub text-[13px]">И-мэйл хаягтаа нууц үг сэргээх холбоос хүлээн авна уу.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">И-мэйл хаяг</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className={`w-full h-11 bg-brand-surface border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px] ${error ? 'border-brand-danger' : 'border-brand-border'}`}
                  />
                </div>
                {error && <p className="text-brand-danger text-[11px] ml-1">{error}</p>}
              </div>

              <Button 
                type="submit"
                isLoading={loading}
                className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all"
              >
                Илгээх <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <div className="text-center pt-4 border-t border-brand-border">
                <Link to="/login" className="text-brand-sub text-[13px] hover:text-brand-ink transition-colors font-medium">
                  Буцах
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
