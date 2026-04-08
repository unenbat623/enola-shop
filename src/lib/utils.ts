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
