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
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-primary flex-shrink-0">
          Enola <span className="text-foreground">Shop</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Бүтээгдэхүүн хайх..."
              className="w-full h-11 border border-gray-200 rounded-l-md px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
            />
            <button className="h-11 px-6 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-all flex items-center gap-2 font-medium">
              <Search className="w-4 h-4" />
              <span>Хайх</span>
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          <Link to="/wishlist" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group">
            <Heart className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            {wishlistTotal > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistTotal}
              </span>
            )}
          </Link>

          <Link to="/cart" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group border border-transparent hover:border-gray-100">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartTotal}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-[11px] text-muted font-medium">Сагс</span>
              <span className="text-sm font-bold">{formatCurrency(cartPrice)}</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Хайх..."
            className="w-full h-10 border border-gray-100 bg-gray-50 rounded-l-md px-4 outline-none text-sm"
          />
          <button className="h-10 px-4 bg-primary text-white rounded-r-md">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
