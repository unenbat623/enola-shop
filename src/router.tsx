import { Routes, Route, Navigate } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import AdminRoute from '@/components/auth/AdminRoute'
import { useAuthStore } from '@/store/authStore'
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

export function UserRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<UserRoute><CheckoutPage /></UserRoute>} />
        <Route path="/checkout/payment" element={<UserRoute><CheckoutPaymentPage /></UserRoute>} />
        <Route path="/checkout/success" element={<UserRoute><CheckoutSuccessPage /></UserRoute>} />
        <Route path="/orders" element={<UserRoute><OrdersPage /></UserRoute>} />
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
  )
}
