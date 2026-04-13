import { useEffect, useState } from 'react'
import { productsApi } from '@/api/products'
import { Plus, Edit, Trash2, Loader2, X, Image as ImageIcon } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/lib/types'
import { categories } from '@/lib/constants'

const EMPTY_FORM = {
  name: '', slug: '', price: '',
  originalPrice: '', category: '', categorySlug: '',
  stock: '', description: '', images: ''
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')

  const load = async () => {
    setIsLoading(true)
    try {
      const data = await productsApi.getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch { setProducts([]) }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditId(null)
    setFormData(EMPTY_FORM)
    setFormError('')
    setIsModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditId(p.id)
    setFormData({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      category: p.category,
      categorySlug: p.categorySlug,
      stock: p.stock ? String(p.stock) : '',
      description: p.description,
      images: p.images?.join('\n') ?? '',
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleCategoryChange = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug)
    setFormData((f) => ({
      ...f,
      categorySlug: slug,
      category: cat?.name ?? f.category,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setIsSaving(true)
    try {
      const payload: Partial<Product> = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        categorySlug: formData.categorySlug,
        stock: Number(formData.stock) || 0,
        inStock: Number(formData.stock) > 0,
        description: formData.description,
        images: formData.images.split('\n').map((s) => s.trim()).filter(Boolean),
        rating: 0, reviewCount: 0,
      }
      if (editId) {
        await productsApi.updateProduct(editId, payload)
      } else {
        await productsApi.createProduct(payload)
      }
      closeModal()
      load()
    } catch (err: any) {
      setFormError(err.message || 'Хадгалахад алдаа гарлаа')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" барааг устгах уу?`)) return
    try {
      await productsApi.deleteProduct(id)
      load()
    } catch { alert('Устгахад алдаа гарлаа') }
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink tracking-tight">Бүтээгдэхүүн</h1>
          <p className="text-sm text-brand-sub mt-1">Нийт {products.length} бүтээгдэхүүн</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-brand-ink text-brand-base px-5 py-2.5 rounded-[6px] text-[12px] font-bold tracking-[1px] hover:bg-brand-ink2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Шинэ бараа нэмэх
        </button>
      </header>

      {/* Table */}
      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="w-6 h-6 animate-spin text-brand-hint" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold tracking-[1.5px]">
                <tr>
                  <th className="px-5 py-4 w-14">Зураг</th>
                  <th className="px-5 py-4">Нэр</th>
                  <th className="px-5 py-4">Ангилал</th>
                  <th className="px-5 py-4">Үнэ</th>
                  <th className="px-5 py-4">Тоо</th>
                  <th className="px-5 py-4 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {products.length > 0 ? products.map((p) => (
                  <tr key={p.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-10 h-12 rounded-[4px] bg-brand-muted border border-brand-border overflow-hidden flex-shrink-0">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-full h-full p-2 text-brand-ghost" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-[10px] text-brand-hint">{p.slug}</p>
                    </td>
                    <td className="px-5 py-3 text-brand-sub">{p.category}</td>
                    <td className="px-5 py-3 font-medium">{formatCurrency(p.price)}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${(p.stock ?? 0) > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {p.stock ?? 0} ш
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right space-x-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 text-brand-hint hover:text-brand-ink hover:bg-brand-surface rounded-[4px] transition-colors"
                        title="Засах"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-2 text-brand-danger hover:bg-red-50 rounded-[4px] transition-colors"
                        title="Устгах"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-brand-sub">
                      Одоогоор бараа байхгүй байна.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-[14px] border border-brand-border w-full max-w-2xl my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-brand-border">
              <h2 className="text-xl font-normal text-brand-ink">
                {editId ? 'Бараа засах' : 'Шинэ бараа нэмэх'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-brand-hint hover:text-brand-ink hover:bg-brand-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[6px] px-4 py-3">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Нэр *">
                  <input
                    required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-base"
                    placeholder="Барааны нэр"
                  />
                </Field>

                <Field label="URL Slug">
                  <input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="input-base"
                    placeholder="auto-gen эсвэл custom-slug"
                  />
                </Field>

                <Field label="Үнэ (₮) *">
                  <input
                    type="number" required min="0" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-base"
                    placeholder="0"
                  />
                </Field>

                <Field label="Эхний үнэ (₮)">
                  <input
                    type="number" min="0" value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="input-base"
                    placeholder="Хямдрал өмнөх үнэ"
                  />
                </Field>

                <Field label="Ангилал *">
                  <select
                    required value={formData.categorySlug}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="input-base"
                  >
                    <option value="">-- Сонгох --</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Тоо ширхэг *">
                  <input
                    type="number" required min="0" value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input-base"
                    placeholder="0"
                  />
                </Field>
              </div>

              <Field label="Зургийн URL (мөр бүрт нэг URL)">
                <textarea
                  rows={3} value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="input-base resize-none"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </Field>

              <Field label="Тодорхойлолт *">
                <textarea
                  required rows={4} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-base resize-none"
                  placeholder="Барааны дэлгэрэнгүй тодорхойлолт..."
                />
              </Field>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button" onClick={closeModal}
                  className="px-6 py-2.5 text-[12px] font-medium text-brand-sub border border-brand-border rounded-[6px] hover:bg-brand-surface transition-colors"
                >
                  Цуцлах
                </button>
                <button
                  type="submit" disabled={isSaving}
                  className="px-8 py-2.5 bg-brand-ink text-brand-base rounded-[6px] text-[12px] font-bold tracking-[1px] hover:bg-brand-ink2 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editId ? 'Хадгалах' : 'Нэмэх'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`.input-base { width: 100%; border: 1px solid var(--color-brand-border, #e5e5e5); border-radius: 6px; height: 42px; padding: 0 12px; outline: none; font-size: 13px; } .input-base:focus { border-color: var(--color-brand-ink, #1a1a1a); } textarea.input-base { height: auto; padding: 10px 12px; }`}</style>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-brand-hint uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
