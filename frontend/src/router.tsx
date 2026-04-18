import { Routes, Route, Navigate } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import AdminLayout from '@/admin/layout/AdminLayout'
import AdminRoute from '@/components/auth/AdminRoute'
import { useAuthStore } from '@/store/authStore'
import HomePage from '@/pages/Home'
import ShopPage from '@/pages/Shop'
import ProductPage from '@/pages/ProductDetail'
import CartPage from '@/pages/Cart'
import WishlistPage from '@/pages/Wishlist'
import CheckoutPage from '@/pages/Checkout'
import CheckoutSuccessPage from '@/pages/CheckoutSuccess'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import AuthCallback from '@/pages/AuthCallback'
import OrdersPage from '@/pages/Orders'
import OrderDetailPage from '@/pages/OrderDetail'

// Admin Pages
import AdminDashboard from '@/admin/pages/Dashboard'
import AdminProducts from '@/admin/pages/Products'
import AdminOrders from '@/admin/pages/Orders'
import AdminUsers from '@/admin/pages/Users'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
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
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/checkout/success" element={<ProtectedRoute><CheckoutSuccessPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
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
