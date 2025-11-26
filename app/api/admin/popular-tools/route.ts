import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Popüler araçları getir
export async function GET() {
  try {
    const docRef = adminDb.collection('settings').doc('popularTools')
    const doc = await docRef.get()

    if (doc.exists) {
      const data = doc.data()
      return NextResponse.json({
        success: true,
        popularTools: data?.tools || []
      })
    }

    return NextResponse.json({
      success: true,
      popularTools: []
    })
  } catch (error) {
    console.error('Error fetching popular tools:', error)
    return NextResponse.json(
      { success: false, error: 'Popüler araçlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Popüler araçları güncelle
export async function PUT(request: Request) {
  try {
    const { popularTools } = await request.json()
    
    if (!Array.isArray(popularTools)) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz veri formatı' },
        { status: 400 }
      )
    }

    if (popularTools.length > 5) {
      return NextResponse.json(
        { success: false, error: 'En fazla 5 popüler araç seçilebilir' },
        { status: 400 }
      )
    }

    const docRef = adminDb.collection('settings').doc('popularTools')
    await docRef.set({
      tools: popularTools,
      updatedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Popüler araçlar güncellendi',
      popularTools
    })
  } catch (error) {
    console.error('Error updating popular tools:', error)
    return NextResponse.json(
      { success: false, error: 'Popüler araçlar güncellenemedi' },
      { status: 500 }
    )
  }
}
