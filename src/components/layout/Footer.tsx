import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-base pt-20 border-t border-[#2a2420]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-[16px] font-normal text-brand-surface tracking-[4px] normal-case">
              Enola Shop
            </Link>
            <p className="text-[#78716c] text-[13px] leading-relaxed max-w-xs">
              Ultimate streetwear experience. Defining the future of fashion with bold designs and premium quality.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium normal-case tracking-[2px] text-brand-ghost">Дэлгүүр</h4>
            <ul className="space-y-4 text-[#78716c] text-[12px]">
              <li><Link to="/shop" className="hover:text-brand-surface transition-colors">Бүх бүтээгдэхүүн</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-brand-surface transition-colors">Шинэ ирэлт</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-brand-surface transition-colors">Хямдрал</Link></li>
              <li><Link to="/shop?category=clothing" className="hover:text-brand-surface transition-colors">Хувцас</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium normal-case tracking-[2px] text-brand-ghost">Тусламж</h4>
            <ul className="space-y-4 text-[#78716c] text-[12px]">
              <li><a href="#" className="hover:text-brand-surface transition-colors">Бидний тухай</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Захиалга хянах</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Асуулт хариулт</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Буцаалт</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium normal-case tracking-[2px] text-brand-ghost">Холбоо барих</h4>
            <ul className="space-y-4 text-[#78716c] text-[12px]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-ghost flex-shrink-0" />
                <span>Ulaanbaatar, MN</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-ghost flex-shrink-0" />
                <span>+976 7700-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-ghost flex-shrink-0" />
                <span>info@enola-shop.mn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2420] py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-normal text-[#4a4540] normal-case tracking-wider">
          <p>© 2025 Enola Shop. all rights reserved.</p>
          <div className="flex items-center gap-8">
            {['QPay', 'SocialPay', 'Bank Transfer'].map((p) => (
              <span key={p} className="hover:text-brand-surface transition-colors cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
