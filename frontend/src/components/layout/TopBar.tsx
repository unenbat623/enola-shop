import { motion } from 'framer-motion'
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

export default function TopBar() {
  const items = [
    { icon: Truck, text: 'Үнэгүй хүргэлт (100к+)' },
    { icon: ShieldCheck, text: 'Баталгаат бүтээгдэхүүн' },
    { icon: RotateCcw, text: '14 хоногт буцаалттай' }
  ]

  return (
    <div className="h-10 bg-brand-ink flex items-center px-4 overflow-hidden border-none relative z-50">
      <div className="max-w-7xl mx-auto w-full flex justify-center items-center gap-12 text-[10px] tracking-[2px] font-black text-brand-ghost uppercase">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="hidden sm:flex items-center gap-2"
          >
             <item.icon className="w-3.5 h-3.5" />
             <span>{item.text}</span>
          </motion.div>
        ))}
        {/* Mobile view showing only one at a time could be added here if needed, but keeping it simple */}
        <div className="sm:hidden flex items-center gap-2">
           <Truck className="w-3.5 h-3.5" />
           <span>Үнэгүй хүргэлт · 14 хоногт буцаалт</span>
        </div>
      </div>
    </div>
  )
}
