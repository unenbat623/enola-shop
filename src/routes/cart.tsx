import { Link } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-base">
         <div className="w-16 h-16 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center mb-6 text-brand-ghost">
            <ShoppingBag className="w-7 h-7" />
         </div>
         <h2 className="text-xl font-normal text-brand-ink mb-2 tracking-[1px] normal-case">Сагс хоосон байна</h2>
         <p className="text-brand-sub font-normal mb-8 text-[13px]">Shop our latest collection to define your style.</p>
         <Link to="/shop" className="text-brand-ink text-[12px] font-medium tracking-wider normal-case border-b border-brand-ink pb-0.5">
           Дэлгүүр рүү буцах
         </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-base min-h-screen py-20 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-normal text-brand-ink tracking-[2px] mb-12 normal-case">Your shopping bag</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
           {/* Cart Items */}
           <div className="flex-1 space-y-6">
             {items.map((item) => (
               <div key={item.id} className="bg-white p-6 rounded-[10px] border border-brand-border flex flex-col sm:flex-row gap-8">
                 {/* Image */}
                 <Link to={`/product/${item.slug}`} className="w-28 h-36 bg-brand-surface rounded-[6px] overflow-hidden flex-shrink-0 border border-brand-border">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-300" />
                 </Link>
                 
                 {/* Info */}
                 <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-4">
                       <div>
                          <Link to={`/shop?category=${item.categorySlug}`} className="text-[9px] normal-case tracking-[1.5px] font-bold text-brand-hint hover:text-brand-ink transition-colors">
                            {item.category}
                          </Link>
                          <h3 className="font-normal text-lg text-brand-ink leading-tight mt-1 transition-colors">
                            <Link to={`/product/${item.slug}`} className="hover:text-brand-ink">
                              {item.name}
                            </Link>
                          </h3>
                       </div>
                       <button 
                         onClick={() => removeItem(item.id)}
                         className="p-2 text-brand-hint hover:text-brand-ink transition-colors cursor-pointer bg-brand-surface rounded-full"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                       <div className="flex items-center border border-brand-border rounded-[4px] h-9 bg-brand-surface overflow-hidden">
                         <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors"><Minus className="w-3.5 h-3.5"/></button>
                         <span className="w-10 text-center font-medium text-[13px] text-brand-ink border-x border-brand-border h-full flex items-center justify-center">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors"><Plus className="w-3.5 h-3.5"/></button>
                       </div>
                       
                       <div className="text-right">
                         <span className="text-xl font-medium text-brand-ink">{formatCurrency(item.price * item.quantity)}</span>
                       </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>

           {/* Summary Sidebar */}
           <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="bg-white p-9 rounded-[10px] border border-brand-border shadow-none sticky top-24">
                 <h3 className="text-xl font-normal text-brand-ink mb-10 tracking-wide normal-case">Bag Summary</h3>
                 
                 <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center text-[12px] font-normal text-brand-sub normal-case tracking-wider">
                       <span>Дүн</span>
                       <span className="text-brand-ink font-medium">{formatCurrency(totalPrice())}</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] font-normal text-brand-sub normal-case tracking-wider border-b border-brand-border pb-6">
                       <span>Estimated delivery</span>
                       <span className="text-brand-success font-bold">Free</span>
                    </div>
                    <div className="flex justify-between items-end pt-5">
                       <span className="text-[13px] font-medium text-brand-sub tracking-[1px] normal-case">Total amount</span>
                       <span className="text-2xl font-semibold text-brand-ink">{formatCurrency(totalPrice())}</span>
                    </div>
                 </div>

                 <Link 
                   to="/checkout"
                   className="w-full h-12 bg-brand-ink text-brand-base rounded-[6px] flex items-center justify-center gap-3 font-normal text-[12px] normal-case tracking-[1.5px] hover:bg-brand-ink2 transition-all"
                 >
                   Proceed to checkout <ArrowRight className="w-4 h-4" />
                 </Link>
                 
                 <div className="mt-10 pt-10 border-t border-brand-border flex items-center justify-center gap-6 opacity-40 grayscale">
                    <span className="text-[10px] font-medium tracking-[2px] text-brand-ink normal-case">Qpay</span>
                    <span className="text-[10px] font-medium tracking-[2px] text-brand-ink normal-case">Socialpay</span>
                    <span className="text-[10px] font-medium tracking-[2px] text-brand-ink normal-case">Bank</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
