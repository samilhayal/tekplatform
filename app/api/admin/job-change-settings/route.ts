import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - İş değişikliği ayarlarını getir
export async function GET() {
  try {
    const settingsDoc = await adminDb.collection('jobChangeSettings').doc('current').get()
    
    if (!settingsDoc.exists) {
      // Varsayılan ayarları döndür
      return NextResponse.json({
        success: true,
        settings: getDefaultSettings()
      })
    }

    return NextResponse.json({
      success: true,
      settings: settingsDoc.data()
    })
  } catch (error) {
    console.error('Error fetching job change settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST - İş değişikliği ayarlarını güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const now = new Date()

    const settingsData = {
      yil: body.yil || new Date().getFullYear(),
      vergiDilimleri: body.vergiDilimleri || getDefaultSettings().vergiDilimleri,
      sgkIsciOrani: body.sgkIsciOrani ?? 0.14,
      issizlikIsciOrani: body.issizlikIsciOrani ?? 0.01,
      damgaVergisiOrani: body.damgaVergisiOrani ?? 0.00759,
      kidemTavani: body.kidemTavani ?? 35058.58,
      asgariUcretBrut: body.asgariUcretBrut ?? 22104.00,
      asgariUcretNet: body.asgariUcretNet ?? 17002.00,
      ihbarSureleri: body.ihbarSureleri || getDefaultSettings().ihbarSureleri,
      cikisTurleri: body.cikisTurleri || getDefaultSettings().cikisTurleri,
      aciklamalar: body.aciklamalar || getDefaultSettings().aciklamalar,
      updatedAt: now
    }

    await adminDb.collection('jobChangeSettings').doc('current').set(settingsData, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Ayarlar başarıyla güncellendi',
      settings: settingsData
    })
  } catch (error) {
    console.error('Error updating job change settings:', error)
    return NextResponse.json(
      { success: false, error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    )
  }
}

// Varsayılan ayarlar
function getDefaultSettings() {
  return {
    yil: 2025,
    vergiDilimleri: [
      { limit: 110000, oran: 0.15, aciklama: '0 - 110.000 TL arası %15' },
      { limit: 230000, oran: 0.20, aciklama: '110.000 - 230.000 TL arası %20' },
      { limit: 580000, oran: 0.27, aciklama: '230.000 - 580.000 TL arası %27' },
      { limit: 3000000, oran: 0.35, aciklama: '580.000 - 3.000.000 TL arası %35' },
      { limit: null, oran: 0.40, aciklama: '3.000.000 TL üzeri %40' }
    ],
    sgkIsciOrani: 0.14,
    issizlikIsciOrani: 0.01,
    damgaVergisiOrani: 0.00759,
    kidemTavani: 35058.58,
    asgariUcretBrut: 22104.00,
    asgariUcretNet: 17002.00,
    ihbarSureleri: [
      { yilAraligi: '0-6 ay', sure: 2, aciklama: '6 aydan az çalışma: 2 hafta' },
      { yilAraligi: '6 ay - 1.5 yıl', sure: 4, aciklama: '6 ay - 1.5 yıl arası: 4 hafta' },
      { yilAraligi: '1.5 - 3 yıl', sure: 6, aciklama: '1.5 - 3 yıl arası: 6 hafta' },
      { yilAraligi: '3 yıl üzeri', sure: 8, aciklama: '3 yıldan fazla: 8 hafta' }
    ],
    cikisTurleri: [
      { id: 'istifa', label: 'İstifa', kidemHakki: false, ihbarHakki: false },
      { id: 'isveren-fesih', label: 'İşveren Tarafından Fesih', kidemHakki: true, ihbarHakki: true },
      { id: 'karsilikli-anlasma', label: 'Karşılıklı Anlaşma (İkale)', kidemHakki: true, ihbarHakki: false },
      { id: 'evlilik', label: 'Evlilik Nedeniyle Ayrılma (Kadın)', kidemHakki: true, ihbarHakki: false },
      { id: 'askerlik', label: 'Askerlik Nedeniyle Ayrılma', kidemHakki: true, ihbarHakki: false },
      { id: 'emeklilik', label: 'Emeklilik', kidemHakki: true, ihbarHakki: false },
      { id: 'hakli-fesih', label: 'İşçinin Haklı Feshi (Mobbing vb.)', kidemHakki: true, ihbarHakki: false },
      { id: 'vefat', label: 'Vefat', kidemHakki: true, ihbarHakki: false }
    ],
    aciklamalar: {
      kidemTazminati: 'Her tam yıl için bir brüt maaş tutarında ödenir. Kıdem tavanı sınırı uygulanır.',
      ihbarTazminati: 'Çalışma süresine göre 2-8 hafta arasında değişir. İhbar süresi çalışılmadan fesih durumunda ödenir.',
      kullanilamayanIzin: 'Kullanılmayan yıllık izin günleri brüt ücret üzerinden ödenir.',
      kumulatifMatrah: 'Yıl içinde aynı işverenden alınan ücretlerin vergi matrahı toplamıdır. Yeni işte vergi dilimi hesaplamasında kullanılır.'
    }
  }
}
