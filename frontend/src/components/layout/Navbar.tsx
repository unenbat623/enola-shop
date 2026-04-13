import { ChevronDown, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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
        <div className="relative h-full">
          <button 
            onMouseEnter={() => setIsCatOpen(true)}
            onMouseLeave={() => setIsCatOpen(false)}
            className="h-full flex items-center gap-3 px-6 bg-brand-muted text-brand-ink font-medium text-[12px] tracking-wider hover:bg-brand-card transition-all cursor-pointer border-r border-brand-border"
          >
            <Menu className="w-4 h-4" />
            <span>Ангилал</span>
          </button>

          {isCatOpen && (
            <div 
              onMouseEnter={() => setIsCatOpen(true)}
              onMouseLeave={() => setIsCatOpen(false)}
              className="absolute top-12 left-0 w-64 bg-brand-base border border-brand-border py-2 z-50 transition-all rounded-b-[6px]"
            >
              {categories.map((cat: Category) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-brand-surface text-[13px] font-normal transition-colors text-brand-ink"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="tracking-tight">{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 ml-10 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={cn(
                  "text-[12px] tracking-[1px] transition-all normal-case h-full flex items-center border-b-px",
                  isActive 
                    ? "text-brand-ink border-brand-ink" 
                    : "text-brand-hint hover:text-brand-ink border-transparent"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Right Label */}
        <div className="ml-auto hidden xl:flex items-center gap-2 text-brand-sale font-medium text-[11px] tracking-[2px]">Flash sale −30%</div>
      </div>
    </nav>
  )
}
