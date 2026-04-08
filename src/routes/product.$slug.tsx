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
    return <div className="py-40 text-center font-black text-2xl">Бүтээгдэхүүн олдсонгүй.</div>
  }

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    // Add multiple quantities
    for(let i=0; i<qty; i++) {
       addItem(product)
    }
    toast.success(`"${product.name}" сагсанд нэмэгдлээ.`)
    toggleCart(true)
  }

  const handleWishlist = () => {
    toggleItem(product)
    if(!isWishlisted) toast.info(`"${product.name}" хүслийн жагсаалтад орлоо.`)
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb limit */}
      <div className="border-b border-gray-100 bg-gray-50 h-10 flex items-center">
         <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-2 text-xs font-bold text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Нүүр</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{product.name}</span>
         </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative">
             <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
             {product.badge && (
               <div className="absolute top-6 left-6">
                 <span className={cn(
                  "px-4 py-2 rounded-md text-[11px] font-black tracking-widest uppercase text-white shadow-xl",
                  product.badge === 'NEW' ? 'bg-green-500' : product.badge === 'SALE' ? 'bg-red-500' : 'bg-primary'
                 )}>{product.badge}</span>
               </div>
             )}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col pt-4">
          <Link to={`/shop?category=${product.categorySlug}`} className="text-primary font-black uppercase tracking-widest text-[11px] hover:underline w-fit mb-2">
            {product.category}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-black leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-amber-400">
               {Array.from({ length: 5 }).map((_, i) => (
                 <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />
               ))}
               <span className="text-sm text-foreground font-black ml-2">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-bold text-muted">{product.reviewCount} сэтгэгдэл</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted font-medium line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="bg-[#111827] text-white px-2 py-1 rounded text-xs font-black">
                  -{calculateDiscountPercentage(product.price, product.originalPrice)}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted leading-relaxed font-medium mb-10 pb-10 border-b border-gray-100">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border-2 border-gray-100 rounded-xl h-14 w-32 bg-gray-50">
               <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center font-bold text-gray-400 hover:text-foreground cursor-pointer">-</button>
               <span className="flex-1 text-center font-black">{qty}</span>
               <button onClick={() => setQty(q => q + 1)} className="w-10 h-full flex items-center justify-center font-bold text-gray-400 hover:text-foreground cursor-pointer">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-primary text-white rounded-xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" /> Сагсанд нэмэх
            </button>
            <button 
              onClick={handleWishlist}
              className={cn(
                "w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer shadow-sm",
                isWishlisted ? "border-primary bg-primary text-white shadow-primary/20" : "border-gray-100 bg-white text-gray-400 hover:border-primary hover:text-primary"
              )}
            >
              <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100/50">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-green-900">Баталгаат хугацаа</span>
                <span className="text-xs text-green-600 font-medium">100% оригнал</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
              <Truck className="w-6 h-6 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-blue-900">Шуурхай хүргэлт</span>
                <span className="text-xs text-blue-600 font-medium">УБ хот дотор 24ц</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
