import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// Para birimi tanımları
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

// GET - Fiyatları getir
export async function GET() {
  try {
    const [goldDoc, currencyDoc, zakatDoc] = await Promise.all([
      adminDb.collection('prices').doc('gold').get(),
      adminDb.collection('prices').doc('currency').get(),
      adminDb.collection('prices').doc('zakat').get()
    ])

    return NextResponse.json({
      success: true,
      gold: goldDoc.exists ? goldDoc.data() : null,
      usdRates: currencyDoc.exists ? currencyDoc.data()?.usdRates : null,
      crossRates: currencyDoc.exists ? currencyDoc.data()?.crossRates : null,
      zakat: zakatDoc.exists ? zakatDoc.data() : null
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { success: false, error: 'Fiyatlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Fiyatları güncelle
export async function PUT(request: Request) {
  try {
    const { type, data } = await request.json()
    
    const docRef = adminDb.collection('prices').doc(type)
    
    if (type === 'currency') {
      // Döviz için özel işlem: Çapraz kurları hesapla
      const usdRates = data.usdRates
      const crossRates = calculateAllCrossRates(usdRates)
      
      await docRef.set({
        usdRates,
        crossRates,
        lastUpdate: new Date(),
        updatedAt: new Date()
      })
    } else {
      // Diğer türler için normal güncelleme
      await docRef.set({
        ...data,
        lastUpdate: new Date(),
        updatedAt: new Date()
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Fiyatlar güncellendi'
    })
  } catch (error) {
    console.error('Error updating prices:', error)
    return NextResponse.json(
      { success: false, error: 'Fiyatlar güncellenemedi' },
      { status: 500 }
    )
  }
}
