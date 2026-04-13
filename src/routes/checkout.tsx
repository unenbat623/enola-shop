import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import DeliveryForm from '@/components/checkout/DeliveryForm'
import OrderSummary from '@/components/checkout/OrderSummary'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items } = useCartStore()
  const { setStep } = useCheckoutStore()

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
    setStep(1)
  }, [items, navigate, setStep])

  return (
    <div className="bg-brand-base min-h-screen py-20 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-20">
          <CheckoutSteps currentStep={1} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <DeliveryForm onNext={() => navigate('/checkout/payment')} />
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
