const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export async function client(endpoint: string, { data, ...customConfig }: RequestOptions = {}) {
  const token = localStorage.getItem('token')
  const headers = new Headers(customConfig.headers)
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (data) {
    headers.set('Content-Type', 'application/json')
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'API Error')
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const api = {
  get: (endpoint: string, customConfig: RequestOptions = {}) => client(endpoint, { ...customConfig, method: 'GET' }),
  post: (endpoint: string, data: unknown, customConfig: RequestOptions = {}) => client(endpoint, { ...customConfig, method: 'POST', data }),
  put: (endpoint: string, data: unknown, customConfig: RequestOptions = {}) => client(endpoint, { ...customConfig, method: 'PUT', data }),
  patch: (endpoint: string, data: unknown, customConfig: RequestOptions = {}) => client(endpoint, { ...customConfig, method: 'PATCH', data }),
  delete: (endpoint: string, customConfig: RequestOptions = {}) => client(endpoint, { ...customConfig, method: 'DELETE' }),
}
