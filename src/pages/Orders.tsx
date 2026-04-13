import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ShoppingBag, ChevronRight, Tag, Calendar, Clock, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { ordersApi } from '@/api/orders'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface LocalOrder {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: string
  paymentMethod: string
}

const STATUS_STYLE: Record<string, string> = {
  'Хүлээгдэж буй': 'border-amber-300/50 text-amber-700 bg-amber-50',
  'Илгээгдсэн':     'border-blue-300/50 text-blue-700 bg-blue-50',
  'Хүргэгдсэн':     'border-green-300/50 text-green-700 bg-green-50',
  'Цуцлагдсан':     'border-red-300/50 text-red-700 bg-red-50',
  pending:          'border-amber-300/50 text-amber-700 bg-amber-50',
  processing:       'border-blue-300/50 text-blue-700 bg-blue-50',
  shipped:          'border-blue-300/50 text-blue-700 bg-blue-50',
  delivered:        'border-green-300/50 text-green-700 bg-green-50',
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<LocalOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await ordersApi.getMyOrders()
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((o: any) => ({
            id:            o.id ?? o._id ?? '',
            date:          o.createdAt ?? new Date().toISOString(),
            items:         Array.isArray(o.items) ? o.items : [],
            total:         o.totalAmount ?? 0,
            status:        o.status ?? 'Хүлээгдэж буй',
            paymentMethod: o.paymentMethod ?? '',
          }))
          setOrders(mapped)
        }
      } catch {
        setError('Захиалгуудыг татахад алдаа гарлаа.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-brand-base min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-ink" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-brand-base min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-brand-sub text-[14px]">{error}</p>
        <Link to="/shop" className="h-11 px-8 bg-brand-ink text-brand-base rounded-[6px] text-[12px] tracking-[1.5px] flex items-center">
          Дэлгүүр рүү явах
        </Link>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-brand-base min-h-screen py-32 md:py-48 px-4 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center border border-brand-border">
          <ShoppingBag className="w-10 h-10 text-brand-hint" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-normal text-brand-ink tracking-widest">Захиалга байхгүй</h1>
          <p className="text-brand-sub text-sm max-w-xs mx-auto leading-relaxed">
            Та одоогоор ямар нэгэн захиалга хийгээгүй байна.
          </p>
        </div>
        <Link
          to="/shop"
          className="h-12 px-8 bg-brand-ink text-brand-base flex items-center justify-center font-medium text-[12px] tracking-widest rounded-[4px] hover:bg-brand-ink2 transition-all mt-4"
        >
          Дэлгүүр хэсэх
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-base min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-[1000px] mx-auto space-y-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Миний захиалгууд</h1>
          <p className="text-brand-sub text-sm">Таны хийсэн бүх захиалгын түүх</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-brand-border rounded-[12px] overflow-hidden hover:border-brand-hint transition-all duration-300">
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                {/* Left */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint tracking-widest flex items-center gap-1.5">
                        <Tag className="w-3 h-3" /> Захиалгын №
                      </p>
                      <p className="text-brand-ink font-medium text-sm">#{order.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Огноо
                      </p>
                      <p className="text-brand-ink font-medium text-sm">{new Date(order.date).toLocaleDateString('mn-MN')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Төлөв
                      </p>
                      <span className={cn(
                        'inline-flex text-[10px] font-bold px-2.5 py-1 rounded-[4px] tracking-wider border',
                        STATUS_STYLE[order.status] ?? STATUS_STYLE['Хүлээгдэж буй']
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Item thumbnails */}
                  {order.items.length > 0 && (
                    <div className="flex -space-x-3">
                      {order.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="w-14 h-18 rounded-[4px] border-2 border-white overflow-hidden shadow-sm">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-14 h-18 rounded-[4px] border-2 border-white bg-brand-muted flex items-center justify-center text-brand-hint text-xs font-bold">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex flex-col justify-between items-start md:items-end gap-4 md:min-w-[180px]">
                  <div className="space-y-1 text-left md:text-right">
                    <p className="text-[10px] font-bold text-brand-hint tracking-widest">Нийт дүн</p>
                    <p className="text-2xl font-medium text-brand-ink">{formatCurrency(order.total)}</p>
                  </div>
                  <button className="h-10 px-5 border border-brand-border rounded-[4px] text-[11px] font-bold tracking-widest text-brand-sub hover:text-brand-ink hover:border-brand-ink transition-all flex items-center gap-1.5">
                    Дэлгэрэнгүй <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
