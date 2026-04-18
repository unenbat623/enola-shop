import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2000',
    title: 'STREETWEAR\nCOLLECTION',
    subtitle: 'ШИНЭ ЦУГЛУУЛГА 2025',
    description: 'Өөрийн хэв маягийг тодорхойлох цаг боллоо. Хамгийн сүүлийн үеийн тренд загваруудыг эндээс.',
    buttonText: 'ОДОО ҮЗЭХ',
    link: '/shop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=2000',
    title: 'THE ART OF\nSTYLE',
    subtitle: 'PREMIUM QUALITY',
    description: 'Материал болон хийцлэлийн дээд зэргийн чанарыг мэдэр. Биднийг сонгосон танд баярлалаа.',
    buttonText: 'ДЭЛГҮҮР ХЭСЭХ',
    link: '/shop'
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  return (
    <section className="relative h-[60vh] md:h-[90vh] overflow-hidden bg-brand-surface">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-brand-ink/40 z-10" />
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-2xl space-y-6 md:space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-4"
                >
                  <span className="inline-block text-[11px] md:text-[13px] font-black tracking-[4px] md:tracking-[6px] text-brand-surface uppercase">
                    {slides[current].subtitle}
                  </span>
                  <h1 className="text-4xl md:text-8xl font-normal text-white leading-[1.1] tracking-tight whitespace-pre-line">
                    {slides[current].title}
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-brand-surface/80 text-sm md:text-lg max-w-lg leading-relaxed font-medium"
                >
                  {slides[current].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <Link 
                    to={slides[current].link}
                    className="group inline-flex items-center gap-4 bg-white text-brand-ink px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase hover:bg-brand-ink hover:text-white transition-all transform hover:scale-105 shadow-2xl"
                  >
                    {slides[current].buttonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-ink transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-ink transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-white' : 'w-6 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  )
}
