import { useSearchParams } from 'react-router'
import { products, categories } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import { useState } from 'react'

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
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-lg mb-4">Ангилал</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setSearchParams({})}
                  className={`text-sm font-medium transition-colors ${!categoryFilter && !generalFilter ? 'text-primary font-bold' : 'text-gray-500 hover:text-foreground'}`}
                >
                  Бүх бараа
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSearchParams({ category: cat.slug })}
                    className={`text-sm font-medium transition-colors flex items-center justify-between w-full ${categoryFilter === cat.slug ? 'text-primary font-bold' : 'text-gray-500 hover:text-foreground'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{cat.productCount}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-500">
              Нийт <span className="text-foreground">{filteredProducts.length}</span> бараа олдлоо
            </p>
            <select className="text-sm border-gray-200 rounded-md outline-none bg-gray-50 px-3 py-2 font-medium focus:border-primary">
              <option>Эрэмбэлэх: Шинэ нь эхэндээ</option>
              <option>Үнэ: Өсөхөөр</option>
              <option>Үнэ: Буурахаар</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center flex flex-col items-center justify-center space-y-4">
               <span className="text-4xl">🔍</span>
               <h3 className="text-xl font-black">Илэрц олдсонгүй</h3>
               <p className="text-muted text-sm">Таны хайсан ангилалд бараа байхгүй байна.</p>
               <button onClick={() => setSearchParams({})} className="bg-primary text-white px-6 py-2 rounded-md font-bold text-sm mt-4">Бүх барааг үзэх</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
