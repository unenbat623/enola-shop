import { useParams } from 'react-router'
import { formatCurrency, calculateDiscountPercentage, getColorCSS } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { useProductStore } from '@/store/productStore'
import { useUIStore } from '@/store/uiStore'
import { toast } from '@/components/common/Toast'
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, ChevronRight, ChevronLeft, Minus, Plus, Share2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ProductDetailSkeleton } from '@/components/common/SkeletonCard'
import ProductCard from '@/components/product/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/common/Button'

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
  const { user } = useAuthStore()
  const navigate = useNavigate()

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-brand-base min-h-screen py-40 flex flex-col items-center justify-center gap-8 px-4 text-center"
      >
        <div className="w-24 h-24 bg-brand-surface rounded-full flex items-center justify-center border border-brand-border text-brand-ghost shadow-inner">
           <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-normal text-brand-ink uppercase tracking-[4px]">Бүтээгдэхүүн олдсонгүй</h2>
          <p className="text-brand-sub text-[15px] font-medium max-w-sm mx-auto">Харамсалтай нь таны хайсан бүтээгдэхүүн системд бүртгэлгүй эсвэл түр хугацаанд устсан байна.</p>
        </div>
        <Link to="/shop" className="h-14 px-10 bg-brand-ink text-brand-base rounded-[10px] font-black text-[12px] tracking-[2.5px] uppercase hover:bg-brand-ink2 transition-all shadow-xl shadow-brand-ink/20">Дэлгүүр рүү буцах</Link>
      </motion.div>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Сагсанд нэмэхийн тулд нэвтэрнэ үү')
      navigate('/login')
      return
    }
    if (product.sizes?.length && !selectedSize) {
      toast.error('Хэмжээ сонгоно уу')
      return
    }
    if (product.colors?.length && !selectedColor) {
      toast.error('Өнгө сонгоно уу')
      return
    }

    for(let i=0; i<qty; i++) {
       addItem(product, selectedSize || undefined, selectedColor || undefined)
    }
    toast.success(`"${product.name}" сагсанд нэмэгдлээ.`)
    toggleCart(true)
  }
  
  const handleWishlist = () => {
    if (!user) {
      toast.error('Хадгалахын тулд нэвтэрнэ үү')
      navigate('/login')
      return
    }
    toggleItem(product)
  }

  return (
    <div className="bg-brand-base min-h-screen pb-32">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 border-b border-brand-border/50 mb-12">
        <div className="flex items-center gap-3 text-[10px] font-black text-brand-ghost uppercase tracking-[2px]">
          <Link to="/" className="hover:text-brand-ink transition-colors">Нүүр</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-brand-ink transition-colors">Дэлгүүр</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-ink truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-16 xl:gap-24">
        {/* Gallery Section */}
        <div className="w-full lg:w-[55%] space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] bg-white rounded-[24px] overflow-hidden relative border border-brand-border group shadow-2xl shadow-brand-ink/5"
          >
             <AnimatePresence mode="wait">
               <motion.img 
                 key={activeImage}
                 src={product.images[activeImage]} 
                 alt={product.name} 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full h-full object-cover" 
               />
             </AnimatePresence>
             
             {product.badge && (
               <div className="absolute top-8 left-8">
                 <span className={cn(
                   "px-5 py-2 rounded-full text-[10px] font-black tracking-[2.5px] uppercase shadow-lg",
                   (product.badge === 'Шинэ' || product.badge === 'NEW') ? 'bg-brand-ink text-brand-base' : 'bg-brand-sale text-brand-base'
                 )}>
                   {product.badge === 'NEW' ? 'ШИНЭ' : product.badge === 'SALE' ? 'ХЯМДРАЛ' : product.badge}
                 </span>
               </div>
             )}

             <div className="absolute top-8 right-8 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-ink border border-brand-border hover:bg-white shadow-xl transition-all active:scale-90">
                   <Share2 className="w-5 h-5" />
                </button>
             </div>

             {product.images.length > 1 && (
               <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <button 
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md border border-brand-border rounded-full flex items-center justify-center hover:bg-white shadow-xl transition-all pointer-events-auto active:scale-90"
                 >
                   <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button 
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md border border-brand-border rounded-full flex items-center justify-center hover:bg-white shadow-xl transition-all pointer-events-auto active:scale-90"
                 >
                   <ChevronRight className="w-6 h-6" />
                 </button>
               </div>
             )}
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-24 h-32 flex-shrink-0 rounded-[12px] overflow-hidden border-2 transition-all shadow-sm",
                    activeImage === idx ? "border-brand-ink scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-[45%] flex flex-col space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-brand-ghost uppercase tracking-[3px] border border-brand-border px-3 py-1 rounded-full">{product.category}</span>
               <div className="h-px bg-brand-border flex-1"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-normal text-brand-ink leading-[1.1] tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2.5 bg-brand-surface px-4 py-2 rounded-full border border-brand-border">
                  <div className="flex items-center text-brand-ink">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "fill-current" : "text-brand-ghost")} />
                    ))}
                  </div>
                  <span className="text-[13px] font-black text-brand-ink">{product.rating}</span>
               </div>
               <span className="text-brand-ghost text-[13px] font-medium uppercase tracking-widest">{product.reviewCount} Хэрэглэгчийн үнэлгээ</span>
            </div>
          </div>

          <div className="flex items-baseline gap-6">
            <span className="text-4xl font-black text-brand-ink tracking-tight">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <div className="flex items-center gap-4">
                <span className="text-2xl text-brand-ghost font-medium line-through opacity-50">{formatCurrency(product.originalPrice)}</span>
                <span className="bg-brand-sale/10 text-brand-sale border border-brand-sale/20 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[2px]">
                   -{calculateDiscountPercentage(product.price, product.originalPrice)}% ХЯМДАРСАН
                </span>
              </div>
            )}
          </div>

          <div className="space-y-10 border-t border-brand-border pt-10">
            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-brand-ghost uppercase tracking-[3px]">Бүтээгдэхүүний тайлбар</h4>
               <p className="text-brand-sub text-[16px] leading-relaxed font-normal">
                 {product.description}
               </p>
            </div>

            {/* Selections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {product.sizes && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-brand-ink uppercase tracking-[3px]">Хэмжээ Сонгох</span>
                    <button className="text-[10px] font-black text-brand-sub underline underline-offset-4 hover:text-brand-ink uppercase tracking-widest transition-colors">Хэмжээний заавар</button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[56px] h-11 px-4 border text-[13px] font-black tracking-widest transition-all rounded-[10px] uppercase",
                          selectedSize === size ? "bg-brand-ink text-brand-base border-brand-ink shadow-lg shadow-brand-ink/20" : "border-brand-border text-brand-sub hover:border-brand-ink"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-brand-ink uppercase tracking-[3px]">Өнгө Сонгох</span>
                  <div className="flex flex-wrap gap-4">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all p-1 shadow-sm",
                          selectedColor === color ? "border-brand-ink scale-125 shadow-lg" : "border-brand-border hover:scale-125"
                        )}
                      >
                        <div className="w-full h-full rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: getColorCSS(color) }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
              <div className="flex items-center border border-brand-border rounded-[12px] h-14 w-full sm:w-40 bg-white shadow-sm overflow-hidden">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink hover:bg-brand-surface transition-all active:scale-90 font-black text-lg">-</button>
                 <span className="flex-1 text-center text-[15px] font-black text-brand-ink select-none">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)} className="w-12 h-full flex items-center justify-center text-brand-sub hover:text-brand-ink hover:bg-brand-surface transition-all active:scale-90 font-black text-lg">+</button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-brand-ink text-brand-base rounded-[12px] flex items-center justify-center gap-4 font-black text-[13px] tracking-[3px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-brand-ink/20 w-full"
              >
                <ShoppingBag className="w-5 h-5 shadow-sm" /> Сагсанд нэмэх
              </Button>

              <button 
                onClick={handleWishlist}
                className={cn(
                  "w-14 h-14 rounded-[12px] border flex items-center justify-center transition-all shadow-sm active:scale-90 shrink-0",
                  isWishlisted ? "border-brand-sale text-brand-sale bg-brand-surface shadow-md" : "border-brand-border text-brand-sub hover:border-brand-ink hover:text-brand-ink bg-white"
                )}
              >
                <Heart className={cn("w-6 h-6 transition-transform duration-300", isWishlisted && "fill-current scale-110")} />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-brand-border pt-12">
            <div className="flex items-center gap-5 bg-white p-6 rounded-[20px] border border-brand-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-surface rounded-xl flex items-center justify-center text-brand-ink shrink-0">
                 <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-black text-brand-ink uppercase tracking-[1.5px]">100% БАТАЛГААТАЙ</span>
                <span className="text-[11px] text-brand-ghost font-medium">Оргинал бүтээгдэхүүн</span>
              </div>
            </div>
            <div className="flex items-center gap-5 bg-white p-6 rounded-[20px] border border-brand-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-surface rounded-xl flex items-center justify-center text-brand-ink shrink-0">
                 <Truck className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-black text-brand-ink uppercase tracking-[1.5px]">ШУУРХАЙ ХҮРГЭЛТ</span>
                <span className="text-[11px] text-brand-ghost font-medium">24-48 цагийн дотор</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {relatedProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1440px] mx-auto px-4 md:px-10 mt-32 md:mt-48"
        >
          <div className="space-y-16">
            <div className="flex flex-col items-center text-center gap-4">
              <h2 className="text-[24px] md:text-[32px] font-normal text-brand-ink uppercase tracking-[6px]">Холбоотой бүтээгдэхүүн</h2>
              <div className="w-16 h-0.5 bg-brand-ink"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-y-12">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
