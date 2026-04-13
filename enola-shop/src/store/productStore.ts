import { create } from 'zustand'
import { api } from '@/services/api'
import { Product } from '@/lib/types'
import { products as mockProducts } from '@/lib/mock-data'

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
      const data = await api.get('/api/products')
      
      if (Array.isArray(data) && data.length > 0) {
        set({ products: data, isLoading: false })
      } else {
        // Fallback to mock data if empty DB
        console.warn('DB empty, using mock data fallback')
        set({ products: mockProducts, isLoading: false })
      }
    } catch (error: any) {
      console.warn('Failed to fetch products, using mock data fallback:', error)
      set({ products: mockProducts, isLoading: false })
    }
  }
}))
