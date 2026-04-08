import { ChevronDown, Menu } from 'lucide-react'
import { Link } from 'react-router'
import { categories } from '@/lib/mock-data'
import { useState } from 'react'

export default function Navbar() {
  const [isCatOpen, setIsCatOpen] = useState(false)

  return (
    <nav className="border-b bg-white relative z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-12">
        {/* Category Dropdown */}
        <div className="relative h-full">
          <button 
            onMouseEnter={() => setIsCatOpen(true)}
            onMouseLeave={() => setIsCatOpen(false)}
            className="h-full flex items-center gap-3 px-4 bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all cursor-pointer rounded-t-sm"
          >
            <Menu className="w-4 h-4" />
            <span>Бүх ангилал</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {isCatOpen && (
            <div 
              onMouseEnter={() => setIsCatOpen(true)}
              onMouseLeave={() => setIsCatOpen(false)}
              className="absolute top-12 left-0 w-64 bg-white border border-gray-100 shadow-xl py-2 rounded-b-md z-50 transition-all animate-in fade-in slide-in-from-top-2"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          <Link to="/" className="text-sm font-bold hover:text-primary transition-colors">Нүүр</Link>
          <Link to="/shop" className="text-sm font-bold hover:text-primary transition-colors">Дэлгүүр</Link>
          <Link to="/shop?filter=new" className="text-sm font-bold hover:text-primary transition-colors uppercase">Шинэ ирэлт</Link>
          <Link to="/shop?filter=sale" className="text-sm font-bold hover:text-primary transition-colors uppercase">Хямдрал</Link>
          <Link to="/contact" className="text-sm font-bold hover:text-primary transition-colors">Холбоо барих</Link>
        </div>

        {/* Right Label */}
        <div className="ml-auto hidden xl:flex items-center gap-2 text-primary font-black uppercase text-[11px] tracking-widest">
          <span className="flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-[9px] animate-pulse">🔥</span>
          Зуны цуглуулга −20%
        </div>
      </div>
    </nav>
  )
}
