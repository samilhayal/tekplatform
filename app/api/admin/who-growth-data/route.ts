import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const COLLECTION_NAME = 'settings'
const DOC_ID = 'who-growth-data'

// GET - WHO büyüme verilerini getir
export async function GET() {
  try {
    const doc = await adminDb.collection(COLLECTION_NAME).doc(DOC_ID).get()
    
    if (!doc.exists) {
      return NextResponse.json({ 
        success: true, 
        data: null,
        message: 'Varsayılan WHO verileri kullanılıyor' 
      })
    }

    return NextResponse.json({ 
      success: true, 
      data: doc.data() 
    })
  } catch (error) {
    console.error('WHO veri okuma hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Veriler okunamadı' },
      { status: 500 }
    )
  }
}

// POST - WHO büyüme verilerini kaydet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Veri doğrulama
    if (!body.boy || !body.kilo || !body.basCevresi) {
      return NextResponse.json(
        { success: false, error: 'Eksik veri: boy, kilo ve basCevresi gerekli' },
        { status: 400 }
      )
    }

    // Her biri için erkek ve kız verileri olmalı
    for (const olcum of ['boy', 'kilo', 'basCevresi']) {
      if (!body[olcum].erkek || !body[olcum].kiz) {
        return NextResponse.json(
          { success: false, error: `Eksik veri: ${olcum} için erkek ve kız verileri gerekli` },
          { status: 400 }
        )
      }
    }

    // Kaydet
    await adminDb.collection(COLLECTION_NAME).doc(DOC_ID).set({
      ...body,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      message: 'WHO verileri başarıyla kaydedildi' 
    })
  } catch (error) {
    console.error('WHO veri kaydetme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Veriler kaydedilemedi' },
      { status: 500 }
    )
  }
}

// DELETE - WHO büyüme verilerini sil (varsayılana dön)
export async function DELETE() {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(DOC_ID).delete()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Özel WHO verileri silindi, varsayılan değerler kullanılacak' 
    })
  } catch (error) {
    console.error('WHO veri silme hatası:', error)
    return NextResponse.json(
      { success: false, error: 'Veriler silinemedi' },
      { status: 500 }
    )
  }
}
