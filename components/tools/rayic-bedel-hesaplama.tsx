"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Calculator, Info, Search, Building2 } from "lucide-react"

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
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-amber-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Rayiç Bedel Hesaplama
            </h2>
            <p className="text-slate-600">Gayrimenkulünüzün bulunduğu konuma göre rayiç bedelini öğrenin</p>
          </div>

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
    </div>
  )
}
