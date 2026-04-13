import { useEffect, useState } from 'react'
import { usersApi } from '@/api/users'
import { Loader2, Mail, Shield } from 'lucide-react'

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await usersApi.getAllUsers()
        setUsers(Array.isArray(data) ? data : [])
      } catch {
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }
    loadUsers()
  }, [])

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink normal-case tracking-tight">Хэрэглэгчид</h1>
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
                  <th className="px-6 py-4">Нэр</th>
                  <th className="px-6 py-4">И-мэйл</th>
                  <th className="px-6 py-4">Эрх</th>
                  <th className="px-6 py-4">Бүртгүүлсэн</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {users.length > 0 ? users.map((user) => (
                  <tr key={user.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-5 font-medium">{user.name}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-brand-sub">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {user.role === 'admin' ? (
                        <span className="flex items-center w-fit gap-1 px-2.5 py-1 rounded-[4px] bg-brand-ink/5 text-brand-ink text-[10px] font-bold normal-case tracking-wider">
                          <Shield className="w-3 h-3" /> Админ
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-[4px] bg-brand-surface text-brand-hint text-[10px] font-bold normal-case tracking-wider border border-brand-border">
                          Хэрэглэгч
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 font-normal text-brand-ink2">{new Date(user.createdAt).toLocaleDateString('mn-mn')}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-brand-sub">Одоогоор хэрэглэгч байхгүй байна.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
