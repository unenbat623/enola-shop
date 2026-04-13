import { LayoutDashboard, ShoppingBag, Users, Settings, Package, LogOut } from 'lucide-react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        setIsAdmin(user?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    } catch {
      setIsAdmin(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (isAdmin === null) return <div className="min-h-screen bg-brand-base" />

  if (!isAdmin) {
    const isLogged = !!localStorage.getItem('user')
    return <Navigate to={isLogged ? '/' : '/login'} replace />
  }

  return (
    <div className="flex min-h-screen bg-brand-base">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface border-r border-brand-border flex flex-col pt-8">
        <div className="px-8 pb-8 border-b border-brand-border">
          <Link to="/" className="text-brand-ink font-normal text-xl normal-case tracking-[4px]">
            Enola Shop
          </Link>
          <p className="text-[10px] text-brand-hint mt-1 normal-case tracking-[2px]">Admin Console</p>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Хянах самбар" active={location.pathname === '/admin/dashboard'} />
          <NavItem to="/admin/products" icon={<Package className="w-4 h-4" />} label="Бүтээгдэхүүн" active={location.pathname.startsWith('/admin/products')} />
          <NavItem to="/admin/orders" icon={<ShoppingBag className="w-4 h-4" />} label="Захиалгууд" active={location.pathname.startsWith('/admin/orders')} />
          <NavItem to="/admin/users" icon={<Users className="w-4 h-4" />} label="Хэрэглэгчид" active={location.pathname.startsWith('/admin/users')} />
          <div className="pt-8 mt-8 border-t border-brand-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-150 group text-brand-danger hover:bg-brand-danger/10 w-full rounded-md"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[13px] font-medium tracking-tight">Гарах</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function NavItem({ to, icon, label, active = false }: { to: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link to={to} className={`
      flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-150 group rounded-md
      ${active 
        ? 'text-brand-base bg-brand-ink' 
        : 'text-brand-sub hover:text-brand-ink hover:bg-white'}
    `}>
      <span className={active ? '' : 'text-brand-hint group-hover:text-brand-ink transition-colors'}>{icon}</span>
      <span className="text-[13px] font-medium tracking-tight">{label}</span>
    </Link>
  )
}
