import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router'
import { X, Heart, User, LogOut, ChevronRight } from 'lucide-react'
import { categories } from '@/lib/constants'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, logout } = useAuthStore()
  const wishlistTotal = useWishlistStore((state) => state.totalItems())
  const location = useLocation()

  const navLinks = [
    { name: 'Нүүр', path: '/' },
    { name: 'Дэлгүүр', path: '/shop' },
    { name: 'Шинэ цуглуулга', path: '/shop?filter=new' },
    { name: 'Хямдрал', path: '/shop?filter=sale' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[300px] bg-brand-base z-[101] shadow-2xl flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <span className="text-[16px] font-normal tracking-[4px] uppercase italic-none">Enola Shop</span>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-brand-ink hover:bg-brand-surface rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Profile Section */}
              <div className="p-6 bg-brand-surface border-b border-brand-border">
                {isAuthenticated && user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-ink text-brand-base flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-ink">{user.name}</p>
                        <p className="text-xs text-brand-hint lowercase">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <Link 
                        to={user.role === 'admin' ? '/admin' : '/orders'} 
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 h-10 bg-white border border-brand-border rounded-[8px] text-[11px] font-bold uppercase tracking-wider"
                       >
                         {user.role === 'admin' ? 'Админ' : 'Захиалга'}
                       </Link>
                       <button 
                         onClick={() => { logout(); onClose(); }}
                         className="flex items-center justify-center gap-2 h-10 bg-brand-danger/10 text-brand-danger rounded-[8px] text-[11px] font-bold uppercase tracking-wider"
                       >
                         Гарах
                       </button>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-brand-ink text-brand-base rounded-[10px] text-[11px] font-bold uppercase tracking-[2px] shadow-lg shadow-brand-ink/20"
                  >
                    <User className="w-4 h-4" /> Нэвтрэх
                  </Link>
                )}
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <span className="px-4 py-2 text-[10px] font-black text-brand-hint uppercase tracking-[3px]">Цэс</span>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-[12px] transition-all",
                      location.pathname === link.path ? "bg-brand-muted text-brand-ink" : "text-brand-sub hover:bg-brand-surface"
                    )}
                  >
                    <span className="text-[14px] font-medium tracking-tight">{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}
              </div>

              {/* Category Links */}
              <div className="p-4 space-y-1">
                <span className="px-4 py-2 text-[10px] font-black text-brand-hint uppercase tracking-[3px]">Ангилал</span>
                <div className="grid grid-cols-1 gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-3.5 hover:bg-brand-surface rounded-[12px] transition-colors group"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-[14px] font-medium tracking-tight text-brand-ink">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-brand-border bg-brand-surface gap-4 flex flex-col">
               <Link to="/wishlist" onClick={onClose} className="relative flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-brand-sub group-hover:text-brand-sale transition-colors" />
                    <span className="text-[13px] font-medium text-brand-ink">Хүслийн жагсаалт</span>
                  </div>
                  {wishlistTotal > 0 && (
                    <span className="bg-brand-sale text-brand-base text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistTotal}
                    </span>
                  )}
               </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
