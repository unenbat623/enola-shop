import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Check, Clock, Home, ShoppingBag, Package, Calendar, MapPin } from 'lucide-react'
import { useCheckoutStore } from '@/store/checkoutStore'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const navigate = useNavigate()
  const { delivery, status, paymentMethod, reset, setStep } = useCheckoutStore()
  const { items, totalPrice, clearCart } = useCartStore()
  const [cleared, setCleared] = useState(false)

  const isPaid = status === 'paid'

  useEffect(() => {
    if (!orderId) {
      navigate('/shop')
      return
    }
    setStep(3)
    if (!cleared) {
      clearCart()
      setCleared(true)
    }
  }, [orderId]) // eslint-disable-line

  const subtotal = totalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="bg-brand-base min-h-screen py-12 pb-40">
      <div className="max-w-lg mx-auto px-4">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg',
            isPaid ? 'bg-brand-ink' : 'bg-amber-500'
          )}>
            {isPaid
              ? <Check className="w-10 h-10 text-white" strokeWidth={3} />
              : <Clock className="w-10 h-10 text-white" />
            }
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-normal text-brand-ink tracking-tight">
              {isPaid ? 'Захиалга баталгаажлаа!' : 'Захиалга хүлээн авлаа!'}
            </h1>
            <p className="text-brand-sub text-[14px]">
              {isPaid
                ? 'Төлбөр амжилттай хийгдлээ. Баярлалаа!'
                : 'Дансаар шилжүүлсний дараа захиалга баталгаажна.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Order info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-brand-border rounded-[12px] overflow-hidden mb-6"
        >
          {/* Order ID + status */}
          <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-brand-hint tracking-widest mb-1">ЗАХИАЛГЫН №</p>
              <p className="font-medium text-brand-ink text-sm">#{orderId}</p>
            </div>
            <span className={cn(
              'px-3 py-1.5 rounded-[4px] text-[10px] font-bold tracking-wider',
              isPaid ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
            )}>
              {isPaid ? 'Төлөгдсөн' : 'Хүлээгдэж буй'}
            </span>
          </div>

          <div className="divide-y divide-brand-border">
            {/* Shipping address */}
            {delivery.name && (
              <div className="px-6 py-4 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-hint mt-0.5 flex-shrink-0" />
                <div className="text-[13px]">
                  <p className="font-medium text-brand-ink">{delivery.name} · {delivery.phone}</p>
                  <p className="text-brand-sub">{delivery.district}, {delivery.address}</p>
                </div>
              </div>
            )}

            {/* Payment method */}
            <div className="px-6 py-4 flex items-center gap-3">
              <Package className="w-4 h-4 text-brand-hint flex-shrink-0" />
              <div className="text-[13px]">
                <p className="text-brand-sub">Төлбөрийн арга</p>
                <p className="font-medium text-brand-ink capitalize">
                  {paymentMethod === 'qpay' ? 'QPay' : paymentMethod === 'socialpay' ? 'SocialPay' : 'Дансаар шилжүүлэх'}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="px-6 py-4 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-brand-hint flex-shrink-0" />
              <div className="text-[13px]">
                <p className="text-brand-sub">Огноо</p>
                <p className="font-medium text-brand-ink">{new Date().toLocaleDateString('mn-MN')}</p>
              </div>
            </div>
          </div>

          {/* Bank transfer info */}
          {paymentMethod === 'bank' && (
            <div className="px-6 py-5 bg-amber-50 border-t border-amber-100">
              <p className="text-[12px] font-bold text-amber-800 mb-2">Дансны мэдээлэл</p>
              <div className="text-[13px] text-amber-900 space-y-1">
                <p>Банк: <strong>Хаан Банк</strong></p>
                <p>Дансны дугаар: <strong>5099-1234-5678</strong></p>
                <p>Хүлээн авагч: <strong>Энола Шоп LLC</strong></p>
                <p>Гүйлгээний утга: <strong>#{orderId}</strong></p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/orders"
            onClick={() => reset()}
            className="flex-1 h-12 bg-brand-ink text-brand-base flex items-center justify-center gap-2 font-normal text-[12px] tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Захиалга харах
          </Link>
          <Link
            to="/shop"
            onClick={() => reset()}
            className="flex-1 h-12 bg-white border border-brand-border text-brand-sub flex items-center justify-center gap-2 text-[12px] tracking-[1px] rounded-[6px] hover:bg-brand-surface transition-all"
          >
            <Home className="w-4 h-4" /> Дэлгүүр рүү буцах
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
