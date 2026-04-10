import { useState } from 'react'
import { useCheckoutStore } from '@/store/checkoutStore'
import { cn } from '@/lib/utils'

const DISTRICTS = [
  'Баянзүрх', 'Баянгол', 'Хан-Уул', 'Сүхбаатар',
  'Чингэлтэй', 'Сонгинохайрхан', 'Налайх', 'Багануур', 'Багахангай'
]

interface Errors {
  [key: string]: string
}

export default function DeliveryForm({ onNext }: { onNext: () => void }) {
  const { delivery, setDelivery } = useCheckoutStore()
  const [formData, setFormData] = useState(delivery)
  const [errors, setErrors] = useState<Errors>({})

  const validate = () => {
    const newErrors: Errors = {}
    if (!formData.name) newErrors.name = 'Нэрээ оруулна уу'
    if (!formData.phone) {
      newErrors.phone = 'Утасны дугаараа оруулна уу'
    } else if (!/^[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = 'Утасны дугаар 8 оронтой тоо байх ёстой'
    }
    if (!formData.district) newErrors.district = 'Дүүрэг сонгоно уу'
    if (!formData.address) newErrors.address = 'Хороо / Байрны дугаар оруулна уу'
    if (!formData.note) newErrors.note = 'Дэлгэрэнгүй хаяг оруулна уу'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setDelivery(formData)
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-9 rounded-[10px] border border-brand-border h-fit">
      <div className="space-y-2">
        <h2 className="text-xl font-normal text-brand-ink uppercase tracking-tight">Хүргэлтийн мэдээлэл</h2>
        <p className="text-brand-sub text-[13px]">Бараа хүргэгдэх бодит мэдээллээ оруулна уу.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Нэр *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={cn(
              "w-full h-11 bg-brand-surface border px-4 text-brand-ink rounded-[6px] outline-none transition-all placeholder:text-brand-hint text-sm focus:bg-white",
              errors.name ? "border-brand-danger" : "border-brand-border focus:border-brand-ink"
            )}
            placeholder="Таны нэр"
          />
          {errors.name && <p className="text-brand-danger text-[11px] font-medium ml-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Утасны дугаар *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={cn(
              "w-full h-11 bg-brand-surface border px-4 text-brand-ink rounded-[6px] outline-none transition-all placeholder:text-brand-hint text-sm focus:bg-white",
              errors.phone ? "border-brand-danger" : "border-brand-border focus:border-brand-ink"
            )}
            placeholder="8888-8888"
          />
          {errors.phone && <p className="text-brand-danger text-[11px] font-medium ml-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City */}
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Хот *</label>
          <select
            value={formData.city}
            disabled
            className="w-full h-11 bg-brand-surface border border-brand-border px-4 text-brand-ink rounded-[6px] outline-none opacity-60 text-sm"
          >
            <option>Улаанбаатар</option>
          </select>
        </div>

        {/* District */}
        <div className="space-y-1.5">
          <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Дүүрэг *</label>
          <select
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className={cn(
              "w-full h-11 bg-brand-surface border px-4 text-brand-ink rounded-[6px] outline-none transition-all text-sm focus:bg-white",
              errors.district ? "border-brand-danger" : "border-brand-border focus:border-brand-ink"
            )}
          >
            <option value="">Сонгох</option>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.district && <p className="text-brand-danger text-[11px] font-medium ml-1">{errors.district}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Хороо / Байр дугаар *</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={cn(
            "w-full h-11 bg-brand-surface border px-4 text-brand-ink rounded-[6px] outline-none transition-all placeholder:text-brand-hint text-sm focus:bg-white",
            errors.address ? "border-brand-danger" : "border-brand-border focus:border-brand-ink"
          )}
          placeholder="Жишээ: 15-р хороо, 2-р байр"
        />
        {errors.address && <p className="text-brand-danger text-[11px] font-medium ml-1">{errors.address}</p>}
      </div>

      {/* Detailed Address */}
      <div className="space-y-1.5">
        <label className="text-brand-sub text-[11px] font-medium uppercase tracking-[1px] ml-1">Дэлгэрэнгүй хаяг *</label>
        <textarea
          rows={3}
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className={cn(
            "w-full bg-brand-surface border p-4 text-brand-ink rounded-[6px] outline-none transition-all placeholder:text-brand-hint text-sm resize-none focus:bg-white",
            errors.note ? "border-brand-danger" : "border-brand-border focus:border-brand-ink"
          )}
          placeholder="Дэлгэрэнгүй тайлбар (Орцны код, давхар г.м)"
        />
        {errors.note && <p className="text-brand-danger text-[11px] font-medium ml-1">{errors.note}</p>}
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-brand-ink text-brand-base font-normal text-[12px] uppercase tracking-[1.5px] rounded-[6px] hover:bg-brand-ink2 transition-all shadow-none"
      >
        ТӨЛБӨР РҮҮ ШИЛЖИХ
      </button>
    </form>
  )
}
