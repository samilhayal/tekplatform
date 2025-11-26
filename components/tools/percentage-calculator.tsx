"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Percent, Hash, TrendingUp, TrendingDown, Calculator, Sparkles, Home, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"
import Link from "next/link"
import { 
  calculatePercentage, 
  percentageOf, 
  percentageIncrease, 
  percentageDecrease,
  formatNumber
} from "@/lib/calculations"

export function PercentageCalculator() {
  const [number1, setNumber1] = useState("")
  const [percentage1, setPercentage1] = useState("")
  const [result1, setResult1] = useState<number | null>(null)
  const [activeCalculation, setActiveCalculation] = useState<string | null>(null)

  const handlePercentageCalculate = (type: string) => {
    const num = parseFloat(number1)
    const perc = parseFloat(percentage1)
    
    if (isNaN(num) || isNaN(perc)) return
    
    let result = 0
    switch (type) {
      case "of":
        result = calculatePercentage(num, perc)
        break
      case "is":
        result = percentageOf(num, perc)
        break
      case "increase":
        result = percentageIncrease(num, perc)
        break
      case "decrease":
        result = percentageDecrease(num, perc)
        break
    }
    setResult1(result)
    setActiveCalculation(type)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getResultLabel = () => {
    switch (activeCalculation) {
      case "of":
        return `${number1} sayısının %${percentage1}'si`
      case "is":
        return `${number1}, ${percentage1} sayısının yüzdesi`
      case "increase":
        return `${number1} sayısının %${percentage1} artışı`
      case "decrease":
        return `${number1} sayısının %${percentage1} azalışı`
      default:
        return "Sonuç"
    }
  }

  const getResultIcon = () => {
    switch (activeCalculation) {
      case "increase":
        return <TrendingUp className="h-8 w-8 text-green-600" />
      case "decrease":
        return <TrendingDown className="h-8 w-8 text-red-600" />
      case "of":
        return <Percent className="h-8 w-8 text-indigo-600" />
      case "is":
        return <Calculator className="h-8 w-8 text-purple-600" />
      default:
        return <Sparkles className="h-8 w-8 text-indigo-600" />
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="relative">
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
                <Percent className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Yüzde Hesaplayıcı
              </h2>
              <p className="text-slate-600">Hızlı ve kolay yüzde hesaplamaları yapın</p>
            </div>

            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Hash className="h-4 w-4 text-indigo-600" />
                  Sayı
                </label>
                <div className="relative group">
                  <Input
                    type="number"
                    placeholder="Sayı girin"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all rounded-xl"
                  />
                  <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Percent className="h-4 w-4 text-purple-600" />
                  Yüzde
                </label>
                <div className="relative group">
                  <Input
                    type="number"
                    placeholder="Yüzde girin"
                    value={percentage1}
                    onChange={(e) => setPercentage1(e.target.value)}
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all rounded-xl"
                  />
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <Button 
                onClick={() => handlePercentageCalculate("of")}
                className="h-auto py-4 px-4 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 rounded-xl group"
              >
                <div className="flex flex-col items-center gap-1">
                  <Percent className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold">%'si Kaçtır</span>
                </div>
              </Button>
              <Button 
                onClick={() => handlePercentageCalculate("is")}
                className="h-auto py-4 px-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200 rounded-xl group"
              >
                <div className="flex flex-col items-center gap-1">
                  <Calculator className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold">Yüzde Kaçıdır</span>
                </div>
              </Button>
              <Button 
                onClick={() => handlePercentageCalculate("increase")}
                className="h-auto py-4 px-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-200 rounded-xl group"
              >
                <div className="flex flex-col items-center gap-1">
                  <TrendingUp className="h-5 w-5 group-hover:translate-y-[-4px] transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold">% Artış</span>
                </div>
              </Button>
              <Button 
                onClick={() => handlePercentageCalculate("decrease")}
                className="h-auto py-4 px-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 transition-all duration-200 rounded-xl group"
              >
                <div className="flex flex-col items-center gap-1">
                  <TrendingDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold">% Azalış</span>
                </div>
              </Button>
            </div>

            {/* Result Display */}
            {result1 !== null && (
              <div className="space-y-6">
                <div className="relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-40"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-2xl opacity-40"></div>
                  
                  {/* Content */}
                  <div className="relative border-2 border-indigo-200 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {getResultIcon()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-600 mb-2">{getResultLabel()}</p>
                        <div className="flex items-baseline gap-3">
                          <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {formatNumber(result1)}
                          </p>
                          {activeCalculation === "is" && (
                            <span className="text-2xl font-bold text-slate-400">%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6 pt-6 border-t border-indigo-200/50">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard(formatNumber(result1))}
                        className="bg-white hover:bg-indigo-50 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Sonucu Kopyala
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setNumber1("")
                          setPercentage1("")
                          setResult1(null)
                          setActiveCalculation(null)
                        }}
                        className="hover:bg-slate-50"
                      >
                        Yeni Hesaplama
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="relative overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
                    <CardContent className="pt-6 pb-6 px-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Görsel Gösterim
                      </h3>
                      
                      {activeCalculation === "of" && (
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-slate-700">Toplam: {number1}</span>
                              <span className="text-sm font-semibold text-indigo-600">%{percentage1} = {formatNumber(result1)}</span>
                            </div>
                            <div className="h-12 bg-slate-200 rounded-xl overflow-hidden relative shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-4 shadow-lg"
                                style={{ width: `${Math.min(parseFloat(percentage1), 100)}%` }}
                              >
                                <span className="text-white font-bold text-sm drop-shadow-lg">%{percentage1}</span>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-500">
                              <span>0</span>
                              <span>{number1}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCalculation === "is" && (
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-slate-700">{number1} / {percentage1}</span>
                              <span className="text-sm font-semibold text-purple-600">%{formatNumber(result1)}</span>
                            </div>
                            <div className="h-12 bg-slate-200 rounded-xl overflow-hidden relative shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-4 shadow-lg"
                                style={{ width: `${Math.min(result1, 100)}%` }}
                              >
                                <span className="text-white font-bold text-sm drop-shadow-lg">%{formatNumber(result1)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-slate-500">
                              <span>%0</span>
                              <span>%100</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCalculation === "increase" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-slate-100 rounded-xl">
                              <div className="text-sm text-slate-600 mb-1">Başlangıç</div>
                              <div className="text-2xl font-bold text-slate-800">{number1}</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border-2 border-green-300">
                              <div className="text-sm text-green-700 mb-1">%{percentage1} Artış Sonrası</div>
                              <div className="text-2xl font-bold text-green-700">{formatNumber(result1)}</div>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full w-full bg-slate-400 rounded-full"></div>
                            </div>
                            <div className="h-3 bg-green-200 rounded-full overflow-hidden mt-2">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                                style={{ width: `${(result1 / parseFloat(number1)) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 justify-center">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-semibold text-green-700">
                                +{formatNumber(result1 - parseFloat(number1))} artış
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeCalculation === "decrease" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-slate-100 rounded-xl">
                              <div className="text-sm text-slate-600 mb-1">Başlangıç</div>
                              <div className="text-2xl font-bold text-slate-800">{number1}</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-xl border-2 border-red-300">
                              <div className="text-sm text-red-700 mb-1">%{percentage1} Azalış Sonrası</div>
                              <div className="text-2xl font-bold text-red-700">{formatNumber(result1)}</div>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-3 bg-red-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                                style={{ width: `${(result1 / parseFloat(number1)) * 100}%` }}
                              ></div>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden mt-2">
                              <div className="h-full w-full bg-slate-400 rounded-full"></div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 justify-center">
                              <TrendingDown className="h-5 w-5 text-red-600" />
                              <span className="text-sm font-semibold text-red-700">
                                -{formatNumber(parseFloat(number1) - result1)} azalış
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Info Tip */}
            {!result1 && (
              <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700">
                    <p className="font-semibold text-indigo-900 mb-1">İpucu</p>
                    <p>Yukarıdaki alanlara sayıları girin ve yapmak istediğiniz işlem için butona tıklayın. Sonuç anında hesaplanacaktır!</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-indigo-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-50">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Sayı ve Yüzde:</strong> İlk iki alana sayınızı ve yüzde değerini girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>İşlem Seçin:</strong> Yapmak istediğiniz hesaplama türünü butona tıklayarak seçin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>%'si Kaçtır:</strong> Bir sayının belirli bir yüzdesini hesaplar (örn: 200'ün %25'i = 50)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Yüzde Kaçıdır:</strong> Bir sayının başka bir sayının yüzde kaçı olduğunu bulur (örn: 50, 200'ün %25'i)</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-indigo-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-purple-50">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Günlük hayatta yüzde hesaplamaları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">🏷️</div>
                <h4 className="font-bold text-slate-800">İndirim Hesaplama</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">500 TL'lik ürüne %30 indirim yapılırsa ne kadar olur?</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">İndirim Tutarı:</span>
                  <span className="font-semibold text-indigo-600">₺150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Fiyat:</span>
                  <span className="font-semibold text-green-600">₺350</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">📈</div>
                <h4 className="font-bold text-slate-800">Zam Hesaplama</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">20.000 TL maaşa %15 zam yapılırsa ne olur?</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Zam Tutarı:</span>
                  <span className="font-semibold text-indigo-600">₺3.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Maaş:</span>
                  <span className="font-semibold text-green-600">₺23.000</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">🎓</div>
                <h4 className="font-bold text-slate-800">Not Hesaplama</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">100 soruluk sınavda 85 doğru yapıldı. Başarı yüzdesi?</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Başarı Oranı:</span>
                  <span className="font-semibold text-indigo-600">%85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Durum:</span>
                  <span className="font-semibold text-green-600">Geçti ✓</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">💰</div>
                <h4 className="font-bold text-slate-800">KDV Hesaplama</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">1.000 TL'lik ürüne %20 KDV eklenirse?</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">KDV Tutarı:</span>
                  <span className="font-semibold text-indigo-600">₺200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam Fiyat:</span>
                  <span className="font-semibold text-red-600">₺1.200</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-indigo-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Yüzde hesaplamaları hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-indigo-500">
              <h4 className="font-semibold text-slate-800 mb-2">📐 Yüzde Formülleri</h4>
              <p className="text-sm text-slate-600">
                <strong>%'si Kaçtır:</strong> <code className="px-2 py-1 bg-white rounded text-indigo-600">(Sayı × Yüzde) ÷ 100</code><br/>
                <strong>Yüzde Kaçıdır:</strong> <code className="px-2 py-1 bg-white rounded text-indigo-600">(Bölünen ÷ Bölen) × 100</code><br/>
                <strong>Artış/Azalış:</strong> <code className="px-2 py-1 bg-white rounded text-indigo-600">Sayı ± (Sayı × Yüzde ÷ 100)</code>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-indigo-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚠️ Sıralı Yüzde Değişimleri</h4>
              <p className="text-sm text-slate-600">
                100 TL'ye %50 zam sonra %50 indirim = 75 TL olur (100 TL değil!).
                Çünkü ilk %50 zam 150 TL yapar, sonra 150'nin %50'si 75 TL düşüş demektir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-indigo-500">
              <h4 className="font-semibold text-slate-800 mb-2">💡 Yüzde vs Yüzde Puan</h4>
              <p className="text-sm text-slate-600">
                %20'den %25'e çıkmak "5 yüzde puan artış" ama "%25 artış" DEĞİL.
                %20'nin %25 artışı = %25 olur (20 × 1,25 = 25). Dikkat edin!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-indigo-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Ters Hesaplama</h4>
              <p className="text-sm text-slate-600">
                KDV dahil 120 TL ise, KDV hariç fiyat 100 TL değil, 96 TL'dir!
                Çünkü 120 ÷ 1,25 (yani %25 KDV için) = 96 TL. Dikkatli olun!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-indigo-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Yüzde hesaplamalarının tarihi ve ilginç gerçekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Yüzdenin Kökeni
              </h4>
              <p className="text-sm text-slate-600">
                "Yüzde" (percent) Latince "per centum"dan gelir - "yüzden" anlamına gelir.
                Roma döneminde vergiler genellikle yüzde cinsinden ifade edilirdi.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">% </span>
                Sembolün Hikayesi
              </h4>
              <p className="text-sm text-slate-600">
                % sembolü 15. yüzyılda İtalyan tüccarlar tarafından "per 100" yazısının 
                stilize edilmiş hali olarak ortaya çıktı. 0/0 → % evrimini gösterir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎲</span>
                İlginç Matematik
              </h4>
              <p className="text-sm text-slate-600">
                A'nın %B'si = B'nin %A'sıdır! Örnek: 8'in %50'si = 50'nin %8'i = 4.
                Bu simetri, çarpmanın değişme özelliğinden gelir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                Günlük Yaşam
              </h4>
              <p className="text-sm text-slate-600">
                Ortalama bir kişi günde 10-15 kez yüzde hesaplaması yapar! 
                İndirimler, vergiler, bahşişler, batarya durumu... Hepsi yüzde!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
