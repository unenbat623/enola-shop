import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export default function OrderSummary() {
  const { items, totalPrice } = useCartStore()
  const subtotal = totalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="bg-white p-9 rounded-[10px] border border-brand-border h-fit sticky top-24 space-y-8">
      <h2 className="text-xl font-normal text-brand-ink normal-case tracking-tight">Захиалгын хураангуй</h2>
      
      {/* Items list */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 group">
            <div className="w-16 h-20 bg-brand-surface border border-brand-border rounded-[4px] overflow-hidden flex-shrink-0">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1">
              <h4 className="text-[13px] font-normal text-brand-ink line-clamp-1">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-brand-hint font-medium tracking-wide normal-case">{item.quantity} x {formatCurrency(item.price)}</span>
                <span className="text-[13px] font-medium text-brand-ink">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-4 pt-6 border-t border-brand-border">
        <div className="flex justify-between text-[11px] normal-case tracking-wider">
          <span className="text-brand-sub font-medium">Дэд дүн</span>
          <span className="text-brand-ink font-bold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[11px] normal-case tracking-wider">
          <span className="text-brand-sub font-medium">Хүргэлт</span>
          <span className={shipping === 0 ? "text-brand-success font-bold" : "text-brand-ink font-bold"}>
            {shipping === 0 ? 'ҮНэгүй' : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between items-end pt-5 border-t border-brand-border">
          <span className="text-[12px] font-medium text-brand-sub normal-case tracking-[2px]">Нийт дүн</span>
          <span className="text-2xl font-semibold text-brand-ink">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="text-[10px] text-brand-hint leading-relaxed text-center px-4 normal-case tracking-wider">
        Бүх үнэд НӨАТ багтсан болно.
      </div>
    </div>
  )
}
