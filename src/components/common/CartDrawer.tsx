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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[200] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-black">Таны сагс</h2>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={() => toggleCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">Таны сагс хоосон байна.</p>
                  <Link 
                    to="/shop" 
                    onClick={() => toggleCart(false)}
                    className="bg-primary text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-primary-dark transition-all"
                  >
                    Дэлгүүрээр зочлох
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-black text-sm">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
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
              <div className="p-6 border-t bg-gray-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Нийт дүн:</span>
                  <span className="text-2xl font-black text-primary">{formatCurrency(totalPrice())}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/cart" 
                    onClick={() => toggleCart(false)}
                    className="flex items-center justify-center bg-white border border-gray-200 py-4 rounded-md font-bold text-sm hover:border-primary hover:text-primary transition-all"
                  >
                    Сагс руу очих
                  </Link>
                  <button className="bg-[#111827] text-white py-4 rounded-md font-bold text-sm hover:bg-black transition-all shadow-lg hover:shadow-primary/20">
                    Худалдан авах
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
