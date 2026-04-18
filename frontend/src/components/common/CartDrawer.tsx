import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatCurrency } from '@/lib/utils'
import { Link } from 'react-router'

export default function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore()
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-[4px] z-[200] cursor-pointer"
          />

          {/* Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-brand-base z-[201] flex flex-col border-l border-brand-border shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-brand-border bg-white">
                <div className="flex items-center gap-4">
                  <h2 className="text-[16px] font-black text-brand-ink uppercase tracking-[3px]">Миний сагс</h2>
                  <span className="bg-brand-ink text-[10px] font-black px-2.5 py-0.5 rounded-full text-white shadow-lg">
                    {items.length}
                  </span>
                </div>
                <button 
                  onClick={() => toggleCart(false)}
                  className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center hover:bg-brand-surface transition-all active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                    <div className="w-24 h-24 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center text-brand-ghost shadow-inner">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-brand-ink font-black text-[15px] uppercase tracking-widest">Таны сагс хоосон байна</p>
                       <p className="text-brand-sub text-[13px] font-medium">Шинэ цуглуулгаас сонголт хийгээрэй.</p>
                    </div>
                    <Link 
                      to="/shop" 
                      onClick={() => toggleCart(false)}
                      className="text-brand-ink text-[12px] font-black tracking-[2px] uppercase border-b border-brand-ink pb-1 hover:opacity-70 transition-opacity"
                    >
                      Дэлгүүр хэсэх
                    </Link>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div 
                        layout
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-6 py-6 border-b border-brand-border last:border-0 group"
                      >
                        <div className="w-24 h-32 bg-brand-surface rounded-[12px] overflow-hidden flex-shrink-0 border border-brand-border shadow-sm">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start gap-4">
                               <h3 className="text-[14px] font-bold text-brand-ink leading-tight line-clamp-2">{item.name}</h3>
                               <button 
                                onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                                className="text-brand-hint hover:text-brand-danger transition-colors p-1"
                               >
                                <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {item.selectedSize && <span className="text-[10px] font-black text-brand-sub uppercase bg-brand-surface px-2 py-0.5 rounded border border-brand-border">{item.selectedSize}</span>}
                                {item.selectedColor && <span className="text-[10px] font-black text-brand-sub uppercase bg-brand-surface px-2 py-0.5 rounded border border-brand-border">{item.selectedColor}</span>}
                              </div>
                            )}
                            <p className="text-brand-ink font-black text-[15px] pt-1">{formatCurrency(item.price)}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-brand-border rounded-[8px] bg-brand-surface h-9 shadow-sm overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                className="w-8 h-full flex items-center justify-center hover:bg-white text-brand-hint hover:text-brand-ink transition-all active:scale-90"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-[12px] font-black text-brand-ink">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                className="w-8 h-full flex items-center justify-center hover:bg-white text-brand-hint hover:text-brand-ink transition-all active:scale-90"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[12px] font-black text-brand-sub">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-8 md:p-10 border-t border-brand-border bg-white space-y-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-brand-hint font-black text-[10px] uppercase tracking-[2px]">Нийт төлөх дүн:</span>
                       <p className="text-brand-ink font-medium text-[14px]">Татвар болон хүргэлт тооцогдсон</p>
                    </div>
                    <span className="text-[28px] font-black text-brand-ink tracking-tight">{formatCurrency(totalPrice())}</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link 
                      to="/checkout"
                      onClick={() => toggleCart(false)}
                      className="group w-full h-14 bg-brand-ink text-brand-base flex items-center justify-center rounded-[12px] font-black text-[13px] tracking-[2.5px] hover:bg-brand-ink2 transition-all uppercase shadow-2xl shadow-brand-ink/20"
                    >
                      Захиалга өгөх <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to="/cart" 
                      onClick={() => toggleCart(false)}
                      className="flex items-center justify-center bg-transparent border-2 border-brand-border h-14 rounded-[12px] font-black text-[12px] tracking-[2px] text-brand-sub uppercase hover:border-brand-ink hover:text-brand-ink transition-all"
                    >
                      Сагс дэлгэрэнгүй
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
