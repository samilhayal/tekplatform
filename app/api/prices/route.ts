import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export const revalidate = 60 // 60 saniyede bir revalidate

// GET - Public fiyatları getir (altın, döviz, zekat için)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // gold, currency, zakat, all

    if (type === 'gold') {
      const goldDoc = await adminDb.collection('prices').doc('gold').get()
      const goldData = goldDoc.exists ? goldDoc.data() : null
      return NextResponse.json({
        success: true,
        data: goldData,
        gold: goldData // Geriye uyumluluk için
      })
    }

    if (type === 'currency') {
      const currencyDoc = await adminDb.collection('prices').doc('currency').get()
      const currencyData = currencyDoc.exists ? currencyDoc.data() : null
      return NextResponse.json({
        success: true,
        data: currencyData,
        currency: currencyData // Geriye uyumluluk için
      })
    }

    if (type === 'zakat') {
      const [zakatDoc, currencyDoc] = await Promise.all([
        adminDb.collection('prices').doc('zakat').get(),
        adminDb.collection('prices').doc('currency').get()
      ])
      
      const zakatData = zakatDoc.exists ? zakatDoc.data() : null
      const currencyData = currencyDoc.exists ? currencyDoc.data() : null
      
      return NextResponse.json({
        success: true,
        data: zakatData,
        zakat: zakatData, // Geriye uyumluluk için
        // Zekat hesaplama için gerekli döviz kurları
        usdRate: currencyData?.crossRates?.USD?.TRY || currencyData?.usdRates?.TRY || 0,
        eurRate: currencyData?.crossRates?.EUR?.TRY || (currencyData?.usdRates?.TRY / currencyData?.usdRates?.EUR) || 0
      })
    }

    // Tüm fiyatları getir
    const [goldDoc, currencyDoc, zakatDoc] = await Promise.all([
      adminDb.collection('prices').doc('gold').get(),
      adminDb.collection('prices').doc('currency').get(),
      adminDb.collection('prices').doc('zakat').get()
    ])

    return NextResponse.json({
      success: true,
      gold: goldDoc.exists ? goldDoc.data() : null,
      currency: currencyDoc.exists ? currencyDoc.data() : null,
      zakat: zakatDoc.exists ? zakatDoc.data() : null
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}
