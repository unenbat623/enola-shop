import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import PaymentSelector from '@/components/checkout/PaymentSelector'
import OrderSummary from '@/components/checkout/OrderSummary'
import QPay from '@/components/checkout/QPay'
import SocialPay from '@/components/checkout/SocialPay'
import BankTransfer from '@/components/checkout/BankTransfer'
import { ArrowLeft } from 'lucide-react'

export default function CheckoutPaymentPage() {
  const navigate = useNavigate()
  const { items, totalPrice } = useCartStore()
  const { 
    delivery, paymentMethod, setPaymentMethod, 
    orderId, setOrderId, setStatus, setStep 
  } = useCheckoutStore()
  
  const [showPaymentUI, setShowPaymentUI] = useState(false)

  const subtotal = totalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const finalAmount = subtotal + shipping

  useEffect(() => {
    if (items.length === 0) navigate('/cart')
    if (!delivery.name) navigate('/checkout')
    setStep(2)
    if (!orderId) {
      setOrderId(`AG-${Date.now().toString().slice(-6)}`)
    }
  }, [items, delivery, navigate, orderId, setOrderId, setStep])

  const handleSuccess = () => {
    setStatus('paid')
    navigate(`/checkout/success/${orderId}`)
  }

  const handleBankDone = () => {
    setStatus('pending_payment')
    navigate(`/checkout/success/${orderId}`)
  }

  return (
    <div className="bg-brand-base min-h-screen py-20 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <CheckoutSteps currentStep={2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            {!showPaymentUI ? (
              <div className="bg-white p-9 rounded-[10px] border border-brand-border space-y-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="text-xl font-normal text-brand-ink normal-case tracking-tight">Төлбөрийн хэрэгсэл</h2>
                    <p className="text-brand-sub text-[13px]">Та төлбөрөө хийх аргаа сонгоно уу.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="flex items-center gap-2 text-[10px] font-medium text-brand-hint hover:text-brand-ink transition-colors normal-case tracking-[2px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Буцах
                  </button>
                </div>

                <PaymentSelector 
                  selected={paymentMethod} 
                  onSelect={(method) => setPaymentMethod(method)} 
                />

                <button
                  disabled={!paymentMethod}
                  onClick={() => setShowPaymentUI(true)}
                  className="w-full h-12 bg-brand-ink text-brand-base disabled:opacity-20 disabled:cursor-not-allowed font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all mt-4"
                >ҮРгэлжлүүлэх</button>
              </div>
            ) : (
              <div className="space-y-6">
                 <button 
                    onClick={() => setShowPaymentUI(false)}
                    className="flex items-center gap-2 text-[11px] font-medium text-brand-ink hover:underline transition-all normal-case tracking-[2px] mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" /> Өөр арга сонгох
                  </button>

                  {paymentMethod === 'qpay' && (
                    <QPay amount={finalAmount} onSuccess={handleSuccess} />
                  )}
                  {paymentMethod === 'socialpay' && (
                    <SocialPay amount={finalAmount} onSuccess={handleSuccess} />
                  )}
                  {paymentMethod === 'bank' && (
                    <BankTransfer amount={finalAmount} orderId={orderId!} onDone={handleBankDone} />
                  )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
