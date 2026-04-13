import { useEffect, useState } from 'react'
import { usersApi } from '@/api/users'
import { Loader2, Mail, Shield } from 'lucide-react'
import { User } from '@/lib/types'

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    usersApi.getAllUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink tracking-tight">Хэрэглэгчид</h1>
          <p className="text-[14px] text-brand-sub mt-1">Нийт {users.length} хэрэглэгч</p>
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
                  <th className="px-6 py-4">Нэр</th>
                  <th className="px-6 py-4">И-мэйл</th>
                  <th className="px-6 py-4">Эрх</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {users.length > 0 ? users.map((u) => (
                  <tr key={u.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-brand-sub">
                        <Mail className="w-3.5 h-3.5" />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {u.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-brand-ink/5 text-brand-ink text-[10px] font-bold tracking-wider">
                          <Shield className="w-3 h-3" /> Админ
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-[4px] bg-brand-surface text-brand-hint text-[10px] font-bold tracking-wider border border-brand-border">
                          Хэрэглэгч
                        </span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} className="px-6 py-10 text-center text-brand-sub">Одоогоор хэрэглэгч байхгүй байна.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
