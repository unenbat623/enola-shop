import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
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
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-brand-ink/50 backdrop-blur-[1px] z-[200] cursor-pointer"
          />

          {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-brand-base z-[201] flex flex-col border-l border-brand-border shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <h2 className="text-[15px] font-normal text-brand-ink normal-case tracking-[2px]">Миний сагс</h2>
                  <span className="bg-brand-muted text-[10px] font-bold px-2 py-0.5 rounded-full text-brand-sub">
                    {items.length}
                  </span>
                </div>
                <button 
                  onClick={() => toggleCart(false)}
                  className="p-2 hover:bg-brand-surface rounded-full transition-colors cursor-pointer text-brand-sub"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center text-brand-ghost">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="text-brand-sub text-[13px]">Сагс хоосон байна</p>
                    <Link 
                      to="/shop" 
                      onClick={() => toggleCart(false)}
                      className="text-brand-ink text-[12px] font-medium tracking-wider normal-case border-b border-brand-ink"
                    >
                      Дэлгүүр рүү буцах
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-brand-border last:border-0 group">
                      <div className="w-20 h-24 bg-brand-surface rounded-[6px] overflow-hidden flex-shrink-0 border border-brand-border">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300" loading="lazy" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-[13px] font-normal text-brand-ink line-clamp-1">{item.name}</h3>
                          <p className="text-brand-ink font-medium text-[13px]">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-brand-border rounded-[4px] bg-brand-surface">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2 hover:text-brand-ink transition-colors cursor-pointer text-brand-hint"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-[12px] font-medium text-brand-ink">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 hover:text-brand-ink transition-colors cursor-pointer text-brand-hint"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-brand-hint hover:text-brand-ink transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-8 border-t border-brand-border bg-brand-base space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-sub font-normal text-[11px] normal-case tracking-wider">Дүн:</span>
                    <span className="text-[16px] font-medium text-brand-ink">{formatCurrency(totalPrice())}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/checkout"
                      onClick={() => toggleCart(false)}
                      className="w-full h-12 bg-brand-ink text-brand-base flex items-center justify-center rounded-[6px] font-medium text-[12px] tracking-[1.5px] hover:bg-brand-ink2 transition-all normal-case"
                    >
                      Захиалга өгөх
                    </Link>
                    <Link 
                      to="/cart" 
                      onClick={() => toggleCart(false)}
                      className="flex items-center justify-center bg-transparent border border-brand-border h-12 rounded-[6px] font-medium text-[11px] tracking-wider text-brand-sub normal-case hover:bg-brand-surface transition-all"
                    >
                      Сагс харах
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
