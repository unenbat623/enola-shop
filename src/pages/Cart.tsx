import { Link } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  const subtotal = totalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-base gap-6 px-4">
        <div className="w-20 h-20 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center text-brand-ghost">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-normal text-brand-ink tracking-widest">Сагс хоосон байна</h2>
          <p className="text-brand-sub text-[13px]">Шилдэг бүтээгдэхүүнээ олж сагсандаа нэмэарэй.</p>
        </div>
        <Link to="/shop" className="mt-2 h-12 px-10 bg-brand-ink text-brand-base rounded-[6px] flex items-center gap-2 text-[12px] tracking-[1.5px] font-medium hover:bg-brand-ink2 transition-all">
          Дэлгүүр рүү явах
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-base min-h-screen py-12 md:py-20 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-normal text-brand-ink tracking-tight mb-12">Таны сагс</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[10px] border border-brand-border flex flex-col sm:flex-row gap-6">
                <Link to={`/product/${item.slug}`} className="w-24 h-32 bg-brand-surface rounded-[6px] overflow-hidden flex-shrink-0 border border-brand-border">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <p className="text-[10px] font-bold text-brand-hint tracking-[1.5px]">{item.category}</p>
                      <Link to={`/product/${item.slug}`} className="font-normal text-base text-brand-ink hover:text-brand-ink2 transition-colors">
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-brand-hint hover:text-brand-danger transition-colors"
                      aria-label="Устгах"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    {/* Qty control */}
                    <div className="flex items-center border border-brand-border rounded-[4px] h-9 bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-medium text-[13px] text-brand-ink border-x border-brand-border h-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-lg font-medium text-brand-ink">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white p-8 rounded-[10px] border border-brand-border sticky top-24 space-y-8">
              <h3 className="text-lg font-normal text-brand-ink">Захиалгын дүн</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-[13px] text-brand-sub">
                  <span>Барааны үнэ</span>
                  <span className="text-brand-ink font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[13px] text-brand-sub border-b border-brand-border pb-4">
                  <span>Хүргэлт</span>
                  <span className={shipping === 0 ? 'text-brand-success font-bold' : 'text-brand-ink font-medium'}>
                    {shipping === 0 ? 'Үнэгүй' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-[13px] font-medium text-brand-sub">Нийт дүн</span>
                  <span className="text-2xl font-medium text-brand-ink">{formatCurrency(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-[11px] text-brand-hint bg-brand-surface rounded-[6px] p-3">
                  {formatCurrency(100000 - subtotal)}-ийн бараа нэмж үнэгүй хүргэлт авах боломжтой.
                </p>
              )}

              <Link
                to="/checkout"
                className="w-full h-12 bg-brand-ink text-brand-base rounded-[6px] flex items-center justify-center gap-2 font-normal text-[12px] tracking-[1.5px] hover:bg-brand-ink2 transition-all"
              >
                Захиалах <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="border-t border-brand-border pt-6 flex items-center justify-center gap-6 opacity-40">
                <span className="text-[10px] font-bold tracking-[2px] text-brand-ink">QPAY</span>
                <span className="text-[10px] font-bold tracking-[2px] text-brand-ink">SOCIALPAY</span>
                <span className="text-[10px] font-bold tracking-[2px] text-brand-ink">BANK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
