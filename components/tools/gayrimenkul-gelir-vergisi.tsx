"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Calculator, Info, AlertCircle, Check, Calendar } from "lucide-react"

// 2024 Gelir Vergisi Dilimleri
const GELIR_VERGISI_DILIMLERI_2024 = [
  { limit: 110000, oran: 0.15 },
  { limit: 230000, oran: 0.20 },
  { limit: 580000, oran: 0.27 },
  { limit: 3000000, oran: 0.35 },
  { limit: Infinity, oran: 0.40 },
]

// İstisna tutarı (5 yıldan fazla elde tutma için)
const BES_YIL_ISTISNASI = true
const ENFLASYON_DUZELTMESI_BASLANGIC_YILI = 2005

interface GelirVergisiResult {
  alisFiyati: number
  satisFiyati: number
  brutKar: number
  enflasyonDuzeltmesi: number
  duzeltilmisAlisFiyati: number
  netKazanc: number
  vergiMatrahi: number
  hesaplananVergi: number
  istisna: boolean
  istisnaAciklama: string
  vergiDilimleri: { dilim: string; vergi: number }[]
}

export function GayrimenkulGelirVergisi() {
  const [alisFiyati, setAlisFiyati] = useState("")
  const [satisFiyati, setSatisFiyati] = useState("")
  const [alisTarihi, setAlisTarihi] = useState("")
  const [satisTarihi, setSatisTarihi] = useState("")
  const [result, setResult] = useState<GelirVergisiResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, "")
    return new Intl.NumberFormat("tr-TR").format(Number(num))
  }

  const parseNumber = (value: string) => {
    return Number(value.replace(/\./g, "").replace(/,/g, ""))
  }

  const calculateYearsDifference = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays / 365
  }

  // Basitleştirilmiş enflasyon düzeltme katsayısı (gerçek uygulamada TÜFE oranları kullanılmalı)
  const getEnflasyonKatsayisi = (alisYili: number, satisYili: number): number => {
    // Örnek katsayılar (gerçek değerler için resmi verilere bakılmalı)
    const yillikEnflasyon = 0.50 // Ortalama yıllık enflasyon tahmini
    const yilFarki = satisYili - alisYili
    return Math.pow(1 + yillikEnflasyon, yilFarki)
  }

  const hesaplaVergi = useCallback(() => {
    const alis = parseNumber(alisFiyati)
    const satis = parseNumber(satisFiyati)
    
    if (!alis || !satis || !alisTarihi || !satisTarihi) return

    const yilFarki = calculateYearsDifference(alisTarihi, satisTarihi)
    const alisYili = new Date(alisTarihi).getFullYear()
    const satisYili = new Date(satisTarihi).getFullYear()

    // 5 yıldan fazla elde tutulmuşsa vergi istisnası
    if (yilFarki >= 5) {
      setResult({
        alisFiyati: alis,
        satisFiyati: satis,
        brutKar: satis - alis,
        enflasyonDuzeltmesi: 0,
        duzeltilmisAlisFiyati: alis,
        netKazanc: satis - alis,
        vergiMatrahi: 0,
        hesaplananVergi: 0,
        istisna: true,
        istisnaAciklama: "Gayrimenkul 5 yıldan fazla elde tutulduğu için gelir vergisinden muaftır.",
        vergiDilimleri: [],
      })
      return
    }

    // Enflasyon düzeltmesi (2005 sonrası alımlar için)
    let enflasyonKatsayisi = 1
    let duzeltilmisAlis = alis
    
    if (alisYili >= ENFLASYON_DUZELTMESI_BASLANGIC_YILI) {
      enflasyonKatsayisi = getEnflasyonKatsayisi(alisYili, satisYili)
      duzeltilmisAlis = alis * enflasyonKatsayisi
    }

    const brutKar = satis - alis
    const netKazanc = satis - duzeltilmisAlis
    const vergiMatrahi = Math.max(0, netKazanc)

    // Vergi hesaplama (dilimli)
    let kalanMatrah = vergiMatrahi
    let toplamVergi = 0
    const vergiDilimleri: { dilim: string; vergi: number }[] = []
    let altLimit = 0

    for (const dilim of GELIR_VERGISI_DILIMLERI_2024) {
      if (kalanMatrah <= 0) break

      const dilimGenisligi = dilim.limit - altLimit
      const buDilimdekiMatrah = Math.min(kalanMatrah, dilimGenisligi)
      const buDilimdekiVergi = buDilimdekiMatrah * dilim.oran

      if (buDilimdekiMatrah > 0) {
        vergiDilimleri.push({
          dilim: `${formatCurrency(altLimit)} - ${dilim.limit === Infinity ? "üzeri" : formatCurrency(dilim.limit)} (%${dilim.oran * 100})`,
          vergi: buDilimdekiVergi,
        })
      }

      toplamVergi += buDilimdekiVergi
      kalanMatrah -= buDilimdekiMatrah
      altLimit = dilim.limit
    }

    setResult({
      alisFiyati: alis,
      satisFiyati: satis,
      brutKar,
      enflasyonDuzeltmesi: enflasyonKatsayisi,
      duzeltilmisAlisFiyati: duzeltilmisAlis,
      netKazanc,
      vergiMatrahi,
      hesaplananVergi: toplamVergi,
      istisna: false,
      istisnaAciklama: "",
      vergiDilimleri,
    })
  }, [alisFiyati, satisFiyati, alisTarihi, satisTarihi])

  const handlePriceChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setter(value ? formatNumber(value) : "")
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-rose-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Gayrimenkul Gelir Vergisi
            </h2>
            <p className="text-slate-600">Gayrimenkul satışından doğan gelir vergisini hesaplayın</p>
          </div>

          {/* Bilgi Butonu */}
          <div className="mb-6">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 font-medium"
            >
              <Info className="h-4 w-4" />
              {showInfo ? "Bilgiyi Gizle" : "Gelir Vergisi Hakkında Bilgi"}
            </button>
            
            {showInfo && (
              <div className="mt-3 p-4 bg-rose-50 rounded-xl text-sm text-rose-800">
                <h4 className="font-semibold mb-2">Gayrimenkul Satışında Gelir Vergisi:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>5 yıldan fazla</strong> elde tutulan gayrimenkuller vergiden <strong>muaftır</strong></li>
                  <li>5 yıldan az elde tutulan gayrimenkullerde, satış karı gelir vergisine tabidir</li>
                  <li>Alış bedeli enflasyon düzeltmesine tabi tutulabilir (2005 sonrası alımlar)</li>
                  <li>Vergi, artan oranlı tarifeye göre hesaplanır (%15 - %40)</li>
                </ul>
                <p className="mt-3">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Konut olarak kullanılan ve satış bedelinin belirli bir kısmı 1 yıl içinde yeni konut alımında kullanılırsa ek istisnalar uygulanabilir.
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Alış Tarihi */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Alış Tarihi
                </label>
                <Input
                  type="date"
                  value={alisTarihi}
                  onChange={(e) => { setAlisTarihi(e.target.value); setResult(null) }}
                  className="h-12"
                />
              </div>

              {/* Satış Tarihi */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Satış Tarihi
                </label>
                <Input
                  type="date"
                  value={satisTarihi}
                  onChange={(e) => { setSatisTarihi(e.target.value); setResult(null) }}
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Alış Fiyatı */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Alış Fiyatı (TL)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={alisFiyati}
                    onChange={handlePriceChange(setAlisFiyati)}
                    placeholder="Örn: 1.500.000"
                    className="h-12 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                </div>
              </div>

              {/* Satış Fiyatı */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Satış Fiyatı (TL)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={satisFiyati}
                    onChange={handlePriceChange(setSatisFiyati)}
                    placeholder="Örn: 2.500.000"
                    className="h-12 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                </div>
              </div>
            </div>

            {/* Hesapla Butonu */}
            <Button
              onClick={hesaplaVergi}
              disabled={!alisFiyati || !satisFiyati || !alisTarihi || !satisTarihi}
              className="w-full h-14 text-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Gelir Vergisini Hesapla
            </Button>
          </div>

          {/* Sonuçlar */}
          {result && (
            <div className="mt-8 space-y-4">
              {result.istisna ? (
                <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-200 text-center">
                  <Check className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Vergi İstisnası!</h3>
                  <p className="text-green-700">{result.istisnaAciklama}</p>
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <p className="text-sm text-slate-600">Brüt Kâr: <strong>{formatCurrency(result.brutKar)}</strong></p>
                    <p className="text-lg font-bold text-green-600 mt-2">Ödenecek Vergi: 0 TL</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Check className="h-5 w-5 text-rose-600" />
                    Hesaplama Sonuçları
                  </h3>

                  <div className="grid gap-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-500">Alış Fiyatı</p>
                        <p className="text-xl font-bold text-slate-700">{formatCurrency(result.alisFiyati)}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-500">Satış Fiyatı</p>
                        <p className="text-xl font-bold text-slate-700">{formatCurrency(result.satisFiyati)}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-600">Düzeltilmiş Alış Fiyatı (Enflasyon Düzeltmesi)</p>
                      <p className="text-xl font-bold text-blue-700">{formatCurrency(result.duzeltilmisAlisFiyati)}</p>
                      <p className="text-xs text-blue-500 mt-1">Düzeltme Katsayısı: {result.enflasyonDuzeltmesi.toFixed(2)}</p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl">
                      <p className="text-sm text-amber-600">Vergi Matrahı (Net Kazanç)</p>
                      <p className="text-xl font-bold text-amber-700">{formatCurrency(result.vergiMatrahi)}</p>
                    </div>

                    {result.vergiDilimleri.length > 0 && (
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <p className="text-sm text-purple-600 mb-2">Vergi Dilimleri</p>
                        {result.vergiDilimleri.map((dilim, idx) => (
                          <div key={idx} className="flex justify-between text-sm py-1">
                            <span className="text-purple-700">{dilim.dilim}</span>
                            <span className="font-semibold text-purple-800">{formatCurrency(dilim.vergi)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl text-white">
                      <p className="text-sm text-rose-100">Ödenecek Gelir Vergisi</p>
                      <p className="text-3xl font-bold">{formatCurrency(result.hesaplananVergi)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>⚠️ Önemli:</strong> Bu hesaplama tahmini bir sonuç verir. Gerçek vergi tutarı için 
                      mali müşavirinize danışmanız veya beyanname döneminde resmi hesaplama yapmanız önerilir.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
