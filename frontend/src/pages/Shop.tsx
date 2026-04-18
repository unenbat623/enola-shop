import { useSearchParams } from 'react-router'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'
import { useProductStore } from '@/store/productStore'
import ProductCard from '@/components/product/ProductCard'
import { useState, useMemo, useEffect, useRef } from 'react'
import { ShoppingBag, Search, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronDown, FilterX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export default function ShopPage() {
  const { products, isLoading } = useProductStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  
  const categoryFilter = searchParams.get('category')
  const generalFilter = searchParams.get('filter') // e.g. sale, new
  const searchParam = searchParams.get('search') || ''
  const sortBy = searchParams.get('sort') || 'newest'

  // Local search state for the input field
  const [searchInputValue, setSearchInputValue] = useState(searchParam)

  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchInputValue(searchParam)
  }, [searchParam])

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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach(p => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1
    })
    return counts
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      let matches = true
      if (categoryFilter) matches = matches && p.categorySlug === categoryFilter
      if (generalFilter === 'sale') matches = matches && (p.badge === 'Хямдрал' || p.badge === 'SALE')
      if (generalFilter === 'new') matches = matches && (p.badge === 'Шинэ' || p.badge === 'NEW')
      
      if (searchParam) {
        const query = searchParam.toLowerCase()
        matches = matches && (
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        )
      }
      return matches
    })

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    return result
  }, [categoryFilter, generalFilter, searchParam, sortBy, products])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchInputChange = (val: string) => {
    setSearchInputValue(val)
    if (val.length >= 2) {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), search: val })
    } else if (val.length === 0) {
      const newParams = Object.fromEntries(searchParams.entries())
      delete newParams.search
      setSearchParams(newParams)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-brand-base min-h-screen py-10 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="flex flex-col gap-10">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-brand-border">
            <div className="space-y-3">
              <h1 className="text-4xl font-normal text-brand-ink tracking-[4px] uppercase">Дэлгүүр</h1>
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-brand-ink"></span>
                <p className="text-brand-sub text-[14px] font-medium">Шинэ үеийн streetwear загварууд</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-hint group-focus-within:text-brand-ink transition-colors" />
              <input 
                type="text"
                placeholder="Бүтээгдэхүүн хайх..."
                value={searchInputValue}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-brand-surface border border-brand-border rounded-[10px] text-[13px] font-medium focus:border-brand-ink outline-none transition-all placeholder:text-brand-hint shadow-sm group-hover:border-brand-hint"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-brand-ink">
                    <SlidersHorizontal className="w-4 h-4" />
                    <h3 className="text-[11px] font-black uppercase tracking-[3px]">Шүүлтүүр</h3>
                  </div>
                  {(categoryFilter || generalFilter || searchParam) && (
                    <button 
                      onClick={() => {setSearchParams({}); setSearchInputValue('')}}
                      className="text-[10px] font-bold text-brand-danger uppercase tracking-widest hover:underline flex items-center gap-1.5"
                    >
                      <FilterX className="w-3 h-3" /> Арилгах
                    </button>
                  )}
                </div>
                
                <div className="space-y-10">
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black text-brand-ghost uppercase tracking-[3px] border-b border-brand-border pb-3">Ангилал</h4>
                    <ul className="space-y-3">
                      <li>
                        <button 
                          onClick={() => {setSearchParams({}); setCurrentPage(1)}}
                          className={cn(
                            "text-[13px] transition-all flex items-center justify-between w-full group py-1",
                            !categoryFilter && !generalFilter && !searchParam ? 'text-brand-ink font-bold' : 'text-brand-sub hover:text-brand-ink'
                          )}
                        >
                          <span className="flex items-center gap-2">
                             <span className={cn("w-1.5 h-1.5 rounded-full transition-all", !categoryFilter && !generalFilter && !searchParam ? 'bg-brand-ink' : 'bg-transparent group-hover:bg-brand-border')} />
                             Бүх бараа
                          </span>
                          <span className="text-[10px] font-bold text-brand-hint bg-brand-surface px-2 py-0.5 rounded-full border border-brand-border">{(products.length)}</span>
                        </button>
                      </li>
                      {categories.map((cat: Category) => (
                        <li key={cat.id}>
                          <button 
                            onClick={() => {setSearchParams({ category: cat.slug }); setCurrentPage(1)}}
                            className={cn(
                              "text-[13px] transition-all flex items-center justify-between w-full group py-1",
                              categoryFilter === cat.slug ? 'text-brand-ink font-bold' : 'text-brand-sub hover:text-brand-ink'
                            )}
                          >
                            <span className="flex items-center gap-2">
                               <span className={cn("w-1.5 h-1.5 rounded-full transition-all", categoryFilter === cat.slug ? 'bg-brand-ink' : 'bg-transparent group-hover:bg-brand-border')} />
                               {cat.name}
                            </span>
                            <span className="text-[10px] font-bold text-brand-hint bg-brand-surface px-2 py-0.5 rounded-full border border-brand-border">{categoryCounts[cat.slug] || 0}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black text-brand-ghost uppercase tracking-[3px] border-b border-brand-border pb-3">Цуглуулга</h4>
                    <ul className="space-y-3">
                       {[
                         { id: 'new', name: 'Шинэ бараа', icon: '✨' },
                         { id: 'sale', name: 'Хямдралтай', icon: '🏷️' }
                       ].map(f => (
                         <li key={f.id}>
                            <button 
                              onClick={() => {setSearchParams({ filter: f.id }); setCurrentPage(1)}}
                              className={cn(
                                "text-[13px] transition-all flex items-center justify-between w-full group py-1",
                                generalFilter === f.id ? 'text-brand-ink font-bold' : 'text-brand-sub hover:text-brand-ink'
                              )}
                            >
                              <span className="flex items-center gap-2">
                                 <span className={cn("w-1.5 h-1.5 rounded-full transition-all", generalFilter === f.id ? 'bg-brand-ink' : 'bg-transparent group-hover:bg-brand-border')} />
                                 {f.name}
                              </span>
                              <span>{f.icon}</span>
                            </button>
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <main className="flex-1 space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-[12px] border border-brand-border shadow-sm gap-4">
                <p className="text-[12px] font-bold text-brand-sub uppercase tracking-widest">
                  {searchParam ? (
                    <>"{searchParam}" хайлтын үр дүн: <span className="text-brand-ink font-black">{filteredAndSortedProducts.length}</span> бүтээгдэхүүн</>
                  ) : (
                    <>Нийт <span className="text-brand-ink font-black">{filteredAndSortedProducts.length}</span> бүтээгдэхүүн</>
                  )}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black text-brand-ghost uppercase tracking-[2px]">Эрэмбэлэх:</span>
                  <div className="relative" ref={sortRef}>
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="min-w-[200px] h-11 rounded-[8px] border border-brand-border px-4 flex items-center justify-between gap-3 bg-brand-surface text-[12px] font-bold text-brand-ink transition-all hover:border-brand-ink shadow-sm"
                    >
                      <span className="truncate uppercase">{currentSortLabel}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-500", isSortOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute right-0 mt-2 w-full bg-white border border-brand-border rounded-[12px] shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="py-2">
                            {sortOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: option.value })
                                  setIsSortOpen(false)
                                }}
                                className={cn(
                                  "w-full px-5 py-3 text-left text-[12px] font-bold uppercase tracking-wider transition-colors hover:bg-brand-surface",
                                  sortBy === option.value ? 'text-brand-ink bg-brand-surface' : 'text-brand-sub'
                                )}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-y-12">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-y-12"
                  >
                    {paginatedProducts.map((product) => (
                      <motion.div variants={item} key={product.id}>
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 pt-20">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-11 h-11 border border-brand-border rounded-[10px] flex items-center justify-center hover:bg-brand-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={cn(
                              "w-11 h-11 text-[13px] font-bold rounded-[10px] border transition-all shadow-sm",
                              currentPage === i + 1 
                                ? 'bg-brand-ink text-brand-base border-brand-ink scale-110' 
                                : 'border-brand-border bg-white text-brand-sub hover:border-brand-ink'
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-11 h-11 border border-brand-border rounded-[10px] flex items-center justify-center hover:bg-brand-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-brand-surface rounded-[20px] border border-brand-border py-32 text-center flex flex-col items-center justify-center gap-8 shadow-inner"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-brand-border text-brand-ghost shadow-xl">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[22px] font-normal text-brand-ink uppercase tracking-[4px]">Илэрц олдсонгүй</h3>
                    <p className="text-brand-sub text-[15px] font-medium max-w-sm mx-auto leading-relaxed">Харамсалтай нь таны хайлт болон шүүлтүүрт тохирох бүтээгдэхүүн байхгүй байна.</p>
                  </div>
                  <button 
                    onClick={() => {setSearchParams({}); setSearchInputValue('')}} 
                    className="bg-brand-ink text-brand-base px-10 py-4 rounded-[10px] font-black text-[12px] tracking-[2.5px] hover:bg-brand-ink2 transition-all transform hover:scale-105 active:scale-95 uppercase shadow-2xl shadow-brand-ink/20"
                  >
                    Бүх барааг харах
                  </button>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
