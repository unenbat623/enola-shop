import { create } from 'zustand'
import { productsApi } from '@/api/products'
import { Product } from '@/lib/types'

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
      
      if (Array.isArray(data) && data.length > 0) {
        set({ products: data, isLoading: false })
      } else {
        set({ products: [], isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch products', isLoading: false })
    }
  }
}))
