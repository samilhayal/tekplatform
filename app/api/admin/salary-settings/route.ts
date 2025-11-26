import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Maaş ayarlarını getir
export async function GET() {
  try {
    const docRef = adminDb.collection('settings').doc('salary')
    const doc = await docRef.get()

    if (doc.exists) {
      return NextResponse.json({
        success: true,
        settings: doc.data()
      })
    }

    // Varsayılan değerler
    const defaultSettings = {
      minWage: 22104,
      year: new Date().getFullYear(),
      taxBrackets: [
        { min: 0, max: 110000, rate: 15 },
        { min: 110000, max: 230000, rate: 20 },
        { min: 230000, max: 580000, rate: 27 },
        { min: 580000, max: 3000000, rate: 35 },
        { min: 3000000, max: null, rate: 40 }
      ],
      deductionRates: {
        sgk: 14,
        issizlik: 1,
        gelirVergisi: 15,
        damgaVergisi: 0.759
      }
    }

    return NextResponse.json({
      success: true,
      settings: defaultSettings
    })
  } catch (error) {
    console.error('Error fetching salary settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Maaş ayarlarını güncelle
export async function PUT(request: Request) {
  try {
    const settings = await request.json()
    
    const docRef = adminDb.collection('settings').doc('salary')
    await docRef.set({
      ...settings,
      updatedAt: new Date()
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Maaş ayarları güncellendi'
    })
  } catch (error) {
    console.error('Error updating salary settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    )
  }
}
