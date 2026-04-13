import { useProductStore } from '@/store/productStore'
import ProductCard from '@/components/product/ProductCard'
import { Link } from 'react-router'
import { SkeletonCard } from '@/components/common/SkeletonCard'

export default function NewArrivals() {
  const { products, isLoading } = useProductStore()
  const newProducts = products.filter(p => p.badge === 'Шинэ').slice(0, 4)

  return (
    <section className="py-24 bg-brand-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <span className="text-brand-mint font-bold normal-case tracking-[2px] text-[11px]">Latest drops</span>
            <h2 className="text-4xl md:text-5xl font-medium text-brand-white tracking-tight normal-case">Шинэ ирэлт</h2>
          </div>
          <Link to="/shop?filter=new" className="text-[12px] font-semibold text-brand-sub hover:text-brand-mint transition-colors pb-2 border-b-2 border-transparent hover:border-brand-mint normal-case normal-case">View all →</Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
