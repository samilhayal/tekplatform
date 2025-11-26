"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Calculator, Info, AlertCircle, Check, Home, Lightbulb, BookOpen, HelpCircle, FileText } from "lucide-react"
import Link from "next/link"

interface TapuHarciResult {
  satisHarci: number
  aliciHarci: number
  saticiHarci: number
  donerenFonu: number
  toplamHarc: number
  tapuKayitUcreti: number
  genelToplam: number
}

// 2024 Türkiye Tapu Harcı Oranları
const TAPU_HARCI_ORANI = 0.04 // %4 (Alıcı %2, Satıcı %2)
const ALICI_ORANI = 0.02 // %2
const SATICI_ORANI = 0.02 // %2
const DONEREN_FONU_ORANI = 0.001 // %0.1 Döner Sermaye
const TAPU_KAYIT_UCRETI = 1350 // 2024 yılı için sabit ücret

export function TapuHarciHesaplama() {
  const [satisFiyati, setSatisFiyati] = useState("")
  const [emlakTipi, setEmlakTipi] = useState<"konut" | "arsa" | "ticari">("konut")
  const [result, setResult] = useState<TapuHarciResult | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, "")
    return new Intl.NumberFormat("tr-TR").format(Number(num))
  }

  const parseNumber = (value: string) => {
    return Number(value.replace(/\./g, "").replace(/,/g, ""))
  }

  const hesapla = useCallback(() => {
    const fiyat = parseNumber(satisFiyati)
    
    if (!fiyat || fiyat <= 0) {
      return
    }

    // Tapu harcı hesaplama
    const aliciHarci = fiyat * ALICI_ORANI
    const saticiHarci = fiyat * SATICI_ORANI
    const satisHarci = aliciHarci + saticiHarci
    const donerenFonu = fiyat * DONEREN_FONU_ORANI
    const toplamHarc = satisHarci + donerenFonu
    const genelToplam = toplamHarc + TAPU_KAYIT_UCRETI

    setResult({
      satisHarci,
      aliciHarci,
      saticiHarci,
      donerenFonu,
      toplamHarc,
      tapuKayitUcreti: TAPU_KAYIT_UCRETI,
      genelToplam,
    })
  }, [satisFiyati])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setSatisFiyati(value ? formatNumber(value) : "")
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Home Button */}
      <div className="flex justify-start">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4 opacity-20">
          <Building2 className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <FileText className="h-24 w-24" />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <Building2 className="h-12 w-12 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-3">Tapu Harcı Hesaplama</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            2024 güncel oranlarıyla tapu harcı, döner sermaye ve tescil ücretlerini kolayca hesaplayın
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              📊 Alıcı %2 + Satıcı %2
            </div>
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              💰 Döner Sermaye %0.1
            </div>
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              📝 Güncel 2024 Oranları
            </div>
          </div>
        </div>
      </div>

      <Card className="border-2 border-emerald-200 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Bilgi Butonu */}
          <div className="mb-6">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <Info className="h-4 w-4" />
              {showInfo ? "Bilgiyi Gizle" : "Tapu Harcı Hakkında Bilgi"}
            </button>
            
            {showInfo && (
              <div className="mt-3 p-4 bg-emerald-50 rounded-xl text-sm text-emerald-800">
                <h4 className="font-semibold mb-2">2024 Tapu Harcı Oranları:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Tapu harcı toplam oranı: <strong>%4</strong> (Satış bedeli üzerinden)</li>
                  <li>Alıcı payı: <strong>%2</strong></li>
                  <li>Satıcı payı: <strong>%2</strong></li>
                  <li>Döner Sermaye Hizmet Bedeli: <strong>%0.1</strong></li>
                  <li>Tapu Kayıt Ücreti: <strong>{formatCurrency(TAPU_KAYIT_UCRETI)}</strong></li>
                </ul>
                <p className="mt-3 text-emerald-600">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Not: Tapu harcı, beyan edilen satış bedeli veya emlak rayiç bedelinden yüksek olanı üzerinden hesaplanır.
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Emlak Tipi */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-3">Emlak Tipi</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "konut", label: "Konut", icon: "🏠" },
                  { value: "arsa", label: "Arsa / Tarla", icon: "🏞️" },
                  { value: "ticari", label: "Ticari", icon: "🏢" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEmlakTipi(type.value as typeof emlakTipi)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      emlakTipi === type.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
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
                  onChange={handleInputChange}
                  placeholder="Örn: 2.500.000"
                  className="h-14 text-lg font-semibold pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  ₺
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Beyan edilen satış bedelini veya rayiç bedelden yüksek olanını girin
              </p>
            </div>

            {/* Hesapla Butonu */}
            <Button
              onClick={hesapla}
              disabled={!satisFiyati}
              className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Tapu Harcını Hesapla
            </Button>
          </div>

          {/* Sonuçlar */}
          {result && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                Hesaplama Sonuçları
              </h3>
              
              <div className="grid gap-3">
                {/* Alıcı Harcı */}
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <div>
                    <p className="text-sm text-blue-600">Alıcı Tapu Harcı (%2)</p>
                    <p className="text-xs text-blue-500">Alıcının ödeyeceği pay</p>
                  </div>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(result.aliciHarci)}</p>
                </div>

                {/* Satıcı Harcı */}
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                  <div>
                    <p className="text-sm text-orange-600">Satıcı Tapu Harcı (%2)</p>
                    <p className="text-xs text-orange-500">Satıcının ödeyeceği pay</p>
                  </div>
                  <p className="text-xl font-bold text-orange-700">{formatCurrency(result.saticiHarci)}</p>
                </div>

                {/* Döner Sermaye */}
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                  <div>
                    <p className="text-sm text-purple-600">Döner Sermaye (%0.1)</p>
                    <p className="text-xs text-purple-500">Tapu müdürlüğü hizmet bedeli</p>
                  </div>
                  <p className="text-xl font-bold text-purple-700">{formatCurrency(result.donerenFonu)}</p>
                </div>

                {/* Tapu Kayıt Ücreti */}
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm text-slate-600">Tapu Kayıt Ücreti</p>
                    <p className="text-xs text-slate-500">2024 yılı sabit ücret</p>
                  </div>
                  <p className="text-xl font-bold text-slate-700">{formatCurrency(result.tapuKayitUcreti)}</p>
                </div>

                {/* Genel Toplam */}
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white">
                  <div>
                    <p className="text-sm text-emerald-100">Toplam Maliyet</p>
                    <p className="text-xs text-emerald-200">Alıcı + Satıcı + Döner Sermaye + Kayıt Ücreti</p>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(result.genelToplam)}</p>
                </div>
              </div>

              {/* Özet Bilgi */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 Pratik Bilgi:</strong> Uygulamada genellikle toplam tapu harcının tamamı (%4) alıcı tarafından ödenir. 
                  Ancak yasal olarak alıcı ve satıcı eşit oranda (%2 + %2) sorumludur.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Educational Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <HelpCircle className="h-5 w-5" />
              Nasıl Kullanılır?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Gayrimenkulün tipini seçin (Konut, Arsa, Ticari)</p>
            <p>• Satış fiyatını TL olarak girin</p>
            <p>• Beyan edilen veya rayiç bedelden yüksek olanını kullanın</p>
            <p>• "Hesapla" butonuna tıklayın</p>
            <p>• Alıcı ve satıcı paylarını ayrı ayrı görün</p>
            <p>• Toplam maliyeti öğrenin</p>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <BookOpen className="h-5 w-5" />
              Örnek Kullanımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• <strong>Ev alımı:</strong> 2.500.000 TL ev için toplam tapu masrafını hesapla</p>
            <p>• <strong>Arsa satışı:</strong> Satıcı olarak ödeyeceğiniz harcı öğrenin</p>
            <p>• <strong>Bütçe planı:</strong> Ev alırken ek masrafları hesaba katın</p>
            <p>• <strong>Pazarlık:</strong> Tapu masraflarını kimin ödeyeceğini belirleyin</p>
            <p>• <strong>Karşılaştırma:</strong> Farklı fiyatlardaki evlerin masraflarını kıyaslayın</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Info className="h-5 w-5" />
              Önemli Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Tapu harcı, satış bedelinin toplam %4'üdür</p>
            <p>• Yasal olarak alıcı %2, satıcı %2 öder</p>
            <p>• Pratikte genellikle alıcı toplam harcı üstlenir</p>
            <p>• Rayiç bedel, belediyenin belirlediği minimum değerdir</p>
            <p>• Beyan edilen bedel rayiçten düşük olamaz</p>
            <p>• Döner sermaye hizmet bedeli ayrıca ödenir (%0.1)</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Lightbulb className="h-5 w-5" />
              İlginç Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>• Türkiye'de yıllık yaklaşık 1.5 milyon tapu işlemi yapılıyor</p>
            <p>• Tapu harcı oranları 2024'te %4 olarak sabit kaldı</p>
            <p>• İlk konut alımında bazı indirimler uygulanabilir</p>
            <p>• Miras yoluyla intikalde farklı oranlar geçerli</p>
            <p>• Tapu harcı, işlem günü tapu müdürlüğüne ödenir</p>
            <p>• E-devlet üzerinden tapu kayıt belgesi alınabilir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
