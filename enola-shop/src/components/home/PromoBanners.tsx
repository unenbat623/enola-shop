import { Link } from 'react-router'

export default function PromoBanners() {
  return (
    <section className="py-20 bg-brand-base">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Banner 1 */}
        <div className="relative group h-[350px] rounded-[12px] overflow-hidden bg-brand-surface border border-brand-border hover:border-brand-mint transition-all">
          <div className="absolute inset-0 p-12 flex flex-col justify-center items-start space-y-4 z-10">
            <span className="text-brand-mint font-bold normal-case tracking-[2px] text-[11px]">New season</span>
            <h3 className="text-4xl md:text-5xl font-medium text-brand-white leading-tight">Streetwear <br /> Collection</h3>
            <Link to="/shop?category=clothing" className="text-sm font-bold text-brand-sub border-b-2 border-brand-mint pb-1 hover:text-brand-white transition-all normal-case normal-case">Explore more →</Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-brand-mint/5 to-transparent pointer-events-none" />
        </div>

        {/* Banner 2 */}
        <div className="relative group h-[350px] rounded-[12px] overflow-hidden bg-brand-mint shadow-none" style={{ color: 'var(--accent-dark)' }}>
          <div className="absolute inset-0 p-12 flex flex-col justify-center items-start space-y-4 z-10">
            <span className="font-bold normal-case tracking-[2px] text-[11px] opacity-60">Limited offer</span>
            <h3 className="text-4xl md:text-5xl font-medium leading-tight">Accessories <br /> Extravaganza</h3>
            <Link to="/shop?category=accessories" className="text-sm font-bold border-b-2 pb-1 transition-all normal-case normal-case"style={{ borderColor: 'var(--accent-dark)' }}>Grab now →</Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
