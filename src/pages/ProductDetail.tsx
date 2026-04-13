import { useParams } from 'react-router'
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useProductStore } from '@/store/productStore'
import { useUIStore } from '@/store/uiStore'
import { toast } from '@/components/common/Toast'
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ProductDetailSkeleton } from '@/components/product/ProductSkeleton'
import ProductCard from '@/components/product/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const { products, isLoading } = useProductStore()
  const product = products.find((p) => p.slug === slug)
  
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  
  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toggleCart } = useUIStore()

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4)
  }, [product, products])

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return (
      <div className="bg-brand-base min-h-screen py-40 flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-normal text-brand-ink uppercase tracking-widest text-center">Бүтээгдэхүүн олдсонгүй</h2>
        <Link to="/shop" className="text-brand-sub hover:text-brand-ink underline underline-offset-4 text-sm font-medium">Дэлгүүр рүү буцах</Link>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error('Хэмжээ сонгоно уу')
      return
    }
    if (product.colors?.length && !selectedColor) {
      toast.error('Өнгө сонгоно уу')
      return
    }

    // Since our cart store doesn't support selection yet, we pass the basic product
    // Usually we would pass { ...product, selectedSize, selectedColor }
    for(let i=0; i<qty; i++) {
       addItem(product)
    }
    toast.success(`"${product.name}" сагсанд нэмэгдлээ.`)
    toggleCart(true)
  }

  return (
    <div className="bg-brand-base min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-hint uppercase tracking-wider">
          <Link to="/" className="hover:text-brand-ink transition-colors">Нүүр</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-brand-ink transition-colors">Дэлгүүр</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-brand-ink transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-ink truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="aspect-[4/5] bg-brand-surface rounded-[12px] overflow-hidden relative border border-brand-border group">
             <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
             
             {product.badge && (
               <div className="absolute top-6 left-6">
                 <span className={cn(
                   "px-4 py-1.5 rounded-[4px] text-[10px] font-bold tracking-[2px] uppercase",
                   product.badge === 'Шинэ' ? 'bg-brand-ink text-brand-base' : 'bg-brand-sale text-brand-base'
                 )}>
                   {product.badge}
                 </span>
               </div>
             )}

             {product.images.length > 1 && (
               <>
                 <button 
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-brand-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border border-brand-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
               </>
             )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-20 h-24 flex-shrink-0 rounded-[6px] overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-brand-ink outline outline-2 outline-white -outline-offset-4" : "border-transparent hover:border-brand-ghost"
                  )}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-normal text-brand-ink leading-tight mb-4 normal-case">{product.name}</h1>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="flex items-center text-brand-ink">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "fill-current" : "text-brand-ghost")} />
                    ))}
                  </div>
                  <span className="text-[13px] font-medium text-brand-ink">{product.rating}</span>
               </div>
               <span className="text-brand-hint text-[13px]">{product.reviewCount} үнэлгээ</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-3xl font-medium text-brand-ink">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-brand-ghost font-normal line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="text-brand-sale text-sm font-bold uppercase tracking-wider">
                  -{calculateDiscountPercentage(product.price, product.originalPrice)}% OFF
                </span>
              </>
            )}
          </div>

          <div className="space-y-10 mb-12">
            <p className="text-brand-sub text-[15px] leading-relaxed">
              {product.description}
            </p>

            {/* Selection */}
            <div className="space-y-8">
              {product.sizes && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[11px] font-bold text-brand-ink uppercase tracking-widest">Хэмжээ Сонгох</span>
                    <button className="text-[11px] text-brand-sub underline underline-offset-4 hover:text-brand-ink">Хэмжээний заавар</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-14 h-11 px-4 border text-[13px] tracking-widest font-medium transition-all rounded-[4px]",
                          selectedSize === size ? "bg-brand-ink text-brand-base border-brand-ink" : "border-brand-border text-brand-sub hover:border-brand-ink"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-brand-ink uppercase tracking-widest">Өнгө Сонгох</span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                          selectedColor === color ? "border-brand-ink scale-110" : "border-transparent hover:scale-110"
                        )}
                      >
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-brand-border rounded-[4px] h-12 w-32 bg-white">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors">-</button>
                 <span className="flex-1 text-center text-[14px] font-medium text-brand-ink">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)} className="w-10 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink transition-colors">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-brand-ink text-brand-base rounded-[4px] flex items-center justify-center gap-3 font-medium text-[12px] tracking-widest uppercase hover:bg-brand-ink2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />Сагсанд нэмэх</button>
              <button 
                onClick={() => toggleItem(product)}
                className={cn(
                  "w-12 h-12 rounded-[4px] border flex items-center justify-center transition-all",
                  isWishlisted ? "border-brand-sale text-brand-sale bg-brand-surface" : "border-brand-border text-brand-sub hover:border-brand-ink hover:text-brand-ink bg-white"
                )}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-brand-border pt-10">
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-[8px]">
              <ShieldCheck className="w-6 h-6 text-brand-ink" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-brand-ink uppercase tracking-wider">Баталгаатай</span>
                <span className="text-[11px] text-brand-sub">100% Оргинал бүтээгдэхүүн</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-[8px]">
              <Truck className="w-6 h-6 text-brand-ink" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-brand-ink uppercase tracking-wider">Түргэн хүргэлт</span>
                <span className="text-[11px] text-brand-sub">24-48 цагийн дотор</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-24 md:mt-32">
          <div className="space-y-10">
            <div className="flex flex-col items-center text-center gap-2">
              <h2 className="text-[20px] md:text-[24px] font-normal text-brand-ink uppercase tracking-[4px]">Холбоотой бүтээгдэхүүн</h2>
              <div className="w-12 h-px bg-brand-ink"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
