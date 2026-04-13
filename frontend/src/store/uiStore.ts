import { create } from 'zustand'

interface UIStore {
  isCartOpen: boolean
  isWishlistOpen: boolean
  toggleCart: (open?: boolean) => void
  toggleWishlist: (open?: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  toggleCart: (open) => set((state) => ({ isCartOpen: open ?? !state.isCartOpen })),
  toggleWishlist: (open) => set((state) => ({ isWishlistOpen: open ?? !state.isWishlistOpen })),
}))
