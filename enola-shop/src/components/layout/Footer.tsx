import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-base pt-20 border-t border-[#2a2420]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-[16px] font-normal text-brand-surface tracking-[4px] uppercase">
              ANTIGRAVITY
            </Link>
            <p className="text-[#78716c] text-[13px] leading-relaxed max-w-xs">
              Ultimate streetwear experience. Defining the future of fashion with bold designs and premium quality.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium uppercase tracking-[2px] text-brand-ghost">SHOP</h4>
            <ul className="space-y-4 text-[#78716c] text-[12px]">
              <li><Link to="/shop" className="hover:text-brand-surface transition-colors">All Products</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-brand-surface transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-brand-surface transition-colors">Flash Sale</Link></li>
              <li><Link to="/shop?category=clothing" className="hover:text-brand-surface transition-colors">Clothing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium uppercase tracking-[2px] text-brand-ghost">SUPPORT</h4>
            <ul className="space-y-4 text-[#78716c] text-[12px]">
              <li><a href="#" className="hover:text-brand-surface transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-medium uppercase tracking-[2px] text-brand-ghost">CONTACT</h4>
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
                <span>info@antigravity.mn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2420] py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-normal text-[#4a4540] uppercase tracking-wider">
          <p>© 2025 ANTIGRAVITY. ALL RIGHTS RESERVED.</p>
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
