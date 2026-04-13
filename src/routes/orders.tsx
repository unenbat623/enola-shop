import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ShoppingBag, ChevronRight, Package, Calendar, Tag, Clock, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: string
  paymentMethod: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userStr = localStorage.getItem('user')
        const user = userStr ? JSON.parse(userStr) : null
        
        if (user && user.id) {
          const { api } = await import('@/services/api')
          const data = await api.get(`/api/orders?userId=${user.id}`)
          if (Array.isArray(data) && data.length > 0) {
            // Map db format to local component format
            const mapped = data.map((o: any) => ({
              id: o.id || o._id,
              date: o.createdAt,
              items: o.items,
              total: o.totalAmount,
              status: o.status,
              paymentMethod: o.paymentMethod
            }))
            setOrders(mapped)
            setIsLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API orders fetch failed, falling back to local', err)
      }

      // Fallback
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      setOrders(savedOrders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-brand-base min-h-screen py-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-ink" />
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
          <h1 className="text-2xl font-normal text-brand-ink uppercase tracking-widest">Захиалга байхгүй</h1>
          <p className="text-brand-sub text-sm max-w-xs mx-auto leading-relaxed">Та одоогоор ямар нэгэн захиалга хийгээгүй байна.</p>
        </div>
        <Link 
          to="/shop" 
          className="h-12 px-8 bg-brand-ink text-brand-base flex items-center justify-center font-medium text-[12px] tracking-widest uppercase rounded-[4px] hover:bg-brand-ink2 transition-all mt-4"
        >
          Дэлгүүр хэсэх
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-base min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-[1000px] mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-normal text-brand-ink tracking-tight">Миний захиалгууд</h1>
          <p className="text-brand-sub text-sm">Таны хийсэн бүх захиалгын түүх энд харагдана.</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-brand-border rounded-[12px] overflow-hidden group hover:border-brand-hint transition-all duration-300">
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                {/* Left Side: Order Info */}
                <div className="space-y-6 flex-1">
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint uppercase tracking-widest flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Захиалгын №
                      </p>
                      <p className="text-brand-ink font-medium">#{order.id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Огноо
                      </p>
                      <p className="text-brand-ink font-medium">{new Date(order.date).toLocaleDateString('mn-MN')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-hint uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Төлөв
                      </p>
                      <span className={cn(
                        "inline-flex text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider border",
                        order.status === 'Хүргэгдсэн' 
                          ? "border-brand-success/30 text-brand-success bg-brand-success/5" 
                          : "border-brand-sale/30 text-brand-sale bg-brand-sale/5"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex -space-x-4 overflow-hidden py-2">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="w-16 h-20 rounded-[6px] border-2 border-white overflow-hidden shadow-sm relative group">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {idx === 3 && order.items.length > 4 && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Total and Action */}
                <div className="flex flex-col justify-between items-start md:items-end gap-6 md:min-w-[200px]">
                  <div className="space-y-1 text-left md:text-right">
                    <p className="text-[10px] font-bold text-brand-hint uppercase tracking-widest">Нийт дүн</p>
                    <p className="text-2xl font-medium text-brand-ink">{formatCurrency(order.total)}</p>
                  </div>
                  <button className="h-10 px-6 border border-brand-border rounded-[4px] text-[11px] font-bold uppercase tracking-widest text-brand-sub hover:text-brand-ink hover:border-brand-ink transition-all flex items-center gap-2 group-hover:bg-brand-surface">
                    Дэлгэрэнгүй харах <ChevronRight className="w-3.5 h-3.5" />
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
