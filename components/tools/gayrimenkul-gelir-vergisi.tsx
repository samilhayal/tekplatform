"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Calculator, Info, AlertCircle, Check, Calendar, Home, Lightbulb, BookOpen, HelpCircle, Receipt } from "lucide-react"
import Link from "next/link"

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
  // Alış tarihi
  const [alisGun, setAlisGun] = useState("")
  const [alisAy, setAlisAy] = useState("")
  const [alisYil, setAlisYil] = useState("")
  // Satış tarihi
  const [satisGun, setSatisGun] = useState("")
  const [satisAy, setSatisAy] = useState("")
  const [satisYil, setSatisYil] = useState("")
  
  const [result, setResult] = useState<GelirVergisiResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  // Tarih helper fonksiyonları
  const getAlisTarihiString = () => {
    if (alisYil && alisAy && alisGun) {
      return `${alisYil}-${alisAy.padStart(2, '0')}-${alisGun.padStart(2, '0')}`
    }
    return ''
  }
  
  const getSatisTarihiString = () => {
    if (satisYil && satisAy && satisGun) {
      return `${satisYil}-${satisAy.padStart(2, '0')}-${satisGun.padStart(2, '0')}`
    }
    return ''
  }

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
    const alisTarihi = getAlisTarihiString()
    const satisTarihi = getSatisTarihiString()
    
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
  }, [alisFiyati, satisFiyati, alisGun, alisAy, alisYil, satisGun, satisAy, satisYil])

  const handlePriceChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setter(value ? formatNumber(value) : "")
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Ana Sayfa Butonu */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 hover:bg-rose-50">
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-3xl">
            <Receipt className="h-16 w-16 text-rose-600 mx-auto mb-2" />
            <TrendingUp className="h-8 w-8 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
            <Calculator className="h-6 w-6 text-rose-500 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
          Gayrimenkul Gelir Vergisi
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Gayrimenkul satışından doğan gelir vergisini hesaplayın ve vergi yükünüzü öğrenin
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
            📋 2024 Vergi Dilimleri
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            🏠 5 Yıl Muafiyet
          </span>
          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">
            📊 Enflasyon Düzeltmesi
          </span>
        </div>
      </div>

      <Card className="border-2 border-rose-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
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
                <div className="grid grid-cols-3 gap-2">
                  <Select value={alisGun} onValueChange={(v) => { setAlisGun(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Gün" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={alisAy} onValueChange={(v) => { setAlisAy(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Ay" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"].map((ay, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>{ay}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={alisYil} onValueChange={(v) => { setAlisYil(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Yıl" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => 2025 - i).map((yil) => (
                        <SelectItem key={yil} value={String(yil)}>{yil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Satış Tarihi */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Satış Tarihi
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={satisGun} onValueChange={(v) => { setSatisGun(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Gün" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={satisAy} onValueChange={(v) => { setSatisAy(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Ay" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"].map((ay, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>{ay}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={satisYil} onValueChange={(v) => { setSatisYil(v); setResult(null) }}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Yıl" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => 2025 - i).map((yil) => (
                        <SelectItem key={yil} value={String(yil)}>{yil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
              disabled={!alisFiyati || !satisFiyati || !getAlisTarihiString() || !getSatisTarihiString()}
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

      {/* Eğitici Bölümler */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Nasıl Kullanılır? */}
        <Card className="border-2 border-rose-200 hover:border-rose-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-sm font-bold shrink-0">1</span>
              <p className="text-slate-600">Gayrimenkulü aldığınız tarihi ve fiyatı girin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-sm font-bold shrink-0">2</span>
              <p className="text-slate-600">Satış tarihi ve bedelini girin</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-sm font-bold shrink-0">3</span>
              <p className="text-slate-600">&quot;Vergi Hesapla&quot; butonuna tıklayın</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-sm font-bold shrink-0">4</span>
              <p className="text-slate-600">Muafiyet durumu ve vergi tutarını görün</p>
            </div>
          </CardContent>
        </Card>

        {/* Örnek Kullanımlar */}
        <Card className="border-2 border-pink-200 hover:border-pink-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="font-medium text-pink-800">🏠 Konut Satışı Planlaması</p>
              <p className="text-sm text-pink-600">5 yıl dolmadan satış yaparsanız ne kadar vergi ödeyeceğinizi hesaplayın</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="font-medium text-pink-800">📈 Yatırım Kararı</p>
              <p className="text-sm text-pink-600">Vergi sonrası net karınızı öğrenerek yatırım kararı verin</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="font-medium text-pink-800">⏰ Satış Zamanlaması</p>
              <p className="text-sm text-pink-600">5 yılın dolmasını beklemenin sağlayacağı tasarrufu hesaplayın</p>
            </div>
          </CardContent>
        </Card>

        {/* Önemli Bilgiler */}
        <Card className="border-2 border-fuchsia-200 hover:border-fuchsia-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fuchsia-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">⚡</span>
              <p className="text-slate-600 text-sm">5 yıl ve üzeri elde tutulan gayrimenkuller vergiden tamamen muaf</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">📋</span>
              <p className="text-slate-600 text-sm">Vergi dilimleri 2024 için %15-%40 arasında değişiyor</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">🏛️</span>
              <p className="text-slate-600 text-sm">Beyanname Mart ayında verilir, vergi Mart ve Temmuz&apos;da 2 taksitte ödenir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-fuchsia-600">📊</span>
              <p className="text-slate-600 text-sm">Enflasyon düzeltmesi ile maliyet bedeli güncellenebilir</p>
            </div>
          </CardContent>
        </Card>

        {/* İlginç Bilgiler */}
        <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-purple-600">🌟</span>
              <p className="text-slate-600 text-sm">Türkiye&apos;de gayrimenkul satış kazancı vergisi %40&apos;a kadar çıkabilir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600">📈</span>
              <p className="text-slate-600 text-sm">5 yıl kuralı miras yoluyla edinilen gayrimenkuller için de geçerlidir</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600">🏘️</span>
              <p className="text-slate-600 text-sm">Aynı yıl birden fazla gayrimenkul satışı yaparsanız kazançlar toplanır</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600">💡</span>
              <p className="text-slate-600 text-sm">Konut alım satımında &quot;ivazsız iktisap&quot; (hibe) farklı kurallara tabidir</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}