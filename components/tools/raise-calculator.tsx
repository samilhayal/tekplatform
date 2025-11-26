"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Home, BookOpen, Lightbulb, AlertCircle, Info, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"

export function RaiseCalculator() {
  const [currentSalary, setCurrentSalary] = useState("")
  const [raisePercent, setRaisePercent] = useState("")
  const [salaryType, setSalaryType] = useState<"gross" | "net">("gross")
  const [result, setResult] = useState<any>(null)

  // Basitleştirilmiş gelir vergisi ve sigorta hesaplama (2024 oranları)
  const calculateNetFromGross = (gross: number) => {
    const sgkEmployee = gross * 0.14 // SGK işçi payı %14
    const unemploymentEmployee = gross * 0.01 // İşsizlik sigortası %1
    
    // Gelir vergisi dilimleri (basitleştirilmiş)
    let incomeTax = 0
    if (gross <= 70000 / 12) incomeTax = gross * 0.15
    else if (gross <= 150000 / 12) incomeTax = gross * 0.20
    else if (gross <= 550000 / 12) incomeTax = gross * 0.27
    else if (gross <= 1900000 / 12) incomeTax = gross * 0.35
    else incomeTax = gross * 0.40
    
    const stampTax = gross * 0.00759 // Damga vergisi
    const totalDeductions = sgkEmployee + unemploymentEmployee + incomeTax + stampTax
    
    return {
      net: gross - totalDeductions,
      deductions: totalDeductions,
      sgk: sgkEmployee,
      unemployment: unemploymentEmployee,
      incomeTax,
      stampTax
    }
  }

  const calculateGrossFromNet = (net: number) => {
    // Yaklaşık brüt hesaplama (iterative olmadan basit çarpan)
    const estimatedGross = net / 0.66 // Ortalama %34 kesinti varsayımı
    return estimatedGross
  }

  const calculateRaise = () => {
    const salary = parseFloat(currentSalary)
    const percent = parseFloat(raisePercent)
    if (isNaN(salary) || isNaN(percent) || salary <= 0 || percent < 0) return

    let grossCurrent, grossNew, netCurrent, netNew

    if (salaryType === "gross") {
      grossCurrent = salary
      grossNew = salary * (1 + percent / 100)
      const currentCalc = calculateNetFromGross(grossCurrent)
      const newCalc = calculateNetFromGross(grossNew)
      netCurrent = currentCalc.net
      netNew = newCalc.net
    } else {
      netCurrent = salary
      grossCurrent = calculateGrossFromNet(netCurrent)
      grossNew = grossCurrent * (1 + percent / 100)
      const newCalc = calculateNetFromGross(grossNew)
      netNew = newCalc.net
    }

    const raiseAmountGross = grossNew - grossCurrent
    const raiseAmountNet = netNew - netCurrent
    const currentDeductions = calculateNetFromGross(grossCurrent)
    const newDeductions = calculateNetFromGross(grossNew)

    setResult({ 
      grossCurrent, 
      grossNew, 
      netCurrent, 
      netNew,
      raiseAmountGross,
      raiseAmountNet,
      percent,
      currentDeductions,
      newDeductions
    })
  }

  const quickRates = [5, 10, 15, 20, 25, 30, 40, 50]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-green-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Gelişmiş Zam Hesaplama
            </h2>
            <p className="text-slate-600">Brüt/Net maaş, grafik gösterimi ve detaylı analiz</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Maaş Tipi</label>
              <Select value={salaryType} onValueChange={(value: "gross" | "net") => setSalaryType(value)}>
                <SelectTrigger className="h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gross">Brüt Maaş</SelectItem>
                  <SelectItem value="net">Net Maaş</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                {salaryType === "gross" ? "Brüt Maaş" : "Net Maaş"} (₺)
              </label>
              <Input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} className="h-14" placeholder="20000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Zam Oranı (%)</label>
              <Input type="number" value={raisePercent} onChange={(e) => setRaisePercent(e.target.value)} className="h-14" placeholder="15" />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Zam Oranları</p>
            <div className="flex flex-wrap gap-2">
              {quickRates.map(rate => (
                <Button key={rate} variant="outline" onClick={() => setRaisePercent(rate.toString())}
                  className="h-10 px-4 border-2 border-green-200 hover:bg-green-50">
                  %{rate}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={calculateRaise} className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            <BarChart3 className="mr-2" /> Hesapla ve Grafik Göster
          </Button>

          {result && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Ana Sonuçlar */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
                  <p className="text-sm font-semibold text-slate-600 mb-4">Mevcut Maaş</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Brüt:</span>
                      <span className="text-2xl font-bold text-slate-700">₺{result.grossCurrent.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-slate-700">₺{result.netCurrent.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <p className="text-sm font-semibold text-green-600 mb-4">Yeni Maaş (%{result.percent} Zam)</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Brüt:</span>
                      <span className="text-2xl font-bold text-green-700">₺{result.grossNew.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Net:</span>
                      <span className="text-2xl font-bold text-green-700">₺{result.netNew.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zam Tutarları */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">Brüt Zam Tutarı</p>
                  <p className="text-4xl font-bold text-blue-600">₺{result.raiseAmountGross.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">Net Zam Tutarı</p>
                  <p className="text-4xl font-bold text-emerald-600">₺{result.raiseAmountNet.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                </div>
              </div>

              {/* Görsel Karşılaştırma - Bar Chart */}
              <Card className="border-2 border-green-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-bold text-slate-800">Maaş Karşılaştırması</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Brüt Maaş Karşılaştırma */}
                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                        <span>Brüt Maaş</span>
                        <span>₺{result.grossNew.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="relative h-16 bg-slate-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: `${(result.grossCurrent / result.grossNew) * 100}%` }}
                        >
                          <span className="text-xs font-semibold text-white">Mevcut</span>
                        </div>
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: '100%' }}
                        >
                          <span className="text-xs font-semibold text-white">Yeni (+%{result.percent})</span>
                        </div>
                      </div>
                    </div>

                    {/* Net Maaş Karşılaştırma */}
                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                        <span>Net Maaş</span>
                        <span>₺{result.netNew.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="relative h-16 bg-slate-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: `${(result.netCurrent / result.netNew) * 100}%` }}
                        >
                          <span className="text-xs font-semibold text-white">Mevcut</span>
                        </div>
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: '100%' }}
                        >
                          <span className="text-xs font-semibold text-white">Yeni</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kesinti Analizi - Pie Chart */}
              <Card className="border-2 border-blue-100/50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <PieChart className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800">Yeni Maaş Kesinti Analizi</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Görsel Pasta Grafiği (Basit SVG) */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                          {/* Net Maaş */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="20"
                            strokeDasharray={`${(result.netNew / result.grossNew) * 251} 251`}
                            className="transition-all duration-1000"
                          />
                          {/* Kesintiler */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="20"
                            strokeDasharray={`${(result.newDeductions.deductions / result.grossNew) * 251} 251`}
                            strokeDashoffset={`${-(result.netNew / result.grossNew) * 251}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              %{((result.netNew / result.grossNew) * 100).toFixed(0)}
                            </p>
                            <p className="text-xs text-slate-600">Net</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kesinti Detayları */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                        <span className="text-sm font-semibold text-slate-700">Net Maaş</span>
                        <span className="font-bold text-green-600">₺{result.netNew.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <span className="text-sm text-slate-600">SGK (%14)</span>
                        <span className="font-semibold text-blue-600">₺{result.newDeductions.sgk.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-purple-50 border border-purple-200">
                        <span className="text-sm text-slate-600">Gelir Vergisi</span>
                        <span className="font-semibold text-purple-600">₺{result.newDeductions.incomeTax.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                        <span className="text-sm text-slate-600">İşsizlik (%1)</span>
                        <span className="font-semibold text-orange-600">₺{result.newDeductions.unemployment.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <span className="text-sm text-slate-600">Damga Vergisi</span>
                        <span className="font-semibold text-yellow-600">₺{result.newDeductions.stampTax.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-red-50 border-2 border-red-300">
                        <span className="text-sm font-bold text-slate-700">Toplam Kesinti</span>
                        <span className="font-bold text-red-600">₺{result.newDeductions.deductions.toLocaleString('tr-TR', {maximumFractionDigits: 0})}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yıllık Özet */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-indigo-600" />
                  Yıllık Kazanç Özeti
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Yıllık Brüt Artış</p>
                    <p className="text-2xl font-bold text-blue-600">₺{(result.raiseAmountGross * 12).toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Yıllık Net Artış</p>
                    <p className="text-2xl font-bold text-green-600">₺{(result.raiseAmountNet * 12).toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Yeni Yıllık Net</p>
                    <p className="text-2xl font-bold text-emerald-600">₺{(result.netNew * 12).toLocaleString('tr-TR', {maximumFractionDigits: 0})}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-green-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-green-50">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Maaş Tipi:</strong> Brüt veya net maaşınızı mı gireceğinizi seçin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Maaş Tutarı:</strong> Mevcut maaşınızı girin (seçtiğiniz tipe göre brüt veya net).</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Zam Oranı:</strong> Alacağınız veya almayı beklediğiniz zam yüzdesini girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Grafik Gösterim:</strong> Brüt/net karşılaştırma grafikleri ve kesinti analizi görün.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-green-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-green-50">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Farklı zam senaryoları ve etkileri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">🎯</div>
                <h4 className="font-bold text-slate-800">Performans Zammı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Brüt: ₺30.000 | Zam: %15</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Brüt:</span>
                  <span className="font-semibold text-green-600">₺34.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Net (tahmini):</span>
                  <span className="font-semibold text-emerald-600">₺22.770</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">🚀</div>
                <h4 className="font-bold text-slate-800">Terfi Zammı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Brüt: ₺25.000 | Zam: %25</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Brüt:</span>
                  <span className="font-semibold text-green-600">₺31.250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Net (tahmini):</span>
                  <span className="font-semibold text-emerald-600">₺20.625</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">📊</div>
                <h4 className="font-bold text-slate-800">Enflasyon Farkı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Net: ₺15.000 | Zam: %10</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Net:</span>
                  <span className="font-semibold text-emerald-600">₺16.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yıllık Artış:</span>
                  <span className="font-semibold text-green-600">₺18.000</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">💰</div>
                <h4 className="font-bold text-slate-800">Toplu Sözleşme</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Brüt: ₺20.000 | Zam: %20</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Brüt:</span>
                  <span className="font-semibold text-green-600">₺24.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Yeni Net (tahmini):</span>
                  <span className="font-semibold text-emerald-600">₺15.840</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-green-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-yellow-50">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Maaş zammı ve kesintiler hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">💼 Brüt vs Net Maaş</h4>
              <p className="text-sm text-slate-600">
                Brüt maaş, kesintiler yapılmadan önceki tutardır. Net maaş, SGK, gelir vergisi, 
                damga vergisi ve işsizlik sigortası kesintileri sonrası elinize geçen paradır.
                Ortalama kesinti oranı %30-40 arasındadır.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Gelir Vergisi Dilimleri</h4>
              <p className="text-sm text-slate-600">
                Gelir vergisi artan oranlıdır: düşük gelirlerde %15, yüksek gelirlerde %40'a kadar çıkar.
                Yüksek zamlar aldığınızda vergi dilimi değişebilir ve kesinti oranınız artabilir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Zam Müzakeresi</h4>
              <p className="text-sm text-slate-600">
                Zam görüşmelerinde brüt bazda konuşun. Net artış istiyorsanız, hedef net artışa 
                ulaşmak için gereken brüt zam oranını hesaplayın (genellikle %50 daha fazla).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚖️ Kesinti Hesaplamaları</h4>
              <p className="text-sm text-slate-600">
                Bu hesaplayıcı 2024 oranlarını kullanır ve yaklaşık değerler verir. 
                Kesin hesaplama için muhasebe departmanınıza veya mali müşavirinize danışın.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-green-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Maaş zammı ve iş dünyası gerçekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Enflasyon Takibi
              </h4>
              <p className="text-sm text-slate-600">
                Enflasyonun altında zam almak, reel olarak maaş kaybı demektir. 
                %50 enflasyonda %30 zam, aslında satın alma gücünüzde %13 kayıp yaşatır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Sektör Standartları
              </h4>
              <p className="text-sm text-slate-600">
                Teknoloji sektöründe ortalama yıllık zam %10-15, finans sektöründe %8-12, 
                kamu sektöründe ise genellikle enflasyon oranına yakın seyreder.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Bileşik Etki
              </h4>
              <p className="text-sm text-slate-600">
                Yıllık %10 zam 5 yılda %61 artış sağlar (bileşik). 
                İlk yıl 10.000 TL, 5. yıl 16.105 TL olur. Küçük zamlar uzun vadede büyük fark yaratır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                Yan Haklar
              </h4>
              <p className="text-sm text-slate-600">
                Maaş zammı yerine ek yan haklar (özel sağlık sigortası, yemek kartı artışı, 
                eğitim desteği) vergi avantajı sağlayabilir. Net elinize geçeni hesaplayın!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
