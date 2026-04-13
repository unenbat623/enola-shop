import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-brand-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16 px-2">
          <div className="space-y-4">
            <span className="text-brand-hint font-medium normal-case tracking-[2px] text-[10px]">Загвараар сонгох</span>
            <h2 className="text-3xl md:text-4xl font-normal text-brand-ink tracking-tight normal-case">Ангилал</h2>
          </div>
          <Link to="/shop" className="text-[11px] font-medium text-brand-sub hover:text-brand-ink transition-colors pb-2 border-b border-transparent hover:border-brand-ink normal-case normal-case">Бүгдийг харах →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-l border-t border-brand-border">
          {categories.map((cat: Category, i: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center gap-6 p-10 border-r border-b border-brand-border bg-white hover:bg-brand-surface transition-all duration-300 relative overflow-hidden"
              >
                <div className="text-4xl transition-transform duration-500 group-hover:scale-110 z-10 grayscale-[0.5] group-hover:grayscale-0">
                  {cat.icon}
                </div>
                <div className="text-center space-y-1.5 z-10">
                  <h3 className="font-normal text-[13px] text-brand-ink group-hover:text-brand-ink transition-colors normal-case normal-case">{cat.name}</h3>
                  <p className="text-[9px] text-brand-hint font-medium normal-case tracking-[1.5px] opacity-70 group-hover:opacity-100">{cat.productCount} БАРАА</p>
                </div>
                <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/[0.01] transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
