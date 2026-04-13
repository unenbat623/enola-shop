import { LayoutDashboard, ShoppingBag, Users, Package, ArrowUpRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { productsApi } from '@/api/products'
import { ordersApi } from '@/api/orders'
import { usersApi } from '@/api/users'
import { formatCurrency } from '@/lib/utils'
import { Order, Product, User } from '@/lib/types'

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

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, users: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [orders, products, users] = await Promise.all([
          ordersApi.getAllOrders().catch((): Order[] => []),
          productsApi.getProducts().catch((): Product[] => []),
          usersApi.getAllUsers().catch((): User[] => []),
        ])
        const revenue = orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0)
        setStats({ revenue, orders: orders.length, products: products.length, users: users.length })
        setRecentOrders(orders.slice(0, 5))
      } catch { /* silent */ } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const statCards = [
    { label: 'Нийт орлого',  value: formatCurrency(stats.revenue), icon: LayoutDashboard },
    { label: 'Захиалга',     value: String(stats.orders),          icon: ShoppingBag },
    { label: 'Хэрэглэгч',   value: String(stats.users),           icon: Users },
    { label: 'Бүтээгдэхүүн', value: String(stats.products),       icon: Package },
  ]

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-normal text-brand-ink tracking-tight">Хянах самбар</h1>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-hint" /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map((s, i) => (
              <div key={i} className="bg-white border border-brand-border rounded-[8px] p-6">
                <p className="text-brand-hint text-[10px] font-bold tracking-wider mb-3">{s.label}</p>
                <h3 className="text-2xl font-medium text-brand-ink">{s.value}</h3>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
            <div className="p-6 border-b border-brand-border flex justify-between items-center">
              <h2 className="text-[13px] font-medium text-brand-ink tracking-wider">Сүүлийн захиалгууд</h2>
              <Link to="/admin/orders" className="text-[11px] text-brand-ink font-bold hover:underline flex items-center gap-1">
                Бүгдийг харах <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold tracking-[1.5px]">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Огноо</th>
                    <th className="px-6 py-4">Нийт</th>
                    <th className="px-6 py-4">Төлөв</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-brand-ink">
                  {recentOrders.length > 0 ? recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-hint">#{String(o.id).slice(-6)}</td>
                      <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString('mn-MN')}</td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(o.totalAmount ?? 0)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-wider ${STATUS_STYLES[o.status] ?? STATUS_STYLES['Хүлээгдэж буй']}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="px-6 py-10 text-center text-brand-sub">Одоогоор захиалга байхгүй байна.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  )
}
