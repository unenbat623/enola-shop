import { brands } from '@/lib/mock-data'

export default function BrandCarousel() {
  return (
    <section className="py-16 border-y border-gray-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
         <span className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">Бидний хамтрагчид</span>
      </div>
      
      <div className="flex gap-12 group">
        <div className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, i) => (
            <div 
              key={`${brand.id}-${i}`} 
              className="px-10 h-20 flex items-center justify-center bg-gray-50 rounded-xl min-w-[200px] grayscale hover:grayscale-0 transition-all duration-500 border border-transparent hover:border-primary/20 hover:bg-white"
            >
              <span className="text-xl font-black text-gray-400 hover:text-primary transition-colors tracking-tighter">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
