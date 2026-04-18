import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useAuthStore } from '@/store/authStore'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { fetchMe } = useAuthStore()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      console.error('No token found in callback URL')
      navigate('/login?error=oauth_failed')
      return
    }

    // Token-ийг хадгалах
    localStorage.setItem('token', token)
    
    // Хэрэглэгчийн мэдээллийг татаж аваад нүүр хуудас руу шилжих
    fetchMe()
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.error('Auth fetch error:', err)
        navigate('/login?error=oauth_failed')
      })
  }, [searchParams, navigate, fetchMe])

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-base">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-mint border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-medium text-brand-ink mb-2">Нэвтэрч байна...</h2>
        <p className="text-brand-sub text-sm font-light tracking-wide">
          Түр хүлээнэ үү...
        </p>
      </div>
    </div>
  )
}
