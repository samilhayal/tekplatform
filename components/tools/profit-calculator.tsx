"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Home, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export function ProfitCalculator() {
  const [revenue, setRevenue] = useState("")
  const [cost, setCost] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateProfit = () => {
    const r = parseFloat(revenue)
    const c = parseFloat(cost)
    if (isNaN(r) || isNaN(c) || r < 0 || c < 0) return

    const profit = r - c
    const margin = r > 0 ? (profit / r) * 100 : 0
    const markup = c > 0 ? (profit / c) * 100 : 0

    setResult({ profit, margin, markup })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
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
              Kâr Hesaplama
            </h2>
            <p className="text-slate-600">Kâr marjınızı ve kazancınızı belirleyin</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Gelir / Satış Fiyatı (₺)</label>
              <Input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="h-14" placeholder="10000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Maliyet (₺)</label>
              <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="h-14" placeholder="7000" />
            </div>
          </div>

          <Button onClick={calculateProfit} className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            <TrendingUp className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-6 rounded-2xl border-2 text-center ${result.profit >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'}`}>
                <DollarSign className={`h-10 w-10 mx-auto mb-3 ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                <p className="text-sm font-semibold text-slate-600 mb-2">{result.profit >= 0 ? 'Net Kâr' : 'Net Zarar'}</p>
                <p className={`text-5xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₺{Math.abs(result.profit).toLocaleString('tr-TR', {maximumFractionDigits: 2})}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border-2 border-green-100 text-center">
                  <p className="text-sm text-slate-600 mb-1">Kâr Marjı</p>
                  <p className="text-3xl font-bold text-green-600">%{result.margin.toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-xl bg-white border-2 border-emerald-100 text-center">
                  <p className="text-sm text-slate-600 mb-1">Markup</p>
                  <p className="text-3xl font-bold text-emerald-600">%{result.markup.toFixed(2)}</p>
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
                  <span><strong>Gelir/Satış Fiyatı:</strong> Ürün veya hizmeti sattığınız fiyatı girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Maliyet:</strong> Ürün veya hizmetin toplam maliyetini girin (üretim, işçilik, kargo vb.).</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Hesapla:</strong> Net kârınızı, kâr marjınızı ve markup oranınızı görün.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Analiz:</strong> Kâr marjı ve markup arasındaki farkı anlayarak fiyatlama stratejinizi optimize edin.</span>
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
              <p className="text-slate-600">Farklı sektörlerde kâr hesaplama örnekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">🛍️</div>
                <h4 className="font-bold text-slate-800">Perakende Satış</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 1.000 TL | Maliyet: 700 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Kâr:</span>
                  <span className="font-semibold text-green-600">₺300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kâr Marjı:</span>
                  <span className="font-semibold text-green-600">%30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Markup:</span>
                  <span className="font-semibold text-emerald-600">%42.86</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">📦</div>
                <h4 className="font-bold text-slate-800">Toptan Satış</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 50.000 TL | Maliyet: 42.500 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Kâr:</span>
                  <span className="font-semibold text-green-600">₺7.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kâr Marjı:</span>
                  <span className="font-semibold text-green-600">%15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Markup:</span>
                  <span className="font-semibold text-emerald-600">%17.65</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">💼</div>
                <h4 className="font-bold text-slate-800">Hizmet Satışı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Ücret: 20.000 TL | Maliyet: 10.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Kâr:</span>
                  <span className="font-semibold text-green-600">₺10.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kâr Marjı:</span>
                  <span className="font-semibold text-green-600">%50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Markup:</span>
                  <span className="font-semibold text-emerald-600">%100</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">🏭</div>
                <h4 className="font-bold text-slate-800">Üretim</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 100.000 TL | Maliyet: 80.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Net Kâr:</span>
                  <span className="font-semibold text-green-600">₺20.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kâr Marjı:</span>
                  <span className="font-semibold text-green-600">%20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Markup:</span>
                  <span className="font-semibold text-emerald-600">%25</span>
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
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Kâr hesaplarken dikkat edilmesi gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Kâr Marjı vs Markup Farkı</h4>
              <p className="text-sm text-slate-600 mb-2">
                <strong>Kâr Marjı:</strong> Satış fiyatına göre kâr yüzdesi = <code className="px-2 py-1 bg-white rounded text-green-600">(Kâr / Satış) × 100</code>
              </p>
              <p className="text-sm text-slate-600">
                <strong>Markup:</strong> Maliyete göre kâr yüzdesi = <code className="px-2 py-1 bg-white rounded text-emerald-600">(Kâr / Maliyet) × 100</code>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">💰 Brüt vs Net Kâr</h4>
              <p className="text-sm text-slate-600">
                Bu hesaplama <strong>brüt kâr</strong> verir (Gelir - Doğrudan Maliyet). 
                <strong>Net kâr</strong> için genel giderler, vergiler ve faiz giderlerini de düşmelisiniz.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">🎯 Sağlıklı Kâr Marjları</h4>
              <p className="text-sm text-slate-600">
                Sektöre göre değişir: Perakende %20-50, Toptan %10-20, Hizmet %40-60, 
                Üretim %15-30. Hedef marjınızı sektör ortalamasıyla karşılaştırın.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-slate-800 mb-2">📈 Fiyatlama Stratejisi</h4>
              <p className="text-sm text-slate-600">
                Düşük kâr marjı yüksek hacimle (süpermarket) veya yüksek kâr marjı düşük hacimle 
                (lüks marka) kârlı olabilir. İş modelinize uygun strateji seçin.
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
              <p className="text-slate-600">Kâr ve fiyatlama hakkında faydalı bilgiler</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                Psikolojik Fiyatlama
              </h4>
              <p className="text-sm text-slate-600">
                99,90 TL gibi fiyatlar müşterilere 90'lı hanede gözükür ve daha ucuz algılanır. 
                Bu strateji satışları %24'e kadar artırabilir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                Başabaş Noktası
              </h4>
              <p className="text-sm text-slate-600">
                Sabit giderlerinizi karşılamak için gereken minimum satış miktarıdır. 
                Formül: Sabit Giderler / (Satış Fiyatı - Değişken Maliyet)
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                Kâr Optimizasyonu
              </h4>
              <p className="text-sm text-slate-600">
                Bazen fiyat düşürüp hacmi artırmak daha kârlıdır. %10 fiyat indirimi 
                satışları %20 artırırsa toplam kâr yükselir. A/B testleri yapın.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Değer Bazlı Fiyatlama
              </h4>
              <p className="text-sm text-slate-600">
                Lüks markalarda maliyet değil, algılanan değer fiyatı belirler. 
                Apple ürünleri yüksek markup'a sahiptir çünkü müşteriler değeri kabul eder.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
