import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Fiyatları getir
export async function GET() {
  try {
    const pricesDoc = await adminDb.collection('settings').doc('prices').get()
    
    if (!pricesDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Prices not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      prices: pricesDoc.data()
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}

// POST - Fiyatları güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Type and data are required' },
        { status: 400 }
      )
    }

    const pricesRef = adminDb.collection('settings').doc('prices')
    const updateData: any = {
      updatedAt: new Date()
    }

    // Update specific price type
    if (type === 'gold') {
      updateData.gold = {
        ...data,
        lastUpdate: new Date()
      }
    } else if (type === 'currency') {
      updateData.currency = {
        ...data,
        lastUpdate: new Date()
      }
    } else if (type === 'tufe') {
      updateData.tufe = {
        ...data,
        lastUpdate: new Date()
      }
    } else if (type === 'zakat') {
      updateData.zakat = {
        ...data,
        lastUpdate: new Date()
      }
    } else if (type === 'all') {
      updateData.gold = { ...data.gold, lastUpdate: new Date() }
      updateData.currency = { ...data.currency, lastUpdate: new Date() }
      updateData.tufe = { ...data.tufe, lastUpdate: new Date() }
      updateData.zakat = { ...data.zakat, lastUpdate: new Date() }
    }

    await pricesRef.update(updateData)

    return NextResponse.json({
      success: true,
      message: 'Prices updated successfully',
      type,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating prices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update prices' },
      { status: 500 }
    )
  }
}
