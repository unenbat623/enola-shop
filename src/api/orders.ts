import { api } from './client'
import { Order } from '../lib/types'

export const ordersApi = {
  getAllOrders: async () => {
    return api.get('/api/orders') as Promise<Order[]>
  },
  getMyOrders: async () => {
    return api.get('/api/orders/my') as Promise<Order[]>
  },
  createOrder: async (orderData: Partial<Order>) => {
    return api.post('/api/orders', orderData)
  },
  updateOrderStatus: async (id: string, status: string) => {
    return api.patch(`/api/orders/${id}/status`, { status })
  }
}
