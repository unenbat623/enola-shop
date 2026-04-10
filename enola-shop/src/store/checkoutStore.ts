import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DeliveryData {
  name: string
  phone: string
  city: string
  district: string
  address: string
  note: string
}

interface CheckoutState {
  step: 1 | 2 | 3
  delivery: DeliveryData
  paymentMethod: 'qpay' | 'socialpay' | 'bank' | null
  orderId: string | null
  status: 'idle' | 'pending' | 'paid' | 'pending_payment'
  setStep: (step: 1 | 2 | 3) => void
  setDelivery: (data: DeliveryData) => void
  setPaymentMethod: (method: 'qpay' | 'socialpay' | 'bank' | null) => void
  setOrderId: (id: string | null) => void
  setStatus: (status: 'idle' | 'pending' | 'paid' | 'pending_payment') => void
  reset: () => void
}

const initialDelivery: DeliveryData = {
  name: '',
  phone: '',
  city: 'Улаанбаатар',
  district: '',
  address: '',
  note: '',
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      step: 1,
      delivery: initialDelivery,
      paymentMethod: null,
      orderId: null,
      status: 'idle',
      setStep: (step) => set({ step }),
      setDelivery: (delivery) => set({ delivery }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setOrderId: (orderId) => set({ orderId }),
      setStatus: (status) => set({ status }),
      reset: () => set({
        step: 1,
        delivery: initialDelivery,
        paymentMethod: null,
        orderId: null,
        status: 'idle'
      }),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
