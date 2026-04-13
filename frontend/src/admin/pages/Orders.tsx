import { useEffect, useState } from 'react'
import { ordersApi } from '@/api/orders'
import { Loader2, X, MapPin, CreditCard, Package } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Order } from '@/lib/types'

const STATUS_OPTIONS = ['Хүлээгдэж буй', 'Илгээгдсэн', 'Хүргэгдсэн', 'Цуцлагдсан']

const STATUS_STYLE: Record<string, string> = {
  'Хүлээгдэж буй': 'bg-amber-50 text-amber-800',
  'Илгээгдсэн':     'bg-blue-50 text-blue-800',
  'Хүргэгдсэн':     'bg-green-50 text-green-800',
  'Цуцлагдсан':     'bg-red-50 text-red-800',
  pending:          'bg-amber-50 text-amber-800',
  processing:       'bg-blue-50 text-blue-800',
  shipped:          'bg-blue-50 text-blue-800',
  delivered:        'bg-green-50 text-green-800',
}

const PAYMENT_LABEL: Record<string, string> = {
  qpay: 'QPay', socialpay: 'SocialPay', bank: 'Дансаар шилжүүлэх'
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [detail, setDetail] = useState<Order | null>(null)

  const load = async () => {
    setIsLoading(true)
    try {
      const data = await ordersApi.getAllOrders()
      setOrders(Array.isArray(data) ? data : [])
    } catch { setOrders([]) }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleStatus = async (id: string, status: string) => {
    try {
      await ordersApi.updateOrderStatus(id, status)
      load()
    } catch { alert('Төлөв өөрчлөхөд алдаа гарлаа') }
  }

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink tracking-tight">Захиалгууд</h1>
          <p className="text-sm text-brand-sub mt-1">Нийт {orders.length} захиалга</p>
        </div>
      </header>

      {/* Table */}
      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="w-6 h-6 animate-spin text-brand-hint" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold tracking-[1.5px]">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Харилцагч</th>
                  <th className="px-5 py-4">Огноо</th>
                  <th className="px-5 py-4">Дүн</th>
                  <th className="px-5 py-4">Төлөв</th>
                  <th className="px-5 py-4 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {orders.length > 0 ? orders.map((o) => (
                  <tr key={o.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-5 py-4 font-bold text-brand-hint">#{String(o.id).slice(-6)}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{o.shippingAddress?.fullName ?? '—'}</p>
                      <p className="text-[11px] text-brand-sub">{o.shippingAddress?.phone ?? ''}</p>
                    </td>
                    <td className="px-5 py-4">{new Date(o.createdAt).toLocaleDateString('mn-MN')}</td>
                    <td className="px-5 py-4 font-medium">{formatCurrency(o.totalAmount ?? 0)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatus(o.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-wider border-none outline-none cursor-pointer ${STATUS_STYLE[o.status] ?? STATUS_STYLE['Хүлээгдэж буй']}`}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setDetail(o)}
                        className="px-3 py-1.5 border border-brand-border rounded-[4px] text-[11px] font-bold text-brand-sub hover:text-brand-ink hover:border-brand-ink transition-all"
                      >
                        Дэлгэрэнгүй
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-brand-sub">
                      Одоогоор захиалга байхгүй байна.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-[14px] border border-brand-border w-full max-w-lg my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-brand-border">
              <div>
                <h2 className="text-lg font-normal text-brand-ink">Захиалгын дэлгэрэнгүй</h2>
                <p className="text-[11px] text-brand-hint mt-0.5">#{String(detail.id).slice(-8)}</p>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="p-2 text-brand-hint hover:text-brand-ink hover:bg-brand-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 space-y-6">
              {/* Status + Date */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider ${STATUS_STYLE[detail.status] ?? STATUS_STYLE['Хүлээгдэж буй']}`}>
                  {detail.status}
                </span>
                <span className="text-[12px] text-brand-sub">
                  {new Date(detail.createdAt).toLocaleString('mn-MN')}
                </span>
              </div>

              {/* Shipping address */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-brand-hint uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> Хүргэлтийн хаяг
                </div>
                <div className="bg-brand-surface rounded-[8px] p-4 text-[13px] space-y-1">
                  <p className="font-medium text-brand-ink">{detail.shippingAddress?.fullName ?? '—'}</p>
                  <p className="text-brand-sub">{detail.shippingAddress?.phone}</p>
                  <p className="text-brand-sub">{detail.shippingAddress?.address}</p>
                  <p className="text-brand-sub">{detail.shippingAddress?.city}</p>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-brand-hint uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5" /> Төлбөрийн арга
                </div>
                <div className="bg-brand-surface rounded-[8px] px-4 py-3 text-[13px] text-brand-ink font-medium">
                  {PAYMENT_LABEL[detail.paymentMethod] ?? detail.paymentMethod}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-brand-hint uppercase tracking-wider">
                  <Package className="w-3.5 h-3.5" /> Бараа жагсаалт
                </div>
                <div className="border border-brand-border rounded-[8px] divide-y divide-brand-border overflow-hidden">
                  {(detail.items ?? []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      {(item as any).image && (
                        <img src={(item as any).image} alt="" className="w-10 h-12 object-cover rounded-[4px] border border-brand-border flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-brand-ink truncate">{item.name}</p>
                        <p className="text-[11px] text-brand-sub">{item.quantity}ш × {formatCurrency(item.price)}</p>
                      </div>
                      <p className="text-[13px] font-medium text-brand-ink">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-brand-border pt-4 flex justify-between items-center">
                <p className="text-[13px] text-brand-sub">Нийт дүн</p>
                <p className="text-xl font-medium text-brand-ink">{formatCurrency(detail.totalAmount ?? 0)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
