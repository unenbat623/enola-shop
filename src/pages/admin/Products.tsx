import { useEffect, useState } from 'react'
import { productsApi } from '@/api/products'
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/lib/types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEditId, setCurrentEditId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    category: '',
    categorySlug: '',
    stock: '',
    description: '',
    images: ''
  })

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const data = await productsApi.getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const openModal = (product?: Product) => {
    if (product) {
      setCurrentEditId(product.id)
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        categorySlug: product.categorySlug || '',
        stock: product.stock?.toString() || '',
        description: product.description || '',
        images: product.images ? product.images.join(', ') : ''
      })
    } else {
      setCurrentEditId(null)
      setFormData({
        name: '', slug: '', price: '', category: '', categorySlug: '', stock: '', description: '', images: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Энэ барааг устгах уу?')) {
      try {
        await productsApi.deleteProduct(id)
        loadProducts()
      } catch (err) {
        alert('Устгахад алдаа гарлаа')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.split(',').map(img => img.trim()).filter(Boolean)
      }
      
      if (currentEditId) {
        await productsApi.updateProduct(currentEditId, payload as Partial<Product>)
      } else {
        await productsApi.createProduct(payload as Partial<Product>)
      }
      
      setIsModalOpen(false)
      loadProducts()
    } catch (err) {
      alert('Хадгалахад алдаа гарлаа')
    }
  }

  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-normal text-brand-ink normal-case tracking-tight">Бүтээгдэхүүн</h1>
          <p className="text-[14px] text-brand-sub mt-2">Нийт {products.length} бүтээгдэхүүн бүртгэлтэй байна.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-ink text-brand-base px-5 py-2.5 rounded-[4px] text-[12px] font-bold normal-case tracking-[1px] hover:bg-brand-ink2 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Шинэ бараа
        </button>
      </header>

      {/* Main Table Layer */}
      <div className="bg-white border border-brand-border rounded-[10px] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-6 h-6 animate-spin text-brand-hint" /></div>
        ) : (
          <div className="overflow-x-auto object-contain">
            <table className="w-full text-left">
              <thead className="bg-brand-surface text-brand-hint text-[10px] font-bold normal-case tracking-[1.5px]">
                <tr>
                  <th className="px-6 py-4">Зураг</th>
                  <th className="px-6 py-4">Бүтээгдэхүүн</th>
                  <th className="px-6 py-4">Ангилал</th>
                  <th className="px-6 py-4">Үнэ</th>
                  <th className="px-6 py-4">Үлдэгдэл</th>
                  <th className="px-6 py-4 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-brand-ink">
                {products.length > 0 ? products.map((product) => (
                  <tr key={product.id} className="border-b border-brand-border hover:bg-brand-surface transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-10 rounded-[4px] bg-brand-muted border border-brand-border overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-full h-full p-2 text-brand-ghost" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-medium">{product.name}</td>
                    <td className="px-6 py-5 text-brand-sub">{product.category}</td>
                    <td className="px-6 py-5 font-medium">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-5">{product.stock || 0} ш</td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button onClick={() => openModal(product)} className="p-2 text-brand-hint hover:text-brand-ink hover:bg-white rounded-[4px] transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-brand-danger hover:bg-brand-danger/10 rounded-[4px] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-brand-sub">Одоогоор бараа байхгүй байна.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] border border-brand-border p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-normal text-brand-ink normal-case mb-6">{currentEditId ? 'Бараа засах' : 'Бүтээгдэхүүн нэмэх'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Нэр</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">URL Slug</label>
                  <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" placeholder="Жишээ: black-tshirt" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Үнэ</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Ангилал (Нэр)</label>
                  <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Ангилал Slug</label>
                  <input required value={formData.categorySlug} onChange={e => setFormData({...formData, categorySlug: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" placeholder="Жишээ: clothing" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Үлдэгдэл</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Зураг (Таслалаар тусгаарлах)</label>
                <input required value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-10 px-3 outline-none focus:border-brand-ink text-[13px]" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-brand-hint uppercase tracking-wider">Дэлгэрэнгүй тодорхойлолт</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-brand-border rounded-[6px] h-24 p-3 outline-none focus:border-brand-ink text-[13px]" />
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-[12px] font-medium text-brand-sub hover:bg-brand-surface rounded-[4px] transition-colors">Цуцлах</button>
                <button type="submit" className="px-6 py-2.5 bg-brand-ink text-brand-base rounded-[4px] text-[12px] font-bold tracking-[1px] normal-case hover:bg-brand-ink2 transition-colors">Хадгалах</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
