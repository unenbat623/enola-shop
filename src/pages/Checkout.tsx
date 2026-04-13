import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import { useAuthStore } from '@/store/authStore'
import { ordersApi } from '@/api/orders'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import DeliveryForm from '@/components/checkout/DeliveryForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentSelector from '@/components/checkout/PaymentSelector'
import QPay from '@/components/checkout/QPay'
import SocialPay from '@/components/checkout/SocialPay'
import BankTransfer from '@/components/checkout/BankTransfer'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const {
    step, setStep,
    delivery, paymentMethod, setPaymentMethod,
    orderId, setOrderId, setStatus, reset
  } = useCheckoutStore()

  const [showPaymentUI, setShowPaymentUI] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (items.length === 0) navigate('/cart')
    else setStep(1)
  }, []) // eslint-disable-line

  const subtotal = totalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const finalTotal = subtotal + shipping

  // Step 1 → Step 2
  const handleDeliveryNext = () => setStep(2)

  // Step 2: confirm payment method → create order → step 3
  const handlePlaceOrder = async () => {
    if (!paymentMethod) return
    setIsSubmitting(true)
    try {
      const payload = {
        userId: user?.id ?? 'guest',
        items: items.map((i) => ({
          id: i.id, name: i.name, price: i.price,
          quantity: i.quantity, image: i.images?.[0] ?? ''
        })),
        totalAmount: finalTotal,
        shippingAddress: {
          fullName: delivery.name,
          phone: delivery.phone,
          address: `${delivery.district}, ${delivery.address}`,
          city: delivery.city,
        },
        paymentMethod,
        status: 'Хүлээгдэж буй',
      }

      const order = await ordersApi.createOrder(payload as any)
      const newOrderId = (order as any)?.id ?? `ES-${Date.now().toString().slice(-6)}`
      setOrderId(newOrderId)

      if (paymentMethod === 'bank') {
        setStatus('pending_payment')
        clearCart()
        reset()
        navigate(`/checkout/success?orderId=${newOrderId}`)
      } else {
        setShowPaymentUI(true)
      }
    } catch (err) {
      alert('Захиалга үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    setStatus('paid')
    clearCart()
    reset()
    navigate(`/checkout/success?orderId=${orderId}`)
  }

  return (
    <div className="bg-brand-base min-h-screen py-12 pb-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <CheckoutSteps currentStep={step} />
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <DeliveryForm onNext={handleDeliveryNext} />
            </div>
            <div className="lg:col-span-5">
              <OrderSummary />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              {!showPaymentUI ? (
                <div className="bg-white p-9 rounded-[10px] border border-brand-border space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-normal text-brand-ink tracking-tight">Төлбөрийн хэрэгсэл</h2>
                      <p className="text-brand-sub text-[13px] mt-1">Төлбөрөө хийх аргаа сонгоно уу.</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-[11px] text-brand-hint hover:text-brand-ink transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Буцах
                    </button>
                  </div>

                  <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} />

                  <button
                    disabled={!paymentMethod || isSubmitting}
                    onClick={handlePlaceOrder}
                    className="w-full h-12 bg-brand-ink text-brand-base disabled:opacity-30 disabled:cursor-not-allowed font-normal text-[12px] tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Захиалах
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <button
                    onClick={() => setShowPaymentUI(false)}
                    className="flex items-center gap-2 text-[11px] font-medium text-brand-ink hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> Өөр арга сонгох
                  </button>

                  {paymentMethod === 'qpay' && (
                    <QPay amount={finalTotal} onSuccess={handlePaymentSuccess} />
                  )}
                  {paymentMethod === 'socialpay' && (
                    <SocialPay amount={finalTotal} onSuccess={handlePaymentSuccess} />
                  )}
                </div>
              )}
            </div>
            <div className="lg:col-span-5">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
