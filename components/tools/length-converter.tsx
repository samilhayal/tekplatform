"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Home, Ruler, ArrowLeftRight, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"

interface Unit {
  name: string
  symbol: string
  toMeters: (value: number) => number
  fromMeters: (value: number) => number
}

const lengthUnits: Unit[] = [
  {
    name: "Metre",
    symbol: "m",
    toMeters: (v) => v,
    fromMeters: (v) => v,
  },
  {
    name: "Kilometre",
    symbol: "km",
    toMeters: (v) => v * 1000,
    fromMeters: (v) => v / 1000,
  },
  {
    name: "Santimetre",
    symbol: "cm",
    toMeters: (v) => v / 100,
    fromMeters: (v) => v * 100,
  },
  {
    name: "Milimetre",
    symbol: "mm",
    toMeters: (v) => v / 1000,
    fromMeters: (v) => v * 1000,
  },
  {
    name: "Mil",
    symbol: "mi",
    toMeters: (v) => v * 1609.34,
    fromMeters: (v) => v / 1609.34,
  },
  {
    name: "Yard",
    symbol: "yd",
    toMeters: (v) => v * 0.9144,
    fromMeters: (v) => v / 0.9144,
  },
  {
    name: "Feet",
    symbol: "ft",
    toMeters: (v) => v * 0.3048,
    fromMeters: (v) => v / 0.3048,
  },
  {
    name: "İnch",
    symbol: "in",
    toMeters: (v) => v * 0.0254,
    fromMeters: (v) => v / 0.0254,
  },
]

export function LengthConverter() {
  const [fromUnitIndex, setFromUnitIndex] = useState(0)
  const [toUnitIndex, setToUnitIndex] = useState(1)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const fromUnit = lengthUnits[fromUnitIndex]
  const toUnit = lengthUnits[toUnitIndex]

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const meters = fromUnit.toMeters(parseFloat(fromValue))
      const result = toUnit.fromMeters(meters)
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      setToValue("")
    }
  }, [fromValue, fromUnit, toUnit])

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    if (value && !isNaN(parseFloat(value))) {
      const meters = toUnit.toMeters(parseFloat(value))
      const result = fromUnit.fromMeters(meters)
      setFromValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      setFromValue("")
    }
  }

  const swapUnits = () => {
    setFromUnitIndex(toUnitIndex)
    setToUnitIndex(fromUnitIndex)
    setFromValue(toValue)
  }

  const quickConversions = [
    { label: "1 km → m", from: 1, fromIdx: 1, toIdx: 0 },
    { label: "1 m → ft", from: 1, fromIdx: 0, toIdx: 6 },
    { label: "100 cm → m", from: 100, fromIdx: 2, toIdx: 0 },
    { label: "1 mi → km", from: 1, fromIdx: 4, toIdx: 1 },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Home Button */}
      <Link href="/">
        <Button 
          variant="outline" 
          className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
        >
          <Home className="h-4 w-4 text-orange-600 group-hover:-translate-x-1 transition-transform" />
          <span className="text-orange-900 font-medium">Ana Sayfaya Dön</span>
        </Button>
      </Link>

      {/* Main Calculator Card */}
      <Card className="border-2 border-orange-100 shadow-xl shadow-orange-500/10">
        <CardContent className="pt-8 pb-8 px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg mb-4">
              <Ruler className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Uzunluk Dönüştürücü
            </h1>
            <p className="text-slate-600">Uzunluk birimlerini hızlıca dönüştürün</p>
          </div>

          {/* Quick Conversions */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Hızlı Dönüşümler
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickConversions.map((qc, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => {
                    setFromUnitIndex(qc.fromIdx)
                    setToUnitIndex(qc.toIdx)
                    setFromValue(qc.from.toString())
                  }}
                  className="h-auto py-3 hover:bg-orange-50 hover:border-orange-300 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700">{qc.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Conversion Area */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-8">
            {/* From Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Ruler className="h-4 w-4 text-orange-600" />
                Dönüştürülecek Değer
              </label>
              <Input
                type="number"
                placeholder="Değer girin"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
              <Select
                value={fromUnitIndex.toString()}
                onValueChange={(value) => setFromUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-orange-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-12 w-12 rounded-full border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 hover:rotate-180 transition-all duration-300"
              >
                <ArrowLeftRight className="h-5 w-5 text-orange-600" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Ruler className="h-4 w-4 text-amber-600" />
                Sonuç
              </label>
              <Input
                type="number"
                placeholder="Sonuç"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gradient-to-r from-white to-amber-50/30"
              />
              <Select
                value={toUnitIndex.toString()}
                onValueChange={(value) => setToUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-amber-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visual Comparison */}
          {fromValue && toValue && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-orange-200 p-6 bg-gradient-to-br from-orange-50 to-amber-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      {fromValue}
                    </span>
                    <span className="text-xl font-semibold text-orange-600">{fromUnit.symbol}</span>
                  </div>
                  <ArrowLeftRight className="h-6 w-6 text-orange-600" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {toValue}
                    </span>
                    <span className="text-xl font-semibold text-amber-600">{toUnit.symbol}</span>
                  </div>
                </div>
              </div>

              {/* Visual Bar Comparison */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 w-24">{fromUnit.name}</span>
                  <div className="flex-1 h-8 bg-white rounded-lg overflow-hidden border border-orange-200">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ width: '100%' }}
                    >
                      <span className="text-xs font-semibold text-white">{fromValue}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 w-24">{toUnit.name}</span>
                  <div className="flex-1 h-8 bg-white rounded-lg overflow-hidden border border-amber-200">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ 
                        width: `${Math.min(100, (parseFloat(toValue) / Math.max(parseFloat(fromValue), parseFloat(toValue))) * 100)}%` 
                      }}
                    >
                      <span className="text-xs font-semibold text-white">{toValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Educational Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* How to Use */}
        <Card className="border-2 border-orange-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Dönüştürmek istediğiniz değeri girin</li>
                  <li>Kaynak birimini seçin (örn: Metre)</li>
                  <li>Hedef birimini seçin (örn: Feet)</li>
                  <li>Sonuç otomatik hesaplanır</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="border-2 border-amber-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Örnek Kullanımlar</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Yapı:</strong> 2.5 m → 8.2 ft (duvar yüksekliği)</li>
                  <li><strong>Seyahat:</strong> 100 km → 62.1 mi (mesafe)</li>
                  <li><strong>Spor:</strong> 100 m → 328 ft (koşu pisti)</li>
                  <li><strong>Ekran:</strong> 6.5 in → 16.5 cm (telefon)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-2 border-orange-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Önemli Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Metrik Sistem:</strong> Metre, santimetre, kilometre</li>
                  <li><strong>İmparatorluk:</strong> Feet, inch, mil, yard</li>
                  <li><strong>Standart:</strong> 1 m = 100 cm = 1000 mm</li>
                  <li><strong>Dönüşüm:</strong> 1 km = 0.621 mi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-2 border-amber-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Info className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">İlginç Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>🌍 Metre, Dünya'nın meridyeninden türetilmiştir</li>
                  <li>👣 Feet (ayak), kraliyet ayak ölçüsünden gelir</li>
                  <li>📏 İnch, üç arpa tanesinin uzunluğuydu</li>
                  <li>🏃 Maraton: 42.195 km (26.2 mil)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
