import { useParams } from 'react-router'
import { products } from '@/lib/mock-data'
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { toast } from '@/components/common/Toast'
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toggleCart } = useUIStore()

  if (!product) {
    return <div className="bg-brand-base min-h-screen py-40 text-center font-medium text-2xl text-brand-white">Product not found.</div>
  }

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    // Add multiple quantities
    for(let i=0; i<qty; i++) {
       addItem(product)
    }
    toast.success(`"${product.name}" added to cart.`)
    toggleCart(true)
  }

  const handleWishlist = () => {
    toggleItem(product)
    if(!isWishlisted) toast.info(`"${product.name}" added to wishlist.`)
  }

  return (
    <div className="bg-brand-base min-h-screen pb-40">
      {/* Breadcrumb limit */}
      <div className="border-b border-brand-border bg-brand-muted h-10 flex items-center">
         <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-2 text-[11px] font-bold text-brand-sub uppercase tracking-wider">
            <Link to="/" className="hover:text-brand-mint transition-colors">HOME</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-brand-mint transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-brand-white line-clamp-1">{product.name}</span>
         </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row gap-16">
        {/* Images */}
        <div className="w-full md:w-[50%] space-y-4">
          <div className="aspect-[4/5] bg-brand-muted rounded-[24px] overflow-hidden relative border border-brand-border">
             <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-90" />
             {product.badge && (
               <div className="absolute top-6 left-6">
                 <span className={cn(
                   "px-4 py-1.5 rounded-[6px] text-[10px] font-bold tracking-[2px] uppercase shadow-none",
                   product.badge === 'NEW' ? 'bg-brand-mint' : product.badge === 'SALE' ? 'bg-brand-sale text-white' : 'bg-brand-muted border border-brand-mint text-brand-mint'
                 )}
                 style={product.badge === 'NEW' ? { color: 'var(--accent-dark)' } : undefined}
               >{product.badge}</span>
               </div>
             )}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-[50%] flex flex-col pt-4">
          <Link to={`/shop?category=${product.categorySlug}`} className="text-brand-mint font-bold uppercase tracking-[2px] text-[11px] hover:underline w-fit mb-4">
            {product.category}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-medium text-brand-white leading-tight mb-6 uppercase tracking-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-brand-mint">
               {Array.from({ length: 5 }).map((_, i) => (
                 <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-brand-muted")} />
               ))}
               <span className="text-sm text-brand-white font-bold ml-2">{product.rating}</span>
            </div>
            <span className="text-brand-border">|</span>
            <span className="text-sm font-medium text-brand-sub">{product.reviewCount} customer reviews</span>
          </div>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-4xl font-bold text-brand-white">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-brand-hint font-medium line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="bg-brand-sale/10 text-brand-sale px-2 py-1 rounded-[4px] text-xs font-bold border border-brand-sale/20">
                  -{calculateDiscountPercentage(product.price, product.originalPrice)}%
                </span>
              </>
            )}
          </div>

          <p className="text-brand-sub leading-relaxed font-medium mb-12 pb-12 border-b border-brand-border">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center border border-brand-border rounded-[8px] h-12 w-32 bg-brand-muted">
               <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center font-bold text-brand-hint hover:text-brand-mint cursor-pointer transition-colors">-</button>
               <span className="flex-1 text-center font-bold text-brand-white">{qty}</span>
               <button onClick={() => setQty(q => q + 1)} className="w-10 h-full flex items-center justify-center font-bold text-brand-hint hover:text-brand-mint cursor-pointer transition-colors">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-brand-mint rounded-[8px] flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-wide hover:bg-brand-mint-dk transition-all shadow-none cursor-pointer"
              style={{ color: 'var(--accent-dark)' }}
            >
              <ShoppingBag className="w-5 h-5" /> ADD TO CART
            </button>
            <button 
              onClick={handleWishlist}
              className={cn(
                "w-12 h-12 rounded-[8px] border flex items-center justify-center transition-all cursor-pointer",
                isWishlisted ? "border-brand-mint bg-brand-mint" : "border-brand-border bg-brand-surface text-brand-hint hover:border-brand-mint hover:text-brand-mint"
              )}
              style={isWishlisted ? { color: 'var(--accent-dark)' } : undefined}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-4 p-5 bg-brand-surface rounded-[12px] border border-brand-border">
              <ShieldCheck className="w-6 h-6 text-brand-mint" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-brand-white uppercase tracking-wider">Quality Assurance</span>
                <span className="text-xs text-brand-sub font-medium">100% Original Product</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-brand-surface rounded-[12px] border border-brand-border">
              <Truck className="w-6 h-6 text-brand-mint" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-brand-white uppercase tracking-wider">Fast Delivery</span>
                <span className="text-xs text-brand-sub font-medium">Within 24-48 hours</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
