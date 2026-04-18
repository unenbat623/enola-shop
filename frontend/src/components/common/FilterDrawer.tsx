import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, FilterX } from 'lucide-react'
import { categories } from '@/lib/constants'
import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  categoryFilter: string | null
  generalFilter: string | null
  searchParam: string
  categoryCounts: Record<string, number>
  totalProducts: number
  onFilterChange: (params: Record<string, string>) => void
  onClear: () => void
}

export default function FilterDrawer({
  isOpen, onClose, categoryFilter, generalFilter, searchParam,
  categoryCounts, totalProducts, onFilterChange, onClear
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[85%] max-w-[400px] bg-brand-base z-[201] shadow-2xl flex flex-col lg:hidden"
          >
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-brand-ink" />
                <span className="text-[14px] font-black uppercase tracking-[3px]">Шүүлтүүр</span>
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-brand-surface rounded-full transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-12">
               {/* Quick Buttons */}
               <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { onFilterChange({ filter: 'new' }); onClose(); }}
                    className={cn(
                      "h-12 rounded-[12px] border text-[11px] font-black uppercase tracking-wider transition-all",
                      generalFilter === 'new' ? 'bg-brand-ink text-brand-base border-brand-ink' : 'bg-white text-brand-sub border-brand-border'
                    )}
                  >
                    ✨ Шинэ
                  </button>
                  <button 
                    onClick={() => { onFilterChange({ filter: 'sale' }); onClose(); }}
                    className={cn(
                      "h-12 rounded-[12px] border text-[11px] font-black uppercase tracking-wider transition-all",
                      generalFilter === 'sale' ? 'bg-brand-ink text-brand-base border-brand-ink' : 'bg-white text-brand-sub border-brand-border'
                    )}
                  >
                    🏷️ Хямдрал
                  </button>
               </div>

               {/* Categories */}
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-brand-ghost uppercase tracking-[3px] border-b border-brand-border pb-3">Ангилал</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { onFilterChange({}); onClose(); }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-[12px] transition-all",
                        !categoryFilter && !generalFilter && !searchParam ? 'bg-brand-muted text-brand-ink font-bold' : 'text-brand-sub hover:bg-brand-surface'
                      )}
                    >
                      <span>Бүх бараа</span>
                      <span className="text-[10px] font-bold text-brand-hint bg-brand-surface px-2 py-0.5 rounded-full border border-brand-border">{totalProducts}</span>
                    </button>
                    {categories.map((cat: Category) => (
                      <button 
                        key={cat.id}
                        onClick={() => { onFilterChange({ category: cat.slug }); onClose(); }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-[12px] transition-all",
                          categoryFilter === cat.slug ? 'bg-brand-muted text-brand-ink font-bold' : 'text-brand-sub hover:bg-brand-surface'
                        )}
                      >
                        <div className="flex items-center gap-3">
                           <span>{cat.icon}</span>
                           <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-brand-hint bg-brand-surface px-2 py-0.5 rounded-full border border-brand-border">{categoryCounts[cat.slug] || 0}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-brand-border bg-white flex flex-col gap-4">
               <button 
                onClick={() => { onClear(); onClose(); }}
                className="w-full h-14 bg-brand-surface border border-brand-border text-brand-ink rounded-[12px] font-black text-[12px] tracking-[2px] uppercase flex items-center justify-center gap-2"
               >
                 <FilterX className="w-4 h-4" /> Шүүлтүүр цэвэрлэх
               </button>
               <button 
                onClick={onClose}
                className="w-full h-14 bg-brand-ink text-brand-base rounded-[12px] font-black text-[12px] tracking-[2px] uppercase"
               >
                 Үр дүнг харах
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
