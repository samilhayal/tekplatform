"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, BookOpen, Lightbulb, AlertCircle, Info, BarChart, PieChart, Calendar } from "lucide-react"

export function InvestmentCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateInvestment = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    const monthly = parseFloat(monthlyContribution) || 0
    
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) return

    // Simple compound interest for initial investment
    const futureValueInitial = p * Math.pow(1 + r, t)
    
    // Future value of monthly contributions (annuity)
    let futureValueMonthly = 0
    if (monthly > 0) {
      const monthlyRate = r / 12
      const months = t * 12
      futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    }
    
    const futureValue = futureValueInitial + futureValueMonthly
    const totalInvested = p + (monthly * t * 12)
    const totalProfit = futureValue - totalInvested
    const roi = (totalProfit / totalInvested) * 100

    setResult({ 
      futureValue, 
      totalProfit, 
      roi,
      totalInvested,
      initialInvestment: p,
      monthlyTotal: monthly * t * 12
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Card className="border-2 border-blue-100/50 shadow-xl shadow-blue-500/10 backdrop-blur-sm bg-white/80">
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50 mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Yatırım Getiri Hesaplama
              </h2>
              <p className="text-slate-600">ROI ve getiri analizinizi yapın</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Ana Para (₺)
                </label>
                <div className="relative group">
                  <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(e.target.value)} 
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" 
                    placeholder="100000" 
                  />
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  Yıllık Getiri (%)
                </label>
                <div className="relative group">
                  <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)} 
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all rounded-xl" 
                    placeholder="15" 
                  />
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Süre (Yıl)
                </label>
                <div className="relative group">
                  <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(e.target.value)} 
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all rounded-xl" 
                    placeholder="5" 
                  />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <BarChart className="h-4 w-4 text-green-600" />
                  Aylık Katkı (₺) - İsteğe Bağlı
                </label>
                <div className="relative group">
                  <Input 
                    type="number" 
                    value={monthlyContribution} 
                    onChange={(e) => setMonthlyContribution(e.target.value)} 
                    className="h-14 text-lg pl-12 border-2 border-slate-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all rounded-xl" 
                    placeholder="1000 (opsiyonel)" 
                  />
                  <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                </div>
              </div>
            </div>

            <Button 
              onClick={calculateInvestment} 
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-200 rounded-xl group"
            >
              <TrendingUp className="mr-2 group-hover:scale-110 transition-transform" /> 
              Getiriyi Hesapla
            </Button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="grid md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-600 mb-1">Gelecek Değer</p>
                    <p className="text-3xl font-bold text-blue-600">₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Kazanç</p>
                    <p className="text-3xl font-bold text-green-600">₺{result.totalProfit.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <TrendingUp className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-600 mb-1">ROI</p>
                    <p className="text-3xl font-bold text-indigo-600">%{result.roi.toFixed(2)}</p>
                  </div>
                </div>

                {/* Visual Representation */}
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <CardContent className="pt-6 pb-6 px-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-blue-600" />
                      Yatırım Dağılımı
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Investment Breakdown */}
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-medium text-slate-700">İlk Yatırım: ₺{result.initialInvestment.toLocaleString('tr-TR')}</span>
                          <span className="font-semibold text-blue-600">
                            %{((result.initialInvestment / result.totalInvested) * 100).toFixed(1)}
                          </span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-xl overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                            style={{ width: `${(result.initialInvestment / result.totalInvested) * 100}%` }}
                          >
                            <span className="text-white font-bold text-xs drop-shadow-lg">Ana Para</span>
                          </div>
                        </div>
                      </div>

                      {result.monthlyTotal > 0 && (
                        <div>
                          <div className="flex justify-between mb-2 text-sm">
                            <span className="font-medium text-slate-700">Aylık Katkılar: ₺{result.monthlyTotal.toLocaleString('tr-TR')}</span>
                            <span className="font-semibold text-green-600">
                              %{((result.monthlyTotal / result.totalInvested) * 100).toFixed(1)}
                            </span>
                          </div>
                          <div className="h-8 bg-slate-200 rounded-xl overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                              style={{ width: `${(result.monthlyTotal / result.totalInvested) * 100}%` }}
                            >
                              <span className="text-white font-bold text-xs drop-shadow-lg">Katkılar</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-medium text-slate-700">Kazanç: ₺{result.totalProfit.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</span>
                          <span className="font-semibold text-indigo-600">
                            %{((result.totalProfit / result.futureValue) * 100).toFixed(1)}
                          </span>
                        </div>
                        <div className="h-8 bg-slate-200 rounded-xl overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                            style={{ width: `${(result.totalProfit / result.futureValue) * 100}%` }}
                          >
                            <span className="text-white font-bold text-xs drop-shadow-lg">Getiri</span>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Toplam Yatırım</p>
                            <p className="font-bold text-blue-700 text-lg">₺{result.totalInvested.toLocaleString('tr-TR')}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Toplam Değer</p>
                            <p className="font-bold text-green-700 text-lg">₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-blue-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Ana Para:</strong> Yatırmayı planladığınız başlangıç tutarını girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Yıllık Getiri:</strong> Beklenen yıllık getiri oranını % olarak yazın (örn: 15 için %15).</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Süre:</strong> Yatırımı ne kadar süre tutacağınızı yıl olarak belirtin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Aylık Katkı:</strong> Her ay ekleyeceğiniz tutarı girin (isteğe bağlı).</span>
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
            <div className="p-3 rounded-xl bg-indigo-50">
              <Lightbulb className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Farklı yatırım senaryoları</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">📈</div>
                <h4 className="font-bold text-slate-800">Hisse Senedi Yatırımı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">₺100.000 ile %20 yıllık getiri, 5 yıl</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Gelecek Değer:</span>
                  <span className="font-semibold text-blue-600">₺248.832</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam Kazanç:</span>
                  <span className="font-semibold text-green-600">₺148.832</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">💰</div>
                <h4 className="font-bold text-slate-800">Mevduat Hesabı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">₺50.000 ile %45 yıllık faiz, 1 yıl</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Gelecek Değer:</span>
                  <span className="font-semibold text-blue-600">₺72.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Faiz Kazancı:</span>
                  <span className="font-semibold text-green-600">₺22.500</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">🏠</div>
                <h4 className="font-bold text-slate-800">Gayrimenkul Fonu</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">₺200.000 + ₺2.000/ay, %12 getiri, 10 yıl</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam Yatırım:</span>
                  <span className="font-semibold text-blue-600">₺440.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Gelecek Değer:</span>
                  <span className="font-semibold text-green-600">₺1.083.423</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">🌟</div>
                <h4 className="font-bold text-slate-800">Emeklilik Planı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">₺10.000 + ₺500/ay, %8 getiri, 30 yıl</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Toplam Katkı:</span>
                  <span className="font-semibold text-blue-600">₺190.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Emeklilik Fonu:</span>
                  <span className="font-semibold text-green-600">₺769.370</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-blue-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Yatırım yaparken dikkat edilmesi gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Bileşik Faiz Gücü</h4>
              <p className="text-sm text-slate-600">
                Bileşik faiz, "paranın üzerine para kazanma" prensibidir. Kazançlarınız yeniden yatırıma dönüştükçe,
                getirileriniz üstel olarak artar. Albert Einstein bileşik faizi "dünyanın 8. harikası" olarak tanımlamıştır.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚠️ Risk ve Getiri</h4>
              <p className="text-sm text-slate-600">
                Yüksek getiri genellikle yüksek riskle gelir. Hisse senetleri %20+ getiri sunabilir ama volatilitesi yüksektir.
                Mevduat daha güvenli ama düşük getirilidir. Portföyünüzü çeşitlendirin!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800 mb-2">💡 Enflasyon Etkisi</h4>
              <p className="text-sm text-slate-600">
                Nominal getiri yerine reel getiriye bakın. %50 getiri varken %60 enflasyon varsa, gerçekte paranız değer kaybediyor.
                Reel Getiri = Nominal Getiri - Enflasyon formülünü unutmayın.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Düzenli Yatırım</h4>
              <p className="text-sm text-slate-600">
                Aylık küçük katkılar zamanla büyük bir fark yaratır. ₺500/ay × 20 yıl × %10 getiri = ₺381.000!
                "Zamanı piyasayı tahmin etmeye çalışmak yerine, piyasada zaman geçirin."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-blue-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-indigo-50">
              <Info className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">İlginç Bilgiler</h3>
              <p className="text-slate-600">Yatırım dünyasından bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                72 Kuralı
              </h4>
              <p className="text-sm text-slate-600">
                Paranızın ikiye katlanma süresini hesaplamak için: 72 ÷ Yıllık Getiri = Yıl.
                Örnek: %10 getiriyle 72 ÷ 10 = 7.2 yıl. Paranız ~7 yılda ikiye katlanır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💸</span>
                Küçük Başlangıçlar
              </h4>
              <p className="text-sm text-slate-600">
                Warren Buffett ilk hisse senedini 11 yaşında aldı. Jeff Bezos Amazon'u garajında kurdu.
                Büyük servetler küçük adımlarla başlar. Geç kalmak yoktur, başlamamak vardır!
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎲</span>
                Çeşitlendirme
              </h4>
              <p className="text-sm text-slate-600">
                "Tüm yumurtalarını bir sepete koyma" prensibi. Portföyünüzü farklı varlık sınıflarına (hisse, tahvil, altın, emlak)
                yayarak riski azaltabilirsiniz. Modern portföy teorisinin temeli budur.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Zaman Avantajı
              </h4>
              <p className="text-sm text-slate-600">
                20 yaşında başlayıp 30 yaşında duran biri, 30'da başlayıp 60'a kadar devam edenden daha zengin olabilir!
                Bileşik faizin en büyük dostu zamandır. Erken başlamanın değeri paha biçilemez.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
