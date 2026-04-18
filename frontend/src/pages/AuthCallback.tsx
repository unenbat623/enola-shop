import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useAuthStore } from '@/store/authStore'

export default function AuthCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setToken } = useAuthStore()
  const processing = useRef(false)

  useEffect(() => {
    // React 18 Strict Mode-оос болж 2 удаа дуудагдахаас сэргийлнэ
    if (processing.current) return
    
    const token = params.get('token')
    
    if (!token) {
      console.error('No token found in URL')
      navigate('/login?error=oauth_failed')
      return
    }

    const handleAuth = async () => {
      try {
        processing.current = true
        // 1. Token-ийг localStorage-д хадгалж, /api/auth/me-ээс хэрэглэгчийн мэдээллийг авна
        await setToken(token)
        
        // 2. Амжилттай бол нүүр хуудас руу шилжинэ
        navigate('/')
      } catch (err) {
        console.error('OAuth Callback Error:', err)
        navigate('/login?error=oauth_failed')
      }
    }

    handleAuth()
  }, [params, navigate, setToken])

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-base">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-mint border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <h2 className="text-2xl font-medium text-brand-ink mb-2">Түр хүлээнэ үү</h2>
        <p className="text-brand-sub text-sm font-light tracking-wide">
          Нэвтрэлтийг баталгаажуулж байна...
        </p>
      </div>
    </div>
  )
}
