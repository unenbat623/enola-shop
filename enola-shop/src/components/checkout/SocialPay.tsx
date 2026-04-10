import { useState, useEffect } from 'react'
import { QrCode, Phone, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  amount: number
  onSuccess: () => void
}

export default function SocialPay({ amount, onSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<'qr' | 'phone'>('qr')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [timeLeft, setTimeLeft] = useState(600)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white p-9 rounded-[10px] border border-brand-border space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-normal text-brand-ink uppercase tracking-tight">SocialPay-р төлөх</h2>
        <div className="flex p-1 bg-brand-surface rounded-[6px] border border-brand-border mt-5">
          <button
            onClick={() => setActiveTab('qr')}
            className={cn(
              "flex-1 py-2 text-[11px] font-medium uppercase tracking-wider rounded-[4px] transition-all flex items-center justify-center gap-2",
              activeTab === 'qr' ? "bg-brand-ink text-brand-base" : "text-brand-hint hover:text-brand-ink"
            )}
          >
            <QrCode className="w-3.5 h-3.5" /> QR Скан
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={cn(
              "flex-1 py-2 text-[11px] font-medium uppercase tracking-wider rounded-[4px] transition-all flex items-center justify-center gap-2",
              activeTab === 'phone' ? "bg-brand-ink text-brand-base" : "text-brand-hint hover:text-brand-ink"
            )}
          >
            <Phone className="w-3.5 h-3.5" /> Утасны дугаар
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {activeTab === 'qr' ? (
          <div className="w-56 h-56 bg-brand-surface p-6 rounded-[10px] border border-brand-border flex items-center justify-center">
             <svg width="180" height="180" viewBox="0 0 100 100" className="text-brand-ink">
              <path d="M0 0h34v34H0zM2 2h30v30H2z" fill="currentColor" />
              <path d="M66 0h34v34H0z" fill="currentColor" />
              <path d="M0 66h34v34H0z" fill="currentColor" />
              <path d="M40 40h20v20H40z" fill="currentColor" />
            </svg>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-brand-sub uppercase tracking-wider ml-1">Утасны дугаар</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="8888-8888"
                className="w-full h-11 bg-brand-surface border border-brand-border rounded-[6px] px-4 text-brand-ink outline-none focus:border-brand-ink focus:bg-white transition-all text-sm"
              />
            </div>
            <button className="w-full h-11 bg-brand-ink text-brand-base font-normal text-[11px] uppercase tracking-wider rounded-[6px]">
              НЭМЭЛТ ИЛГЭЭХ
            </button>
            <p className="text-[11px] text-brand-hint text-center">Таны SocialPay апп руу төлбөрийн нэхэмжлэх очих болно.</p>
          </div>
        )}

        <div className="w-full space-y-4">
          <div className="bg-brand-surface p-5 rounded-[10px] border border-brand-border flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-brand-sub uppercase tracking-wider">Төлөх дүн</p>
              <p className="text-xl font-semibold text-brand-ink">{formatCurrency(amount)}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-medium text-brand-sub uppercase tracking-wider">Хүчинтэй хугацаа</p>
              <p className={cn(
                "text-xl font-medium font-mono",
                timeLeft < 120 ? "text-brand-danger" : "text-brand-ink"
              )}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-2">
            <Loader2 className="w-3.5 h-3.5 text-brand-ink animate-spin" />
            <span className="text-[12px] text-brand-sub font-normal">Апп-аас баталгаажуулна уу...</span>
          </div>
        </div>
      </div>

      <button
        onClick={onSuccess}
        className="w-full h-12 bg-brand-ink text-brand-base font-normal text-[12px] uppercase tracking-wide rounded-[6px] hover:bg-brand-ink2 transition-all"
      >
        ТӨЛБӨР БАТАЛГААЖСАН
      </button>
    </div>
  )
}
