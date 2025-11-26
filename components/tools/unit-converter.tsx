"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeftRight, Ruler, Weight, Thermometer, Zap, Droplet, Clock, Sparkles } from "lucide-react"
import { unitCategories, convertUnit } from "@/lib/unit-conversions"

const categoryIcons: Record<string, any> = {
  length: Ruler,
  weight: Weight,
  temperature: Thermometer,
  speed: Zap,
  volume: Droplet,
  time: Clock,
}

export function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnitIndex, setFromUnitIndex] = useState(0)
  const [toUnitIndex, setToUnitIndex] = useState(1)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const currentCategory = unitCategories[category]
  const fromUnit = currentCategory.units[fromUnitIndex]
  const toUnit = currentCategory.units[toUnitIndex]
  const CategoryIcon = categoryIcons[category] || Ruler

  useEffect(() => {
    setFromUnitIndex(0)
    setToUnitIndex(1)
    setFromValue("")
    setToValue("")
  }, [category])

  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const result = convertUnit(parseFloat(fromValue), fromUnit, toUnit)
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
      const result = convertUnit(parseFloat(value), toUnit, fromUnit)
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

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="border-2 border-indigo-100/50 shadow-xl shadow-indigo-500/10 backdrop-blur-sm bg-white/80">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 mb-4">
              <CategoryIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Birim Dönüştürücü
            </h2>
            <p className="text-slate-600">Farklı birimler arasında hızlı dönüşüm yapın</p>
          </div>

          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Kategori Seçin
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(unitCategories).map(([key, cat]) => {
                const Icon = categoryIcons[key] || Ruler
                return (
                  <Button
                    key={key}
                    variant={category === key ? "default" : "outline"}
                    onClick={() => setCategory(key)}
                    className={cn(
                      "h-auto py-4 px-3 flex flex-col items-center gap-2 transition-all duration-200 group",
                      category === key
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 scale-105"
                        : "hover:border-indigo-300 hover:shadow-md hover:scale-105"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      category === key ? "text-white" : "text-slate-600"
                    )} />
                    <span className={cn(
                      "text-xs font-semibold",
                      category === key ? "text-white" : "text-slate-700"
                    )}>{cat.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Conversion Area */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-8">
            {/* From Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Dönüştürülecek Değer
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Değer girin"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all rounded-xl"
                />
                <CategoryIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Select
                value={fromUnitIndex.toString()}
                onValueChange={(value) => setFromUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 text-base border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 rounded-xl transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {currentCategory.units.map((unit, index) => (
                    <SelectItem 
                      key={index} 
                      value={index.toString()}
                      className="cursor-pointer hover:bg-indigo-50 rounded-lg"
                    >
                      <span className="font-medium">{unit.name}</span>
                      <span className="text-slate-500 ml-2">({unit.symbol})</span>
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
                className="h-14 w-14 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 hover:scale-110 hover:rotate-180 transition-all duration-300 shadow-lg shadow-indigo-500/20 group"
              >
                <ArrowLeftRight className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-purple-600" />
                Sonuç
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Sonuç"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  className="h-16 text-lg pl-12 border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all rounded-xl bg-gradient-to-r from-white to-purple-50/30"
                />
                <CategoryIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <Select
                value={toUnitIndex.toString()}
                onValueChange={(value) => setToUnitIndex(parseInt(value))}
              >
                <SelectTrigger className="h-12 text-base border-2 border-slate-200 hover:border-purple-300 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 rounded-xl transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {currentCategory.units.map((unit, index) => (
                    <SelectItem 
                      key={index} 
                      value={index.toString()}
                      className="cursor-pointer hover:bg-purple-50 rounded-lg"
                    >
                      <span className="font-medium">{unit.name}</span>
                      <span className="text-slate-500 ml-2">({unit.symbol})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result Display */}
          {fromValue && toValue && (
            <div className="relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-40"></div>
              
              {/* Content */}
              <div className="relative border-2 border-indigo-200 rounded-2xl p-8 shadow-xl text-center">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {fromValue}
                    </span>
                    <span className="text-xl font-semibold text-indigo-600">{fromUnit.symbol}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <ArrowLeftRight className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {toValue}
                    </span>
                    <span className="text-xl font-semibold text-purple-600">{toUnit.symbol}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  <span className="font-medium">{fromUnit.name}</span>
                  {' → '}
                  <span className="font-medium">{toUnit.name}</span>
                </p>
              </div>
            </div>
          )}

          {/* Info Tip */}
          {!fromValue && (
            <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-indigo-900 mb-1">İpucu</p>
                  <p>Bir kategori seçin, dönüştürmek istediğiniz değeri girin ve birimleri seçin. Sonuç otomatik hesaplanır!</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
