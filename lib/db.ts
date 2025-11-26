import { adminDb } from './firebase-admin'

// Cache süresi (saniye)
const CACHE_TTL = 60 // 1 dakika

// Memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>()

function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL * 1000) {
    return cached.data as T
  }
  return null
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// Tool interface
export interface Tool {
  id: string
  title: string
  description: string
  category: string
  icon: string
  href: string
  keywords: string[]
  isActive: boolean
}

// Aktif araçları getir
export async function getActiveTools(): Promise<Tool[]> {
  const cacheKey = 'active-tools'
  const cached = getCached<Tool[]>(cacheKey)
  if (cached) return cached

  try {
    const snapshot = await adminDb.collection('tools')
      .where('isActive', '==', true)
      .get()
    
    const tools = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tool[]
    
    setCache(cacheKey, tools)
    return tools
  } catch (error) {
    console.error('Error fetching active tools:', error)
    return []
  }
}

// Popüler araçları getir
export async function getPopularTools(): Promise<string[]> {
  const cacheKey = 'popular-tools'
  const cached = getCached<string[]>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('settings').doc('popularTools').get()
    if (doc.exists) {
      const data = doc.data()
      const tools = data?.tools || []
      setCache(cacheKey, tools)
      return tools
    }
    return []
  } catch (error) {
    console.error('Error fetching popular tools:', error)
    return []
  }
}

// Aktif kategorileri getir
export async function getActiveCategories(): Promise<string[]> {
  const cacheKey = 'active-categories'
  const cached = getCached<string[]>(cacheKey)
  if (cached) return cached

  try {
    const snapshot = await adminDb.collection('categories')
      .where('isActive', '==', true)
      .orderBy('displayOrder', 'asc')
      .get()
    
    const categories = snapshot.docs.map(doc => doc.data().name as string)
    setCache(cacheKey, categories)
    return categories
  } catch (error) {
    console.error('Error fetching active categories:', error)
    return []
  }
}

// Burç yorumlarını getir
export interface HoroscopeData {
  general: string
  love: string
  career: string
  health: string
  luckyNumbers?: string
  luckyColor?: string
}

export async function getHoroscopes(period: 'daily' | 'weekly' | 'monthly' | 'yearly'): Promise<Record<string, HoroscopeData>> {
  const cacheKey = `horoscopes-${period}`
  const cached = getCached<Record<string, HoroscopeData>>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('horoscopes').doc(period).get()
    if (doc.exists) {
      const data = doc.data() as Record<string, HoroscopeData>
      setCache(cacheKey, data)
      return data
    }
    return {}
  } catch (error) {
    console.error('Error fetching horoscopes:', error)
    return {}
  }
}

// Altın fiyatlarını getir
export interface GoldPrices {
  gram: number
  ceyrek: number
  yarim: number
  tam: number
  ons: number
  lastUpdate: Date
}

export async function getGoldPrices(): Promise<GoldPrices | null> {
  const cacheKey = 'gold-prices'
  const cached = getCached<GoldPrices>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('prices').doc('gold').get()
    if (doc.exists) {
      const data = doc.data() as GoldPrices
      setCache(cacheKey, data)
      return data
    }
    return null
  } catch (error) {
    console.error('Error fetching gold prices:', error)
    return null
  }
}

// Döviz kurlarını getir
export interface CurrencyRates {
  USD: number
  EUR: number
  GBP: number
  lastUpdate: Date
}

export async function getCurrencyRates(): Promise<CurrencyRates | null> {
  const cacheKey = 'currency-rates'
  const cached = getCached<CurrencyRates>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('prices').doc('currency').get()
    if (doc.exists) {
      const data = doc.data() as CurrencyRates
      setCache(cacheKey, data)
      return data
    }
    return null
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    return null
  }
}

// Maaş ayarlarını getir
export interface TaxBracket {
  min: number
  max: number | null
  rate: number
}

export interface SalarySettings {
  minWage: number
  year: number
  taxBrackets: TaxBracket[]
  deductionRates: {
    sgk: number
    issizlik: number
    gelirVergisi: number
    damgaVergisi: number
  }
}

export async function getSalarySettings(): Promise<SalarySettings | null> {
  const cacheKey = 'salary-settings'
  const cached = getCached<SalarySettings>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('settings').doc('salary').get()
    if (doc.exists) {
      const data = doc.data() as SalarySettings
      setCache(cacheKey, data)
      return data
    }
    return null
  } catch (error) {
    console.error('Error fetching salary settings:', error)
    return null
  }
}

// Tapu ayarlarını getir
export interface TapuSettings {
  aliciHarcOrani: number
  saticiHarcOrani: number
  donerSermaye: number
  tapuKayitUcreti: number
  year: number
}

export async function getTapuSettings(): Promise<TapuSettings | null> {
  const cacheKey = 'tapu-settings'
  const cached = getCached<TapuSettings>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('settings').doc('tapu').get()
    if (doc.exists) {
      const data = doc.data() as TapuSettings
      setCache(cacheKey, data)
      return data
    }
    return null
  } catch (error) {
    console.error('Error fetching tapu settings:', error)
    return null
  }
}

// Emeklilik ayarlarını getir
export interface RetirementRule {
  id: string
  gender: 'erkek' | 'kadin'
  startYear: number
  endYear: number | null
  minAge: number
  minPremiumDays: number
  description: string
}

export interface RetirementSettings {
  year: number
  rules: RetirementRule[]
}

export async function getRetirementSettings(): Promise<RetirementSettings | null> {
  const cacheKey = 'retirement-settings'
  const cached = getCached<RetirementSettings>(cacheKey)
  if (cached) return cached

  try {
    const doc = await adminDb.collection('settings').doc('retirement').get()
    if (doc.exists) {
      const data = doc.data() as RetirementSettings
      setCache(cacheKey, data)
      return data
    }
    return null
  } catch (error) {
    console.error('Error fetching retirement settings:', error)
    return null
  }
}

// Markaları getir
export interface SizeChart {
  size: string
  chest: string
  waist: string
  hips: string
}

export interface Brand {
  id: string
  name: string
  logo?: string
  isActive: boolean
  sizeCharts: {
    men: SizeChart[]
    women: SizeChart[]
  }
}

export async function getActiveBrands(): Promise<Brand[]> {
  const cacheKey = 'active-brands'
  const cached = getCached<Brand[]>(cacheKey)
  if (cached) return cached

  try {
    const snapshot = await adminDb.collection('brands')
      .where('isActive', '==', true)
      .get()
    
    const brands = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Brand[]
    
    setCache(cacheKey, brands)
    return brands
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}
