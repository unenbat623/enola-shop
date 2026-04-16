import { create } from 'zustand'
import { productsApi } from '@/api/products'
import { Product } from '@/lib/types'
import { useCartStore } from './cartStore'
import { useWishlistStore } from './wishlistStore'

interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: true,
  error: null,
  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await productsApi.getProducts()
      
      const products = Array.isArray(data) ? data : []
      set({ products, isLoading: false })

      // Trigger cleanup
      const validIds = products.map((p: Product) => p.id)
      useCartStore.getState().syncWithProducts(validIds)
      useWishlistStore.getState().syncWithProducts(validIds)
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch products', isLoading: false })
    }
  }
}))
