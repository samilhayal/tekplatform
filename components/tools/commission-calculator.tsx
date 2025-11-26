"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Percent, Home, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export function CommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState("")
  const [commissionRate, setCommissionRate] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateCommission = () => {
    const sales = parseFloat(salesAmount)
    const rate = parseFloat(commissionRate)
    if (isNaN(sales) || isNaN(rate) || sales <= 0 || rate < 0) return

    const commission = (sales * rate) / 100
    const netAmount = sales - commission

    setResult({ commission, netAmount, rate })
  }

  const quickRates = [5, 10, 15, 20, 25]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-amber-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg mb-4">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Komisyon Hesaplama
            </h2>
            <p className="text-slate-600">Satış komisyonunuzu hesaplayın</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Satış Tutarı (₺)</label>
              <Input type="number" value={salesAmount} onChange={(e) => setSalesAmount(e.target.value)} className="h-14" placeholder="100000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Komisyon Oranı (%)</label>
              <Input type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} className="h-14" placeholder="10" />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-3">Hızlı Komisyon Oranları</p>
            <div className="flex flex-wrap gap-2">
              {quickRates.map(rate => (
                <Button key={rate} variant="outline" onClick={() => setCommissionRate(rate.toString())}
                  className="h-10 px-4 border-2 border-amber-200 hover:bg-amber-50">
                  %{rate}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={calculateCommission} className="w-full h-14 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
            <Percent className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 text-center">
                <DollarSign className="h-10 w-10 mx-auto text-amber-600 mb-3" />
                <p className="text-sm font-semibold text-slate-600 mb-2">Komisyon Tutarı</p>
                <p className="text-5xl font-bold text-amber-600">
                  ₺{result.commission.toLocaleString('tr-TR', {maximumFractionDigits: 2})}
                </p>
                <p className="text-sm text-slate-500 mt-2">(%{result.rate} komisyon)</p>
              </div>
              <div className="p-5 rounded-xl bg-white border-2 border-amber-100 text-center">
                <p className="text-sm text-slate-600 mb-1">Net Kazanç (Satış - Komisyon)</p>
                <p className="text-3xl font-bold text-green-600">₺{result.netAmount.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Komisyon</span>
                  <span>Net Kazanç</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600" 
                    style={{ width: `${result.rate}%` }} />
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600" 
                    style={{ width: `${100 - result.rate}%` }} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-amber-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <BookOpen className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Satış Tutarı:</strong> Gerçekleştirdiğiniz satışın toplam tutarını girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Komisyon Oranı:</strong> Alacağınız komisyon yüzdesini girin veya hızlı butonlardan seçin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Hesapla:</strong> Komisyon tutarınızı ve net kazancınızı anında görün.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Görsel Analiz:</strong> Komisyon ve net kazanç dağılımını grafik üzerinde inceleyin.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-amber-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-amber-50">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Farklı sektörlerde komisyon hesaplama örnekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">🏠</div>
                <h4 className="font-bold text-slate-800">Emlak Satış</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 2.000.000 TL | Komisyon: %3</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Komisyon:</span>
                  <span className="font-semibold text-amber-600">₺60.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ev Sahibine:</span>
                  <span className="font-semibold text-green-600">₺1.940.000</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">🚗</div>
                <h4 className="font-bold text-slate-800">Araç Satış</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 500.000 TL | Komisyon: %5</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Komisyon:</span>
                  <span className="font-semibold text-amber-600">₺25.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Araç Sahibine:</span>
                  <span className="font-semibold text-green-600">₺475.000</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">💻</div>
                <h4 className="font-bold text-slate-800">Yazılım Satış</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Satış: 100.000 TL | Komisyon: %15</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Komisyon:</span>
                  <span className="font-semibold text-amber-600">₺15.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Şirkete:</span>
                  <span className="font-semibold text-green-600">₺85.000</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">🎯</div>
                <h4 className="font-bold text-slate-800">Danışmanlık</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Proje: 250.000 TL | Komisyon: %20</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Komisyon:</span>
                  <span className="font-semibold text-amber-600">₺50.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Danışmana:</span>
                  <span className="font-semibold text-green-600">₺200.000</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-amber-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Komisyon hesaplarken dikkat edilmesi gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-amber-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Komisyon vs Net Kazanç</h4>
              <p className="text-sm text-slate-600">
                Komisyon, satış tutarından kesilen miktar iken, net kazanç satıcıya kalan tutardır. 
                Formül: <code className="px-2 py-1 bg-white rounded text-amber-600">Net Kazanç = Satış - (Satış × Komisyon%)</code>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-amber-500">
              <h4 className="font-semibold text-slate-800 mb-2">💼 Sektörel Standartlar</h4>
              <p className="text-sm text-slate-600">
                Her sektörün farklı komisyon oranları vardır: Emlak %2-5, Sigorta %10-30, 
                Yazılım %10-20, Danışmanlık %15-25. Sözleşmenizi dikkatlice inceleyin.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-amber-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚖️ Vergi ve Kesintiler</h4>
              <p className="text-sm text-slate-600">
                Komisyon geliri vergi ve sosyal güvenlik kesintilerine tabidir. 
                Net alacağınız tutar için muhasebe danışmanınıza danışın.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-amber-500">
              <h4 className="font-semibold text-slate-800 mb-2">📝 Sözleşme Şartları</h4>
              <p className="text-sm text-slate-600">
                Komisyon oranı, ödeme zamanı ve koşulları mutlaka yazılı sözleşmeyle belirlenmeli. 
                Kademeli komisyon sistemlerinde hedef satış miktarlarına dikkat edin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-amber-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Komisyon sistemi hakkında faydalı bilgiler</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Tarihi Kökler
              </h4>
              <p className="text-sm text-slate-600">
                Komisyon sistemi eski ticaret yollarındaki aracılara kadar uzanır. 
                İlk organize komisyon sistemi 15. yüzyıl Venedik tüccarları tarafından kullanılmıştır.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Motivasyon Aracı
              </h4>
              <p className="text-sm text-slate-600">
                Araştırmalar gösteriyor ki komisyon sistemi çalışan motivasyonunu %30-40 artırıyor. 
                Performansa dayalı ödeme, satış hedeflerine ulaşmayı teşvik eder.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Kademeli Komisyon
              </h4>
              <p className="text-sm text-slate-600">
                Birçok şirket kademeli komisyon kullanır: İlk 100.000 TL'ye %5, 
                sonraki 200.000 TL'ye %7, üstüne %10 gibi. Bu sistem yüksek satışı ödüllendirir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Müzakere Gücü
              </h4>
              <p className="text-sm text-slate-600">
                Deneyimli satış profesyonelleri genellikle daha yüksek komisyon oranları için 
                müzakere edebilir. Başarı geçmişiniz pazarlık gücünüzü artırır.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
