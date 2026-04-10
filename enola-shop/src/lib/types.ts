export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  badge?: 'NEW' | 'SALE' | 'HOT'
  images: string[]
  description: string
  inStock: boolean
  rating: number
  reviewCount: number
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
}

export interface WishlistItem extends Product {}
