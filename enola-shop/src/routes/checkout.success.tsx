import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Check, Clock, Home, ShoppingBag, MapPin, Package, Calendar } from 'lucide-react'
import { useCheckoutStore } from '@/store/checkoutStore'
import { useCartStore } from '@/store/cartStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import { cn } from '@/lib/utils'

export default function CheckoutSuccessPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { delivery, status, paymentMethod, reset, setStep } = useCheckoutStore()
  const { items, totalPrice, clearCart } = useCartStore()

  const isPaid = status === 'paid'

  useEffect(() => {
    if (!orderId) {
      navigate('/')
      return
    }
    
    setStep(3)

    // Save order to localStorage and API if not already saved
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const exists = savedOrders.some((o: any) => o.id === orderId)
    
    if (!exists && items.length > 0) {
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null

      const newOrderInfo = {
        id: orderId, // keep it formatted for local fallback
        userId: user?.id || 'anonymous',
        shippingAddress: {
          fullName: delivery.name,
          phone: delivery.phone,
          address: delivery.address,
          city: delivery.city
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0]
        })),
        totalAmount: totalPrice() + (totalPrice() > 100000 ? 0 : 5000),
        status: isPaid ? 'Хүргэгдсэн' : 'Хүлээгдэж буй',
        paymentMethod: paymentMethod === 'qpay' ? 'QPay' : paymentMethod === 'socialpay' ? 'SocialPay' : 'Дансаар'
      }
      
      // Save locally as fallback/quick access
      const localOrder = { ...newOrderInfo, date: new Date().toISOString(), total: newOrderInfo.totalAmount }
      localStorage.setItem('orders', JSON.stringify([...savedOrders, localOrder]))

      // Send to server
      import('@/services/api').then(({ api }) => {
        api.post('/api/orders', newOrderInfo).catch(err => console.warn('API save failed', err))
      })

      clearCart()
    }
  }, [orderId, navigate, clearCart, setStep, items, isPaid, paymentMethod, totalPrice, delivery])

  return (
    <div className="bg-brand-base min-h-screen py-20 pb-40">
      <div className="max-w-xl mx-auto px-4">
        <div className="mb-20">
          <CheckoutSteps currentStep={3} />
        </div>

        <div className="text-center space-y-12">
          {/* Animated Status Icon */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center border-1.5",
                isPaid ? "border-brand-ink text-brand-ink" : "border-brand-sale text-brand-sale"
              )}
            >
              {isPaid ? <Check className="w-10 h-10 stroke-[2px]" /> : <Clock className="w-10 h-10 stroke-[2px]" />}
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-normal text-brand-ink tracking-tight normal-case"
            >
              {isPaid ? 'Захиалга амжилттай' : 'Төлбөр хүлээгдэж байна'}
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
              className="text-brand-sub font-normal text-[14px] max-w-sm mx-auto leading-relaxed"
            >
              {isPaid 
                ? 'Таны захиалга амжилттай баталгаажлаа. Бид тун удахгүй хүргэлтийг эхлүүлэх болно.' 
                : 'Шилжүүлгийг баталгаажуулсны дараа таны захиалга боловсруулагдах болно.'}
            </motion.p>
          </div>

          {/* Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white border border-brand-border rounded-[10px] p-9 text-left space-y-7"
          >
            <div className="grid grid-cols-2 gap-8 border-b border-brand-border pb-7">
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-brand-hint normal-case tracking-[1.5px] flex items-center gap-2">
                  <Package className="w-3 h-3" /> Дугаар
                </p>
                <p className="text-brand-ink font-medium">#{orderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-brand-hint normal-case tracking-[1.5px] flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Огноо
                </p>
                <p className="text-brand-ink font-medium">{new Date().toLocaleDateString('mn-MN')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-brand-hint normal-case tracking-[1.5px]">Төлбөр</p>
                <p className="text-brand-ink font-medium normal-case text-[11px]">{paymentMethod === 'qpay' ? 'QPay' : paymentMethod === 'socialpay' ? 'SocialPay' : 'Дансаар'}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-medium text-brand-hint normal-case tracking-[1.5px]">Төлөв</p>
                <span className={cn(
                  "text-[9px] font-bold px-2 py-0.5 rounded-[3px] normal-case tracking-wider border",
                  isPaid ? "border-brand-success/30 text-brand-success bg-brand-success/5" : "border-brand-sale/30 text-brand-sale bg-brand-sale/5"
                )}>
                  {isPaid ? 'Баталгаажсан' : 'Хүлээгдэж буй'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-medium text-brand-hint normal-case tracking-[1.5px] flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Хүргэлтийн хаяг
              </p>
              <div className="text-brand-ink text-sm leading-relaxed font-normal bg-brand-surface p-5 rounded-[8px] border border-brand-border/50">
                <p className="font-medium mb-1">{delivery.name} ({delivery.phone})</p>
                <p className="text-[13px]">{delivery.city}, {delivery.district}, {delivery.address}</p>
                <p className="text-brand-sub mt-2 text-[12px] italic">{delivery.note}</p>
              </div>
            </div>

            {!isPaid && (
              <div className="bg-brand-surface border border-brand-border p-5 rounded-[8px] space-y-3">
                <p className="text-[11px] text-brand-ink font-medium normal-case tracking-wider">Шилжүүлэг:</p>
                <div className="space-y-1">
                  <p className="text-[13px] font-medium text-brand-ink">Голомт банк: 1234567890</p>
                  <p className="text-[11px] text-brand-sub normal-case tracking-wider">Гүйлгээний утга: {orderId}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link 
              to="/orders"
              onClick={() => reset()}
              className="flex-1 h-12 bg-brand-ink text-brand-base flex items-center justify-center gap-2 font-normal text-[12px] normal-case tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" /> Захиалга харах
            </Link>
            <Link 
              to="/shop"
              onClick={() => reset()}
              className="flex-1 h-12 bg-transparent border border-brand-border text-brand-sub flex items-center justify-center gap-2 font-normal text-[11px] normal-case tracking-wider rounded-[6px] hover:bg-brand-surface transition-all"
            >
              <Home className="w-4 h-4" /> Дэлгүүр рүү
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
