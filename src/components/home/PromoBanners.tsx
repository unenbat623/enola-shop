import { Link } from 'react-router'

export default function PromoBanners() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Banner 1 */}
        <div className="relative group h-[300px] rounded-3xl overflow-hidden bg-[#f3e8ff]">
          <div className="absolute inset-0 p-12 flex flex-col justify-center items-start space-y-4 z-10">
            <span className="text-primary font-black uppercase tracking-widest text-xs">Шинэ ирэлт</span>
            <h3 className="text-3xl font-black tracking-tight leading-tight">Эмэгтэй <br /> цуглуулга</h3>
            <Link to="/shop?category=clothing" className="text-sm font-bold border-b-2 border-primary pb-1 group-hover:pr-4 transition-all">
              Дэлгэрэнгүй харах →
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
           <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Banner 2 */}
        <div className="relative group h-[300px] rounded-3xl overflow-hidden bg-[#111827] text-white">
          <div className="absolute inset-0 p-12 flex flex-col justify-center items-start space-y-4 z-10">
            <span className="text-primary font-black uppercase tracking-widest text-xs">Онцгой санал</span>
            <h3 className="text-3xl font-black tracking-tight leading-tight">Аксессуар <br /> цуглуулга</h3>
            <Link to="/shop?category=accessories" className="text-sm font-bold border-b-2 border-primary pb-1 group-hover:pr-4 transition-all">
              Дэлгэрэнгүй харах →
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  )
}
