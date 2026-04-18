import TopBar from './TopBar'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../common/CartDrawer'
import { Outlet, useLocation } from 'react-router'
import { Toaster } from '../common/Toast'
import ScrollToTop from '../common/ScrollToTop'
import { useProductStore } from '@/store/productStore'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RootLayout() {
  const fetchProducts = useProductStore(state => state.fetchProducts)
  const location = useLocation()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <TopBar />
      <Header />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  )
}
