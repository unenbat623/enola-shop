import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Loader2 } from 'lucide-react'
import RootLayout from '@/components/layout/RootLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import AdminRoute from '@/components/auth/AdminRoute'
import HomePage from '@/pages/Home'
import ShopPage from '@/pages/Shop'
import ProductPage from '@/pages/ProductDetail'
import CartPage from '@/pages/Cart'
import WishlistPage from '@/pages/Wishlist'
import CheckoutPage from '@/pages/Checkout'
import CheckoutPaymentPage from '@/pages/CheckoutPayment'
import CheckoutSuccessPage from '@/pages/CheckoutSuccess'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import OrdersPage from '@/pages/Orders'

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminProducts from '@/pages/admin/Products'
import AdminOrders from '@/pages/admin/Orders'
import AdminUsers from '@/pages/admin/Users'

export default function App() {
  const initAuth = useAuthStore(state => state.initAuth)
  const isLoading = useAuthStore(state => state.isLoading)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-ink" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
          <Route path="/checkout/success/:orderId" element={<CheckoutSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
        
        <Route path="*" element={<div className="py-40 text-center font-black text-4xl">404 - Хуудас олдсонгүй</div>} />
      </Routes>
    </BrowserRouter>
  )
}
