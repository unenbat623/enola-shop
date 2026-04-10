import { BrowserRouter, Routes, Route } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/routes/index'
import ShopPage from '@/routes/shop'
import ProductPage from '@/routes/product.$slug'
import CartPage from '@/routes/cart'
import CheckoutPage from '@/routes/checkout'
import CheckoutPaymentPage from '@/routes/checkout.payment'
import CheckoutSuccessPage from '@/routes/checkout.success'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
          <Route path="/checkout/success/:orderId" element={<CheckoutSuccessPage />} />
          <Route path="*" element={<div className="py-40 text-center font-black text-4xl">404 - Хуудас олдсонгүй</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
