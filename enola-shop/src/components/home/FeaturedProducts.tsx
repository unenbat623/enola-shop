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
    if (activeTab === 'sale') return p.badge === 'Хямдрал'
    if (activeTab === 'new') return p.badge === 'New'
    if (activeTab === 'hot') return p.badge === 'Hot'
    return true // featured case or default
  }).slice(0, 8)

  return (
    <section className="py-24 bg-brand-base border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-hint font-medium normal-case tracking-[2px] text-[10px]">Shop collections</span>
          <h2 className="text-3xl md:text-4xl font-normal text-brand-ink tracking-tight normal-case">Selective editorial</h2>
          
          <div className="flex flex-wrap justify-center gap-10 pt-8 h-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-1 h-full text-[11px] font-medium tracking-[2px] transition-all cursor-pointer normal-case border-b",
                  activeTab === tab.id 
                    ? "border-brand-ink text-brand-ink" 
                    : "border-transparent text-brand-hint hover:text-brand-ink"
                )}
              >
                {tab.id === 'featured' ? 'Онцлох' : 
                 tab.id === 'sale' ? 'Хямдрал' : 
                 tab.id === 'new' ? 'New in' : 'Trending'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
