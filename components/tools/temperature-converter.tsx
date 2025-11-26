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
import { Home, Thermometer, ArrowLeftRight, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"

interface Unit {
  name: string
  symbol: string
  toCelsius: (value: number) => number
  fromCelsius: (value: number) => number
}

const temperatureUnits: Unit[] = [
  {
    name: "Celsius",
    symbol: "°C",
    toCelsius: (v) => v,
    fromCelsius: (v) => v,
  },
  {
    name: "Fahrenheit",
    symbol: "°F",
    toCelsius: (v) => (v - 32) * 5 / 9,
    fromCelsius: (v) => (v * 9 / 5) + 32,
  },
  {
    name: "Kelvin",
    symbol: "K",
    toCelsius: (v) => v - 273.15,
    fromCelsius: (v) => v + 273.15,
  },
]

export function TemperatureConverter() {
  const [fromUnitIndex, setFromUnitIndex] = useState(0)
  const [toUnitIndex, setToUnitIndex] = useState(1)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const fromUnit = temperatureUnits[fromUnitIndex]
  const toUnit = temperatureUnits[toUnitIndex]

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const celsius = fromUnit.toCelsius(parseFloat(fromValue))
      const result = toUnit.fromCelsius(celsius)
      setToValue(result.toFixed(2))
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
      const celsius = toUnit.toCelsius(parseFloat(value))
      const result = fromUnit.fromCelsius(celsius)
      setFromValue(result.toFixed(2))
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
    { label: "0°C → °F", from: 0, fromIdx: 0, toIdx: 1 },
    { label: "100°C → °F", from: 100, fromIdx: 0, toIdx: 1 },
    { label: "98.6°F → °C", from: 98.6, fromIdx: 1, toIdx: 0 },
    { label: "273 K → °C", from: 273, fromIdx: 2, toIdx: 0 },
  ]

  const getTemperatureColor = (celsius: number) => {
    if (celsius < 0) return "from-blue-400 to-cyan-500"
    if (celsius < 15) return "from-cyan-400 to-blue-400"
    if (celsius < 25) return "from-green-400 to-emerald-500"
    if (celsius < 35) return "from-yellow-400 to-orange-500"
    return "from-orange-500 to-red-600"
  }

  const getTemperatureLabel = (celsius: number) => {
    if (celsius < 0) return "Donma"
    if (celsius < 10) return "Çok Soğuk"
    if (celsius < 18) return "Soğuk"
    if (celsius < 25) return "Ilık"
    if (celsius < 30) return "Sıcak"
    if (celsius < 40) return "Çok Sıcak"
    return "Aşırı Sıcak"
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Home Button */}
      <Link href="/">
        <Button 
          variant="outline" 
          className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:border-rose-300 hover:bg-rose-50"
        >
          <Home className="h-4 w-4 text-rose-600 group-hover:-translate-x-1 transition-transform" />
          <span className="text-rose-900 font-medium">Ana Sayfaya Dön</span>
        </Button>
      </Link>

      {/* Main Calculator Card */}
      <Card className="border-2 border-rose-100 shadow-xl shadow-rose-500/10">
        <CardContent className="pt-8 pb-8 px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg mb-4">
              <Thermometer className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Sıcaklık Dönüştürücü
            </h1>
            <p className="text-slate-600">Sıcaklık birimlerini hızlıca dönüştürün</p>
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
                  className="h-auto py-3 hover:bg-rose-50 hover:border-rose-300 transition-all"
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
                <Thermometer className="h-4 w-4 text-rose-600" />
                Dönüştürülecek Değer
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="Değer girin"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              />
              <Select
                value={fromUnitIndex.toString()}
                onValueChange={(value) => setFromUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-rose-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temperatureUnits.map((unit, index) => (
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
                className="h-12 w-12 rounded-full border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 hover:rotate-180 transition-all duration-300"
              >
                <ArrowLeftRight className="h-5 w-5 text-rose-600" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Thermometer className="h-4 w-4 text-pink-600" />
                Sonuç
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="Sonuç"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                className="h-14 text-lg border-2 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 bg-gradient-to-r from-white to-pink-50/30"
              />
              <Select
                value={toUnitIndex.toString()}
                onValueChange={(value) => setToUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 border-2 focus:border-pink-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temperatureUnits.map((unit, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visual Thermometer */}
          {fromValue && toValue && (() => {
            const celsius = fromUnit.toCelsius(parseFloat(fromValue))
            const tempColor = getTemperatureColor(celsius)
            const tempLabel = getTemperatureLabel(celsius)
            const percentage = Math.max(0, Math.min(100, ((celsius + 20) / 70) * 100))

            return (
              <div className="relative overflow-hidden rounded-2xl border-2 border-rose-200 p-6 bg-gradient-to-br from-rose-50 to-pink-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        {fromValue}
                      </span>
                      <span className="text-xl font-semibold text-rose-600">{fromUnit.symbol}</span>
                    </div>
                    <ArrowLeftRight className="h-6 w-6 text-rose-600" />
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        {toValue}
                      </span>
                      <span className="text-xl font-semibold text-pink-600">{toUnit.symbol}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${tempColor} text-white font-semibold text-sm shadow-lg`}>
                      {tempLabel}
                    </span>
                  </div>
                </div>

                {/* Thermometer Visualization */}
                <div className="flex items-end justify-center gap-8 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-64 bg-white rounded-full border-4 border-slate-300 overflow-hidden">
                      <div 
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${tempColor} transition-all duration-700`}
                        style={{ height: `${percentage}%` }}
                      ></div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">50°C</div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-slate-600">25°C</div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">-20°C</div>
                    </div>
                    <div className="mt-4 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-white shadow-lg"></div>
                    <span className="mt-2 text-sm font-semibold text-slate-600">Sıcaklık</span>
                  </div>
                  
                  <div className="text-left space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-red-600"></div>
                      <span className="text-sm text-slate-600">40°C+ : Çok Sıcak</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500"></div>
                      <span className="text-sm text-slate-600">25-40°C : Sıcak</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-500"></div>
                      <span className="text-sm text-slate-600">15-25°C : Ilık</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-400"></div>
                      <span className="text-sm text-slate-600">0-15°C : Soğuk</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                      <span className="text-sm text-slate-600">0°C- : Donma</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </CardContent>
      </Card>

      {/* Educational Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* How to Use */}
        <Card className="border-2 border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Dönüştürmek istediğiniz sıcaklığı girin</li>
                  <li>Kaynak birimini seçin (Celsius, Fahrenheit, Kelvin)</li>
                  <li>Hedef birimini seçin</li>
                  <li>Sonuç otomatik hesaplanır ve termometre gösterilir</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="border-2 border-pink-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Örnek Kullanımlar</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Hava Durumu:</strong> 25°C → 77°F (yaz günü)</li>
                  <li><strong>Yemek:</strong> 180°C → 356°F (fırın sıcaklığı)</li>
                  <li><strong>Vücut:</strong> 37°C → 98.6°F (normal ateş)</li>
                  <li><strong>Bilim:</strong> -273.15°C → 0 K (mutlak sıfır)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-2 border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Önemli Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><strong>Su Donma:</strong> 0°C = 32°F = 273.15 K</li>
                  <li><strong>Su Kaynama:</strong> 100°C = 212°F = 373.15 K</li>
                  <li><strong>Mutlak Sıfır:</strong> -273.15°C = -459.67°F = 0 K</li>
                  <li><strong>Dönüşüm:</strong> °F = (°C × 9/5) + 32</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-2 border-pink-100 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Info className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">İlginç Bilgiler</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>🌡️ Fahrenheit, 1724'te Daniel Fahrenheit tarafından geliştirildi</li>
                  <li>❄️ En soğuk doğal sıcaklık: -89.2°C (Antarktika)</li>
                  <li>🔥 En sıcak doğal sıcaklık: 56.7°C (Death Valley)</li>
                  <li>🌌 Güneşin çekirdeği: ~15 milyon °C</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
