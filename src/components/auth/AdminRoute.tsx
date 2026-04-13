import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { Loader2 } from 'lucide-react'

export default function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-base flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-ink w-6 h-6" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
