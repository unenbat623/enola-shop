import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let toastCount = 0
let listeners: Array<(toasts: Toast[]) => void> = []

export const toast = {
  success: (msg: string) => addToast(msg, 'success'),
  error: (msg: string) => addToast(msg, 'error'),
  info: (msg: string) => addToast(msg, 'info'),
}

function addToast(message: string, type: ToastType) {
  const id = ++toastCount
  const newToast = { id, message, type }
  
  const currentToasts = [...allToasts, newToast]
  allToasts = currentToasts
  notifyListeners()

  setTimeout(() => {
    removeToast(id)
  }, 3000)
}

function removeToast(id: number) {
  allToasts = allToasts.filter((t) => t.id !== id)
  notifyListeners()
}

let allToasts: Toast[] = []
function notifyListeners() {
  listeners.forEach((l) => l(allToasts))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToasts(newToasts)
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
              flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl border bg-white min-w-[300px]
              ${t.type === 'success' ? 'border-green-100' : t.type === 'error' ? 'border-red-100' : 'border-blue-100'}
            `}
          >
            {t.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {t.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
            
            <p className="text-sm font-medium text-foreground flex-1">{t.message}</p>
            
            <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
