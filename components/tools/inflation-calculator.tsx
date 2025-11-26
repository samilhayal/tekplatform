"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, Hash, Home, BookOpen, Lightbulb, AlertCircle, Info, LineChart, TrendingDown } from "lucide-react"
import Link from "next/link"

export function InflationCalculator() {
  const [startValue, setStartValue] = useState("")
  const [inflationRate, setInflationRate] = useState("")
  const [years, setYears] = useState("")
  const [compareYears, setCompareYears] = useState<string[]>([""])
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const start = parseFloat(startValue)
    const rate = parseFloat(inflationRate) / 100
    const y = parseFloat(years)
    if (isNaN(start) || isNaN(rate) || isNaN(y) || start <= 0 || y <= 0) return

    // Ana hesaplama
    const futureValue = start * Math.pow(1 + rate, y)
    const totalIncrease = futureValue - start
    const purchasingPower = (start / futureValue) * 100

    // Yıllık detay
    const yearlyData = []
    for (let i = 0; i <= y; i++) {
      const value = start * Math.pow(1 + rate, i)
      const power = (start / value) * 100
      yearlyData.push({
        year: i,
        value,
        purchasingPower: power
      })
    }

    // Karşılaştırmalı yıllar
    const comparisonData = compareYears
      .map(cy => parseFloat(cy))
      .filter(cy => !isNaN(cy) && cy > 0)
      .map(cy => {
        const value = start * Math.pow(1 + rate, cy)
        const increase = value - start
        const power = (start / value) * 100
        return { years: cy, value, increase, power }
      })

    setResult({ 
      futureValue, 
      totalIncrease, 
      purchasingPower, 
      years: y, 
      rate: inflationRate,
      yearlyData,
      comparisonData
    })
  }

  const quickRates = [5, 10, 15, 20, 25, 30, 40, 50]

  const addComparisonYear = () => {
    if (compareYears.length < 5) {
      setCompareYears([...compareYears, ""])
    }
  }

  const updateComparisonYear = (index: number, value: string) => {
    const newYears = [...compareYears]
    newYears[index] = value
    setCompareYears(newYears)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-orange-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Enflasyon Hesaplayıcı
            </h2>
            <p className="text-slate-600">Çok yıllı karşılaştırma ve grafik gösterimi</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Başlangıç Değeri (₺)</label>
              <Input type="number" value={startValue} onChange={(e) => setStartValue(e.target.value)} className="h-14" placeholder="10000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Yıllık Enflasyon (%)</label>
              <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="h-14" placeholder="15" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Ana Süre (Yıl)</label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-14" placeholder="5" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Karşılaştırma Yapılacak Yıllar (Opsiyonel)</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {compareYears.map((year, index) => (
                <Input 
                  key={index}
                  type="number" 
                  value={year} 
                  onChange={(e) => updateComparisonYear(index, e.target.value)} 
                  className="h-12" 
                  placeholder={`${index + 1}. yıl`}
                />
              ))}
              {compareYears.length < 5 && (
                <Button onClick={addComparisonYear} variant="outline" className="h-12 border-2 border-orange-200 hover:bg-orange-50">
                  + Yıl Ekle
                </Button>
              )}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-3">Yaygın Enflasyon Oranları</p>
            <div className="flex flex-wrap gap-2">
              {quickRates.map(rate => (
                <Button key={rate} variant="outline" onClick={() => setInflationRate(rate.toString())}
                  className="h-10 px-4 border-2 border-orange-200 hover:bg-orange-50">
                  %{rate}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
            <LineChart className="mr-2" /> Hesapla ve Grafik Göster
          </Button>

          {result && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Ana Sonuçlar */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 text-center">
                  <Hash className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Gelecek Değer ({result.years} yıl)</p>
                  <p className="text-3xl font-bold text-orange-600">₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Artış</p>
                  <p className="text-3xl font-bold text-red-600">₺{result.totalIncrease.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 text-center">
                  <TrendingDown className="h-8 w-8 mx-auto text-rose-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Satın Alma Gücü</p>
                  <p className="text-3xl font-bold text-rose-600">%{result.purchasingPower.toFixed(2)}</p>
                </div>
              </div>

              {/* Grafik Gösterimi - Line Chart */}
              <Card className="border-2 border-orange-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="h-6 w-6 text-orange-600" />
                    <h3 className="text-lg font-bold text-slate-800">Değer Değişim Grafiği</h3>
                  </div>
                  
                  <div className="relative h-80 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200">
                    <svg className="w-full h-full" viewBox="0 0 800 300">
                      {/* Grid Lines */}
                      {[0, 1, 2, 3, 4].map(i => (
                        <line 
                          key={`grid-${i}`}
                          x1="50" 
                          y1={50 + i * 60} 
                          x2="750" 
                          y2={50 + i * 60}
                          stroke="#e2e8f0" 
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                      ))}
                      
                      {/* Axes */}
                      <line x1="50" y1="270" x2="750" y2="270" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="30" x2="50" y2="270" stroke="#475569" strokeWidth="2" />
                      
                      {/* Data Line */}
                      <polyline
                        points={result.yearlyData.map((d: any, i: number) => {
                          const x = 50 + (i / result.years) * 700
                          const maxValue = result.futureValue
                          const y = 270 - ((d.value / maxValue) * 240)
                          return `${x},${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Area Fill */}
                      <polygon
                        points={`50,270 ${result.yearlyData.map((d: any, i: number) => {
                          const x = 50 + (i / result.years) * 700
                          const maxValue = result.futureValue
                          const y = 270 - ((d.value / maxValue) * 240)
                          return `${x},${y}`
                        }).join(' ')} 750,270`}
                        fill="url(#areaGradient)"
                        opacity="0.3"
                      />
                      
                      {/* Data Points */}
                      {result.yearlyData.map((d: any, i: number) => {
                        const x = 50 + (i / result.years) * 700
                        const maxValue = result.futureValue
                        const y = 270 - ((d.value / maxValue) * 240)
                        return (
                          <g key={`point-${i}`}>
                            <circle cx={x} cy={y} r="6" fill="#f97316" stroke="white" strokeWidth="2" />
                            {i % Math.ceil(result.years / 10) === 0 && (
                              <>
                                <text x={x} y="290" textAnchor="middle" fontSize="12" fill="#64748b">
                                  {d.year}y
                                </text>
                                <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">
                                  ₺{(d.value / 1000).toFixed(0)}k
                                </text>
                              </>
                            )}
                          </g>
                        )
                      })}
                      
                      {/* Y-axis Labels */}
                      <text x="45" y="35" textAnchor="end" fontSize="12" fill="#64748b" fontWeight="600">
                        ₺{(result.futureValue / 1000).toFixed(0)}k
                      </text>
                      <text x="45" y="275" textAnchor="end" fontSize="12" fill="#64748b" fontWeight="600">
                        ₺{(parseFloat(startValue) / 1000).toFixed(0)}k
                      </text>
                      
                      {/* Gradients */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-slate-600 text-center">
                      <strong>Grafik Yorumu:</strong> {result.years} yıl boyunca %{result.rate} enflasyon ile 
                      değer ₺{parseFloat(startValue).toLocaleString('tr-TR')}'den 
                      ₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 0})}'ye yükseliyor.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Satın Alma Gücü Kaybı Grafiği */}
              <Card className="border-2 border-red-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-bold text-slate-800">Satın Alma Gücü Kaybı</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {result.yearlyData.filter((_: any, i: number) => i % Math.ceil(result.years / 10) === 0 || i === result.years).map((d: any) => (
                      <div key={d.year} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-700">{d.year} Yıl Sonra</span>
                          <span className="text-slate-600">
                            Satın Alma Gücü: <strong className="text-red-600">%{d.purchasingPower.toFixed(1)}</strong>
                          </span>
                        </div>
                        <div className="h-8 bg-slate-100 rounded-lg overflow-hidden flex">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-xs font-semibold text-white transition-all duration-1000"
                            style={{ width: `${d.purchasingPower}%` }}
                          >
                            Kalan
                          </div>
                          <div 
                            className="bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-xs font-semibold text-white transition-all duration-1000"
                            style={{ width: `${100 - d.purchasingPower}%` }}
                          >
                            Kayıp: %{(100 - d.purchasingPower).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Çok Yıllı Karşılaştırma Tablosu */}
              {result.comparisonData && result.comparisonData.length > 0 && (
                <Card className="border-2 border-purple-100/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Hash className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-bold text-slate-800">Farklı Yıllar İçin Karşılaştırma</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-purple-200">
                            <th className="py-3 px-4 text-left font-semibold text-slate-700">Yıl</th>
                            <th className="py-3 px-4 text-right font-semibold text-slate-700">Gelecek Değer</th>
                            <th className="py-3 px-4 text-right font-semibold text-slate-700">Artış Tutarı</th>
                            <th className="py-3 px-4 text-right font-semibold text-slate-700">Satın Alma Gücü</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.comparisonData.sort((a: any, b: any) => a.years - b.years).map((d: any, i: number) => (
                            <tr key={i} className="border-b border-slate-200 hover:bg-purple-50 transition-colors">
                              <td className="py-4 px-4 font-semibold text-purple-600">{d.years} Yıl</td>
                              <td className="py-4 px-4 text-right text-slate-700 font-semibold">
                                ₺{d.value.toLocaleString('tr-TR', {maximumFractionDigits: 0})}
                              </td>
                              <td className="py-4 px-4 text-right text-orange-600 font-semibold">
                                +₺{d.increase.toLocaleString('tr-TR', {maximumFractionDigits: 0})}
                              </td>
                              <td className="py-4 px-4 text-right text-red-600 font-semibold">
                                %{d.power.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Enflasyon Etkisi Özeti */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">📊 Enflasyon Etkisi Özeti</p>
                <p className="text-sm text-slate-600 mb-3">
                  {result.years} yıl sonunda, bugün ₺{parseFloat(startValue).toLocaleString('tr-TR')} olan ürün 
                  ₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 2})} olacak.
                  Paranızın satın alma gücü <strong className="text-red-600">%{(100 - result.purchasingPower).toFixed(2)}</strong> azalacak.
                </p>
                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 bg-white rounded-lg text-center">
                    <p className="text-xs text-slate-600 mb-1">Başlangıç</p>
                    <p className="text-xl font-bold text-slate-700">₺{parseFloat(startValue).toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg text-center">
                    <p className="text-xs text-slate-600 mb-1">Nominal Artış</p>
                    <p className="text-xl font-bold text-orange-600">+₺{result.totalIncrease.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg text-center">
                    <p className="text-xs text-slate-600 mb-1">Reel Kayıp</p>
                    <p className="text-xl font-bold text-red-600">-%{(100 - result.purchasingPower).toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-orange-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-orange-50">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Başlangıç Değeri:</strong> Bugünkü fiyatı veya tutarı girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Yıllık Enflasyon:</strong> Beklenen veya geçmiş enflasyon oranını girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Karşılaştırma Yılları:</strong> İstediğiniz farklı yıl değerlerini girerek birden fazla senaryoyu aynı anda karşılaştırın.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Grafikler:</strong> Değer değişim grafiği, satın alma gücü kaybı ve karşılaştırma tablosunu inceleyin.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-orange-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-orange-50">
              <Lightbulb className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Enflasyonun farklı senaryolardaki etkileri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">🏠</div>
                <h4 className="font-bold text-slate-800">Ev Kirası 10 Yıl</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Bugün: 10.000 TL | Enflasyon: %20</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">5 Yıl Sonra:</span>
                  <span className="font-semibold text-orange-600">₺24.883</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">10 Yıl Sonra:</span>
                  <span className="font-semibold text-red-600">₺61.917</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">💰</div>
                <h4 className="font-bold text-slate-800">Birikim Değer Kaybı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Bugün: 100.000 TL | Enflasyon: %25</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">3 Yıl - Satın Alma Gücü:</span>
                  <span className="font-semibold text-red-600">%51,2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">5 Yıl - Satın Alma Gücü:</span>
                  <span className="font-semibold text-red-600">%32,8</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">🚗</div>
                <h4 className="font-bold text-slate-800">Araç Fiyat Artışı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Bugün: 1.000.000 TL | Enflasyon: %30</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">2 Yıl:</span>
                  <span className="font-semibold text-orange-600">₺1.690.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">4 Yıl:</span>
                  <span className="font-semibold text-red-600">₺2.856.100</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-bold">📈</div>
                <h4 className="font-bold text-slate-800">Yatırım Getirisi vs Enflasyon</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">%15 getiri, %20 enflasyon (reel kayıp)</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">1 Yıl - Reel Getiri:</span>
                  <span className="font-semibold text-red-600">-%4,2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Enflasyonu yenmek için:</span>
                  <span className="font-semibold text-green-600">min %20 getiri</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-orange-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Enflasyon hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-orange-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Bileşik Enflasyon</h4>
              <p className="text-sm text-slate-600">
                Enflasyon bileşik faiz gibi çalışır. %20 enflasyon 5 yılda %248 artış demektir, %100 değil!
                Her yıl bir önceki yılın üzerine eklenir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-orange-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚠️ Reel vs Nominal</h4>
              <p className="text-sm text-slate-600">
                Nominal getiri enflasyonu geçmezse reel kayıp yaşarsınız. %15 getiri, %20 enflasyonda 
                aslında -%4,2 reel getiri demektir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-orange-500">
              <h4 className="font-semibold text-slate-800 mb-2">💼 Yatırım Zorunluluğu</h4>
              <p className="text-sm text-slate-600">
                Enflasyonu aşan getiri sağlayan yatırımlar yapmazsanız, birikimlerinizin 
                reel değeri her yıl azalır. Para biriktirmek yetmez, değerlendirmelisiniz!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-orange-500">
              <h4 className="font-semibold text-slate-800 mb-2">📈 Çok Yıllı Planlama</h4>
              <p className="text-sm text-slate-600">
                Uzun vadeli hedeflerinizi planlarken (emeklilik, ev alma, eğitim) mutlaka 
                enflasyon etkisini hesaba katın. 20 yıl sonrası için bugünkü fiyatları kullanmayın!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-orange-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Enflasyon tarihi ve gerçekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Hiperenflasyon Rekorları
              </h4>
              <p className="text-sm text-slate-600">
                Zimbabwe 2008'de günlük %98 enflasyon yaşadı. Fiyatlar her 24 saatte ikiye katlanıyordu!
                Venezuela'da 2018'de %1.000.000 enflasyon görüldü.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                72 Kuralı
              </h4>
              <p className="text-sm text-slate-600">
                Fiyatların ikiye katlanma süresi: 72 ÷ Enflasyon Oranı. 
                %10 enflasyonda fiyatlar 7,2 yılda, %20'de 3,6 yılda ikiye katlanır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Hedef Enflasyon
              </h4>
              <p className="text-sm text-slate-600">
                Merkez bankaları genellikle %2-3 enflasyon hedefler. Bu, ekonomik büyümeyi 
                teşvik ederken fiyat istikrarını korur. Sıfır enflasyon aslında kötüdür!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Gizli Enflasyon
              </h4>
              <p className="text-sm text-slate-600">
                Shrinkflation: Fiyat artmaz ama ürün küçülür (çikolata 100g'dan 85g'a).
                Greedflation: Şirketler enflasyonu bahane edip fazla zam yapar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
