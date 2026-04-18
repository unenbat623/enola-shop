import { get, post, patch } from './client'
import { Order } from '../lib/types'

export const ordersApi = {
  getAllOrders: async () => {
    return get<Order[]>('/api/orders')
  },
  getMyOrders: async () => {
    return get<Order[]>('/api/orders/my')
  },
  createOrder: async (orderData: Partial<Order>) => {
    return post<Order>('/api/orders', orderData)
  },
  updateOrderStatus: async (id: string, status: string) => {
    return patch<Order>(`/api/orders/${id}/status`, { status })
  },
  getOrderById: async (id: string) => {
    return get<Order>(`/api/orders/${id}`)
  }
}
