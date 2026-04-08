import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '@/lib/mock-data'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }

  const slidePrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    const timer = setInterval(slideNext, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[300px] md:h-[500px] lg:h-[600px] bg-gray-50 overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={heroSlides[current].id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={cn(
            "absolute inset-0 flex items-center bg-gradient-to-r",
            heroSlides[current].gradient
          )}
        >
          <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-block bg-primary/10 text-primary text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                  Онцгой цуглуулга
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tighter">
                  {heroSlides[current].title}
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted text-sm md:text-lg max-w-md font-medium"
              >
                {heroSlides[current].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={heroSlides[current].buttonHref}
                  className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-12 bg-primary text-white font-black text-sm md:text-base rounded-md hover:bg-primary-dark transition-all shadow-xl shadow-primary/30"
                >
                  {heroSlides[current].buttonText}
                </Link>
              </motion.div>
            </div>
            
            <div className="hidden md:flex justify-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="w-72 h-72 lg:w-96 lg:h-96 bg-white/40 backdrop-blur-md rounded-full border border-white/60 flex items-center justify-center p-8 overflow-hidden"
              >
                 <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-4">
        <button 
          onClick={slidePrev}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                current === i ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
        <button 
          onClick={slideNext}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
