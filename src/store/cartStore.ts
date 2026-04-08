import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product, type CartItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const index = items.findIndex((i) => i.id === product.id)
        
        if (index > -1) {
          const newItems = [...items]
          newItems[index].quantity += 1
          set({ items: newItems })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      
      updateQuantity: (id, qty) => {
        if (qty < 1) return
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      
      totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: 'enola-cart' }
  )
)
