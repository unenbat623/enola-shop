import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import MobileMenu from '../common/MobileMenu'

export default function Header() {
  const cartTotal = useCartStore((state) => state.totalItems())
  const cartPrice = useCartStore((state) => state.totalPrice())
  const wishlistTotal = useWishlistStore((state) => state.totalItems())
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearchTrigger = () => {
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`)
    } else {
      navigate('/shop')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchTrigger()
    }
  }

  return (
    <>
      <header className="sticky top-0 bg-brand-base border-b border-brand-border z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1 text-brand-ink hover:bg-brand-surface rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-[18px] font-normal text-brand-ink flex-shrink-0 tracking-[4px] normal-case italic-none mr-auto lg:mr-0">
            Enola Shop
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full text-brand-hint focus-within:text-brand-ink transition-colors">
              <button 
                onClick={handleSearchTrigger}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brand-surface rounded-full transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Бүтээгдэхүүн хайх..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-10 bg-brand-surface border border-brand-border rounded-[6px] pl-10 pr-4 outline-none focus:border-brand-ink transition-all text-sm text-brand-ink placeholder:text-brand-hint"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-4">
            <Link to="/wishlist" className="p-2 transition-colors group relative hidden sm:block">
              <Heart className="w-5 h-5 text-brand-sub group-hover:text-brand-ink transition-colors" />
              {wishlistTotal > 0 && (
                <span className="absolute top-1 right-1 bg-brand-sale text-[9px] font-bold text-brand-base w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistTotal}
                </span>
              )}
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
              <div className="hidden lg:flex flex-col text-left leading-tight pr-2">
                <span className="text-[11px] font-medium text-brand-ink">{formatCurrency(cartPrice)}</span>
              </div>
            </Link>

            <div className="h-6 w-px bg-brand-border mx-2 hidden lg:block"></div>
            
            {isAuthenticated && user ? (
              <div className="relative group hidden lg:block">
                <Link to={user.role === 'admin' ? '/admin' : '/orders'} className="flex items-center gap-2 p-2 text-brand-ink">
                  <User className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest truncate max-w-[100px]">{user.name}</span>
                </Link>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-brand-border rounded-[8px] shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2 space-y-1">
                    <Link to={user.role === 'admin' ? '/admin' : '/orders'} className="block px-4 py-2 text-[12px] text-brand-ink hover:bg-brand-surface rounded-[4px]">
                      {user.role === 'admin' ? 'Админ самбар' : 'Миний захиалга'}
                    </Link>
                    <button onClick={() => logout()} className="w-full text-left px-4 py-2 text-[12px] text-brand-danger hover:bg-brand-danger/10 rounded-[4px]">
                      Гарах
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-[12px] font-bold uppercase tracking-widest text-brand-ink hover:text-brand-sub transition-colors hidden lg:block px-2">
                Нэвтрэх
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative text-brand-hint focus-within:text-brand-ink transition-colors">
            <button 
              onClick={handleSearchTrigger}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white rounded-full transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Хайх..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-10 border border-brand-border bg-brand-surface pl-10 pr-4 outline-none text-sm text-brand-ink rounded-[6px] focus:border-brand-ink"
            />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
