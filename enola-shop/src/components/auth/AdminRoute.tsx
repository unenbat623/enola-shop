import { Navigate, Outlet } from 'react-router'
import { useEffect, useState } from 'react'

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        setIsAdmin(user?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    } catch {
      setIsAdmin(false)
    }
  }, [])

  if (isAdmin === null) return <div className="min-h-screen bg-brand-base" />

  if (!isAdmin) {
    // Check if user is logged in at all
    const isLogged = !!localStorage.getItem('user')
    if (isLogged) {
      return <Navigate to="/" replace />
    }
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
