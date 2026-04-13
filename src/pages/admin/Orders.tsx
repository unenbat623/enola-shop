import { useEffect, useState } from 'react'
import { ordersApi } from '@/api/orders'
import { Eye, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const statusOptions = ['Хүлээгдэж буй', 'Илгээгдсэн', 'Хүргэгдсэн', 'Цуцлагдсан']

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadOrders = async () => {
    try {
      const data = await ordersApi.getAllOrders()
      setOrders(Array.isArray(data) ? data : [])
    } catch {
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await ordersApi.updateOrderStatus(id, newStatus)
      loadOrders()
    } catch {
      alert('Алдаа гарлаа')
    }
  }

  const statusStyles: Record<string, string> = {
    'Хүлээгдэж буй':   'bg-[#fef9ee] text-[#92400e]',
    'Илгээгдсэн': 'bg-[#eff6ff] text-[#1e40af]',
    'Хүргэгдсэн': 'bg-[#f0fdf4] text-[#166534]',
    'Цуцлагдсан': 'bg-[#fef2f2] text-[#991b1b]',
  }

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink normal-case tracking-tight">Захиалгууд</h1>
        </div>
      </header>

      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-6 h-6 animate-spin text-brand-hint" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold normal-case tracking-[1.5px]">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Харилцагч</th>
                  <th className="px-6 py-4">Огноо</th>
                  <th className="px-6 py-4">Дүн</th>
                  <th className="px-6 py-4">Төлөв</th>
                  <th className="px-6 py-4 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-5 font-bold text-brand-hint">#{order.id?.slice(-6) || 'N/A'}</td>
                    <td className="px-6 py-5">
                      <p className="font-medium">{order.shippingAddress?.fullName || 'N/A'}</p>
                      <p className="text-[11px] text-brand-sub">{order.shippingAddress?.phone || ''}</p>
                    </td>
                    <td className="px-6 py-5 font-normal text-brand-ink2">{new Date(order.createdAt).toLocaleDateString('mn-mn')}</td>
                    <td className="px-6 py-5 font-medium">{formatCurrency(order.totalAmount || 0)}</td>
                    <td className="px-6 py-5">
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold normal-case tracking-wider border-none outline-none appearance-none cursor-pointer ${statusStyles[order.status] || statusStyles['Хүлээгдэж буй']}`}
                      >
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-brand-hint hover:text-brand-ink bg-white border border-brand-border rounded-[4px] transition-colors"><Eye className="w-4 h-4" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-brand-sub">Одоогоор захиалга байхгүй байна.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
