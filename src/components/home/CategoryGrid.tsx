import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { categories } from '@/lib/mock-data'

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">Дэлгүүр хэсэх</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Ангиллаар харах</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold text-muted hover:text-primary transition-colors pb-2 border-b border-transparent hover:border-primary">
            Бүгдийг үзэх →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                  {cat.icon}
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-muted font-medium">{cat.productCount}+ бараа</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
