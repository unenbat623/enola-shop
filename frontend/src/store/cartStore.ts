import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product, type CartItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, selectedSize?: string, selectedColor?: string) => void
  removeItem: (id: string, selectedSize?: string, selectedColor?: string) => void
  updateQuantity: (id: string, qty: number, selectedSize?: string, selectedColor?: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  syncWithProducts: (validIds: string[]) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, selectedSize, selectedColor) => {
        const items = get().items
        const index = items.findIndex((i) => 
          i.id === product.id && 
          i.selectedSize === selectedSize && 
          i.selectedColor === selectedColor
        )
        
        if (index > -1) {
          const newItems = [...items]
          newItems[index].quantity += 1
          set({ items: newItems })
        } else {
          set({ items: [...items, { ...product, quantity: 1, selectedSize, selectedColor }] })
        }
      },
      
      removeItem: (id, selectedSize, selectedColor) => {
        set({ 
          items: get().items.filter((i) => 
            !(i.id === id && i.selectedSize === selectedSize && i.selectedColor === selectedColor)
          ) 
        })
      },
      
      updateQuantity: (id, qty, selectedSize, selectedColor) => {
        if (qty < 1) return
        set({
          items: get().items.map((i) => 
            (i.id === id && i.selectedSize === selectedSize && i.selectedColor === selectedColor) 
              ? { ...i, quantity: qty } 
              : i
          ),
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      
      totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      
      syncWithProducts: (validIds) => {
        set({ items: get().items.filter(item => validIds.includes(item.id)) })
      },
    }),
    { name: 'Enola Shop-cart' }
  )
)
