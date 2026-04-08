import { BrowserRouter, Routes, Route } from 'react-router'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/routes/index'
import ShopPage from '@/routes/shop'
import ProductPage from '@/routes/product.$slug'
import CartPage from '@/routes/cart'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<div className="py-40 text-center font-black text-4xl">404 - Хуудас олдсонгүй</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
