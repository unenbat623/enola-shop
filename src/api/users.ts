import { api } from './client'
import { User } from '../lib/types'

export const usersApi = {
  getAllUsers: async () => {
    return api.get('/api/users') as Promise<User[]>
  }
}
