import { useState } from 'react'
import { Link } from 'react-router'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginForm() {
  return (
    <div className="bg-brand-base border border-brand-border rounded-[10px] p-9 w-full max-w-[400px] shadow-none mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <h2 className="text-2xl font-normal text-brand-ink normal-case tracking-[2px]">Нэвтрэх</h2>
        <p className="text-brand-sub text-[13px]">Enola Shop ертөнцөд тавтай морил.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">И-мэйл хаяг</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full h-11 bg-brand-surface border border-brand-border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium normal-case tracking-[1px] ml-1">Нууц үг</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-hint">
              <Lock className="w-3.5 h-3.5" />
            </span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 bg-brand-surface border border-brand-border rounded-[6px] pl-11 pr-4 text-brand-ink placeholder:text-brand-hint focus:border-brand-ink focus:bg-white outline-none transition-all text-[14px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 border-brand-border rounded accent-brand-ink" id="remember" />
            <label htmlFor="remember" className="text-[12px] text-brand-sub font-normal cursor-pointer">Сануулах</label>
          </div>
          <button type="button" className="text-[12px] text-brand-ink font-medium hover:underline">Мартсан?</button>
        </div>

        <button 
          className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all flex items-center justify-center gap-2"
        >
          Нэвтрэх <ArrowRight className="w-3.5 h-3.5" />
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
