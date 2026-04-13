import { useEffect, useState } from 'react'
import { ordersApi } from '@/api/orders'
import { Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Order } from '@/lib/types'

const STATUS_OPTIONS = ['Хүлээгдэж буй', 'Илгээгдсэн', 'Хүргэгдсэн', 'Цуцлагдсан']

const STATUS_STYLES: Record<string, string> = {
  'Хүлээгдэж буй': 'bg-amber-50 text-amber-800',
  'Илгээгдсэн':     'bg-blue-50 text-blue-800',
  'Хүргэгдсэн':     'bg-green-50 text-green-800',
  'Цуцлагдсан':     'bg-red-50 text-red-800',
  pending:          'bg-amber-50 text-amber-800',
  processing:       'bg-blue-50 text-blue-800',
  shipped:          'bg-blue-50 text-blue-800',
  delivered:        'bg-green-50 text-green-800',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    } catch { alert('Алдаа гарлаа') }
  }

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink tracking-tight">Захиалгууд</h1>
          <p className="text-[14px] text-brand-sub mt-1">Нийт {orders.length} захиалга</p>
        </div>
      </header>

      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-6 h-6 animate-spin text-brand-hint" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold tracking-[1.5px]">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Харилцагч</th>
                  <th className="px-6 py-4">Огноо</th>
                  <th className="px-6 py-4">Дүн</th>
                  <th className="px-6 py-4">Төлөв</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-4 font-bold text-brand-hint">#{String(order.id).slice(-6)}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.shippingAddress?.fullName ?? '—'}</p>
                      <p className="text-[11px] text-brand-sub">{order.shippingAddress?.phone ?? ''}</p>
                    </td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('mn-MN')}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(order.totalAmount ?? 0)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatus(order.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-wider border-none outline-none cursor-pointer ${STATUS_STYLES[order.status] ?? STATUS_STYLES['Хүлээгдэж буй']}`}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-brand-sub">Одоогоор захиалга байхгүй байна.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
