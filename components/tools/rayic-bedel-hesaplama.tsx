"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Calculator, Info, Search, Building2, Home, Lightbulb, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"

// Örnek rayiç bedel veritabanı (gerçek uygulamada API'den alınmalı)
const rayicVeritabani: Record<string, Record<string, Record<string, { m2Fiyat: number; yil: number }>>> = {
  "İstanbul": {
    "Kadıköy": {
      "Caferağa": { m2Fiyat: 85000, yil: 2024 },
      "Fenerbahçe": { m2Fiyat: 95000, yil: 2024 },
      "Moda": { m2Fiyat: 90000, yil: 2024 },
      "Acıbadem": { m2Fiyat: 75000, yil: 2024 },
      "Kozyatağı": { m2Fiyat: 70000, yil: 2024 },
    },
    "Beşiktaş": {
      "Levent": { m2Fiyat: 120000, yil: 2024 },
      "Etiler": { m2Fiyat: 110000, yil: 2024 },
      "Bebek": { m2Fiyat: 150000, yil: 2024 },
      "Ortaköy": { m2Fiyat: 85000, yil: 2024 },
      "Akatlar": { m2Fiyat: 95000, yil: 2024 },
    },
    "Bakırköy": {
      "Ataköy": { m2Fiyat: 65000, yil: 2024 },
      "Yeşilköy": { m2Fiyat: 60000, yil: 2024 },
      "Florya": { m2Fiyat: 70000, yil: 2024 },
      "Bahçelievler": { m2Fiyat: 45000, yil: 2024 },
    },
    "Sarıyer": {
      "İstinye": { m2Fiyat: 100000, yil: 2024 },
      "Tarabya": { m2Fiyat: 80000, yil: 2024 },
      "Maslak": { m2Fiyat: 90000, yil: 2024 },
      "Emirgan": { m2Fiyat: 95000, yil: 2024 },
    },
    "Üsküdar": {
      "Çengelköy": { m2Fiyat: 70000, yil: 2024 },
      "Kuzguncuk": { m2Fiyat: 75000, yil: 2024 },
      "Beylerbeyi": { m2Fiyat: 80000, yil: 2024 },
      "Altunizade": { m2Fiyat: 65000, yil: 2024 },
    },
  },
  "Ankara": {
    "Çankaya": {
      "Kavaklıdere": { m2Fiyat: 55000, yil: 2024 },
      "Çukurambar": { m2Fiyat: 50000, yil: 2024 },
      "Oran": { m2Fiyat: 60000, yil: 2024 },
      "Bahçelievler": { m2Fiyat: 45000, yil: 2024 },
      "GOP": { m2Fiyat: 48000, yil: 2024 },
    },
    "Yenimahalle": {
      "Batıkent": { m2Fiyat: 30000, yil: 2024 },
      "Demetevler": { m2Fiyat: 28000, yil: 2024 },
      "Çayyolu": { m2Fiyat: 40000, yil: 2024 },
    },
    "Keçiören": {
      "Etlik": { m2Fiyat: 25000, yil: 2024 },
      "Ufuktepe": { m2Fiyat: 22000, yil: 2024 },
    },
  },
  "İzmir": {
    "Konak": {
      "Alsancak": { m2Fiyat: 50000, yil: 2024 },
      "Göztepe": { m2Fiyat: 45000, yil: 2024 },
      "Kordon": { m2Fiyat: 55000, yil: 2024 },
    },
    "Karşıyaka": {
      "Bostanlı": { m2Fiyat: 42000, yil: 2024 },
      "Mavişehir": { m2Fiyat: 48000, yil: 2024 },
    },
    "Bornova": {
      "Evka-3": { m2Fiyat: 32000, yil: 2024 },
      "Ergene": { m2Fiyat: 35000, yil: 2024 },
    },
  },
  "Antalya": {
    "Muratpaşa": {
      "Lara": { m2Fiyat: 45000, yil: 2024 },
      "Konyaaltı": { m2Fiyat: 50000, yil: 2024 },
      "Merkez": { m2Fiyat: 38000, yil: 2024 },
    },
    "Konyaaltı": {
      "Hurma": { m2Fiyat: 42000, yil: 2024 },
      "Sarısu": { m2Fiyat: 48000, yil: 2024 },
    },
  },
  "Bursa": {
    "Nilüfer": {
      "Görükle": { m2Fiyat: 28000, yil: 2024 },
      "Özlüce": { m2Fiyat: 32000, yil: 2024 },
      "Beşevler": { m2Fiyat: 30000, yil: 2024 },
    },
    "Osmangazi": {
      "Çekirge": { m2Fiyat: 35000, yil: 2024 },
      "Kükürtlü": { m2Fiyat: 30000, yil: 2024 },
    },
  },
}

interface RayicResult {
  il: string
  ilce: string
  mahalle: string
  m2Fiyat: number
  m2: number
  toplamDeger: number
  yil: number
}

export function RayicBedelHesaplama() {
  const [il, setIl] = useState("")
  const [ilce, setIlce] = useState("")
  const [mahalle, setMahalle] = useState("")
  const [m2, setM2] = useState("")
  const [result, setResult] = useState<RayicResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const iller = useMemo(() => Object.keys(rayicVeritabani).sort(), [])
  
  const ilceler = useMemo(() => {
    if (!il) return []
    return Object.keys(rayicVeritabani[il] || {}).sort()
  }, [il])
  
  const mahalleler = useMemo(() => {
    if (!il || !ilce) return []
    return Object.keys(rayicVeritabani[il]?.[ilce] || {}).sort()
  }, [il, ilce])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const hesapla = useCallback(() => {
    if (!il || !ilce || !mahalle || !m2) return

    const rayic = rayicVeritabani[il]?.[ilce]?.[mahalle]
    if (!rayic) return

    const metrekare = parseFloat(m2.replace(",", "."))
    const toplamDeger = rayic.m2Fiyat * metrekare

    setResult({
      il,
      ilce,
      mahalle,
      m2Fiyat: rayic.m2Fiyat,
      m2: metrekare,
      toplamDeger,
      yil: rayic.yil,
    })
  }, [il, ilce, mahalle, m2])

  const handleIlChange = (value: string) => {
    setIl(value)
    setIlce("")
    setMahalle("")
    setResult(null)
  }

  const handleIlceChange = (value: string) => {
    setIlce(value)
    setMahalle("")
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-amber-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-3xl">
            <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-2" />
            <Building2 className="h-8 w-8 text-orange-500 absolute -top-2 -right-2 animate-bounce" />
            <Search className="h-6 w-6 text-amber-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
          Rayiç Bedel Hesaplama
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Türkiye&apos;deki emlak rayiç bedellerini sorgulayın ve gayrimenkul değerini hesaplayın
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            📍 5 İl
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            🏘️ Güncel Veriler
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            ₺ M² Hesabı
          </span>
        </div>
      </div>

      <Card className="border-2 border-amber-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Bilgi Butonu */}
          <div className="mb-6">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              <Info className="h-4 w-4" />
              {showInfo ? "Bilgiyi Gizle" : "Rayiç Bedel Hakkında Bilgi"}
            </button>
            
            {showInfo && (
              <div className="mt-3 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">
                <h4 className="font-semibold mb-2">Rayiç Bedel Nedir?</h4>
                <p className="mb-2">
                  Rayiç bedel, Maliye Bakanlığı tarafından her yıl belirlenen ve gayrimenkullerin 
                  vergilendirilmesinde kullanılan asgari metrekare birim değeridir.
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Tapu harcı hesaplamasında beyan edilen bedel rayiç bedelden düşük olamaz</li>
                  <li>Emlak vergisi rayiç bedel üzerinden hesaplanır</li>
                  <li>Rayiç bedeller her yıl yeniden değerleme oranında güncellenir</li>
                </ul>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* İl Seçimi */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                İl
              </label>
              <select
                value={il}
                onChange={(e) => handleIlChange(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
              >
                <option value="">İl seçin...</option>
                {iller.map((ilAdi) => (
                  <option key={ilAdi} value={ilAdi}>{ilAdi}</option>
                ))}
              </select>
            </div>

            {/* İlçe Seçimi */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                <Building2 className="h-4 w-4 inline mr-1" />
                İlçe
              </label>
              <select
                value={ilce}
                onChange={(e) => handleIlceChange(e.target.value)}
                disabled={!il}
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">İlçe seçin...</option>
                {ilceler.map((ilceAdi) => (
                  <option key={ilceAdi} value={ilceAdi}>{ilceAdi}</option>
                ))}
              </select>
            </div>

            {/* Mahalle Seçimi */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Mahalle
              </label>
              <select
                value={mahalle}
                onChange={(e) => { setMahalle(e.target.value); setResult(null) }}
                disabled={!ilce}
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">Mahalle seçin...</option>
                {mahalleler.map((mahalleAdi) => (
                  <option key={mahalleAdi} value={mahalleAdi}>{mahalleAdi}</option>
                ))}
              </select>
            </div>

            {/* Metrekare */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Gayrimenkul Alanı (m²)
              </label>
              <Input
                type="text"
                value={m2}
                onChange={(e) => { setM2(e.target.value.replace(/[^0-9,.]/g, "")); setResult(null) }}
                placeholder="Örn: 120"
                className="h-12 text-lg"
              />
            </div>

            {/* Hesapla Butonu */}
            <Button
              onClick={hesapla}
              disabled={!il || !ilce || !mahalle || !m2}
              className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Rayiç Bedeli Hesapla
            </Button>
          </div>

          {/* Sonuçlar */}
          {result && (
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                <div className="text-center mb-4">
                  <p className="text-sm text-amber-600 mb-1">{result.yil} Yılı Rayiç Bedeli</p>
                  <p className="text-lg text-slate-700">
                    📍 {result.il} / {result.ilce} / {result.mahalle}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-white rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-1">m² Birim Fiyatı</p>
                    <p className="text-2xl font-bold text-amber-600">{formatCurrency(result.m2Fiyat)}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-1">Gayrimenkul Alanı</p>
                    <p className="text-2xl font-bold text-slate-700">{result.m2} m²</p>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-center text-white">
                  <p className="text-sm text-amber-100 mb-1">Toplam Rayiç Bedel</p>
                  <p className="text-3xl font-bold">{formatCurrency(result.toplamDeger)}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>💡 Bilgi:</strong> Rayiç bedel, tapu harcı hesaplamasında asgari değer olarak kullanılır. 
                  Satış bedeli rayiç bedelden düşükse, tapu harcı rayiç bedel üzerinden hesaplanır.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Eğitici Bölümler */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Nasıl Kullanılır? */}
        <Card className="border-2 border-amber-200 hover:border-amber-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">Gayrimenkulün bulunduğu ili seçin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">İlçe ve mahalle seçimlerini yapın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">Gayrimenkulün m² alanını girin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">&quot;Rayiç Bedel Hesapla&quot; butonuna tıklayın</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">🏢 Tapu Harcı Kontrolü</p>
              <p className="text-sm text-orange-600">Satın alacağınız evin tapu harcının minimum değerini öğrenin</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">📊 Emlak Vergisi Hesabı</p>
              <p className="text-sm text-orange-600">Gayrimenkulünüzün emlak vergisi matrahını belirleyin</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">💰 Yatırım Analizi</p>
              <p className="text-sm text-orange-600">Farklı bölgelerin m² değerlerini karşılaştırın</p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-yellow-200 hover:border-yellow-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">⚡</span>
              <p className="text-slate-600 text-sm">Rayiç bedeller her yıl yeniden değerleme oranına göre güncellenir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">📋</span>
              <p className="text-slate-600 text-sm">Tapu harcı beyanı rayiç bedelden düşük olamaz</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">🏛️</span>
              <p className="text-slate-600 text-sm">Rayiç bedeller Maliye Bakanlığı tarafından belirlenir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">📍</span>
              <p className="text-slate-600 text-sm">Her mahalle için farklı m² birim değerleri uygulanır</p>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600">🌟</span>
              <p className="text-slate-600 text-sm">İstanbul&apos;un en yüksek rayiç bedeli Nişantaşı ve Bebek bölgelerinde</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600">📈</span>
              <p className="text-slate-600 text-sm">Son 5 yılda rayiç bedeller ortalama %300 artış gösterdi</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600">🏘️</span>
              <p className="text-slate-600 text-sm">Türkiye&apos;de 30.000&apos;den fazla mahalle için rayiç bedel belirleniyor</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600">💡</span>
              <p className="text-slate-600 text-sm">Rayiç bedel, gerçek piyasa değerinin genellikle %40-60&apos;ı kadardır</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
