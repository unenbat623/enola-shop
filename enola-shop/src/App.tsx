import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import AdminRoute from '@/components/auth/AdminRoute'
import HomePage from '@/routes/index'
import ShopPage from '@/routes/shop'
import ProductPage from '@/routes/product.$slug'
import CartPage from '@/routes/cart'
import WishlistPage from '@/routes/wishlist'
import CheckoutPage from '@/routes/checkout'
import CheckoutPaymentPage from '@/routes/checkout.payment'
import CheckoutSuccessPage from '@/routes/checkout.success'
import LoginPage from '@/routes/auth/login'
import RegisterPage from '@/routes/auth/signup'
import OrdersPage from '@/routes/orders'

// Admin Pages
import AdminDashboard from '@/routes/admin/dashboard'
import AdminProducts from '@/routes/admin/products'
import AdminOrders from '@/routes/admin/orders'
import AdminUsers from '@/routes/admin/users'

export default function App() {
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
