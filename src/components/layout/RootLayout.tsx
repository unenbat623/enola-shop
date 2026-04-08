import TopBar from './TopBar'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../common/CartDrawer'
import { Outlet } from 'react-router'
import { Toaster } from '../common/Toast'

export default function RootLayout() {
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
