import { Category } from './types'

export const categories: Category[] = [
  { id: '1', name: 'Цүнх & Уут', slug: 'bags', icon: '👜' },
  { id: '2', name: 'Хувцас', slug: 'clothing', icon: '👗' },
  { id: '3', name: 'Гутал', slug: 'shoes', icon: '👟' },
  { id: '4', name: 'Гоо сайхан', slug: 'beauty', icon: '💄' },
  { id: '5', name: 'Аксессуар', slug: 'accessories', icon: '⌚' },
]

export const brands = [
  { id: 'b1', name: 'Gobi' },
  { id: 'b2', name: 'Goyol' },
  { id: 'b3', name: 'Michel & Amazonka' },
  { id: 'b4', name: 'Lhamour' },
  { id: 'b5', name: 'Anar' },
  { id: 'b6', name: 'Tsetseg' },
  { id: 'b7', name: 'Belen' },
  { id: 'b8', name: 'Titem' },
]

export const heroSlides = [
  {
    id: 's1',
    title: 'Enola Shop-т тавтай морил',
    subtitle: 'Шинэ загвар. Шинэ мэдрэмж.',
    buttonText: 'Дэлгүүр харах →',
    buttonHref: '/shop',
    gradient: 'from-[#f3e8ff] to-[#e9d5ff]'
  },
  {
    id: 's2',
    title: 'Тусгай хямдрал -30%',
    subtitle: 'Сонгогдсон бараануудад онцгой хямдрал зарлалаа.',
    buttonText: 'Хямдралтай бараа →',
    buttonHref: '/shop?filter=sale',
    gradient: 'from-[#fdf4ff] to-[#fae8ff]'
  }
]
