import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// CollectAPI altın fiyatları endpoint'inden gelen isimlerin mapping'i
// ONS ve Reşat Altın kaldırıldı
const goldApiMapping: Record<string, string> = {
  'Gram Altın': 'gramAltin',
  '22 Ayar Bilezik': 'bilezik22',
  '18 Ayar Altın': 'altin18',
  '14 Ayar Altın': 'altin14',
  'Çeyrek Altın': 'ceyrek',
  'Yarım Altın': 'yarim',
  'Tam Altın': 'tam',
  'Cumhuriyet Altını': 'cumhuriyet',
  'Ata Altın': 'ata',
  'Gümüş': 'gumus'
}

interface CollectAPIGoldItem {
  name: string
  buying: number
  selling: number
}

interface CollectAPICurrencyItem {
  code: string
  buying: number
  selling: number
}

// CollectAPI'den altın fiyatlarını çek
async function fetchGoldPrices() {
  const response = await fetch('https://api.collectapi.com/economy/goldPrice', {
    headers: {
      'authorization': 'apikey 11bt8aXsBkRZO3Ndn9PyKS:0UZclz1iDVUpMxQXSzy6Q8',
      'content-type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('CollectAPI gold request failed')
  }

  const data = await response.json()
  
  if (!data.success || !data.result) {
    throw new Error('Invalid response from CollectAPI')
  }

  // API yanıtını uygulama formatına dönüştür
  const goldPrices: Record<string, { buying: number, selling: number }> = {}
  
  data.result.forEach((item: CollectAPIGoldItem) => {
    const key = goldApiMapping[item.name]
    if (key) {
      goldPrices[key] = {
        buying: item.buying || 0,
        selling: item.selling || 0
      }
    }
  })

  return goldPrices
}

// CollectAPI'den döviz kurlarını çek
async function fetchCurrencyPrices() {
  const response = await fetch('https://api.collectapi.com/economy/allCurrency', {
    headers: {
      'authorization': 'apikey 11bt8aXsBkRZO3Ndn9PyKS:0UZclz1iDVUpMxQXSzy6Q8',
      'content-type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('CollectAPI currency request failed')
  }

  const data = await response.json()
  
  if (!data.success || !data.result) {
    throw new Error('Invalid response from CollectAPI')
  }

  const currencyPrices: Record<string, number> = {}
  
  data.result.forEach((item: CollectAPICurrencyItem) => {
    if (['USD', 'EUR', 'GBP'].includes(item.code)) {
      // Satış fiyatını kullan (daha yaygın)
      currencyPrices[item.code] = item.selling || item.buying || 0
    }
  })

  return currencyPrices
}

// POST - API'den otomatik güncelle
export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')

    if (type === 'gold') {
      const goldPrices = await fetchGoldPrices()
      
      const docRef = adminDb.collection('prices').doc('gold')
      await docRef.set({
        ...goldPrices,
        lastUpdate: new Date(),
        updatedAt: new Date(),
        source: 'collectapi',
        autoUpdated: true
      })

      return NextResponse.json({
        success: true,
        message: 'Altın fiyatları güncellendi',
        data: goldPrices
      })
    } 
    
    if (type === 'currency') {
      const currencyPrices = await fetchCurrencyPrices()
      
      const docRef = adminDb.collection('prices').doc('currency')
      await docRef.set({
        ...currencyPrices,
        lastUpdate: new Date(),
        updatedAt: new Date(),
        source: 'collectapi',
        autoUpdated: true
      })

      return NextResponse.json({
        success: true,
        message: 'Döviz kurları güncellendi',
        data: currencyPrices
      })
    }

    return NextResponse.json(
      { success: false, error: 'Geçersiz tip. "gold" veya "currency" olmalı.' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auto update error:', error)
    return NextResponse.json(
      { success: false, error: 'Otomatik güncelleme başarısız: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata') },
      { status: 500 }
    )
  }
}
