import { useSearchParams } from 'react-router'
import { products, categories } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const generalFilter = searchParams.get('filter') // e.g. sale, new

  const filteredProducts = products.filter((p) => {
    let matches = true
    if (categoryFilter) matches = matches && p.categorySlug === categoryFilter
    if (generalFilter === 'sale') matches = matches && p.badge === 'SALE'
    if (generalFilter === 'new') matches = matches && p.badge === 'NEW'
    return matches
  })

  return (
    <div className="bg-brand-base min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="bg-brand-surface p-6 rounded-[12px] border border-brand-border shadow-none">
            <h3 className="font-semibold text-sm mb-6 text-brand-white tracking-widest uppercase">CATEGORIES</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setSearchParams({})}
                  className={`text-sm font-medium transition-colors ${!categoryFilter && !generalFilter ? 'text-brand-mint font-bold' : 'text-brand-sub hover:text-brand-white'}`}
                >
                  ALL PRODUCTS
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSearchParams({ category: cat.slug })}
                    className={`text-sm font-medium transition-colors flex items-center justify-between w-full ${categoryFilter === cat.slug ? 'text-brand-mint font-bold' : 'text-brand-sub hover:text-brand-white'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-brand-muted px-2 py-0.5 rounded-full text-brand-hint border border-brand-border">{cat.productCount}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center bg-brand-surface p-4 rounded-[12px] border border-brand-border shadow-none">
            <p className="text-sm font-medium text-brand-sub">
              Total <span className="text-brand-white font-bold">{filteredProducts.length}</span> items found
            </p>
            <select className="text-xs border border-brand-border rounded-[8px] outline-none bg-brand-muted px-4 py-2 font-bold text-brand-white focus:border-brand-mint transition-all">
              <option>SORT: NEWEST FIRST</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-brand-surface rounded-[12px] border border-brand-border p-20 text-center flex flex-col items-center justify-center space-y-6">
               <ShoppingBag className="w-12 h-12 text-brand-hint" />
               <div className="space-y-2">
                 <h3 className="text-xl font-medium text-brand-white">No results found</h3>
                 <p className="text-brand-sub text-sm">Try adjusting your filters to find what you're looking for.</p>
               </div>
               <button onClick={() => setSearchParams({})} className="bg-brand-mint px-8 py-2 rounded-[8px] font-bold text-xs uppercase tracking-widest mt-4" style={{ color: 'var(--accent-dark)' }}>VIEW ALL PRODUCTS</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
