const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = {
  get: (path: string) => fetch(`${BASE_URL}${path}`).then(r => r.json()),
  post: (path: string, body: unknown) => fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json()),
  put: (path: string, body: unknown) => fetch(`${BASE_URL}${path}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json()),
  patch: (path: string, body: unknown) => fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json()),
  delete: (path: string) => fetch(`${BASE_URL}${path}`, { method: 'DELETE' }).then(r => r.json()),
}
