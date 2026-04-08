import { Send } from 'lucide-react'

export default function Newsletter() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <span className="text-white/80 font-black uppercase tracking-[0.2em] text-xs">Бүртгүүлэх</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Шинэ мэдээ, хямдралын мэдэгдэл авах</h2>
          <p className="text-white/60 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Та манай шинэ бүтээгдэхүүн болон хямдралын мэдээллийг цаг алдалгүй имэйлээрээ хүлээн аваарай.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Таны имэйл хаяг"
            className="flex-1 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-md px-6 text-white placeholder:text-white/50 outline-none focus:bg-white focus:text-foreground focus:placeholder:text-muted transition-all font-medium"
          />
          <button className="h-14 px-10 bg-white text-primary rounded-md font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3">
             <Send className="w-4 h-4" />
             <span>Бүртгүүлэх</span>
          </button>
        </form>
        
        <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
           Спам илгээхгүй. Хэдийд ч гарч болно.
        </p>
      </div>
    </section>
  )
}
