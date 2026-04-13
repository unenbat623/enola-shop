import { get } from './client'
import { User } from '../lib/types'

export const usersApi = {
  getAllUsers: async () => {
    return get<User[]>('/api/users')
  }
}
