import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Tüm markaları getir
export async function GET() {
  try {
    const snapshot = await adminDb.collection('brands').get()
    const brands = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({
      success: true,
      brands
    })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { success: false, error: 'Markalar yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni marka ekle
export async function POST(request: Request) {
  try {
    const brand = await request.json()
    
    const docRef = await adminDb.collection('brands').add({
      ...brand,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Marka eklendi'
    })
  } catch (error) {
    console.error('Error adding brand:', error)
    return NextResponse.json(
      { success: false, error: 'Marka eklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Marka güncelle
export async function PUT(request: Request) {
  try {
    const brand = await request.json()
    const { id, ...data } = brand
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Marka ID gerekli' },
        { status: 400 }
      )
    }

    await adminDb.collection('brands').doc(id).update({
      ...data,
      updatedAt: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Marka güncellendi'
    })
  } catch (error) {
    console.error('Error updating brand:', error)
    return NextResponse.json(
      { success: false, error: 'Marka güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Marka sil
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Marka ID gerekli' },
        { status: 400 }
      )
    }

    await adminDb.collection('brands').doc(id).delete()

    return NextResponse.json({
      success: true,
      message: 'Marka silindi'
    })
  } catch (error) {
    console.error('Error deleting brand:', error)
    return NextResponse.json(
      { success: false, error: 'Marka silinemedi' },
      { status: 500 }
    )
  }
}
