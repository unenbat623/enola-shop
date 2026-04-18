import { motion } from 'framer-motion'

const brands = [
  'Goyol', 'Michel & Amazonka', 'Lhamour', 'Anar', 
  'Tsetseg', 'Belen', 'Goyo', 'Erel'
]

export default function BrandCarousel() {
  const items = [...brands, ...brands] // Duplicate for seamless loop

  return (
    <section className="py-24 border-y border-brand-border bg-brand-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center space-y-4">
        <span className="text-brand-hint font-black uppercase tracking-[4px] text-[11px]">
          Баталгаат хамтрагчид
        </span>
        <hr className="w-12 h-px bg-brand-border mx-auto border-none" />
      </div>

      <div className="relative flex overflow-hidden w-full group">
        <div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          style={{
            animation: 'marquee 30s linear infinite',
            animationPlayState: 'running',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {items.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-16 md:gap-24 group/item"
            >
              <span
                className="text-lg md:text-xl font-serif italic tracking-[4px] text-brand-sub hover:text-brand-ink transition-colors duration-500 cursor-default select-none"
              >
                {brand}
              </span>
              <span className="text-brand-ghost/30 font-light scale-150 select-none">·</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}