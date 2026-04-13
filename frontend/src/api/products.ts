import { get, post, put, del } from './client'
import { Product } from '../lib/types'

export const productsApi = {
  getProducts: async () => {
    return get<Product[]>('/api/products')
  },
  getProductById: async (id: string) => {
    return get<Product>(`/api/products/${id}`)
  },
  createProduct: async (productData: Partial<Product>) => {
    return post<Product>('/api/products', productData)
  },
  updateProduct: async (id: string, productData: Partial<Product>) => {
    return put<Product>(`/api/products/${id}`, productData)
  },
  deleteProduct: async (id: string) => {
    return del<{ success: boolean }>(`/api/products/${id}`)
  }
}
