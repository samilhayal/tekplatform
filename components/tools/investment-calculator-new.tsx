"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Home, Info, Lightbulb, BookOpen, AlertCircle, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export function InvestmentCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateInvestment = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) return

    const futureValue = p * Math.pow(1 + r, t)
    const totalProfit = futureValue - p
    const roi = (totalProfit / p) * 100

    setResult({ futureValue, totalProfit, roi })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-blue-400 hover:bg-blue-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-blue-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      <Card className="border-2 border-blue-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Yatırım Hesaplama
            </h2>
            <p className="text-slate-600">ROI ve getiri analizinizi yapın</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Ana Para (₺)
              </label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-14" placeholder="100000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                Yıllık Getiri (%)
              </label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="h-14" placeholder="15" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-600" />
                Süre (Yıl)
              </label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="h-14" placeholder="5" />
            </div>
          </div>

          <Button onClick={calculateInvestment} className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <TrendingUp className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 grid md:grid-cols-3 gap-4 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Gelecek Değer</p>
                <p className="text-3xl font-bold text-blue-600">₺{result.futureValue.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Kazanç</p>
                <p className="text-3xl font-bold text-green-600">₺{result.totalProfit.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">ROI</p>
                <p className="text-3xl font-bold text-indigo-600">%{result.roi.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır */}
      <Card className="border-2 border-blue-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">1.</span>
                  <span><strong>Ana Para:</strong> Yatırım yapmak istediğiniz toplam tutarı girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">2.</span>
                  <span><strong>Yıllık Getiri:</strong> Beklediğiniz yıllık kazanç oranını (%) girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">3.</span>
                  <span><strong>Süre:</strong> Yatırımınızı ne kadar süre tutacağınızı (yıl) girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">4.</span>
                  <span><strong>Hesapla:</strong> Gelecekteki değer, toplam kazanç ve ROI'nizi görün</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-indigo-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Lightbulb className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Örnek Kullanımlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">📈 Hisse Senedi Yatırımı</p>
                  <p className="text-sm text-slate-700 mb-2">100.000₺, %15 getiri, 10 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Gelecek Değer:</strong> ~405.000₺</p>
                  <p className="text-xs text-slate-600"><strong>ROI:</strong> %305</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">💰 Altın Yatırımı</p>
                  <p className="text-sm text-slate-700 mb-2">50.000₺, %10 getiri, 5 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Gelecek Değer:</strong> ~80.500₺</p>
                  <p className="text-xs text-slate-600"><strong>ROI:</strong> %61</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">🏢 Gayrimenkul</p>
                  <p className="text-sm text-slate-700 mb-2">500.000₺, %20 getiri, 3 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Gelecek Değer:</strong> ~864.000₺</p>
                  <p className="text-xs text-slate-600"><strong>ROI:</strong> %72.8</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">🌟 Yatırım Fonu</p>
                  <p className="text-sm text-slate-700 mb-2">25.000₺, %12 getiri, 7 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Gelecek Değer:</strong> ~55.200₺</p>
                  <p className="text-xs text-slate-600"><strong>ROI:</strong> %120.8</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-amber-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Önemli Bilgiler</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>ROI Formülü:</strong> (Toplam Kazanç / Ana Para) × 100 - Yatırım getirisini ölçer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Gelecek Değer:</strong> Ana Para × (1 + Getiri Oranı)^Yıl - Bileşik büyüme etkisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Hesaplamalar <strong>varsayımsal</strong> getiri oranlarına dayanır, gerçek getiriler değişebilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Vergi, komisyon ve enflasyon gibi maliyetler <strong>dikkate alınmamıştır</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Yüksek getiri genellikle <strong>yüksek risk</strong> anlamına gelir</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-emerald-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <Info className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">İlginç Bilgiler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
                  <p className="font-semibold text-emerald-900 mb-2">📊 Çeşitlendirme</p>
                  <p className="text-sm text-slate-700">"Tüm yumurtaları tek sepete koymayın" - Portföyünüzü farklı varlıklara yayın</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">⏰ Zamanın Gücü</p>
                  <p className="text-sm text-slate-700">Erken başlamak büyük fark yaratır - 10 yıl vs 20 yıl yatırım arasında çok büyük fark vardır</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">💡 Dollar Cost Averaging</p>
                  <p className="text-sm text-slate-700">Düzenli sabit tutarlarda yatırım yapmak riski azaltır ve ortalama maliyeti dengeler</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">🎯 Uzun Vade</p>
                  <p className="text-sm text-slate-700">Tarihi veriler gösteriyor ki uzun vadeli yatırımlar kısa vadeli dalgalanmaları yener</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
