import { ChevronDown, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isCatOpen, setIsCatOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Нүүр', path: '/' },
    { name: 'Дэлгүүр', path: '/shop' },
    { name: 'Шинэ цуглуулга', path: '/shop?filter=new' },
    { name: 'Хямдрал', path: '/shop?filter=sale' },
    { name: 'Холбоо барих', path: '/contact' },
  ]

  return (
    <nav className="border-b border-brand-border bg-brand-base relative z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-12">
        {/* Category Dropdown */}
        <div 
          className="relative h-full"
          onMouseEnter={() => setIsCatOpen(true)}
          onMouseLeave={() => setIsCatOpen(false)}
        >
          <button 
            className="h-full flex items-center gap-3 px-6 bg-brand-muted text-brand-ink font-bold text-[11px] tracking-[1.5px] hover:bg-brand-card transition-all cursor-pointer border-r border-brand-border uppercase"
          >
            <Menu className="w-4 h-4" />
            <span>Ангилал</span>
          </button>

          <AnimatePresence>
            {isCatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-0 w-64 bg-brand-base border border-brand-border py-4 z-50 shadow-2xl rounded-b-[12px] overflow-hidden"
              >
                {categories.map((cat: Category) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-brand-surface text-[13px] font-medium transition-colors text-brand-ink group"
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                    <span className="tracking-tight group-hover:translate-x-1 transition-transform">{cat.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 ml-10 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={cn(
                  "text-[11px] font-bold tracking-[2px] transition-all uppercase h-full flex items-center relative group",
                  isActive ? "text-brand-ink" : "text-brand-hint hover:text-brand-ink"
                )}
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-brand-ink group-hover:w-full transition-all duration-300"
                  initial={false}
                  animate={{ width: isActive ? '100%' : '0%' }}
                />
              </Link>
            )
          })}
        </div>

        {/* Right Label */}
        <div className="ml-auto hidden xl:flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-brand-sale animate-pulse" />
           <span className="text-brand-sale font-bold text-[10px] tracking-[2.5px] uppercase">Flash sale −30%</span>
        </div>
      </div>
    </nav>
  )
}
