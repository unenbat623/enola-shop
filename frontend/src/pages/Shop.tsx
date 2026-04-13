import { useSearchParams } from 'react-router'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'
import { useProductStore } from '@/store/productStore'
import ProductCard from '@/components/product/ProductCard'
import { useState, useMemo, useEffect, useRef } from 'react'
import { ShoppingBag, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SkeletonCard } from '@/components/common/SkeletonCard'

const ITEMS_PER_PAGE = 12

export default function ShopPage() {
  const { products, isLoading } = useProductStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const categoryFilter = searchParams.get('category')
  const generalFilter = searchParams.get('filter') // e.g. sale, new
  const sortBy = searchParams.get('sort') || 'newest'

  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sortOptions = [
    { value: 'newest', label: 'Сүүлд нэмэгдсэн' },
    { value: 'price-low', label: 'Үнэ: Багаас их' },
    { value: 'price-high', label: 'Үнэ: Ихээс бага' },
  ]

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Сүүлд нэмэгдсэн'

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      let matches = true
      if (categoryFilter) matches = matches && p.categorySlug === categoryFilter
      if (generalFilter === 'sale') matches = matches && p.badge === 'Хямдрал'
      if (generalFilter === 'new') matches = matches && p.badge === 'Шинэ'
      if (searchQuery) {
        matches = matches && p.name.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return matches
    })

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        // Assume mock data order is newest default or add a date field
        break
    }

    return result
  }, [categoryFilter, generalFilter, searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-brand-base min-h-screen py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-border">
            <div className="space-y-2">
              <h1 className="text-3xl font-normal text-brand-ink tracking-[2px] normal-case">Дэлгүүр</h1>
              <p className="text-brand-sub text-[14px]">Танд зориулсан шилдэг сонголтууд</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-hint" />
              <input 
                type="text"
                placeholder="Хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-brand-surface border border-brand-border rounded-[8px] text-[13px] focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-brand-ink">
                  <SlidersHorizontal className="w-4 h-4" />
                  <h3 className="text-[12px] font-bold uppercase tracking-[2px]">Шүүлтүүр</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-brand-hint uppercase tracking-wider">Ангилал</h4>
                    <ul className="space-y-2">
                      <li>
                        <button 
                          onClick={() => {
                            setSearchParams({})
                            setCurrentPage(1)
                          }}
                          className={`text-[13px] transition-colors ${!categoryFilter && !generalFilter ? 'text-brand-ink font-medium underline underline-offset-4' : 'text-brand-sub hover:text-brand-ink'}`}
                        >
                          Бүгд
                        </button>
                      </li>
                      {categories.map((cat: Category) => (
                        <li key={cat.id}>
                          <button 
                            onClick={() => {
                              setSearchParams({ category: cat.slug })
                              setCurrentPage(1)
                            }}
                            className={`text-[13px] transition-colors flex items-center justify-between w-full ${categoryFilter === cat.slug ? 'text-brand-ink font-medium underline underline-offset-4' : 'text-brand-sub hover:text-brand-ink'}`}
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-brand-hint">({cat.productCount})</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-brand-hint uppercase tracking-wider">Бусад</h4>
                    <ul className="space-y-2">
                      <li>
                        <button 
                          onClick={() => {
                            setSearchParams({ filter: 'new' })
                            setCurrentPage(1)
                          }}
                          className={`text-[13px] transition-colors ${generalFilter === 'new' ? 'text-brand-ink font-medium underline underline-offset-4' : 'text-brand-sub hover:text-brand-ink'}`}
                        >
                          Шинэ бараа
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => {
                            setSearchParams({ filter: 'sale' })
                            setCurrentPage(1)
                          }}
                          className={`text-[13px] transition-colors ${generalFilter === 'sale' ? 'text-brand-ink font-medium underline underline-offset-4' : 'text-brand-sub hover:text-brand-ink'}`}
                        >
                          Хямдралтай
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="flex-1 space-y-8">
              <div className="flex justify-between items-center bg-brand-surface px-6 py-4 rounded-[8px] border border-brand-border">
                <p className="text-[12px] text-brand-sub">Нийт <span className="text-brand-ink font-medium">{filteredAndSortedProducts.length}</span> бүтээгдэхүүн олдлоо</p>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-brand-hint uppercase tracking-wider">Эрэмбэлэх:</span>
                  <div className="relative" ref={sortRef}>
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="min-w-[180px] rounded-xl border border-brand-border px-4 py-2 flex items-center justify-between gap-2 bg-brand-surface text-[12px] font-medium text-brand-ink transition-all hover:border-brand-ink"
                    >
                      <span>{currentSortLabel}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-full bg-white border border-brand-border rounded-xl shadow-lg z-50 overflow-hidden"
                        >
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <div
                                key={option.value}
                                onClick={() => {
                                  setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: option.value })
                                  setIsSortOpen(false)
                                }}
                                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors hover:bg-gray-50 
                                  ${sortBy === option.value ? 'text-brand-ink font-medium bg-gray-50' : 'text-brand-sub'}`}
                              >
                                {option.label}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-12">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-brand-border rounded-[4px] hover:bg-brand-surface disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 text-[13px] rounded-[4px] border transition-all ${currentPage === i + 1 ? 'bg-brand-ink text-brand-base border-brand-ink' : 'border-brand-border hover:bg-brand-surface text-brand-sub'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-brand-border rounded-[4px] hover:bg-brand-surface disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-brand-surface rounded-[12px] border border-brand-border py-24 text-center flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 bg-brand-base rounded-full flex items-center justify-center border border-brand-border text-brand-ghost">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-medium text-brand-ink uppercase tracking-wider">Илэрц олдсонгүй</h3>
                    <p className="text-brand-sub text-[14px]">Та хайлтаа өөрчилж эсвэл шүүлтүүрээ арилгаад дахин оролдоно уу.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSearchParams({})
                      setSearchQuery('')
                    }} 
                    className="bg-brand-ink text-brand-base px-10 py-3 rounded-[6px] font-medium text-[12px] tracking-widest hover:bg-brand-ink2 transition-all uppercase mt-4"
                  >
                    Бүх бүтээгдэхүүнийг харах
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
