import { useWishlistStore } from '@/store/wishlistStore'
import ProductCard from '@/components/product/ProductCard'
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

export default function WishlistPage() {
  const { items } = useWishlistStore()

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-24 min-h-screen">
      <div className="flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col gap-3 border-b border-brand-border pb-10">
          <h1 className="text-3xl md:text-4xl font-normal text-brand-ink tracking-[4px] uppercase">Хүслийн жагсаалт</h1>
          <div className="flex items-center gap-3">
             <span className="w-8 h-0.5 bg-brand-ink"></span>
             <p className="text-brand-sub text-[14px] font-medium uppercase tracking-widest">Таны хадгалсан шилдэг сонголтууд</p>
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 flex flex-col items-center justify-center text-center gap-8 bg-brand-surface rounded-[24px] border border-brand-border border-dashed shadow-inner"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-brand-ghost border border-brand-border shadow-xl">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-3">
              <h2 className="text-brand-ink text-[22px] font-normal uppercase tracking-[4px]">Жагсаалт хоосон байна</h2>
              <p className="text-brand-sub text-[15px] font-medium max-w-sm mx-auto leading-relaxed">Танд таалагдсан бүтээгдэхүүн одоогоор алга байна. Дуртай бараагаа хадгалаад дараа алдахгүйгээр аваарай.</p>
            </div>
            <Link 
              to="/shop" 
              className="mt-4 px-10 py-4 bg-brand-ink text-brand-base rounded-[10px] font-black text-[12px] tracking-[2.5px] hover:bg-brand-ink2 transition-all transform hover:scale-105 active:scale-95 uppercase shadow-2xl shadow-brand-ink/20 flex items-center gap-3"
            >
              Дэлгүүр хэсэх <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-y-12"
          >
            <AnimatePresence>
              {items.map((product) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
