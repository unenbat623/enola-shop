export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  badge?: 'New' | 'Хямдрал' | 'Hot'
  images: string[]
  description: string
  inStock: boolean
  rating: number
  reviewCount: number
  sizes?: string[]
  colors?: string[]
  details?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface WishlistItem extends Product {}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
  }
  paymentMethod: 'qpay' | 'socialpay' | 'bank'
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}
