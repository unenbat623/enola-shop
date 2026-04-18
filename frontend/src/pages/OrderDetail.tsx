import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { ArrowLeft, Tag, Calendar, Clock, MapPin, Package, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { ordersApi } from '@/api/orders'

const STATUS_STYLE: Record<string, string> = {
  'Хүлээгдэж буй': 'border-amber-300/50 text-amber-700 bg-amber-50',
  'Илгээгдсэн':     'border-blue-300/50 text-blue-700 bg-blue-50',
  'Хүргэгдсэн':     'border-green-300/50 text-green-700 bg-green-50',
  'Цуцлагдсан':     'border-red-300/50 text-red-700 bg-red-50',
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setIsLoading(true)
        const data = await ordersApi.getOrderById(id)
        setOrder(data)
      } catch (err: any) {
        setError(err.message || 'Захиалгын мэдээллийг татахад алдаа гарлаа.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  if (isLoading) {
    return (
      <div className="bg-brand-base min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-ink" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="bg-brand-base min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-brand-sub text-[14px]">{error || 'Захиалга олдсонгүй.'}</p>
        <Link to="/orders" className="h-11 px-8 bg-brand-ink text-brand-base rounded-[6px] text-[12px] tracking-[1.5px] flex items-center">
          Захиалгууд руу буцах
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-base min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-[800px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate('/orders')}
            className="group flex items-center gap-2 text-brand-sub hover:text-brand-ink transition-colors text-[12px] font-bold tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Захиалгууд руу буцах
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Захиалгын дэлгэрэнгүй</h1>
              <p className="text-brand-sub text-sm">Захиалгын №: <span className="text-brand-ink font-medium">#{order.id || order._id}</span></p>
            </div>
            <div className={cn(
              'inline-flex text-[11px] font-bold px-4 py-1.5 rounded-[4px] tracking-wider border self-start',
              STATUS_STYLE[order.status] ?? STATUS_STYLE['Хүлээгдэж буй']
            )}>
              {order.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-brand-border rounded-[12px] overflow-hidden">
              <div className="p-6 border-b border-brand-border bg-brand-surface/30">
                <h3 className="text-[12px] font-bold tracking-widest text-brand-ink uppercase flex items-center gap-2">
                  <Package className="w-4 h-4" /> Захиалсан бараанууд
                </h3>
              </div>
              <div className="divide-y divide-brand-border">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="p-6 flex gap-4">
                    <div className="w-20 h-24 bg-brand-surface rounded-[4px] overflow-hidden flex-shrink-0">
                      <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-brand-ink font-medium text-sm leading-tight">{item.name}</h4>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          <p className="text-[11px] text-brand-sub">Тоо: <span className="text-brand-ink font-medium">{item.quantity}</span></p>
                          {item.selectedSize && (
                            <p className="text-[11px] text-brand-sub">Хэмжээ: <span className="text-brand-ink font-medium">{item.selectedSize}</span></p>
                          )}
                          {item.selectedColor && (
                            <p className="text-[11px] text-brand-sub">Өнгө: <span className="text-brand-ink font-medium uppercase">{item.selectedColor}</span></p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-brand-ink">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Information Card */}
            <div className="bg-white border border-brand-border rounded-[12px] p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-brand-hint tracking-widest flex items-center gap-1.5 uppercase">
                    <Calendar className="w-3 h-3" /> Захиалсан огноо
                  </p>
                  <p className="text-brand-ink font-medium text-sm">{new Date(order.createdAt).toLocaleDateString('mn-MN')}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-brand-border">
                  <p className="text-[10px] font-bold text-brand-hint tracking-widest flex items-center gap-1.5 uppercase">
                    <Map_Pin className="w-3 h-3" /> Хүргэлтийн хаяг
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-brand-ink font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-xs text-brand-sub leading-relaxed">
                      {order.shippingAddress.address}, {order.shippingAddress.city}
                    </p>
                    <p className="text-xs text-brand-sub">{order.shippingAddress.phone}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-brand-border">
                  <p className="text-[10px] font-bold text-brand-hint tracking-widest uppercase">Төлбөрийн мэдээлэл</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-brand-sub">
                      <span>Төлбөрийн хэлбэр</span>
                      <span className="text-brand-ink font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2 border-t border-dashed border-brand-border">
                      <span className="text-xs font-bold text-brand-ink uppercase">Нийт дүн</span>
                      <span className="text-xl font-medium text-brand-ink">{formatCurrency(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Small fix for MapPin icon name in code
const Map_Pin = MapPin
