import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black text-primary">
              Enola <span className="text-white">Shop</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Монголын хамгийн шилдэг онлайн дэлгүүр. Бид танд чанартай барааг хамгийн хямд үнээр хүргэх болно.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l.04-9.95a8.27 8.27 0 004.83 1.55V3.47a4.85 4.85 0 01-1.1-.78z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Дэлгүүр</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Бүх бараа</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-primary transition-colors">Шинэ ирэлт</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-primary transition-colors">Хямдралтай бараа</Link></li>
              <li><Link to="/shop?category=clothing" className="hover:text-primary transition-colors">Хувцас</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Тусламж</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Бидний тухай</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Захиалга хийх заавар</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Түгээмэл асуултууд</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Шийдвэрлэх журам</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Холбоо барих</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 8-р хороо</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+976 7700-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@enolashop.mn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p>© 2025 Enola Shop. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex items-center gap-6">
            {['QPay', 'SocialPay', 'Khan Bank'].map((p) => (
              <span key={p} className="font-bold text-[11px] tracking-widest text-gray-600">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
