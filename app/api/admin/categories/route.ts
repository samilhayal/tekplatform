import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Kategorileri listele
export async function GET() {
  try {
    const snapshot = await adminDb.collection('categories').orderBy('displayOrder').get()
    
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({
      success: true,
      categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Kategoriler yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Kategorileri güncelle
export async function PUT(request: Request) {
  try {
    const { categories } = await request.json()
    
    const batch = adminDb.batch()
    
    for (const category of categories) {
      const ref = adminDb.collection('categories').doc(category.id)
      batch.update(ref, {
        isActive: category.isActive,
        displayOrder: category.displayOrder,
        updatedAt: new Date()
      })
    }

    await batch.commit()

    return NextResponse.json({
      success: true,
      message: 'Kategoriler güncellendi'
    })
  } catch (error) {
    console.error('Error updating categories:', error)
    return NextResponse.json(
      { success: false, error: 'Kategoriler güncellenemedi' },
      { status: 500 }
    )
  }
}
