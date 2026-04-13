import { LayoutDashboard, ShoppingBag, Users, Settings, Package, ArrowUpRight } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Орлого', value: '₮12,450,000', change: '+12%', icon: LayoutDashboard },
    { label: 'Захиалга', value: '456', change: '+5%', icon: ShoppingBag },
    { label: 'Хэрэглэгч', value: '1,234', change: '+18%', icon: Users },
    { label: 'Барааны үлдэгдэл', value: '78', change: '-2%', icon: Package },
  ]

  const orders = [
    { id: '#8923', customer: 'Баатар.Д', product: 'Oversized Hoodie', total: '₮89,000', status: 'pending' },
    { id: '#8922', customer: 'Саран.Г', product: 'Graphic Tee', total: '₮45,000', status: 'confirmed' },
    { id: '#8921', customer: 'Тэмүүлэн.Б', product: 'Cargo Pants', total: '₮120,000', status: 'shipped' },
    { id: '#8920', customer: 'Номин.А', product: 'Bucket Hat', total: '₮35,000', status: 'delivered' },
    { id: '#8919', customer: 'Эрдэнэ.О', product: 'Denim Jacket', total: '₮145,000', status: 'cancelled' },
  ]

  const statusStyles = {
    pending:   'bg-[#fef9ee] text-[#92400e]',
    confirmed: 'bg-[#f0fdf4] text-[#166534]',
    shipped:   'bg-[#eff6ff] text-[#1e40af]',
    delivered: 'bg-[#f0fdf4] text-[#166534]',
    cancelled: 'bg-[#fef2f2] text-[#991b1b]',
  }

  return (
    <div className="flex min-h-screen bg-brand-base">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface border-r border-brand-border flex flex-col">
        <div className="p-8 border-b border-brand-border">
          <span className="text-brand-ink font-normal text-xl normal-case tracking-[4px]">
            Enola Shop
          </span>
          <p className="text-[10px] text-brand-hint mt-1 normal-case tracking-[2px]">Admin Console</p>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-1">
          <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Хяналтын самбар" active />
          <NavItem icon={<ShoppingBag className="w-4 h-4" />} label="Захиалгууд" />
          <NavItem icon={<Package className="w-4 h-4" />} label="Бүтээгдэхүүн" />
          <NavItem icon={<Users className="w-4 h-4" />} label="Customers" />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Тохиргоо" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-normal text-brand-ink normal-case tracking-tight">System Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-muted border border-brand-border flex items-center justify-center text-brand-ink font-medium">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-brand-border rounded-[8px] p-6 relative group">
              <p className="text-brand-hint text-[10px] font-bold normal-case tracking-wider mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-26px font-medium text-brand-ink leading-none">{stat.value}</h3>
                <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-[4px] ${stat.change.startsWith('+') ? 'text-brand-success bg-brand-success/10' : 'text-brand-danger bg-brand-danger/10'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
          <div className="p-6 border-b border-brand-border flex justify-between items-center">
            <h2 className="text-[13px] font-medium text-brand-ink normal-case tracking-wider">Recent Transactions</h2>
            <button className="text-[11px] text-brand-ink font-bold normal-case hover:underline flex items-center gap-1">Бүгдийг харах <ArrowUpRight className="w-3 h-3" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold normal-case tracking-[1.5px]">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Нийт</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {orders.map((order, i) => (
                  <tr key={i} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-5 font-bold text-brand-hint">{order.id}</td>
                    <td className="px-6 py-5 font-normal text-brand-ink2">{order.customer}</td>
                    <td className="px-6 py-5 text-brand-sub">{order.product}</td>
                    <td className="px-6 py-5 font-medium">{order.total}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold normal-case tracking-wider ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-150 group
      ${active 
        ? 'text-brand-ink border-l-2 border-brand-ink bg-brand-base' 
        : 'text-brand-sub hover:text-brand-ink'}
    `}>
      <span className={`${active ? 'text-brand-ink' : 'text-brand-hint group-hover:text-brand-ink'} transition-colors`}>{icon}</span>
      <span className="text-[13px] font-medium tracking-tight">{label}</span>
    </div>
  )
}
