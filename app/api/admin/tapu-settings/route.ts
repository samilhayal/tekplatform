import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Tapu ve rayiç ayarlarını getir
export async function GET() {
  try {
    const [tapuDoc, rayicSnapshot] = await Promise.all([
      adminDb.collection('settings').doc('tapu').get(),
      adminDb.collection('rayicBedel').get()
    ])

    const tapuSettings = tapuDoc.exists ? tapuDoc.data() : {
      aliciHarcOrani: 2,
      saticiHarcOrani: 2,
      donerSermaye: 2150,
      tapuKayitUcreti: 457.30,
      year: new Date().getFullYear()
    }

    const rayicBedeller = rayicSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({
      success: true,
      tapuSettings,
      rayicBedeller
    })
  } catch (error) {
    console.error('Error fetching tapu settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Tapu ayarlarını güncelle
export async function PUT(request: Request) {
  try {
    const { type, data } = await request.json()
    
    if (type === 'tapu') {
      await adminDb.collection('settings').doc('tapu').set({
        ...data,
        updatedAt: new Date()
      }, { merge: true })

      return NextResponse.json({
        success: true,
        message: 'Tapu ayarları güncellendi'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Geçersiz tip' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating tapu settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni rayiç bedel ekle
export async function POST(request: Request) {
  try {
    const { type, data } = await request.json()
    
    if (type === 'rayic') {
      const docRef = await adminDb.collection('rayicBedel').add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return NextResponse.json({
        success: true,
        id: docRef.id,
        message: 'Rayiç bedel eklendi'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Geçersiz tip' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error adding rayic:', error)
    return NextResponse.json(
      { success: false, error: 'Rayiç bedel eklenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Rayiç bedel sil
export async function DELETE(request: Request) {
  try {
    const { type, id } = await request.json()
    
    if (type === 'rayic' && id) {
      await adminDb.collection('rayicBedel').doc(id).delete()

      return NextResponse.json({
        success: true,
        message: 'Rayiç bedel silindi'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Geçersiz istek' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error deleting rayic:', error)
    return NextResponse.json(
      { success: false, error: 'Rayiç bedel silinemedi' },
      { status: 500 }
    )
  }
}
