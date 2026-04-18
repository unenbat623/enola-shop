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
import { ArrowLeft, ShieldCheck, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from '@/components/common/Toast'

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

  const handleDeliveryNext = () => setStep(2)

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return
    setIsSubmitting(true)
    try {
      const payload = {
        userId: user?.id ?? 'guest',
        items: items.map((i) => ({
          product: i.id, // backend expects product (ref) or at least id
          name: i.name, 
          price: i.price,
          quantity: i.quantity, 
          image: i.images?.[0] ?? '',
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor
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

      const res = await ordersApi.createOrder(payload as any)
      const newOrderId = (res as any)?.order?._id ?? (res as any)?.id ?? `ES-${Date.now().toString().slice(-6)}`
      setOrderId(newOrderId)

      if (paymentMethod === 'bank') {
        setStatus('pending_payment')
        clearCart()
        reset()
        navigate(`/checkout/success?orderId=${newOrderId}`)
      } else {
        setShowPaymentUI(true)
      }
    } catch (err: any) {
      toast.error('Захиалга үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.')
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
    <div className="bg-brand-base min-h-screen py-12 md:py-20 pb-40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
           <div className="space-y-1">
              <h1 className="text-3xl font-normal text-brand-ink tracking-tight uppercase">Төлбөр хийх</h1>
              <p className="text-brand-sub text-[14px] font-medium uppercase tracking-widest">Аюулгүй, баталгаатай төлбөр тооцоо</p>
           </div>
           <CheckoutSteps currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 xl:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DeliveryForm onNext={handleDeliveryNext} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {!showPaymentUI ? (
                    <div className="bg-white p-8 md:p-12 rounded-[24px] border border-brand-border shadow-2xl shadow-brand-ink/5 space-y-10">
                      <div className="flex justify-between items-center border-b border-brand-border pb-6">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-normal text-brand-ink tracking-tight">Төлбөрийн хэрэгсэл</h2>
                          <p className="text-brand-sub text-[14px]">Өөрт тохирох төлбөрийн аргыг сонгоно уу.</p>
                        </div>
                        <button
                          onClick={() => setStep(1)}
                          className="flex items-center gap-2 text-[11px] font-black text-brand-hint hover:text-brand-ink uppercase tracking-widest transition-colors h-10 px-4 border border-brand-border rounded-full hover:border-brand-ink"
                        >
                          <ChevronLeft className="w-4 h-4" /> Буцах
                        </button>
                      </div>

                      <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} />

                      <div className="pt-6">
                        <Button
                          disabled={!paymentMethod}
                          isLoading={isSubmitting}
                          onClick={handlePlaceOrder}
                          className="w-full h-14 bg-brand-ink text-brand-base rounded-[12px] font-black text-[13px] tracking-[3px] uppercase hover:bg-brand-ink2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-brand-ink/20"
                        >
                          Захиалга өгөх
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-3 text-brand-hint text-[11px] font-bold uppercase tracking-widest">
                         <ShieldCheck className="w-4 h-4" /> Таны гүйлгээ 256-бит хамгаалалтаар хамгаалагдана
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <button
                        onClick={() => setShowPaymentUI(false)}
                        className="flex items-center gap-2 text-[12px] font-black text-brand-ink hover:underline uppercase tracking-widest hover:translate-x-[-4px] transition-all"
                      >
                        <ArrowLeft className="w-5 h-5" /> Өөр төлбөрийн арга сонгох
                      </button>

                      <div className="bg-white p-8 md:p-12 rounded-[24px] border border-brand-border shadow-2xl shadow-brand-ink/5">
                        {paymentMethod === 'qpay' && (
                          <QPay amount={finalTotal} onSuccess={handlePaymentSuccess} />
                        )}
                        {paymentMethod === 'socialpay' && (
                          <SocialPay amount={finalTotal} onSuccess={handlePaymentSuccess} />
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-12 xl:col-span-4">
            <div className="sticky top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
