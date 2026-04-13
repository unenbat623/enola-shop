import { LayoutDashboard, ShoppingBag, Users, Package, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { productsApi } from '@/api/products'
import { ordersApi } from '@/api/orders'
import { usersApi } from '@/api/users'
import { formatCurrency } from '@/lib/utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          ordersApi.getAllOrders().catch(() => []),
          productsApi.getProducts().catch(() => []),
          usersApi.getAllUsers().catch(() => [])
        ])

        const orders = Array.isArray(ordersRes) ? ordersRes : []
        const revenue = orders.reduce((acc, sum) => acc + (sum.totalAmount || 0), 0)

        setStats({
          revenue,
          orders: orders.length,
          products: Array.isArray(productsRes) ? productsRes.length : 0,
          users: Array.isArray(usersRes) ? usersRes.length : 0
        })

        setRecentOrders(orders.slice(0, 5))
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }
    loadDashboard()
  }, [])

  const statCards = [
    { label: 'Нийт орлого', value: formatCurrency(stats.revenue), icon: LayoutDashboard },
    { label: 'Нийт захиалга', value: stats.orders.toString(), icon: ShoppingBag },
    { label: 'Хэрэглэгчид', value: stats.users.toString(), icon: Users },
    { label: 'Бүтээгдэхүүн', value: stats.products.toString(), icon: Package },
  ]

  const statusStyles: Record<string, string> = {
    'Хүлээгдэж буй':   'bg-[#fef9ee] text-[#92400e]',
    'Илгээгдсэн': 'bg-[#eff6ff] text-[#1e40af]',
    'Хүргэгдсэн': 'bg-[#f0fdf4] text-[#166534]',
    'Цуцлагдсан': 'bg-[#fef2f2] text-[#991b1b]',
  }

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-normal text-brand-ink normal-case tracking-tight">Хянах самбар</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-muted border border-brand-border flex items-center justify-center text-brand-ink font-medium">A</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white border border-brand-border rounded-[8px] p-6 relative group">
            <p className="text-brand-hint text-[10px] font-bold normal-case tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-medium text-brand-ink leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h2 className="text-[13px] font-medium text-brand-ink normal-case tracking-wider">Сүүлийн захиалгууд</h2>
          <Link to="/admin/orders" className="text-[11px] text-brand-ink font-bold normal-case hover:underline flex items-center gap-1">Бүгдийг харах <ArrowUpRight className="w-3 h-3" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold normal-case tracking-[1.5px]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Огноо</th>
                <th className="px-6 py-4">Нийт</th>
                <th className="px-6 py-4">Төлөв</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-brand-ink">
              {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                  <td className="px-6 py-5 font-bold text-brand-hint">#{order.id.slice(-6)}</td>
                  <td className="px-6 py-5 font-normal text-brand-ink2">{new Date(order.createdAt).toLocaleDateString('mn-mn')}</td>
                  <td className="px-6 py-5 font-medium">{formatCurrency(order.totalAmount || 0)}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold normal-case tracking-wider ${statusStyles[order.status] || statusStyles['Хүлээгдэж буй']}`}>
                      {order.status}
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
  )
}
