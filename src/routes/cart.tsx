import { Link } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50/50">
         <div className="w-24 h-24 bg-white shadow-xl shadow-gray-200/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
         </div>
         <h2 className="text-2xl font-black mb-2">Таны сагс хоосон байна</h2>
         <p className="text-muted font-medium mb-8">Дэлгүүрээр зочилж бараа нэмээрэй.</p>
         <Link to="/shop" className="bg-primary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
           Дэлгүүр хэсэх
         </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black tracking-tight mb-8">Миний сагс</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Cart Items */}
           <div className="flex-1 space-y-4">
             {items.map((item) => (
               <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6">
                 {/* Image */}
                 <Link to={`/product/${item.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                 </Link>
                 
                 {/* Info */}
                 <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                       <div>
                         <Link to={`/shop?category=${item.categorySlug}`} className="text-[10px] uppercase tracking-widest font-black text-primary hover:underline">
                           {item.category}
                         </Link>
                         <h3 className="font-bold text-lg leading-tight mt-1">
                           <Link to={`/product/${item.slug}`} className="hover:text-primary transition-colors">
                             {item.name}
                           </Link>
                         </h3>
                       </div>
                       <button 
                         onClick={() => removeItem(item.id)}
                         className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                       <div className="flex items-center border-2 border-gray-100 rounded-lg h-10 bg-gray-50">
                         <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-full flex items-center justify-center font-bold text-gray-500 hover:text-foreground cursor-pointer">-</button>
                         <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-full flex items-center justify-center font-bold text-gray-500 hover:text-foreground cursor-pointer">+</button>
                       </div>
                       
                       <div className="text-right">
                         <span className="text-sm font-bold text-muted mr-3 hidden sm:inline-block">{item.quantity} × {formatCurrency(item.price)}</span>
                         <span className="text-xl font-black text-primary">{formatCurrency(item.price * item.quantity)}</span>
                       </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>

           {/* Summary Sidebar */}
           <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
                 <h3 className="text-xl font-black mb-6">Захиалгын дүн</h3>
                 
                 <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm font-bold text-muted">
                       <span>Нийт үнэ</span>
                       <span className="text-foreground">{formatCurrency(totalPrice())}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-muted border-b border-gray-100 pb-4">
                       <span>Хүргэлт</span>
                       <span className="text-green-500">Үнэгүй</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                       <span className="text-base font-black">Төлөх дүн</span>
                       <span className="text-3xl font-black text-primary">{formatCurrency(totalPrice())}</span>
                    </div>
                 </div>

                 <button className="w-full h-14 bg-foreground text-white rounded-xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl cursor-pointer group">
                   Захиалах <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
                 
                 <div className="mt-6 flex items-center justify-center gap-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Khan_Bank_logo.svg/1024px-Khan_Bank_logo.svg.png" alt="Khan Bank" className="h-6 object-contain grayscale opacity-50" />
                    <span className="text-xs font-black tracking-widest text-gray-300">QPAY</span>
                    <span className="text-xs font-black tracking-widest text-gray-300">SOCIALPAY</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
