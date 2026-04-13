import { api } from './client'
import { Product } from '../lib/types'

export const productsApi = {
  getProducts: async () => {
    return api.get('/api/products') as Promise<Product[]>
  },
  getProductById: async (id: string) => {
    return api.get(`/api/products/${id}`) as Promise<Product>
  },
  createProduct: async (productData: Partial<Product>) => {
    return api.post('/api/products', productData)
  },
  updateProduct: async (id: string, productData: Partial<Product>) => {
    return api.put(`/api/products/${id}`, productData)
  },
  deleteProduct: async (id: string) => {
    return api.delete(`/api/products/${id}`)
  }
}
