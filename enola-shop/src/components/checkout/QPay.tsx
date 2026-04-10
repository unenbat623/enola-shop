import { useState, useEffect } from 'react'
import { QrCode, RefreshCcw, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  amount: number
  onSuccess: () => void
}

export default function QPay({ amount, onSuccess }: Props) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    const successTimer = setTimeout(() => {
      onSuccess()
    }, 20000) // Auto success for simulation

    return () => clearTimeout(successTimer)
  }, [onSuccess])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white p-9 rounded-[10px] border border-brand-border space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-normal text-brand-ink uppercase tracking-tight">QPay-р төлөх</h2>
        <p className="text-brand-sub text-[13px]">Доорх QR кодыг сканнердаж төлбөрөө баталгаажуулна уу.</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* QR Placeholder */}
        <div className="relative group">
          <div className="w-56 h-56 bg-brand-surface p-6 rounded-[10px] border border-brand-border flex items-center justify-center overflow-hidden">
            <svg width="180" height="180" viewBox="0 0 100 100" className="text-brand-ink">
              <path d="M0 0h34v34H0zM2 2h30v30H2z" fill="currentColor" />
              <path d="M8 8h18v18H8z" fill="currentColor" />
              <path d="M66 0h34v34H06h-34zM68 2h30v30H68z" fill="currentColor" />
              <path d="M74 8h18v18H74z" fill="currentColor" />
              <path d="M0 66h34v34H0zM2 68h30v30H2z" fill="currentColor" />
              <path d="M8 74h18v18H8z" fill="currentColor" />
              <path d="M40 40h20v20H40zM45 45h10v10H45z" fill="currentColor" />
              <path d="M60 60h10v10H60zM70 70h10v10H70z" fill="currentColor" opacity="0.6" />
            </svg>
            
            {timeLeft <= 0 && (
              <div className="absolute inset-0 bg-brand-base/95 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-brand-sale text-sm font-medium mb-4 uppercase tracking-wider">Хугацаа дууссан</p>
                <button 
                  onClick={() => setTimeLeft(600)}
                  className="p-3 bg-brand-ink text-brand-base rounded-full hover:rotate-180 transition-transform duration-500"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-ink rounded-full flex items-center justify-center text-brand-base border-2 border-brand-base">
            <QrCode className="w-4 h-4" />
          </div>
        </div>

        {/* Timer & Amount */}
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
            <span className="text-[12px] text-brand-sub font-normal">Төлбөр шалгаж байна...</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { step: '1', text: 'Апп нээх' },
          { step: '2', text: 'QR скан' },
          { step: '3', text: 'Баталгаажуулах' }
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-muted flex items-center justify-center text-[10px] font-bold text-brand-ink">
              {item.step}
            </span>
            <span className="text-[9px] text-brand-hint uppercase tracking-[1px] font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSuccess}
        className="w-full h-10 border border-brand-border text-brand-hint hover:text-brand-ink font-medium text-[10px] uppercase tracking-[2px] rounded-[6px] transition-all"
      >
        Симуляц: Амжилттай болгох
      </button>
    </div>
  )
}
