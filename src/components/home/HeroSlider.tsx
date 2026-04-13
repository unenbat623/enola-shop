import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroSlides } from '@/lib/constants'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }

  useEffect(() => {
    const timer = setInterval(slideNext, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      <div className="relative h-[500px] md:h-[650px] bg-brand-base overflow-hidden border-b border-brand-border">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={heroSlides[current].id}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              "absolute inset-0 flex items-center",
              current === 0 ? "bg-brand-surface" : "bg-brand-muted"
            )}
          >
            <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 items-center gap-12">
              <div className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-brand-hint text-[11px] font-bold tracking-[2px] normal-case mb-4 block">
                    {current === 0 ? "New season" : "Stay classic"}
                  </span>
                  <h1 className="text-[40px] md:text-[64px] font-normal text-brand-ink leading-[1.1] tracking-[1px] font-serif">
                    {current === 0 ? (
                      <>Minimalist <br /> Aesthetic Edit</>
                    ) : (
                      <>Essential <br /> Capsule Wardrobe</>
                    )}
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-brand-sub text-[14px] max-w-sm leading-relaxed"
                >
                  {heroSlides[current].subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 pt-4"
                >
                  <Link
                    to={heroSlides[current].buttonHref}
                    className="inline-flex items-center justify-center h-12 px-10 bg-brand-ink text-brand-base font-medium text-[12px] tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all normal-case"
                  >
                    Дэлгүүр орох
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center h-12 px-10 border border-brand-border text-brand-sub font-medium text-[12px] tracking-[1.5px] rounded-[6px] hover:border-brand-sub hover:text-brand-ink transition-all normal-case"
                  >Бүгдийг харах</Link>
                </motion.div>
              </div>
              
              <div className="hidden md:flex justify-end pr-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] bg-brand-card/20 rounded-full border border-brand-border/30 flex items-center justify-center italic font-serif text-brand-ink/5 text-[150px] select-none"
                >
                  {current === 0 ? "Ag" : "Est"}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-2 z-20 px-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className={cn(
                "h-px transition-all cursor-pointer",
                current === i ? "w-10 bg-brand-ink" : "w-6 bg-brand-border hover:bg-brand-sub"
              )}
            />
          ))}
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="bg-brand-muted py-3 overflow-hidden whitespace-nowrap border-b border-brand-border relative z-10">
        <div className="inline-block animate-marquee font-normal text-brand-sub text-[10px] tracking-[2.5px] normal-case">Free shipping on all orders ✦ new collection 2025 ✦ flash sale ✦ limited edition ✦ free shipping on all orders ✦ new collection 2025 ✦ flash sale ✦ limited edition ✦</div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  )
}
