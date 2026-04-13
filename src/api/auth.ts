import { api } from './client'
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../lib/types'

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return api.post('/api/auth/login', credentials) as Promise<AuthResponse>
  },
  register: async (credentials: RegisterCredentials) => {
    return api.post('/api/auth/register', credentials) as Promise<AuthResponse>
  },
  getMe: async () => {
    return api.get('/api/auth/me') as Promise<{ user: User }>
  }
}
