import { Building, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  selected: 'qpay' | 'socialpay' | 'bank' | null
  onSelect: (method: 'qpay' | 'socialpay' | 'bank') => void
}

export default function PaymentSelector({ selected, onSelect }: Props) {
  const methods = [
    {
      id: 'qpay',
      title: 'QPay QR код',
      desc: 'QPay апп-аар QR скан хийж төл',
      badge: 'Хамгийн түгээмэл',
      icon: <div className="w-12 h-12 bg-[#0057b7] rounded-full flex items-center justify-center text-white font-bold text-xl select-none">Q</div>
    },
    {
      id: 'socialpay',
      title: 'SocialPay',
      desc: 'Khan Bank SocialPay апп-аар төл',
      icon: <div className="w-12 h-12 bg-[#00a651] rounded-full flex items-center justify-center text-white font-bold text-xl select-none">S</div>
    },
    {
      id: 'bank',
      title: 'Дансаар шилжүүлэх',
      desc: 'Голомт, Khan, TDB, Хаан банк',
      icon: <div className="w-12 h-12 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center text-brand-ink"><Building className="w-5 h-5" /></div>
    }
  ]

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <label
          key={method.id}
          className={cn(
            "group flex items-center gap-6 p-5 rounded-[10px] border cursor-pointer transition-all duration-300",
            selected === method.id 
              ? "bg-brand-muted border-brand-ink ring-[0.5px] ring-brand-ink" 
              : "bg-brand-surface border-brand-border hover:border-brand-hint"
          )}
        >
          <input
            type="radio"
            name="payment"
            className="hidden"
            checked={selected === method.id}
            onChange={() => onSelect(method.id as any)}
          />
          
          {/* Icon */}
          <div className="flex-shrink-0">
            {method.icon}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-3">
              <h3 className="font-medium text-brand-ink normal-case tracking-tight text-[14px]">{method.title}</h3>
              {method.badge && (
                <span className="bg-brand-ink text-brand-base text-[9px] font-bold px-2 py-0.5 rounded-[3px] normal-case tracking-wider">
                  {method.badge}
                </span>
              )}
            </div>
            <p className="text-brand-sub text-[12px] font-normal">{method.desc}</p>
          </div>

          {/* Selector */}
          <div className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
            selected === method.id ? "bg-brand-ink border-brand-ink" : "border-brand-ghost group-hover:border-brand-hint"
          )}>
            {selected === method.id && <Check className="w-3 h-3 text-brand-base stroke-[3px]" />}
          </div>
        </label>
      ))}
    </div>
  )
}
