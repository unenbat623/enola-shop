import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-base pt-24 border-t border-[#2a2420]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="text-[20px] font-normal text-brand-surface tracking-[6px] uppercase">
              Enola Shop
            </Link>
            <p className="text-[#a8a29e] text-[14px] leading-relaxed max-w-xs font-medium">
              Төгс Streetwear туршлага. Бид загварын ирээдүйг зоригтой шийдэл, хамгийн сайн чанартайгаар тодорхойлж байна.
            </p>
            <div className="flex items-center gap-5">
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-[#2a2420] flex items-center justify-center text-[#a8a29e] hover:text-brand-surface hover:border-brand-surface transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-brand-ghost">Дэлгүүр</h4>
            <ul className="space-y-4 text-[#a8a29e] text-[13px] font-medium">
              <li><Link to="/shop" className="hover:text-brand-surface transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-3 h-px bg-brand-surface transition-all"></span> Бүх бүтээгдэхүүн</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-brand-surface transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-3 h-px bg-brand-surface transition-all"></span> Шинэ ирэлт</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-brand-surface transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-3 h-px bg-brand-surface transition-all"></span> Хямдрал</Link></li>
              <li><Link to="/shop?category=clothing" className="hover:text-brand-surface transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-3 h-px bg-brand-surface transition-all"></span> Хувцас</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-brand-ghost">Тусламж</h4>
            <ul className="space-y-4 text-[#a8a29e] text-[13px] font-medium">
              <li><a href="#" className="hover:text-brand-surface transition-colors">Бидний тухай</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Захиалга хянах</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Асуулт хариулт</a></li>
              <li><a href="#" className="hover:text-brand-surface transition-colors">Буцаалтын нөхцөл</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-brand-ghost">Холбоо барих</h4>
            <ul className="space-y-6 text-[#a8a29e] text-[13px] font-medium">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 bg-[#2a2420] rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-ghost" />
                </div>
                <span>Ulaanbaatar, MN<br/><span className="text-[11px] opacity-60">Sukhbaatar District</span></span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 bg-[#2a2420] rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand-ghost" />
                </div>
                <span>+976 7700-0000</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 bg-[#2a2420] rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-brand-ghost" />
                </div>
                <span>info@enola-shop.mn</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2420] py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold text-[#57534e] uppercase tracking-[2px]">
          <p>© 2025 Enola Shop. БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН.</p>
          <div className="flex items-center gap-10">
            {['QPAY', 'SOCIALPAY', 'BANK TRANSFER'].map((p) => (
              <span key={p} className="hover:text-brand-surface transition-colors cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
