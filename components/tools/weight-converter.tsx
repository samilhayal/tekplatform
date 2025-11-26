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
import { Home, Weight, ArrowLeftRight, BookOpen, Lightbulb, AlertCircle, Info, Scale } from "lucide-react"

interface Unit {
  name: string
  symbol: string
  toKilograms: (value: number) => number
  fromKilograms: (value: number) => number
}

const weightUnits: Unit[] = [
  {
    name: "Kilogram",
    symbol: "kg",
    toKilograms: (v) => v,
    fromKilograms: (v) => v,
  },
  {
    name: "Gram",
    symbol: "g",
    toKilograms: (v) => v / 1000,
    fromKilograms: (v) => v * 1000,
  },
  {
    name: "Miligram",
    symbol: "mg",
    toKilograms: (v) => v / 1000000,
    fromKilograms: (v) => v * 1000000,
  },
  {
    name: "Ton",
    symbol: "t",
    toKilograms: (v) => v * 1000,
    fromKilograms: (v) => v / 1000,
  },
  {
    name: "Pound",
    symbol: "lb",
    toKilograms: (v) => v * 0.453592,
    fromKilograms: (v) => v / 0.453592,
  },
  {
    name: "Ons",
    symbol: "oz",
    toKilograms: (v) => v * 0.0283495,
    fromKilograms: (v) => v / 0.0283495,
  },
]

export function WeightConverter() {
  const [fromUnitIndex, setFromUnitIndex] = useState(0)
  const [toUnitIndex, setToUnitIndex] = useState(1)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const fromUnit = weightUnits[fromUnitIndex]
  const toUnit = weightUnits[toUnitIndex]

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const kilograms = fromUnit.toKilograms(parseFloat(fromValue))
      const result = toUnit.fromKilograms(kilograms)
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
      const kilograms = toUnit.toKilograms(parseFloat(value))
      const result = fromUnit.fromKilograms(kilograms)
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
    { label: "1 kg → g", from: 1, fromIdx: 0, toIdx: 1 },
    { label: "1 kg → lb", from: 1, fromIdx: 0, toIdx: 4 },
    { label: "500 g → kg", from: 500, fromIdx: 1, toIdx: 0 },
    { label: "1 t → kg", from: 1, fromIdx: 3, toIdx: 0 },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Home Button */}
      <Link href="/">
        <Button 
          variant="outline" 
          className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50"
        >
          <Home className="h-4 w-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
          <span className="text-indigo-900 font-medium">Ana Sayfaya Dön</span>
        </Button>
      </Link>

      {/* Main Calculator Card */}
      <Card className="border-2 border-indigo-100 shadow-xl shadow-indigo-500/10">
        <CardContent className="pt-8 pb-8 px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg mb-4">
              <Weight className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Ağırlık Dönüştürücü
            </h1>
            <p className="text-slate-600">Ağırlık birimlerini hızlıca dönüştürün</p>
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
                  className="h-auto py-3 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
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
                <Weight className="h-4 w-4 text-indigo-600" />
                Dönüştürülecek Değer
              </label>
              <Input
                type="number"
                placeholder="Değer girin"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
              <Select
                value={fromUnitIndex.toString()}
                onValueChange={(value) => setFromUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-indigo-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit, index) => (
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
                className="h-12 w-12 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 hover:rotate-180 transition-all duration-300"
              >
                <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Weight className="h-4 w-4 text-purple-600" />
                Sonuç
              </label>
              <Input
                type="number"
                placeholder="Sonuç"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-gradient-to-r from-white to-purple-50/30"
              />
              <Select
                value={toUnitIndex.toString()}
                onValueChange={(value) => setToUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-purple-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visual Comparison - Scale Display */}
          {fromValue && toValue && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {fromValue}
                    </span>
                    <span className="text-xl font-semibold text-indigo-600">{fromUnit.symbol}</span>
                  </div>
                  <ArrowLeftRight className="h-6 w-6 text-indigo-600" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {toValue}
                    </span>
                    <span className="text-xl font-semibold text-purple-600">{toUnit.symbol}</span>
                  </div>
                </div>
              </div>

              {/* Weight Scale Visualization */}
              <div className="flex items-end justify-center gap-8 mt-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-2">
                    <Scale className="w-full h-full text-indigo-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-700">{fromValue}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">{fromUnit.name}</span>
                  <div className="mt-2 h-2 w-24 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full"></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-2">
                    <Scale className="w-full h-full text-purple-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-700">{toValue}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">{toUnit.name}</span>
                  <div className="mt-2 h-2 w-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Educational Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* How to Use */}
        <Card className="border-2 border-indigo-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Dönüştürmek istediğiniz ağırlığı girin</li>
                  <li>Kaynak birimini seçin (örn: Kilogram)</li>
                  <li>Hedef birimini seçin (örn: Pound)</li>
                  <li>Sonuç otomatik hesaplanır ve gösterilir</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="border-2 border-purple-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Örnek Kullanımlar</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Mutfak:</strong> 500 g → 1.1 lb (yemek tarifi)</li>
                  <li><strong>Bagaj:</strong> 20 kg → 44 lb (havayolu limiti)</li>
                  <li><strong>Bebek:</strong> 3500 g → 3.5 kg (doğum ağırlığı)</li>
                  <li><strong>Spor:</strong> 75 kg → 165 lb (vücut ağırlığı)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-2 border-indigo-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Önemli Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Metrik:</strong> Kilogram, gram, miligram, ton</li>
                  <li><strong>İmparatorluk:</strong> Pound, ons</li>
                  <li><strong>Standart:</strong> 1 kg = 1000 g = 1,000,000 mg</li>
                  <li><strong>Dönüşüm:</strong> 1 kg ≈ 2.205 lb</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-2 border-purple-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">İlginç Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>⚖️ Kilogram, Париж'teki IPK prototipinden tanımlanır</li>
                  <li>💎 1 karat = 200 mg (değerli taşlar için)</li>
                  <li>🚗 Otomobiller genelde 1-2 ton ağırlığındadır</li>
                  <li>🐘 Fil: ~5-6 ton, İnsan: ~70 kg ortalama</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
