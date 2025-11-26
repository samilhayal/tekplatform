import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Emeklilik ayarlarını getir
export async function GET() {
  try {
    const docRef = adminDb.collection('settings').doc('retirement')
    const doc = await docRef.get()

    if (doc.exists) {
      return NextResponse.json({
        success: true,
        settings: doc.data()
      })
    }

    // Varsayılan değerler
    const defaultSettings = {
      year: new Date().getFullYear(),
      rules: [
        { id: '1', gender: 'erkek', startYear: 1999, endYear: 2008, minAge: 60, minPremiumDays: 7000, description: '1999-2008 arası erkek' },
        { id: '2', gender: 'erkek', startYear: 2008, endYear: null, minAge: 65, minPremiumDays: 7200, description: '2008 sonrası erkek' },
        { id: '3', gender: 'kadin', startYear: 1999, endYear: 2008, minAge: 58, minPremiumDays: 7000, description: '1999-2008 arası kadın' },
        { id: '4', gender: 'kadin', startYear: 2008, endYear: null, minAge: 65, minPremiumDays: 7200, description: '2008 sonrası kadın' }
      ]
    }

    return NextResponse.json({
      success: true,
      settings: defaultSettings
    })
  } catch (error) {
    console.error('Error fetching retirement settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Emeklilik ayarlarını güncelle
export async function PUT(request: Request) {
  try {
    const settings = await request.json()
    
    const docRef = adminDb.collection('settings').doc('retirement')
    await docRef.set({
      ...settings,
      updatedAt: new Date()
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Emeklilik ayarları güncellendi'
    })
  } catch (error) {
    console.error('Error updating retirement settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    )
  }
}
