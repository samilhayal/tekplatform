"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingDown, AlertTriangle, Home, BookOpen, Lightbulb, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export function LossCalculator() {
  const [originalValue, setOriginalValue] = useState("")
  const [currentValue, setCurrentValue] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateLoss = () => {
    const original = parseFloat(originalValue)
    const current = parseFloat(currentValue)
    if (isNaN(original) || isNaN(current) || original <= 0) return

    const loss = original - current
    const lossPercent = (loss / original) * 100
    const breakEven = original

    setResult({ loss, lossPercent, breakEven, original, current })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors group"
      >
        <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Ana Sayfaya Dön</span>
      </Link>

      <Card className="border-2 border-red-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg mb-4">
              <TrendingDown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Zarar Hesaplama
            </h2>
            <p className="text-slate-600">Zarar oranı ve başabaş noktasını hesaplayın</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Orijinal Değer (₺)</label>
              <Input type="number" value={originalValue} onChange={(e) => setOriginalValue(e.target.value)} className="h-14" placeholder="50000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Güncel Değer (₺)</label>
              <Input type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="h-14" placeholder="42000" />
            </div>
          </div>

          <Button onClick={calculateLoss} className="w-full h-14 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
            <TrendingDown className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-6 rounded-2xl border-2 text-center ${result.loss > 0 ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
                {result.loss > 0 ? (
                  <AlertTriangle className="h-10 w-10 mx-auto text-red-600 mb-3" />
                ) : (
                  <TrendingDown className="h-10 w-10 mx-auto text-green-600 mb-3" />
                )}
                <p className="text-sm font-semibold text-slate-600 mb-2">{result.loss > 0 ? 'Toplam Zarar' : 'Kazanç'}</p>
                <p className={`text-5xl font-bold ${result.loss > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ₺{Math.abs(result.loss).toLocaleString('tr-TR', {maximumFractionDigits: 2})}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border-2 border-red-100 text-center">
                  <p className="text-sm text-slate-600 mb-1">{result.loss > 0 ? 'Zarar Oranı' : 'Kazanç Oranı'}</p>
                  <p className={`text-3xl font-bold ${result.loss > 0 ? 'text-red-600' : 'text-green-600'}`}>%{Math.abs(result.lossPercent).toFixed(2)}</p>
                </div>
                <div className="p-5 rounded-xl bg-white border-2 border-orange-100 text-center">
                  <p className="text-sm text-slate-600 mb-1">Başabaş Noktası</p>
                  <p className="text-3xl font-bold text-orange-600">₺{result.breakEven.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır? */}
      <Card className="border-2 border-red-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-50">
              <BookOpen className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nasıl Kullanılır?</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">1</span>
                  <span><strong>Orijinal Değer:</strong> Satın alma fiyatını veya başlangıç değerini girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">2</span>
                  <span><strong>Güncel Değer:</strong> Şu anki piyasa değerini veya satış fiyatını girin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">3</span>
                  <span><strong>Hesapla:</strong> Toplam zararınızı, zarar oranını ve başabaş noktasını görün.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-semibold">4</span>
                  <span><strong>Analiz:</strong> Sonuçları değerlendirerek yatırım stratejinizi gözden geçirin.</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-red-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-red-50">
              <Lightbulb className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Örnek Kullanımlar</h3>
              <p className="text-slate-600">Farklı senaryolarda zarar hesaplama örnekleri</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">📉</div>
                <h4 className="font-bold text-slate-800">Hisse Senedi</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Alış: 100.000 TL | Satış: 85.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar:</span>
                  <span className="font-semibold text-red-600">₺15.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar Oranı:</span>
                  <span className="font-semibold text-red-600">%15</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">🚗</div>
                <h4 className="font-bold text-slate-800">Araç Satışı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Alış: 500.000 TL | Satış: 400.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar:</span>
                  <span className="font-semibold text-red-600">₺100.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar Oranı:</span>
                  <span className="font-semibold text-red-600">%20</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-bold">🏠</div>
                <h4 className="font-bold text-slate-800">Emlak Değer Kaybı</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Alış: 2.000.000 TL | Değer: 1.700.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Kayıp:</span>
                  <span className="font-semibold text-red-600">₺300.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kayıp Oranı:</span>
                  <span className="font-semibold text-red-600">%15</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">💼</div>
                <h4 className="font-bold text-slate-800">Ticari Zarar</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Maliyet: 150.000 TL | Satış: 120.000 TL</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar:</span>
                  <span className="font-semibold text-red-600">₺30.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Zarar Oranı:</span>
                  <span className="font-semibold text-red-600">%20</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Önemli Bilgiler */}
      <Card className="border-2 border-red-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-orange-50">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
              <p className="text-slate-600">Zarar hesaplama hakkında bilmeniz gerekenler</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-red-500">
              <h4 className="font-semibold text-slate-800 mb-2">📊 Zarar Oranı Formülü</h4>
              <p className="text-sm text-slate-600">
                Zarar Oranı = <code className="px-2 py-1 bg-white rounded text-red-600">((Orijinal - Güncel) / Orijinal) × 100</code>
                <br/>Bu formül, yatırımınızın ne kadarını kaybettiğinizi yüzde olarak gösterir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-red-500">
              <h4 className="font-semibold text-slate-800 mb-2">⚠️ Başabaş Noktası</h4>
              <p className="text-sm text-slate-600">
                Başabaş noktası, zararı telafi etmek için ulaşmanız gereken fiyattır. 
                %20 kayıp için %25 kazanç gerekir (asimetrik özellik).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-red-500">
              <h4 className="font-semibold text-slate-800 mb-2">💰 Gerçekleşen vs Gerçekleşmemiş Zarar</h4>
              <p className="text-sm text-slate-600">
                Varlığı satmadan zarar "gerçekleşmemiş" kabul edilir. Satış yapılınca "gerçekleşen" zarar olur 
                ve vergi muafiyeti sağlayabilir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-red-500">
              <h4 className="font-semibold text-slate-800 mb-2">🔄 Zarar Durdurma Stratejisi</h4>
              <p className="text-sm text-slate-600">
                Profesyonel yatırımcılar %5-10 zarar seviyesinde "stop-loss" kullanır. 
                Bu, daha büyük kayıpları önlemeye yardımcı olur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-red-100/30 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-blue-50">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bilmeniz İlginç Olabilecek Şeyler</h3>
              <p className="text-slate-600">Zarar ve risk yönetimi hakkında faydalı bilgiler</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Asimetrik Risk
              </h4>
              <p className="text-sm text-slate-600">
                %50 zarar gördüyseniz, başabaşa gelmek için %100 kazanmanız gerekir! 
                Bu yüzden kayıpları sınırlamak kazançlardan daha önemlidir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Psikolojik Etki
              </h4>
              <p className="text-sm text-slate-600">
                İnsanlar aynı miktardaki kazançtan çok daha fazla zarara tepki verirler (kayıptan kaçınma önyargısı). 
                Bu duygusal kararlar almanıza neden olabilir.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                Vergi Avantajı
              </h4>
              <p className="text-sm text-slate-600">
                Gerçekleşen zararlar, sermaye kazançlarını dengeleyerek vergi yükünüzü azaltabilir. 
                Bazı ülkelerde zarar taşıma opsiyonları vardır.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Çeşitlendirme
              </h4>
              <p className="text-sm text-slate-600">
                Tek bir yatırımda büyük zarar riski taşımak yerine, portföyünüzü çeşitlendirerek 
                toplam riski azaltabilirsiniz (tüm yumurtalar tek sepette olmamalı).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
