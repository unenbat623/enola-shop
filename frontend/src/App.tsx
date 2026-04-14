import { BrowserRouter } from 'react-router'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { motion, AnimatePresence } from 'framer-motion'
import AppRouter from './router'

export default function App() {
  const initAuth = useAuthStore(state => state.initAuth)
  const isLoading = useAuthStore(state => state.isLoading)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    initAuth()
    
    // Force hide splash after 3 seconds regardless of status (Safety fallback)
    const forceHideTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    // Ensure splash stays for at least 800ms or until auth is ready
    const timer = setTimeout(() => {
      if (!isLoading) setShowSplash(false)
    }, 800)
    
    return () => {
      clearTimeout(forceHideTimer)
      clearTimeout(timer)
    }
  }, [initAuth, isLoading])

  // Sync splash state with auth loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSplash(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-normal tracking-[10px] text-brand-ink"
            >
              ENOLA
            </motion.h1>
            <div className="w-48 h-[2px] bg-gray-100 relative overflow-hidden rounded-full">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-ink to-transparent"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AppRouter />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}
