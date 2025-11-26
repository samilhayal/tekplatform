"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Calculator, Info, AlertCircle, Check } from "lucide-react"

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
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-emerald-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Tapu Harcı Hesaplama
            </h2>
            <p className="text-slate-600">Gayrimenkul alım-satım işlemlerinde ödenmesi gereken tapu harcını hesaplayın</p>
          </div>

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
    </div>
  )
}
