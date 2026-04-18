import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { categories } from '@/lib/constants'

export default function CategoryGrid() {
  return (
    <section className="py-24 md:py-32 bg-brand-base">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[12px] font-black text-brand-hint tracking-[6px] uppercase"
          >
            Ангилал
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-normal text-brand-ink uppercase tracking-[4px]"
          >
            Ангиллаар үзэх
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            className="h-1 bg-brand-ink mt-2"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-6 group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-4xl md:text-5xl transition-all duration-500 group-hover:bg-brand-ink group-hover:text-white group-hover:scale-110 shadow-lg group-hover:shadow-brand-ink/20">
                  {cat.icon}
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-[13px] md:text-[15px] font-black text-brand-ink uppercase tracking-widest transition-colors group-hover:text-brand-ink2">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] md:text-[11px] font-bold text-brand-hint uppercase tracking-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity">Үзэх</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
