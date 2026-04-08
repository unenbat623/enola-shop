import { products } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import { Link } from 'react-router'

export default function NewArrivals() {
  const newProducts = products.filter(p => p.badge === 'NEW').slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">Шинэ бүтээгдэхүүн</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Шинээр ирсэн</h2>
          </div>
          <Link to="/shop?filter=new" className="text-sm font-bold text-muted hover:text-primary transition-colors pb-2 border-b border-transparent hover:border-primary">
            Бүгдийг үзэх →
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
