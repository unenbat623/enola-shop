import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { Link } from 'react-router'
import { type Product } from '@/lib/types'
import { formatCurrency, calculateDiscountPercentage, cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from '@/components/common/Toast'
import { useUIStore } from '@/store/uiStore'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toggleCart } = useUIStore()
  
  const isWishlisted = isInWishlist(product.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`"${product.name}" сагсанд нэмэгдлээ.`)
    toggleCart(true)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    if (!isWishlisted) {
      toast.info(`"${product.name}" хүслийн жагсаалтад орлоо.`)
    }
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
      {/* Image Panel */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className={cn(
              "px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase text-white shadow-sm",
              product.badge === 'NEW' ? 'bg-green-500' : product.badge === 'SALE' ? 'bg-red-500' : 'bg-primary'
            )}>
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#111827] text-white px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase">
              -{calculateDiscountPercentage(product.price, product.originalPrice)}%
            </span>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
          <button 
            onClick={handleWishlist}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-y-4 group-hover:translate-y-0 cursor-pointer",
              isWishlisted ? "bg-primary text-white" : "bg-white text-foreground hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </button>
          <Link 
            to={`/product/${product.slug}`}
            className="w-12 h-12 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-[50ms] cursor-pointer"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Quick Add Button */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-100">
           <button 
            onClick={handleAdd}
            className="w-full h-11 bg-white text-foreground hover:bg-primary hover:text-white rounded-md flex items-center justify-center gap-2 font-black text-[12px] uppercase tracking-widest shadow-xl transition-all border border-gray-100 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Сагсанд нэмэх
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="space-y-1">
          <Link to={`/product/${product.slug}`} className="text-muted text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
            {product.category}
          </Link>
          <h3 className="font-bold text-base leading-tight">
            <Link to={`/product/${product.slug}`} className="hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />
            ))}
          </div>
          <span className="text-[10px] text-muted font-bold ml-1">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-xl font-black text-primary">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted font-medium line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
