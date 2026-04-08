import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'featured', label: 'Онцлох' },
  { id: 'sale', label: 'Хямдралтай' },
  { id: 'new', label: 'Шинэ' },
  { id: 'hot', label: 'Их зарагдсан' },
]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured')

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'sale') return p.badge === 'SALE'
    if (activeTab === 'new') return p.badge === 'NEW'
    if (activeTab === 'hot') return p.badge === 'HOT'
    return true // featured case or default
  }).slice(0, 8)

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">Шилдэг бүтээгдэхүүн</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Таны сонголтод</h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all cursor-pointer border-2",
                  activeTab === tab.id 
                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105" 
                    : "bg-white border-transparent text-muted hover:border-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
