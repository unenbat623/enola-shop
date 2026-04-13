import { Search, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatCurrency } from '@/lib/utils'

export default function Header() {
  const cartTotal = useCartStore((state) => state.totalItems())
  const cartPrice = useCartStore((state) => state.totalPrice())
  const wishlistTotal = useWishlistStore((state) => state.totalItems())

  return (
    <header className="sticky top-0 bg-brand-base border-b border-brand-border z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-[18px] font-normal text-brand-ink flex-shrink-0 tracking-[4px] normal-case italic-none">
          Enola Shop
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-hint">
              <Search className="w-4 h-4 cursor-default" />
            </span>
            <input
              type="text"
              placeholder="Бүтээгдэхүүн хайх..."
              className="w-full h-10 bg-brand-surface border border-brand-border rounded-[6px] pl-10 pr-4 outline-none focus:border-brand-ink transition-all text-sm text-brand-ink placeholder:text-brand-hint"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/wishlist" className="p-2 transition-colors group">
            <Heart className="w-5 h-5 text-brand-sub group-hover:text-brand-ink transition-colors" />
          </Link>

          <Link to="/cart" className="flex items-center gap-2 p-1 transition-colors group">
            <div className="relative p-1">
              <ShoppingBag className="w-5 h-5 text-brand-sub group-hover:text-brand-ink transition-colors" />
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-ink text-[9px] font-bold text-brand-base w-4 h-4 rounded-full flex items-center justify-center">
                  {cartTotal}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-[11px] font-medium text-brand-ink">{formatCurrency(cartPrice)}</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-hint">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Хайх..."
            className="w-full h-10 border border-brand-border bg-brand-surface pl-10 pr-4 outline-none text-sm text-brand-ink rounded-[6px] focus:border-brand-ink"
          />
        </div>
      </div>
    </header>
  )
}
