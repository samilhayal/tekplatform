import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Category mapping from Turkish to translation keys
export const categoryMap: Record<string, string> = {
  'Finans & Matematik': 'finance',
  'Sağlık & Yaşam': 'health',
  'Eğitim & Sınav': 'education',
  'PDF Araçları': 'pdf',
  'Dönüştürücüler': 'converters',
  'Oluşturucular': 'generators',
  'Hesaplayıcılar': 'calculators',
  'Metin & String': 'text',
  'Zaman & Verimlilik': 'productivity',
  'Çalışma & İş': 'work',
  'Şans & Oyun': 'games',
  'Görsel & Tasarım': 'design',
  'Kod Araçları': 'code',
  'Emlak': 'realestate',
  'Moda & Stil': 'fashion',
  'Astroloji': 'astrology',
  'Aile & Bebek': 'family'
}

export function getCategoryKey(category: string): string {
  return categoryMap[category] || category
}
