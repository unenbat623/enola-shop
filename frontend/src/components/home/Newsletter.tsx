import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import { useState } from 'react'
import { toast } from '@/components/common/Toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Мэдээлэл хүлээн авахаар бүртгэгдлээ. Баярлалаа!')
      setEmail('')
    }
  }

  return (
    <section className="py-24 md:py-40 bg-brand-ink overflow-hidden relative">
      {/* Abstract background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-surface opacity-5 blur-[100px] rounded-full translate-x-[-50%] translate-y-[-50%]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-surface opacity-5 blur-[100px] rounded-full translate-x-[50%] translate-y-[50%]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center gap-10 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-brand-ghost/10 border border-brand-ghost/20 rounded-full flex items-center justify-center text-brand-surface"
          >
            <Mail className="w-8 h-8" />
          </motion.div>
          
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-normal text-white uppercase tracking-[4px]"
            >
              Мэдээлэл хүлээн авах
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-brand-ghost text-[15px] md:text-[17px] font-medium max-w-xl mx-auto leading-relaxed"
            >
              Шинэ цуглуулга, хямдрал болон онцгой урамшууллын мэдээллийг цаг алдалгүй и-мэйлээрээ аваарай.
            </motion.p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubscribe}
            className="w-full max-w-md flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ghost group-focus-within:text-white transition-colors" />
              <input
                type="email"
                placeholder="И-мэйл хаягаа оруулна уу"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-[12px] pl-12 pr-4 text-white placeholder:text-brand-ghost focus:bg-white/10 focus:border-white/20 outline-none transition-all font-medium"
              />
            </div>
            <button 
              type="submit"
              className="h-14 px-10 bg-brand-surface text-brand-ink rounded-[12px] font-black text-[12px] tracking-[3px] uppercase hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-black/10"
            >
              БҮРТГҮҮЛЭХ <Send className="w-4 h-4" />
            </button>
          </motion.form>

          <p className="text-[10px] text-brand-ghost font-bold uppercase tracking-[2px] opacity-40">
            Бид таны хувийн нууцыг хүндэтгэнэ · Хэзээ ч цуцлах боломжтой
          </p>
        </div>
      </div>
    </section>
  )
}
