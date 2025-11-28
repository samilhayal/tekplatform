import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { tools, categories } from '@/lib/tools-data'

// Burç listesi
const BURCLAR = [
  'koc', 'boga', 'ikizler', 'yengec', 'aslan', 'basak',
  'terazi', 'akrep', 'yay', 'oglak', 'kova', 'balik'
]

const BURC_ADLARI: Record<string, string> = {
  'koc': 'Koç', 'boga': 'Boğa', 'ikizler': 'İkizler', 'yengec': 'Yengeç',
  'aslan': 'Aslan', 'basak': 'Başak', 'terazi': 'Terazi', 'akrep': 'Akrep',
  'yay': 'Yay', 'oglak': 'Oğlak', 'kova': 'Kova', 'balik': 'Balık'
}

export async function POST() {
  try {
    const batch = adminDb.batch()
    const now = new Date()

    // ============================================
    // 1. TOOLS COLLECTION - Tüm araçlar
    // ============================================
    tools.forEach((tool, index) => {
      const toolRef = adminDb.collection('tools').doc(tool.id)
      batch.set(toolRef, {
        id: tool.id,
        title: tool.title,
        description: tool.description,
        category: tool.category,
        icon: tool.icon,
        href: tool.href,
        keywords: tool.keywords,
        isActive: true,
        displayOrder: index,
        createdAt: now,
        updatedAt: now
      })
    })

    // ============================================
    // 2. CATEGORIES COLLECTION - Kategoriler
    // ============================================
    const uniqueCategories = Array.from(new Set(tools.map(t => t.category)))
    uniqueCategories.forEach((category, index) => {
      const categoryId = category.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, 've')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
      const categoryRef = adminDb.collection('categories').doc(categoryId)
      batch.set(categoryRef, {
        id: categoryId,
        name: category,
        isActive: true,
        displayOrder: index,
        toolCount: tools.filter(t => t.category === category).length,
        createdAt: now,
        updatedAt: now
      })
    })

    await batch.commit()

    // ============================================
    // 3. HOROSCOPES COLLECTION - Burç Yorumları
    // ============================================
    const horoscopeBatch = adminDb.batch()
    
    // Günlük burç yorumları
    BURCLAR.forEach((burc) => {
      const dailyRef = adminDb.collection('horoscopes').doc('daily').collection(burc).doc('current')
      horoscopeBatch.set(dailyRef, {
        burc: burc,
        burcAdi: BURC_ADLARI[burc],
        tarih: now.toISOString().split('T')[0],
        genel: `${BURC_ADLARI[burc]} burcu için günlük genel yorum...`,
        ask: `${BURC_ADLARI[burc]} burcu için günlük aşk yorumu...`,
        kariyer: `${BURC_ADLARI[burc]} burcu için günlük kariyer yorumu...`,
        saglik: `${BURC_ADLARI[burc]} burcu için günlük sağlık yorumu...`,
        finans: `${BURC_ADLARI[burc]} burcu için günlük finans yorumu...`,
        sans: Math.floor(Math.random() * 100),
        sansliSayi: Math.floor(Math.random() * 99) + 1,
        sansliRenk: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Mor'][Math.floor(Math.random() * 5)],
        updatedAt: now
      })
    })

    // Haftalık burç yorumları
    BURCLAR.forEach((burc) => {
      const weeklyRef = adminDb.collection('horoscopes').doc('weekly').collection(burc).doc('current')
      horoscopeBatch.set(weeklyRef, {
        burc: burc,
        burcAdi: BURC_ADLARI[burc],
        haftaBaslangic: now.toISOString().split('T')[0],
        haftaBitis: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        genel: `${BURC_ADLARI[burc]} burcu için haftalık genel yorum...`,
        ask: `${BURC_ADLARI[burc]} burcu için haftalık aşk yorumu...`,
        kariyer: `${BURC_ADLARI[burc]} burcu için haftalık kariyer yorumu...`,
        saglik: `${BURC_ADLARI[burc]} burcu için haftalık sağlık yorumu...`,
        finans: `${BURC_ADLARI[burc]} burcu için haftalık finans yorumu...`,
        updatedAt: now
      })
    })

    // Aylık burç yorumları
    BURCLAR.forEach((burc) => {
      const monthlyRef = adminDb.collection('horoscopes').doc('monthly').collection(burc).doc('current')
      horoscopeBatch.set(monthlyRef, {
        burc: burc,
        burcAdi: BURC_ADLARI[burc],
        ay: now.getMonth() + 1,
        yil: now.getFullYear(),
        genel: `${BURC_ADLARI[burc]} burcu için aylık genel yorum...`,
        ask: `${BURC_ADLARI[burc]} burcu için aylık aşk yorumu...`,
        kariyer: `${BURC_ADLARI[burc]} burcu için aylık kariyer yorumu...`,
        saglik: `${BURC_ADLARI[burc]} burcu için aylık sağlık yorumu...`,
        finans: `${BURC_ADLARI[burc]} burcu için aylık finans yorumu...`,
        seyahat: `${BURC_ADLARI[burc]} burcu için aylık seyahat önerisi...`,
        kisiselGelisim: `${BURC_ADLARI[burc]} burcu için aylık kişisel gelişim önerisi...`,
        updatedAt: now
      })
    })

    // Yıllık burç yorumları
    BURCLAR.forEach((burc) => {
      const yearlyRef = adminDb.collection('horoscopes').doc('yearly').collection(burc).doc('current')
      horoscopeBatch.set(yearlyRef, {
        burc: burc,
        burcAdi: BURC_ADLARI[burc],
        yil: now.getFullYear(),
        genel: `${BURC_ADLARI[burc]} burcu için yıllık genel yorum...`,
        ask: `${BURC_ADLARI[burc]} burcu için yıllık aşk yorumu...`,
        kariyer: `${BURC_ADLARI[burc]} burcu için yıllık kariyer yorumu...`,
        saglik: `${BURC_ADLARI[burc]} burcu için yıllık sağlık yorumu...`,
        finans: `${BURC_ADLARI[burc]} burcu için yıllık finans yorumu...`,
        seyahat: `${BURC_ADLARI[burc]} burcu için yıllık seyahat önerisi...`,
        kisiselGelisim: `${BURC_ADLARI[burc]} burcu için yıllık kişisel gelişim önerisi...`,
        hediye: `${BURC_ADLARI[burc]} burcu için hediye önerisi...`,
        updatedAt: now
      })
    })

    // Burç öneri kategorileri
    const oneriKategorileri = ['saglik', 'beslenme', 'kariyer', 'finans', 'seyahat', 'kisisel-gelisim', 'hediye']
    BURCLAR.forEach((burc) => {
      oneriKategorileri.forEach((kategori) => {
        const oneriRef = adminDb.collection('horoscopes').doc('oneriler').collection(burc).doc(kategori)
        horoscopeBatch.set(oneriRef, {
          burc: burc,
          burcAdi: BURC_ADLARI[burc],
          kategori: kategori,
          baslik: `${BURC_ADLARI[burc]} burcu için ${kategori.replace('-', ' ')} önerileri`,
          icerik: `${BURC_ADLARI[burc]} burcu için detaylı ${kategori.replace('-', ' ')} önerileri içeriği...`,
          oneriler: [
            `Öneri 1 for ${BURC_ADLARI[burc]}`,
            `Öneri 2 for ${BURC_ADLARI[burc]}`,
            `Öneri 3 for ${BURC_ADLARI[burc]}`
          ],
          updatedAt: now
        })
      })
    })

    await horoscopeBatch.commit()

    // ============================================
    // 4. PRICES COLLECTION - Fiyatlar (Altın & Döviz)
    // ============================================
    const pricesBatch = adminDb.batch()

    // Altın Fiyatları
    const goldPricesRef = adminDb.collection('prices').doc('gold')
    pricesBatch.set(goldPricesRef, {
      gram: 3250.00,
      ceyrek: 5325.00,
      yarim: 10650.00,
      tam: 21300.00,
      cumhuriyet: 22000.00,
      ata: 21500.00,
      resat: 22500.00,
      hamit: 22200.00,
      gremse: 21800.00,
      onsAltinUsd: 2650.00,
      onsAltinTry: 91275.00,
      lastUpdate: now,
      updatedAt: now
    })

    // Döviz Kurları
    const currencyRatesRef = adminDb.collection('prices').doc('currency')
    pricesBatch.set(currencyRatesRef, {
      usdTry: 34.50,
      eurTry: 37.20,
      gbpTry: 43.50,
      chfTry: 39.80,
      jpyTry: 0.23,
      cadTry: 24.80,
      audTry: 22.50,
      sekTry: 3.20,
      nokTry: 3.15,
      dkkTry: 4.95,
      sarTry: 9.20,
      aedTry: 9.40,
      usdEur: 0.92,
      usdGbp: 0.79,
      lastUpdate: now,
      updatedAt: now
    })

    // Zekat Hesaplama için özel fiyatlar
    const zakatPricesRef = adminDb.collection('prices').doc('zakat')
    pricesBatch.set(zakatPricesRef, {
      goldPrice: 3250.00,
      silverPrice: 38.50,
      goldNisab: 276250.00, // 85 gram altın x 3250
      silverNisab: 22880.00, // 595 gram gümüş x 38.50
      usdTry: 34.50,
      eurTry: 37.20,
      lastUpdate: now,
      updatedAt: now
    })

    await pricesBatch.commit()

    // ============================================
    // 5. SALARY SETTINGS - Maaş Ayarları
    // ============================================
    const salaryBatch = adminDb.batch()

    // Vergi Dilimleri (2025)
    const taxBracketsRef = adminDb.collection('salarySettings').doc('taxBrackets')
    salaryBatch.set(taxBracketsRef, {
      yil: 2025,
      dilimler: [
        { limit: 110000, oran: 0.15, aciklama: '0 - 110.000 TL arası %15' },
        { limit: 230000, oran: 0.20, aciklama: '110.000 - 230.000 TL arası %20' },
        { limit: 580000, oran: 0.27, aciklama: '230.000 - 580.000 TL arası %27' },
        { limit: 3000000, oran: 0.35, aciklama: '580.000 - 3.000.000 TL arası %35' },
        { limit: null, oran: 0.40, aciklama: '3.000.000 TL üzeri %40' }
      ],
      updatedAt: now
    })

    // Asgari Ücret
    const minimumWageRef = adminDb.collection('salarySettings').doc('minimumWage')
    salaryBatch.set(minimumWageRef, {
      yil: 2025,
      donem: 'Ocak-Haziran',
      brutAsgariUcret: 22104.00,
      netAsgariUcret: 17002.00,
      gecerlilikBaslangic: '2025-01-01',
      gecerlilikBitis: '2025-06-30',
      updatedAt: now
    })

    // SGK ve Kesinti Oranları
    const deductionRatesRef = adminDb.collection('salarySettings').doc('deductionRates')
    salaryBatch.set(deductionRatesRef, {
      sgkIsciPayi: 0.14, // %14
      sgkIssizlikIsci: 0.01, // %1
      sgkIsverenPayi: 0.205, // %20.5 (15.5 SGK + 5 İşveren payı)
      sgkIssizlikIsveren: 0.02, // %2
      damgaVergisi: 0.00759, // %0.759
      agiOrani: {
        bekar: 1.0,
        evli: 1.1,
        cocuk1: 0.075,
        cocuk2: 0.075,
        cocuk3: 0.1,
        cocuk4Plus: 0.05
      },
      updatedAt: now
    })

    await salaryBatch.commit()

    // ============================================
    // 6. TAPU SETTINGS - Tapu Ayarları
    // ============================================
    const tapuSettingsRef = adminDb.collection('tapuSettings').doc('current')
    await tapuSettingsRef.set({
      yil: 2025,
      aliciTapuHarci: 0.02, // %2
      saticiTapuHarci: 0.02, // %2
      donerSermaye: 1170.00, // TL
      tapuKayitUcreti: 585.00, // TL
      krediDosyaMasrafi: 0.002, // %0.2 (banka kredili alımlarda)
      kdvOrani: 0.01, // %1 (150m2 altı konutlar için)
      kdvOraniUstu: 0.20, // %20 (150m2 üstü veya ticari)
      updatedAt: now
    })

    // ============================================
    // 7. RAYIC BEDEL - Rayiç Bedel Ayarları
    // ============================================
    const rayicBatch = adminDb.batch()

    // Örnek mahalleler (İstanbul için)
    const ornekMahalleler = [
      { il: 'İstanbul', ilce: 'Kadıköy', mahalle: 'Caferağa', m2Fiyat: 85000, yil: 2025 },
      { il: 'İstanbul', ilce: 'Kadıköy', mahalle: 'Moda', m2Fiyat: 95000, yil: 2025 },
      { il: 'İstanbul', ilce: 'Beşiktaş', mahalle: 'Etiler', m2Fiyat: 120000, yil: 2025 },
      { il: 'İstanbul', ilce: 'Beşiktaş', mahalle: 'Levent', m2Fiyat: 110000, yil: 2025 },
      { il: 'İstanbul', ilce: 'Şişli', mahalle: 'Nişantaşı', m2Fiyat: 130000, yil: 2025 },
      { il: 'İstanbul', ilce: 'Üsküdar', mahalle: 'Çengelköy', m2Fiyat: 75000, yil: 2025 },
      { il: 'Ankara', ilce: 'Çankaya', mahalle: 'Kavaklıdere', m2Fiyat: 65000, yil: 2025 },
      { il: 'Ankara', ilce: 'Çankaya', mahalle: 'Gaziosmanpaşa', m2Fiyat: 70000, yil: 2025 },
      { il: 'İzmir', ilce: 'Konak', mahalle: 'Alsancak', m2Fiyat: 55000, yil: 2025 },
      { il: 'İzmir', ilce: 'Karşıyaka', mahalle: 'Bostanlı', m2Fiyat: 50000, yil: 2025 }
    ]

    ornekMahalleler.forEach((mahalle, index) => {
      const mahalleId = `${mahalle.il}-${mahalle.ilce}-${mahalle.mahalle}`
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
      const mahalleRef = adminDb.collection('rayicBedel').doc(mahalleId)
      rayicBatch.set(mahalleRef, {
        id: mahalleId,
        il: mahalle.il,
        ilce: mahalle.ilce,
        mahalle: mahalle.mahalle,
        m2Fiyat: mahalle.m2Fiyat,
        yil: mahalle.yil,
        updatedAt: now
      })
    })

    await rayicBatch.commit()

    // ============================================
    // 8. GAYRIMENKUL GELIR VERGISI SETTINGS
    // ============================================
    const gayrimenkulVergiRef = adminDb.collection('gayrimenkulSettings').doc('taxBrackets')
    await gayrimenkulVergiRef.set({
      yil: 2025,
      dilimler: [
        { limit: 110000, oran: 0.15, aciklama: '0 - 110.000 TL arası %15' },
        { limit: 230000, oran: 0.20, aciklama: '110.000 - 230.000 TL arası %20' },
        { limit: 580000, oran: 0.27, aciklama: '230.000 - 580.000 TL arası %27' },
        { limit: 3000000, oran: 0.35, aciklama: '580.000 - 3.000.000 TL arası %35' },
        { limit: null, oran: 0.40, aciklama: '3.000.000 TL üzeri %40' }
      ],
      istisnaSuresi: 5, // 5 yıldan fazla elde tutulursa vergiden muaf
      enflasyonDuzeltmesiBaslangic: 2005,
      updatedAt: now
    })

    // ============================================
    // 9. RETIREMENT SETTINGS - Emeklilik Ayarları
    // ============================================
    const retirementRef = adminDb.collection('retirementSettings').doc('current')
    await retirementRef.set({
      yil: 2025,
      statular: {
        '4A-1999-oncesi': {
          aciklama: '4A (08.09.1999 Öncesi Giriş)',
          kadin: { yas: null, primGun: 5000, sigortaliBariş: 20 },
          erkek: { yas: null, primGun: 5000, sigortaliBariş: 25 }
        },
        '4A-1999-2008': {
          aciklama: '4A (09.09.1999 - 30.04.2008 Arası)',
          kadin: { yas: 58, primGun: 7000, sigortaliBariş: null },
          erkek: { yas: 60, primGun: 7000, sigortaliBariş: null }
        },
        '4A-2008-sonrasi': {
          aciklama: '4A (01.05.2008 Sonrası Giriş)',
          kadin: { yas: 65, primGun: 7200, sigortaliBariş: null },
          erkek: { yas: 65, primGun: 7200, sigortaliBariş: null }
        },
        '4B': {
          aciklama: '4B (Bağkur)',
          kadin: { yas: 58, primGun: 9000, sigortaliBariş: null },
          erkek: { yas: 60, primGun: 9000, sigortaliBariş: null }
        },
        '4C': {
          aciklama: '4C (Emekli Sandığı)',
          kadin: { yas: 60, primGun: 9000, sigortaliBariş: null },
          erkek: { yas: 65, primGun: 9000, sigortaliBariş: null }
        }
      },
      kademeligecis: {
        aciklama: '2008 sonrası kademeli geçiş tablosu',
        // Basitleştirilmiş kademeli geçiş
      },
      updatedAt: now
    })

    // ============================================
    // 10. BRANDS - Akıllı Beden Seçici Markaları
    // ============================================
    const brandsBatch = adminDb.batch()

    const ornekMarkalar = [
      { id: 'zara', name: 'Zara', tip: 'kadin', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50' } },
      { id: 'hm', name: 'H&M', tip: 'kadin', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50' } },
      { id: 'mango', name: 'Mango', tip: 'kadin', bedenTablosu: { XS: '34', S: '36-38', M: '40', L: '42-44', XL: '46' } },
      { id: 'lcw', name: 'LC Waikiki', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50', XXL: '52-54' } },
      { id: 'koton', name: 'Koton', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50' } },
      { id: 'defacto', name: 'DeFacto', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50', XXL: '52-54' } },
      { id: 'polo', name: 'US Polo Assn.', tip: 'erkek', bedenTablosu: { S: '46-48', M: '48-50', L: '50-52', XL: '52-54', XXL: '54-56' } },
      { id: 'nike', name: 'Nike', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50', XXL: '52-54' } },
      { id: 'adidas', name: 'Adidas', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50', XXL: '52-54' } },
      { id: 'puma', name: 'Puma', tip: 'unisex', bedenTablosu: { XS: '32-34', S: '36-38', M: '40-42', L: '44-46', XL: '48-50' } }
    ]

    ornekMarkalar.forEach((marka) => {
      const markaRef = adminDb.collection('brands').doc(marka.id)
      brandsBatch.set(markaRef, {
        id: marka.id,
        name: marka.name,
        tip: marka.tip,
        bedenTablosu: marka.bedenTablosu,
        isActive: true,
        updatedAt: now
      })
    })

    await brandsBatch.commit()

    // ============================================
    // 11. ADMIN SETTINGS
    // ============================================
    const adminSettingsRef = adminDb.collection('settings').doc('admin')
    await adminSettingsRef.set({
      appName: 'Kolay Hesapla',
      totalTools: tools.length,
      activeTools: tools.length,
      totalCategories: uniqueCategories.length,
      activeCategories: uniqueCategories.length,
      lastDatabaseInit: now,
      version: '2.0.0',
      updatedAt: now
    })

    return NextResponse.json({
      success: true,
      message: 'Veritabanı başarıyla oluşturuldu!',
      stats: {
        tools: tools.length,
        categories: uniqueCategories.length,
        horoscopes: {
          daily: BURCLAR.length,
          weekly: BURCLAR.length,
          monthly: BURCLAR.length,
          yearly: BURCLAR.length,
          oneriler: BURCLAR.length * 7
        },
        prices: {
          gold: 1,
          currency: 1,
          zakat: 1
        },
        salarySettings: 3,
        tapuSettings: 1,
        rayicBedel: ornekMahalleler.length,
        gayrimenkulSettings: 1,
        retirementSettings: 1,
        brands: ornekMarkalar.length
      },
      timestamp: now.toISOString()
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Veritabanı oluşturulurken hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

// PATCH - Sadece eksik araçları ekle (mevcut verileri değiştirmez)
export async function PATCH() {
  try {
    const now = new Date()
    
    // Mevcut araçları al
    const existingToolsSnapshot = await adminDb.collection('tools').get()
    const existingToolIds = new Set(existingToolsSnapshot.docs.map(doc => doc.id))
    
    // Eksik araçları bul
    const missingTools = tools.filter(tool => !existingToolIds.has(tool.id))
    
    if (missingTools.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Tüm araçlar zaten mevcut',
        added: 0,
        total: tools.length
      })
    }
    
    // Eksik araçları ekle
    const batch = adminDb.batch()
    missingTools.forEach((tool, index) => {
      const toolRef = adminDb.collection('tools').doc(tool.id)
      batch.set(toolRef, {
        id: tool.id,
        title: tool.title,
        description: tool.description,
        category: tool.category,
        icon: tool.icon,
        href: tool.href,
        keywords: tool.keywords,
        isActive: true,
        displayOrder: existingToolsSnapshot.size + index,
        createdAt: now,
        updatedAt: now
      })
    })
    
    await batch.commit()
    
    return NextResponse.json({
      success: true,
      message: `${missingTools.length} yeni araç eklendi`,
      added: missingTools.length,
      addedTools: missingTools.map(t => t.id),
      total: tools.length
    })
  } catch (error) {
    console.error('Error syncing tools:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Araçlar sync edilemedi',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Veritabanını başlatmak için POST isteği gönderin',
    endpoint: '/api/init-database',
    methods: {
      POST: 'Tüm veritabanını sıfırdan başlat (mevcut verileri üzerine yazar)',
      PATCH: 'Sadece eksik araçları ekle (mevcut verileri korur)'
    },
    collections: [
      'tools - Tüm araçlar (aktif/pasif durumu)',
      'categories - Kategoriler (aktif/pasif durumu)',
      'horoscopes - Burç yorumları (günlük, haftalık, aylık, yıllık, öneriler)',
      'prices - Fiyatlar (altın, döviz, zekat)',
      'salarySettings - Maaş ayarları (vergi dilimleri, asgari ücret, kesintiler)',
      'tapuSettings - Tapu harç ayarları',
      'rayicBedel - Rayiç bedel (mahalle bazlı m2 fiyatları)',
      'gayrimenkulSettings - Gayrimenkul gelir vergisi dilimleri',
      'retirementSettings - Emeklilik yaş ve prim bilgileri',
      'brands - Akıllı Beden Seçici markaları',
      'settings - Genel admin ayarları'
    ]
  })
}
