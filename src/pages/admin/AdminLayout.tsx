import { LayoutDashboard, ShoppingBag, Users, Package, LogOut, Menu, X } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function AdminLayout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const nav = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Хянах самбар' },
    { to: '/admin/products', icon: <Package className="w-4 h-4" />, label: 'Бүтээгдэхүүн' },
    { to: '/admin/orders',   icon: <ShoppingBag className="w-4 h-4" />, label: 'Захиалгууд' },
    { to: '/admin/users',    icon: <Users className="w-4 h-4" />, label: 'Хэрэглэгчид' },
  ]

  const Sidebar = () => (
    <aside className="w-64 bg-brand-surface border-r border-brand-border flex flex-col pt-8 h-full">
      <div className="px-8 pb-8 border-b border-brand-border">
        <Link to="/" className="text-brand-ink font-normal text-xl normal-case tracking-[4px]">
          Enola Shop
        </Link>
        <p className="text-[10px] text-brand-hint mt-1 normal-case tracking-[2px]">Admin Console</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        {nav.map((item) => {
          const active = location.pathname === item.to || (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to))
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-150 text-[13px] font-medium tracking-tight ${
                active ? 'bg-brand-ink text-brand-base' : 'text-brand-sub hover:text-brand-ink hover:bg-white'
              }`}
            >
              <span className={active ? '' : 'text-brand-hint'}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 pb-8 border-t border-brand-border pt-6">
        <div className="flex items-center gap-3 px-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-brand-ink flex items-center justify-center text-brand-base text-[12px] font-bold">
            {user?.name?.charAt(0).toUpperCase() ?? 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-brand-ink truncate">{user?.name}</p>
            <p className="text-[10px] text-brand-hint truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all text-brand-danger hover:bg-brand-danger/10 w-full rounded-md text-[13px] font-medium"
        >
          <LogOut className="w-4 h-4" />
          Гарах
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-brand-base">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-brand-border bg-brand-surface">
          <span className="font-medium tracking-widest text-brand-ink text-sm">Enola Admin</span>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-brand-ink">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
