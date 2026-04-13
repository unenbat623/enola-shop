// /auth/callback?token=xxx руу redirect ирсэн үед
// token авч localStorage-д хадгалаад / руу navigate
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useAuthStore } from '@/store/authStore'

export default function AuthCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setToken, initAuth } = useAuthStore()

  useEffect(() => {
    const token = params.get('token')
    const error = params.get('error')
    
    if (error) {
      navigate('/login?error=Нэвтрэхэд алдаа гарлаа')
      return
    }
    if (token) {
      setToken(token)
      initAuth() // Fetch user data after setting token
      navigate('/')
    }
  }, [params, navigate, setToken, initAuth])

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-base">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-mint mx-auto" />
        <p className="mt-4 text-brand-sub text-sm font-medium">Нэвтэрч байна...</p>
      </div>
    </div>
  )
}
