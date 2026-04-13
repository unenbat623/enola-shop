import { useWishlistStore } from '@/store/wishlistStore'
import ProductCard from '@/components/product/ProductCard'
import { Heart } from 'lucide-react'
import { Link } from 'react-router'

export default function WishlistPage() {
  const { items } = useWishlistStore()

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-[24px] md:text-[32px] font-normal text-brand-ink tracking-[2px] normal-case">Хүслийн жагсаалт</h1>
          <p className="text-brand-ghost text-[13px] md:text-[14px]">Таны хадгалсан бүтээгдэхүүнүүд</p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-6">
            <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center text-brand-ghost border border-brand-border">
              <Heart className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-brand-ink text-[16px] font-medium uppercase tracking-[2px]">Жагсаалт хоосон байна</h2>
              <p className="text-brand-ghost text-[14px]">Танд таалагдсан бараа одоогоор алга байна.</p>
            </div>
            <Link 
              to="/shop" 
              className="mt-4 px-8 py-3 bg-brand-ink text-brand-base rounded-[6px] font-medium text-[12px] tracking-widest hover:bg-brand-ink2 transition-all uppercase"
            >
              Дэлгүүр хэсэх
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-6 md:gap-y-10">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
