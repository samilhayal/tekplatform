import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// CollectAPI'den gelen para birimi kodlarını eşleştirme
const CURRENCY_MAP: Record<string, string> = {
  'USD': 'USD',
  'EUR': 'EUR',
  'GBP': 'GBP',
  'CHF': 'CHF',
  'JPY': 'JPY',
  'SAR': 'SAR',
  'AED': 'AED',
  'CAD': 'CAD',
  'AUD': 'AUD',
  'CNY': 'CNY',
  'RUB': 'RUB',
}

// Para birimi tanımları (TRY dahil)
const CURRENCIES = ['TRY', 'USD', 'EUR', 'GBP', 'CHF', 'JPY', 'SAR', 'AED', 'CAD', 'AUD', 'CNY', 'RUB']

// Çapraz kurları hesapla
function calculateAllCrossRates(usdRates: Record<string, number>): Record<string, Record<string, number>> {
  const rates: Record<string, Record<string, number>> = {}
  
  CURRENCIES.forEach(from => {
    rates[from] = {}
    CURRENCIES.forEach(to => {
      if (from === to) {
        rates[from][to] = 1
      } else if (from === 'USD') {
        rates[from][to] = usdRates[to] || 0
      } else if (to === 'USD') {
        rates[from][to] = usdRates[from] ? 1 / usdRates[from] : 0
      } else {
        const fromToUsd = usdRates[from] ? 1 / usdRates[from] : 0
        const usdToTarget = usdRates[to] || 0
        rates[from][to] = fromToUsd * usdToTarget
      }
    })
  })
  
  return rates
}

// CollectAPI'den döviz kurlarını çek
async function fetchCurrencyRates(): Promise<Record<string, number> | null> {
  const apiKey = process.env.COLLECTAPI_KEY
  
  if (!apiKey) {
    console.error('COLLECTAPI_KEY environment variable is not set')
    return null
  }

  try {
    const response = await fetch('https://api.collectapi.com/economy/allCurrency', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': apiKey
      }
    })

    if (!response.ok) {
      console.error('CollectAPI error:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    
    if (!data.success || !data.result) {
      console.error('CollectAPI returned unsuccessful response:', data)
      return null
    }

    // API'den gelen TRY bazlı kurları USD bazlı kurlara dönüştür
    const usdRates: Record<string, number> = {}
    let usdToTry = 0

    // Önce USD/TRY kurunu bul
    for (const item of data.result) {
      if (item.name && item.name.includes('USD')) {
        usdToTry = parseFloat(item.buying) || 0
        break
      }
    }

    if (usdToTry === 0) {
      console.error('USD/TRY rate not found in API response')
      return null
    }

    // TRY kurunu ekle (USD başına TRY)
    usdRates['TRY'] = usdToTry

    // Diğer kurları USD bazlı olarak hesapla
    for (const item of data.result) {
      if (!item.name || !item.buying) continue
      
      // Para birimi kodunu bul
      const currencyCode = Object.keys(CURRENCY_MAP).find(code => 
        item.name.includes(code) || item.name.toUpperCase().includes(code)
      )
      
      if (currencyCode && currencyCode !== 'USD') {
        const rateToTry = parseFloat(item.buying) || 0
        if (rateToTry > 0) {
          // X/TRY'yi USD/X'e dönüştür
          // Örnek: EUR/TRY = 37, USD/TRY = 34.5 => USD/EUR = 34.5/37 = 0.93
          usdRates[currencyCode] = usdToTry / rateToTry
        }
      }
    }

    return usdRates
  } catch (error) {
    console.error('Error fetching currency rates:', error)
    return null
  }
}

// Cron job için GET endpoint (Vercel Cron)
export async function GET(request: Request) {
  // Cron secret kontrolü (opsiyonel güvenlik)
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // Eğer CRON_SECRET tanımlıysa, kontrol et
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const usdRates = await fetchCurrencyRates()

    if (!usdRates) {
      return NextResponse.json(
        { success: false, error: 'Döviz kurları alınamadı' },
        { status: 500 }
      )
    }

    // Çapraz kurları hesapla
    const crossRates = calculateAllCrossRates(usdRates)

    // Firestore'a kaydet
    await adminDb.collection('prices').doc('currency').set({
      usdRates,
      crossRates,
      lastUpdate: new Date(),
      updatedAt: new Date(),
      source: 'collectapi',
      autoUpdated: true
    })

    // Log kaydı
    await adminDb.collection('price_update_logs').add({
      type: 'currency',
      source: 'collectapi',
      success: true,
      usdRates,
      timestamp: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Döviz kurları güncellendi',
      usdRates,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating currency rates:', error)

    // Hata logu
    await adminDb.collection('price_update_logs').add({
      type: 'currency',
      source: 'collectapi',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    })

    return NextResponse.json(
      { success: false, error: 'Döviz kurları güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Manuel tetikleme için POST endpoint
export async function POST(request: Request) {
  // Admin kontrolü (basit token kontrolü)
  const authHeader = request.headers.get('authorization')
  const adminToken = process.env.ADMIN_API_TOKEN

  if (adminToken && authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // GET ile aynı işlemi yap
  return GET(request)
}
