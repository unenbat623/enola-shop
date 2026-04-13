import { useState } from 'react'
import { Copy, Check, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Props {
  amount: number
  orderId: string
  onDone: () => void
}

export default function BankTransfer({ amount, orderId, onDone }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const banks = [
    { name: 'Голомт банк', account: '1234567890', owner: 'Enola Shop llc' },
    { name: 'Хаан банк', account: '5000123456', owner: 'Enola Shop llc' }
  ]

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="bg-white p-9 rounded-[10px] border border-brand-border space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-normal text-brand-ink normal-case tracking-tight">Дансаар шилжүүлэх</h2>
        <p className="text-brand-sub text-[13px]">Доорх данснуудын аль нэг рүү шилжүүлэг хийнэ үү.</p>
      </div>

      <div className="space-y-4">
        {banks.map((bank, i) => (
          <div key={i} className="bg-brand-surface p-5 rounded-[8px] border border-brand-border space-y-3">
             <div className="flex justify-between items-center bg-brand-muted px-3 py-1.5 rounded-[4px]">
               <span className="text-[11px] font-medium text-brand-ink normal-case tracking-wider">{bank.name}</span>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center group">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-brand-hint normal-case tracking-wider font-bold">Дансны дугаар</p>
                    <p className="text-brand-ink font-mono font-medium">{bank.account}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(bank.account, `acc-${i}`)}
                    className="p-2 text-brand-hint hover:text-brand-ink transition-colors bg-brand-muted rounded-[4px]"
                  >
                    {copiedField === `acc-${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-brand-hint normal-case tracking-wider font-bold">Хүлээн авагч</p>
                    <p className="text-brand-ink font-medium text-[13px]">{bank.owner}</p>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Reference Code */}
      <div className="bg-brand-ink p-7 rounded-[10px] flex flex-col items-center gap-4 text-brand-base">
        <p className="text-[11px] font-medium normal-case tracking-[2px]">Гүйлгээний утга (ЗААВАЛ)</p>
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 text-center text-2xl font-medium tracking-[4px] border border-brand-base/20 py-2 rounded-[6px] bg-brand-base/5">
            {orderId}
          </div>
          <button 
            onClick={() => copyToClipboard(orderId, 'ref')}
            className="p-3 bg-brand-base/10 rounded-[6px] hover:bg-brand-base/20 transition-all border border-brand-base/20"
          >
             {copiedField === 'ref' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="bg-brand-surface p-4 rounded-[8px] border border-brand-border flex gap-4">
         <AlertCircle className="w-5 h-5 text-brand-sale shrink-0" />
         <p className="text-[11px] text-brand-sub leading-relaxed">
           <span className="text-brand-sale font-bold">Санамж:</span> Гүйлгээний утгыг буруу оруулбал төлбөр баталгаажихгүй болохыг анхаарна уу. Шилжүүлэг хийсэн бол доорх товчийг дарна уу.
         </p>
      </div>

      <button
        onClick={onDone}
        className="w-full h-12 bg-brand-ink text-brand-base font-normal text-[12px] normal-case tracking-wide rounded-[6px] hover:bg-brand-ink2 transition-all"
      >Шилжүүлсэн, хүлээх</button>
    </div>
  )
}
