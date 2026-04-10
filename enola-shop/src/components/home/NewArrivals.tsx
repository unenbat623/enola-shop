import { products } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import { Link } from 'react-router'

export default function NewArrivals() {
  const newProducts = products.filter(p => p.badge === 'NEW').slice(0, 4)

  return (
    <section className="py-24 bg-brand-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <span className="text-brand-mint font-bold uppercase tracking-[2px] text-[11px]">LATEST DROPS</span>
            <h2 className="text-4xl md:text-5xl font-medium text-brand-white tracking-tight uppercase">NEW ARRIVALS</h2>
          </div>
          <Link to="/shop?filter=new" className="text-[12px] font-semibold text-brand-sub hover:text-brand-mint transition-colors pb-2 border-b-2 border-transparent hover:border-brand-mint tracking-widest uppercase">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
