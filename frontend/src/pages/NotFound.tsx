import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-base flex flex-col items-center justify-center px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-black text-brand-surface leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <h2 className="text-2xl md:text-3xl font-normal text-brand-ink uppercase tracking-[10px] mt-20">Алдаа гарлаа</h2>
          </div>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-brand-sub text-[16px] font-medium leading-relaxed">
            Таны хайсан хуудас олдсонгүй. Хаягаа буруу оруулсан эсвэл тухайн хуудас устсан байж магадгүй юм.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            to="/" 
            className="w-full sm:w-auto h-14 px-10 bg-brand-ink text-brand-base rounded-[12px] flex items-center justify-center gap-3 font-black text-[12px] tracking-[2.5px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-brand-ink/20"
          >
            <Home className="w-4 h-4" /> Нүүр хуудас
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto h-14 px-10 bg-white border border-brand-border rounded-[12px] flex items-center justify-center gap-3 font-black text-[12px] tracking-[2.5px] uppercase hover:border-brand-ink transition-all transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Буцах
          </button>
        </div>
      </motion.div>
    </div>
  )
}
