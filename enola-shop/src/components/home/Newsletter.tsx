import { Send } from 'lucide-react'

export default function Newsletter() {
  return (
    <section className="py-24 bg-brand-surface relative overflow-hidden border-y border-brand-border">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-10">
        <div className="space-y-4">
          <span className="text-brand-mint font-bold normal-case tracking-[2px] text-[11px]">Мэдээлэл авах</span>
          <h2 className="text-4xl md:text-5xl font-medium text-brand-white tracking-tight normal-case">Бидэнтэй нэгдэх</h2>
          <p className="text-brand-sub text-sm md:text-md font-medium max-w-xl mx-auto leading-relaxed">
            Be the first to receive exclusive drops, special promotions and the latest AG news directly to your inbox.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Таны и-мэйл хаяг"
            className="flex-1 h-12 bg-brand-muted border border-brand-border px-6 text-brand-white placeholder:text-brand-hint outline-none focus:border-brand-mint transition-all font-medium text-sm rounded-[8px]"
          />
          <button className="h-12 px-10 bg-brand-mint rounded-[8px] font-bold text-sm normal-case tracking-wider hover:bg-brand-mint-dk transition-all flex items-center justify-center gap-3 cursor-pointer"style={{ color: 'var(--accent-dark)' }}>
             Бүртгүүлэх
          </button>
        </form>
        
        <p className="text-brand-hint text-[10px] font-bold normal-case tracking-[2px]">
           No spam. Just pure excellence. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
