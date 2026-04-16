import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    minimumFractionDigits: 0,
  }).format(amount).replace('MNT', '₮')
}

export function calculateDiscountPercentage(price: number, originalPrice: number) {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function getColorCSS(color: string): string {
  const map: Record<string, string> = {
    'Хар': '#1A1A1A',
    'Цагаан': '#FFFFFF',
    'Улаан': '#E02D2D',
    'Цэнхэр': '#2D5CE0',
    'Ногоон': '#2DE05C',
    'Шар': '#E0D62D',
    'Ягаан': '#E02DB4',
    'Саарал': '#808080',
    'Бор': '#795548',
    'Нил': '#8E24AA',
    'Улбар шар': '#FF9800',
    'Хүрэн': '#A52A2A',
    'Cream': '#FFFDD0',
    'Крем': '#FFFDD0',
    'Beige': '#F5F5DC',
    'Бэйж': '#F5F5DC',
  }
  return map[color] || map[color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()] || color.toLowerCase()
}
