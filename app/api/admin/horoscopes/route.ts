import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Tüm burç yorumlarını getir
export async function GET() {
  try {
    const horoscopes: Record<string, Record<string, unknown>> = {
      daily: {},
      weekly: {},
      monthly: {},
      yearly: {}
    }

    // Her period için verileri çek
    const periods = ['daily', 'weekly', 'monthly', 'yearly']
    
    for (const period of periods) {
      const snapshot = await adminDb.collection('horoscopes').doc(period).get()
      if (snapshot.exists) {
        horoscopes[period] = snapshot.data() || {}
      }
    }

    return NextResponse.json({
      success: true,
      horoscopes
    })
  } catch (error) {
    console.error('Error fetching horoscopes:', error)
    return NextResponse.json(
      { success: false, error: 'Burç yorumları yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Burç yorumu güncelle
export async function PUT(request: Request) {
  try {
    const { period, burcId, data } = await request.json()
    
    if (!period || !burcId || !data) {
      return NextResponse.json(
        { success: false, error: 'Eksik parametreler' },
        { status: 400 }
      )
    }

    const docRef = adminDb.collection('horoscopes').doc(period)
    
    await docRef.set({
      [burcId]: {
        ...data,
        updatedAt: new Date()
      }
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Burç yorumu güncellendi'
    })
  } catch (error) {
    console.error('Error updating horoscope:', error)
    return NextResponse.json(
      { success: false, error: 'Burç yorumu güncellenemedi' },
      { status: 500 }
    )
  }
}

// POST - Toplu yorum ekle
export async function POST(request: Request) {
  try {
    const { period, horoscopes } = await request.json()
    
    const docRef = adminDb.collection('horoscopes').doc(period)
    
    await docRef.set({
      ...horoscopes,
      updatedAt: new Date()
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Yorumlar eklendi'
    })
  } catch (error) {
    console.error('Error adding horoscopes:', error)
    return NextResponse.json(
      { success: false, error: 'Yorumlar eklenemedi' },
      { status: 500 }
    )
  }
}
