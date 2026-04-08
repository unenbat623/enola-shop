import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product } from '@/lib/types'

interface WishlistStore {
  items: Product[]
  toggleItem: (product: Product) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  totalItems: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => {
        const items = get().items
        const index = items.findIndex((i) => i.id === product.id)
        
        if (index > -1) {
          set({ items: items.filter((i) => i.id !== product.id) })
        } else {
          set({ items: [...items, product] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      
      isInWishlist: (id) => get().items.some((i) => i.id === id),
      
      totalItems: () => get().items.length,
    }),
    { name: 'enola-wishlist' }
  )
)
