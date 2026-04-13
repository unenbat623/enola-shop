import TopBar from './TopBar'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../common/CartDrawer'
import { Outlet } from 'react-router'
import { Toaster } from '../common/Toast'
import { useProductStore } from '@/store/productStore'
import { useEffect } from 'react'

export default function RootLayout() {
  const fetchProducts = useProductStore(state => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  )
}
