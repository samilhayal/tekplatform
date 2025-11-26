"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Percent, Home, BookOpen, Lightbulb, AlertCircle, Info, PieChart, BarChart3, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface ComparisonItem {
  name: string
  value: string
}

const RatioCalculator = () => {
  const [val1, setVal1] = useState("")
  const [val2, setVal2] = useState("")
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([])
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const v1 = parseFloat(val1)
    const v2 = parseFloat(val2)
    if (isNaN(v1) || isNaN(v2) || v2 === 0) return
    
    const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b)
    const divisor = gcd(Math.abs(v1), Math.abs(v2))
    const ratio1 = v1 / divisor
    const ratio2 = v2 / divisor
    const decimal = v1 / v2
    const percentage1 = (v1 / (v1 + v2)) * 100
    const percentage2 = (v2 / (v1 + v2)) * 100

    // Karşılaştırma verileri
    const comparisons = comparisonItems
      .filter(item => item.name && item.value && !isNaN(parseFloat(item.value)))
      .map(item => {
        const value = parseFloat(item.value)
        const total = comparisonItems
          .filter(i => i.value && !isNaN(parseFloat(i.value)))
          .reduce((sum, i) => sum + parseFloat(i.value), 0)
        return {
          name: item.name,
          value,
          percentage: (value / total) * 100,
          ratio: value / v2
        }
      })

    setResult({ 
      ratio1, 
      ratio2, 
      decimal, 
      percentage1, 
      percentage2,
      v1,
      v2,
      comparisons
    })
  }

  const addComparisonItem = () => {
    setComparisonItems([...comparisonItems, { name: "", value: "" }])
  }

  const removeComparisonItem = (index: number) => {
    setComparisonItems(comparisonItems.filter((_, i) => i !== index))
  }

  const updateComparisonItem = (index: number, field: keyof ComparisonItem, value: string) => {
    const newItems = [...comparisonItems]
    newItems[index][field] = value
    setComparisonItems(newItems)
  }

  const quickRatios = [
    { label: "16:9", v1: 16, v2: 9 },
    { label: "4:3", v1: 4, v2: 3 },
    { label: "21:9", v1: 21, v2: 9 },
    { label: "1:1", v1: 1, v2: 1 },
    { label: "3:2", v1: 3, v2: 2 },
    { label: "2:1", v1: 2, v2: 1 }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-pink-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg mb-4">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Oran Hesaplayıcı
            </h2>
            <p className="text-slate-600">Oran, yüzde ve karşılaştırmalı analiz</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Değer 1 (A)</label>
              <Input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="h-14" placeholder="16" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Değer 2 (B)</label>
              <Input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="h-14" placeholder="9" />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Oranlar</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {quickRatios.map((ratio, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  onClick={() => {
                    setVal1(ratio.v1.toString())
                    setVal2(ratio.v2.toString())
                  }}
                  className="h-10 border-2 border-pink-200 hover:bg-pink-50"
                >
                  {ratio.label}
                </Button>
              ))}
            </div>
          </div>

          {comparisonItems.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Karşılaştırma Öğeleri (Opsiyonel)</label>
              <div className="space-y-3">
                {comparisonItems.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center p-3 rounded-xl bg-slate-50 border-2 border-slate-200">
                    <Input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateComparisonItem(index, 'name', e.target.value)}
                      className="h-12 flex-1"
                      placeholder="Öğe adı"
                    />
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateComparisonItem(index, 'value', e.target.value)}
                      className="h-12 w-32"
                      placeholder="Değer"
                    />
                    <Button
                      onClick={() => removeComparisonItem(index)}
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-8">
            <Button onClick={addComparisonItem} variant="outline" className="flex-1 h-12 border-2 border-pink-200 hover:bg-pink-50">
              <Plus className="mr-2 h-5 w-5" /> Karşılaştırma Ekle
            </Button>
            <Button onClick={calculate} className="flex-1 h-14 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
              <Percent className="mr-2" /> Hesapla ve Görselleştir
            </Button>
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Temel Sonuçlar */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Basitleştirilmiş Oran</p>
                  <p className="text-3xl font-bold text-pink-600">{result.ratio1}:{result.ratio2}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">Ondalık Değer</p>
                  <p className="text-3xl font-bold text-rose-600">{result.decimal.toFixed(4)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">A'nın Yüzdesi</p>
                  <p className="text-3xl font-bold text-purple-600">{result.percentage1.toFixed(1)}%</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-purple-50 border-2 border-fuchsia-200 text-center">
                  <p className="text-xs text-slate-600 mb-2">B'nin Yüzdesi</p>
                  <p className="text-3xl font-bold text-fuchsia-600">{result.percentage2.toFixed(1)}%</p>
                </div>
              </div>

              {/* Görsel Oran Gösterimi - Pie Chart */}
              <Card className="border-2 border-pink-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <PieChart className="h-6 w-6 text-pink-600" />
                    <h3 className="text-lg font-bold text-slate-800">Görsel Oran Dağılımı</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Basit Pasta Grafiği */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-56 h-56">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                          {/* A Değeri */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="20"
                            strokeDasharray={`${result.percentage1 * 2.51} 251`}
                            className="transition-all duration-1000"
                          />
                          {/* B Değeri */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="20"
                            strokeDasharray={`${result.percentage2 * 2.51} 251`}
                            strokeDashoffset={`${-result.percentage1 * 2.51}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-pink-600">{result.ratio1}:{result.ratio2}</p>
                            <p className="text-xs text-slate-600 mt-1">Oran</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 w-full">
                        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                            <span className="text-sm font-semibold text-slate-700">Değer A</span>
                          </div>
                          <span className="font-bold text-pink-600">{result.percentage1.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-200">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                            <span className="text-sm font-semibold text-slate-700">Değer B</span>
                          </div>
                          <span className="font-bold text-rose-600">{result.percentage2.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Bar Karşılaştırma */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                          <span>Değer A</span>
                          <span>{result.v1}</span>
                        </div>
                        <div className="h-12 bg-slate-100 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-end pr-3 transition-all duration-1000"
                            style={{ width: `${result.percentage1}%` }}
                          >
                            <span className="text-xs font-semibold text-white">{result.percentage1.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                          <span>Değer B</span>
                          <span>{result.v2}</span>
                        </div>
                        <div className="h-12 bg-slate-100 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-end pr-3 transition-all duration-1000"
                            style={{ width: `${result.percentage2}%` }}
                          >
                            <span className="text-xs font-semibold text-white">{result.percentage2.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                        <p className="text-sm text-slate-700">
                          <strong>Oran Yorumu:</strong> A değeri, B değerinin 
                          <strong className="text-pink-600"> {result.decimal.toFixed(2)} katıdır</strong>.
                          Toplam içinde A <strong className="text-pink-600">%{result.percentage1.toFixed(1)}</strong>, 
                          B ise <strong className="text-rose-600">%{result.percentage2.toFixed(1)}</strong> oluşturur.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Karşılaştırmalı Analiz */}
              {result.comparisons && result.comparisons.length > 0 && (
                <Card className="border-2 border-purple-100/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-bold text-slate-800">Çoklu Öğe Karşılaştırması</h3>
                    </div>

                    <div className="space-y-4">
                      {result.comparisons.map((comp: any, i: number) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-700">{comp.name}</span>
                            <span className="text-slate-600">
                              Değer: <strong>{comp.value}</strong> | 
                              Yüzde: <strong className="text-purple-600">{comp.percentage.toFixed(1)}%</strong> | 
                              B'ye Oranı: <strong className="text-pink-600">{comp.ratio.toFixed(2)}</strong>
                            </span>
                          </div>
                          <div className="h-10 bg-slate-100 rounded-lg overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-end pr-3 transition-all duration-700"
                              style={{ width: `${comp.percentage}%` }}
                            >
                              <span className="text-xs font-semibold text-white">{comp.percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-pink-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-pink-50">
              <BookOpen className="h-6 w-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>İki Değer:</strong> Oranını bulmak istediğiniz A ve B değerlerini girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Hızlı Oranlar:</strong> Yaygın oranları (16:9, 4:3, vb.) tek tıkla seçin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Karşılaştırma:</strong> İsterseniz ek öğeler ekleyerek çoklu karşılaştırma yapın.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Grafikler:</strong> Pasta ve bar grafikleri ile görsel analiz yapın.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-pink-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-pink-50">
              <Lightbulb className="h-6 w-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Oran hesaplamalarının gerçek hayat örnekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">🖥️</div>
                <h4 className="font-bold text-slate-800">Ekran Oranları</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">1920 × 1080 çözünürlük</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Oran:</span>
                  <span className="font-semibold text-pink-600">16:9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ondalık:</span>
                  <span className="font-semibold text-rose-600">1.7778</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kullanım:</span>
                  <span className="font-semibold text-purple-600">Full HD TV/Monitor</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">🧪</div>
                <h4 className="font-bold text-slate-800">Karışım Oranları</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Boya karışımı: 3 kısım mavi, 2 kısım sarı</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Oran:</span>
                  <span className="font-semibold text-pink-600">3:2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Mavi Yüzdesi:</span>
                  <span className="font-semibold text-rose-600">%60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sarı Yüzdesi:</span>
                  <span className="font-semibold text-purple-600">%40</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">👥</div>
                <h4 className="font-bold text-slate-800">Cinsiyet Oranı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Sınıfta 12 kız, 18 erkek öğrenci</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Oran:</span>
                  <span className="font-semibold text-pink-600">2:3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kız Öğrenci:</span>
                  <span className="font-semibold text-rose-600">%40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Erkek Öğrenci:</span>
                  <span className="font-semibold text-purple-600">%60</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">📐</div>
                <h4 className="font-bold text-slate-800">Altın Oran</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">1.618 : 1 (Phi - Φ)</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Yaklaşık Oran:</span>
                  <span className="font-semibold text-pink-600">8:5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kullanım:</span>
                  <span className="font-semibold text-rose-600">Sanat, mimari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Örnek:</span>
                  <span className="font-semibold text-purple-600">Fibonacci dizisi</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-pink-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-rose-50">
              <AlertCircle className="h-6 w-6 text-rose-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Oran hesaplamaları hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-pink-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Oran Nedir?</h4>
              <p className="text-sm text-slate-600">
                Oran, iki sayının birbirine olan matematiksel ilişkisidir. A:B oranı, 
                "A'nın B'ye oranı" anlamına gelir. 4:2 oranı 2:1 ile aynıdır (basitleştirme).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-pink-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Basitleştirme</h4>
              <p className="text-sm text-slate-600">
                Oranlar en küçük tam sayılara indirgenir. 16:24 → 2:3 (her iki tarafı 8'e böl).
                En Büyük Ortak Bölen (EBOB) kullanılarak basitleştirilir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-pink-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚖️ Oran vs Yüzde</h4>
              <p className="text-sm text-slate-600">
                3:2 oranı → 3 toplam 5'in %60'ı, 2 ise %40'ıdır. 
                Yüzde her zaman 100 üzerinden, oran ise herhangi iki sayı arasındadır.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-pink-500">
              <h4 className="font-semibold text-slate-800 mb-2">🔄 Oran Ölçekleme</h4>
              <p className="text-sm text-slate-600">
                4:3 oranını koruyarak büyütme: 4×2:3×2 = 8:6 (oran aynı kalır).
                Tarif oranları, harita ölçekleri bu prensibi kullanır.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-pink-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Oranların tarihi ve gerçek dünya uygulamaları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Altın Oran (Phi)
              </h4>
              <p className="text-sm text-slate-600">
                1.618:1 oranı, Parthenon'dan Mona Lisa'ya kadar sanat ve mimaride kullanılır.
                Doğada: nautilus kabukları, ayçiçeği spiral dizilimi, insan vücudu oranları!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                Müzik Oranları
              </h4>
              <p className="text-sm text-slate-600">
                Müzikte oktav 2:1, beşli 3:2, dörtlü 4:3 oranlarıdır. 
                Pisagor bu oranları keşfetti ve müzik teorisinin temelini attı!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎬</span>
                Sinema Oranları
              </h4>
              <p className="text-sm text-slate-600">
                21:9 ultra-wide (sinematik), 16:9 (HDTV), 4:3 (eski TV), 
                2.39:1 (anamorfik geniş ekran). Her oran farklı bir "his" verir!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏗️</span>
                Mühendislik Oranları
              </h4>
              <p className="text-sm text-slate-600">
                Beton karışımı: çimento:kum:çakıl = 1:2:4 oranı standarttır.
                Kağıt boyutları: A4'ün boy/en oranı √2:1 (1.414:1) - katlandığında oran korunur!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RatioCalculator }
