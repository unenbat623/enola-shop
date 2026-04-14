import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { type Product } from '@/lib/types'
import { formatCurrency, cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/components/common/Toast'
import { useUIStore } from '@/store/uiStore'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toggleCart } = useUIStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const isWishlisted = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Хадгалахын тулд нэвтэрнэ үү')
      navigate('/login')
      return
    }
    toggleItem(product)
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`"${product.name}" сагсанд нэмэгдлээ.`)
    toggleCart(true)
  }

  return (
    <div className="group bg-white rounded-[10px] overflow-hidden border border-brand-border hover:border-brand-ghost hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col relative">
      <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
        {/* Image Panel */}
        <div className="relative aspect-[3/4] bg-brand-surface overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]" 
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-[10px] left-[10px] flex flex-col gap-2 z-10">
            {product.badge === 'Шинэ' && (
              <span className="bg-brand-ink text-brand-base text-[9px] font-bold tracking-[1.5px] normal-case px-2 py-0.5 rounded-[3px]">Шинэ</span>
            )}
            {product.badge === 'Хямдрал' && (
              <span className="bg-brand-muted text-brand-sale border border-brand-border text-[9px] font-bold tracking-[1.5px] normal-case px-2 py-0.5 rounded-[3px]">Хямдрал</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className={cn(
              "absolute top-[10px] right-[10px] w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white border border-brand-border hover:border-brand-ink cursor-pointer z-10",
              isWishlisted ? "text-brand-sale border-brand-sale" : "text-brand-ghost"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
        </div>

        {/* Info Panel */}
        <div className="p-[14px] flex-1 flex flex-col gap-2">
          <div className="space-y-1">
            <span className="text-brand-hint text-[9px] font-bold normal-case tracking-[1.5px]">
              {product.category}
            </span>
            <h3 className="text-brand-ink text-[13px] font-normal leading-[1.4] line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-[14px] font-medium text-brand-ink">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-brand-ghost font-normal line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Button */}
      <div className="px-[14px] pb-[14px]">
        <button 
          onClick={handleAdd}
          className="w-full h-9 bg-brand-ink text-brand-base flex items-center justify-center gap-2 font-medium text-[11px] normal-case tracking-wider rounded-[6px] hover:bg-brand-ink2 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />Сагсанд нэмэх</button>
      </div>
    </div>
  )
}
