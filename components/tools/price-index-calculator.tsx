"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart, Home, BookOpen, Lightbulb, AlertCircle, Info, TrendingUp, TrendingDown, LineChart, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface PriceData {
  year: string
  price: string
}

const PriceIndexCalculator = () => {
  const [baseYear, setBaseYear] = useState("2020")
  const [basePrice, setBasePrice] = useState("")
  const [priceData, setPriceData] = useState<PriceData[]>([
    { year: "2021", price: "" },
    { year: "2022", price: "" },
    { year: "2023", price: "" }
  ])
  const [result, setResult] = useState<any>(null)

  const addPriceEntry = () => {
    const lastYear = priceData.length > 0 ? parseInt(priceData[priceData.length - 1].year) : parseInt(baseYear)
    setPriceData([...priceData, { year: (lastYear + 1).toString(), price: "" }])
  }

  const removePriceEntry = (index: number) => {
    setPriceData(priceData.filter((_, i) => i !== index))
  }

  const updatePriceEntry = (index: number, field: keyof PriceData, value: string) => {
    const newData = [...priceData]
    newData[index][field] = value
    setPriceData(newData)
  }

  const calculate = () => {
    const base = parseFloat(basePrice)
    if (isNaN(base) || base === 0) return

    const validData = priceData
      .filter(d => d.year && d.price && !isNaN(parseFloat(d.price)))
      .map(d => ({
        year: d.year,
        price: parseFloat(d.price),
        index: (parseFloat(d.price) / base) * 100,
        change: ((parseFloat(d.price) - base) / base) * 100
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))

    if (validData.length === 0) return

    // Yıllık değişim oranları
    const yearlyChanges = validData.map((d, i) => {
      if (i === 0) {
        return { ...d, yearlyChange: d.change }
      }
      const prevPrice = validData[i - 1].price
      return {
        ...d,
        yearlyChange: ((d.price - prevPrice) / prevPrice) * 100
      }
    })

    setResult({
      base,
      baseYear,
      data: yearlyChanges,
      maxIndex: Math.max(...yearlyChanges.map(d => d.index)),
      minIndex: Math.min(...yearlyChanges.map(d => d.index)),
      avgIndex: yearlyChanges.reduce((sum, d) => sum + d.index, 0) / yearlyChanges.length,
      totalChange: yearlyChanges[yearlyChanges.length - 1].change
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-yellow-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg mb-4">
              <BarChart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Fiyat Endeksi Hesaplayıcı
            </h2>
            <p className="text-slate-600">Çok yıllı fiyat karşılaştırma ve trend analizi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Baz Yıl</label>
              <Input type="text" value={baseYear} onChange={(e) => setBaseYear(e.target.value)} className="h-14" placeholder="2020" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Baz Yıl Fiyatı (₺)</label>
              <Input type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} className="h-14" placeholder="100" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Diğer Yılların Fiyatları</label>
            <div className="space-y-3">
              {priceData.map((entry, index) => (
                <div key={index} className="flex gap-3 items-center p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <Input
                    type="text"
                    value={entry.year}
                    onChange={(e) => updatePriceEntry(index, 'year', e.target.value)}
                    className="h-12 w-32"
                    placeholder="Yıl"
                  />
                  <Input
                    type="number"
                    value={entry.price}
                    onChange={(e) => updatePriceEntry(index, 'price', e.target.value)}
                    className="h-12 flex-1"
                    placeholder="Fiyat (₺)"
                  />
                  <Button
                    onClick={() => removePriceEntry(index)}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button onClick={addPriceEntry} variant="outline" className="w-full h-12 border-2 border-yellow-200 hover:bg-yellow-50">
                <Plus className="mr-2 h-5 w-5" /> Yıl Ekle
              </Button>
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700">
            <LineChart className="mr-2" /> Analiz Et ve Grafik Göster
          </Button>

          {result && result.data.length > 0 && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Özet Kartlar */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center">
                  <BarChart className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">Baz Değer</p>
                  <p className="text-2xl font-bold text-blue-600">100</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">En Yüksek Endeks</p>
                  <p className="text-2xl font-bold text-green-600">{result.maxIndex.toFixed(1)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 text-center">
                  <TrendingDown className="h-6 w-6 mx-auto text-red-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">En Düşük Endeks</p>
                  <p className="text-2xl font-bold text-red-600">{result.minIndex.toFixed(1)}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 text-center">
                  <BarChart className="h-6 w-6 mx-auto text-yellow-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">Toplam Değişim</p>
                  <p className="text-2xl font-bold text-yellow-600">{result.totalChange > 0 ? '+' : ''}{result.totalChange.toFixed(1)}%</p>
                </div>
              </div>

              {/* Fiyat Endeksi Grafik (Bar Chart) */}
              <Card className="border-2 border-yellow-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart className="h-6 w-6 text-yellow-600" />
                    <h3 className="text-lg font-bold text-slate-800">Fiyat Endeksi Grafiği (Baz Yıl = 100)</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Baz Yıl */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-slate-700">{result.baseYear} (Baz)</span>
                        <span className="text-slate-600">Endeks: <strong className="text-blue-600">100</strong></span>
                      </div>
                      <div className="h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold transition-all duration-700"
                          style={{ width: '100%' }}>
                          ₺{result.base.toLocaleString('tr-TR')}
                        </div>
                      </div>
                    </div>

                    {/* Diğer Yıllar */}
                    {result.data.map((d: any, i: number) => {
                      const barWidth = (d.index / result.maxIndex) * 100
                      const isIncrease = d.index >= 100
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-700">{d.year}</span>
                            <span className="text-slate-600">
                              Endeks: <strong className={d.index >= 100 ? 'text-red-600' : 'text-green-600'}>{d.index.toFixed(1)}</strong>
                              {' | '}
                              Değişim: <strong className={d.change >= 0 ? 'text-red-600' : 'text-green-600'}>
                                {d.change >= 0 ? '+' : ''}{d.change.toFixed(1)}%
                              </strong>
                            </span>
                          </div>
                          <div className="relative h-12 bg-slate-100 rounded-lg overflow-hidden">
                            <div 
                              className={`h-full flex items-center justify-center text-white font-semibold transition-all duration-700 ${
                                isIncrease 
                                  ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
                              }`}
                              style={{ width: `${barWidth}%` }}
                            >
                              ₺{d.price.toLocaleString('tr-TR')}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Trend Line Chart */}
              <Card className="border-2 border-amber-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="h-6 w-6 text-amber-600" />
                    <h3 className="text-lg font-bold text-slate-800">Fiyat Trend Grafiği</h3>
                  </div>

                  <div className="relative h-80 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200">
                    <svg className="w-full h-full" viewBox="0 0 800 300">
                      {/* Grid Lines */}
                      {[0, 1, 2, 3, 4].map(i => (
                        <line 
                          key={`grid-${i}`}
                          x1="60" 
                          y1={50 + i * 55} 
                          x2="740" 
                          y2={50 + i * 55}
                          stroke="#e2e8f0" 
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                      ))}
                      
                      {/* Axes */}
                      <line x1="60" y1="270" x2="740" y2="270" stroke="#475569" strokeWidth="2" />
                      <line x1="60" y1="30" x2="60" y2="270" stroke="#475569" strokeWidth="2" />
                      
                      {/* Baz Yıl Referans Çizgisi */}
                      <line x1="60" y1="170" x2="740" y2="170" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,4" />
                      <text x="745" y="175" fontSize="11" fill="#3b82f6" fontWeight="600">Baz (100)</text>
                      
                      {/* Tüm veri noktaları (baz yıl dahil) */}
                      {(() => {
                        const allData = [
                          { year: result.baseYear, price: result.base, index: 100 },
                          ...result.data
                        ]
                        const maxPrice = Math.max(...allData.map((d: any) => d.price))
                        const years = allData.length
                        
                        return (
                          <>
                            {/* Data Line */}
                            <polyline
                              points={allData.map((d: any, i: number) => {
                                const x = 60 + (i / (years - 1)) * 680
                                const y = 270 - ((d.price / maxPrice) * 220)
                                return `${x},${y}`
                              }).join(' ')}
                              fill="none"
                              stroke="url(#trendGradient)"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Area Fill */}
                            <polygon
                              points={`60,270 ${allData.map((d: any, i: number) => {
                                const x = 60 + (i / (years - 1)) * 680
                                const y = 270 - ((d.price / maxPrice) * 220)
                                return `${x},${y}`
                              }).join(' ')} 740,270`}
                              fill="url(#trendAreaGradient)"
                              opacity="0.3"
                            />
                            
                            {/* Data Points */}
                            {allData.map((d: any, i: number) => {
                              const x = 60 + (i / (years - 1)) * 680
                              const y = 270 - ((d.price / maxPrice) * 220)
                              const isBase = i === 0
                              return (
                                <g key={`point-${i}`}>
                                  <circle 
                                    cx={x} 
                                    cy={y} 
                                    r={isBase ? "8" : "6"} 
                                    fill={isBase ? "#3b82f6" : (d.index >= 100 ? "#f97316" : "#10b981")} 
                                    stroke="white" 
                                    strokeWidth="2" 
                                  />
                                  <text x={x} y="290" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="600">
                                    {d.year}
                                  </text>
                                  <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">
                                    ₺{d.price.toLocaleString('tr-TR', {maximumFractionDigits: 0})}
                                  </text>
                                  {!isBase && (
                                    <text x={x} y={y + 20} textAnchor="middle" fontSize="10" fill={d.index >= 100 ? "#dc2626" : "#059669"}>
                                      {d.change >= 0 ? '+' : ''}{d.change.toFixed(0)}%
                                    </text>
                                  )}
                                </g>
                              )
                            })}
                          </>
                        )
                      })()}
                      
                      {/* Gradients */}
                      <defs>
                        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                        <linearGradient id="trendAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-slate-600 text-center">
                      <strong>Grafik Yorumu:</strong> {result.baseYear} baz yılından {result.data[result.data.length - 1].year}'a kadar 
                      fiyat <strong className={result.totalChange >= 0 ? 'text-red-600' : 'text-green-600'}>
                        {result.totalChange >= 0 ? '%' + result.totalChange.toFixed(1) + ' arttı' : '%' + Math.abs(result.totalChange).toFixed(1) + ' azaldı'}
                      </strong>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Yıllık Değişim Oranları Tablosu */}
              <Card className="border-2 border-green-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-bold text-slate-800">Detaylı Karşılaştırma Tablosu</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-green-200">
                          <th className="py-3 px-4 text-left font-semibold text-slate-700">Yıl</th>
                          <th className="py-3 px-4 text-right font-semibold text-slate-700">Fiyat</th>
                          <th className="py-3 px-4 text-right font-semibold text-slate-700">Endeks</th>
                          <th className="py-3 px-4 text-right font-semibold text-slate-700">Baz'dan Değişim</th>
                          <th className="py-3 px-4 text-right font-semibold text-slate-700">Yıllık Değişim</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200 bg-blue-50">
                          <td className="py-4 px-4 font-semibold text-blue-600">{result.baseYear} (Baz)</td>
                          <td className="py-4 px-4 text-right font-semibold text-slate-700">₺{result.base.toLocaleString('tr-TR')}</td>
                          <td className="py-4 px-4 text-right font-semibold text-blue-600">100.0</td>
                          <td className="py-4 px-4 text-right text-slate-500">-</td>
                          <td className="py-4 px-4 text-right text-slate-500">-</td>
                        </tr>
                        {result.data.map((d: any, i: number) => (
                          <tr key={i} className="border-b border-slate-200 hover:bg-yellow-50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-yellow-600">{d.year}</td>
                            <td className="py-4 px-4 text-right font-semibold text-slate-700">₺{d.price.toLocaleString('tr-TR')}</td>
                            <td className="py-4 px-4 text-right font-semibold text-yellow-600">{d.index.toFixed(1)}</td>
                            <td className="py-4 px-4 text-right font-semibold">
                              <span className={d.change >= 0 ? 'text-red-600' : 'text-green-600'}>
                                {d.change >= 0 ? '+' : ''}{d.change.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-semibold">
                              <span className={d.yearlyChange >= 0 ? 'text-orange-600' : 'text-green-600'}>
                                {d.yearlyChange >= 0 ? '+' : ''}{d.yearlyChange.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Özet Analiz */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-indigo-600" />
                  Fiyat Endeksi Analiz Özeti
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Baz Yıl Fiyatı</p>
                    <p className="text-2xl font-bold text-blue-600">₺{result.base.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-slate-500 mt-1">{result.baseYear}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Son Fiyat</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      ₺{result.data[result.data.length - 1].price.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{result.data[result.data.length - 1].year}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Ortalama Endeks</p>
                    <p className="text-2xl font-bold text-purple-600">{result.avgIndex.toFixed(1)}</p>
                    <p className="text-xs text-slate-500 mt-1">Tüm dönem</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-yellow-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-50">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Baz Yıl:</strong> Karşılaştırmanın temel alınacağı yılı ve o yılki fiyatı girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Diğer Yıllar:</strong> Karşılaştırmak istediğiniz diğer yılları ve fiyatları ekleyin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Yıl Ekle/Sil:</strong> İhtiyacınıza göre karşılaştırma yapacağınız yıl sayısını artırın veya azaltın.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Grafikler ve Analiz:</strong> Endeks grafiği, trend çizgisi ve detaylı karşılaştırma tablosunu inceleyin.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-yellow-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-yellow-50">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Gerçek hayattan fiyat endeksi örnekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">🍞</div>
                <h4 className="font-bold text-slate-800">Ekmek Fiyatı (2020-2024)</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                2020: ₺2 (Baz)<br/>
                2021: ₺2,5 → Endeks 125<br/>
                2022: ₺3,5 → Endeks 175<br/>
                2023: ₺5 → Endeks 250<br/>
                2024: ₺7,5 → Endeks 375
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-slate-600">4 yılda <strong className="text-red-600">%275 artış</strong></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">⛽</div>
                <h4 className="font-bold text-slate-800">Benzin Fiyatı (2019-2024)</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                2019: ₺6 (Baz)<br/>
                2020: ₺7 → Endeks 117<br/>
                2021: ₺9 → Endeks 150<br/>
                2022: ₺20 → Endeks 333<br/>
                2023-2024: ₺40+ → Endeks 666+
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-slate-600">5 yılda <strong className="text-red-600">%566+ artış</strong></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">💻</div>
                <h4 className="font-bold text-slate-800">Elektronik (Deflasyon)</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                2015: $1000 (Baz)<br/>
                2017: $800 → Endeks 80<br/>
                2019: $600 → Endeks 60<br/>
                2021: $500 → Endeks 50<br/>
                2024: $400 → Endeks 40
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-slate-600">9 yılda <strong className="text-green-600">%60 azalış</strong></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">🏠</div>
                <h4 className="font-bold text-slate-800">Konut Fiyatları (2018-2024)</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                2018: ₺500K (Baz)<br/>
                2020: ₺600K → Endeks 120<br/>
                2022: ₺1M → Endeks 200<br/>
                2024: ₺2M → Endeks 400
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-slate-600">6 yılda <strong className="text-red-600">%300 artış</strong></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-yellow-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-amber-50">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Fiyat endeksi hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-yellow-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Fiyat Endeksi Formülü</h4>
              <p className="text-sm text-slate-600">
                Endeks = <code className="px-2 py-1 bg-white rounded text-yellow-600">(Güncel Fiyat ÷ Baz Fiyat) × 100</code><br/>
                Baz yıl endeksi her zaman 100'dür. 150 endeksi %50 artış, 80 endeksi %20 azalış demektir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-yellow-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 TÜFE (Tüketici Fiyat Endeksi)</h4>
              <p className="text-sm text-slate-600">
                TÜFE, belirli bir mal ve hizmet sepetinin zaman içindeki fiyat değişimini ölçer.
                TÜİK tarafından aylık olarak açıklanır ve enflasyon oranını gösterir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-yellow-500">
              <h4 className="font-semibold text-slate-800 mb-2">📈 Baz Yıl Seçimi</h4>
              <p className="text-sm text-slate-600">
                Baz yıl genellikle "normal" kabul edilen bir yıldır. TÜİK her 5 yılda bir 
                baz yılı günceller. Baz yılın seçimi sonuçları etkilemez, sadece referans noktasıdır.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-yellow-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚖️ Zincir Endeksleme</h4>
              <p className="text-sm text-slate-600">
                Uzun dönem karşılaştırmalarda zincir endeks kullanılır. Her yıl bir önceki yıla göre 
                hesaplanır ve daha doğru sonuç verir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-yellow-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Fiyat endeksleri ve ölçüm yöntemleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🍔</span>
                Big Mac Endeksi
              </h4>
              <p className="text-sm text-slate-600">
                The Economist tarafından oluşturulan bu endeks, dünyanın farklı ülkelerinde 
                Big Mac fiyatlarını karşılaştırarak satın alma gücü paritesini ölçer!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Teknoloji Deflasyonu
              </h4>
              <p className="text-sm text-slate-600">
                Elektronik ürünlerde sürekli fiyat düşüşü görülür. Bugünün 10.000 TL'lik 
                telefonu 5 yıl önce 50.000 TL'den daha güçlüdür!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Roma Dönemi
              </h4>
              <p className="text-sm text-slate-600">
                İlk fiyat kontrolleri MÖ 301'de Romalı İmparator Diocletian tarafından yapıldı.
                "Maximum Prices Edict" ile 1000'den fazla ürünün fiyatı belirlendi!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Hedonik Düzeltme
              </h4>
              <p className="text-sm text-slate-600">
                Ürün kalitesi artarken fiyat karşılaştırması için "hedonik düzeltme" yapılır.
                2024 arabası 2000'dekinden daha pahalı ama çok daha gelişmiş!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { PriceIndexCalculator }
