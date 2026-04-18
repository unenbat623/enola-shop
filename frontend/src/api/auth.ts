import { get, post } from './client'
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../lib/types'

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return post<AuthResponse>('/api/auth/login', credentials)
  },
  register: async (credentials: RegisterCredentials) => {
    return post<AuthResponse>('/api/auth/register', credentials)
  },
  getMe: async () => {
    return get<{ user: User }>('/api/auth/me')
  },
  forgotPassword: async (email: string) => {
    return post<{ message: string }>('/api/auth/forgot-password', { email })
  },
  resetPassword: async (token: string, newPassword: string) => {
    return post<AuthResponse>('/api/auth/reset-password', { token, newPassword })
  }
}
