import { create } from 'zustand'
import { User, LoginCredentials, RegisterCredentials } from '../lib/types'
import { authApi } from '../api/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  initAuth: () => Promise<void>
  setToken: (token: string) => Promise<void>
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true, // starts loading to check token
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null })
      const { user, token } = await authApi.login(credentials)
      localStorage.setItem('token', token)
      set({ user, token, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({ error: error.message || 'Login failed', isLoading: false })
      throw error
    }
  },

  register: async (credentials) => {
    try {
      set({ isLoading: true, error: null })
      const { user, token } = await authApi.register(credentials)
      localStorage.setItem('token', token)
      set({ user, token, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({ error: error.message || 'Registration failed', isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  initAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ isLoading: false, isAuthenticated: false })
      return
    }

    try {
      set({ isLoading: true, error: null })
      const { user } = await authApi.getMe()
      set({ user, token, isAuthenticated: true, isLoading: false })
    } catch (error) {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false, isLoading: false })
    }
  },
  setToken: async (token: string) => {
    try {
      set({ isLoading: true, error: null })
      localStorage.setItem('token', token)
      
      const { user } = await authApi.getMe()
      
      set({ 
        token, 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } catch (error) {
      localStorage.removeItem('token')
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: 'Failed to fetch user data'
      })
      throw error
    }
  },
  fetchMe: async () => {
    try {
      set({ isLoading: true, error: null })
      const { user } = await authApi.getMe()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: error.message })
      throw error
    }
  }
}))
