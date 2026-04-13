import { BrowserRouter } from 'react-router'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Loader2 } from 'lucide-react'
import AppRouter from './router'

export default function App() {
  const initAuth = useAuthStore(state => state.initAuth)
  const isLoading = useAuthStore(state => state.isLoading)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-ink" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
