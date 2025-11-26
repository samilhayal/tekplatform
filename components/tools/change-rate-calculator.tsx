"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ArrowUpDown, Home, Info, Lightbulb, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

export function ChangeRateCalculator() {
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const old = parseFloat(oldValue)
    const newVal = parseFloat(newValue)
    if (isNaN(old) || isNaN(newVal) || old === 0) return

    const change = newVal - old
    const percentChange = (change / old) * 100
    const isIncrease = change > 0

    setResult({ change, percentChange, isIncrease, old, new: newVal })
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg mb-4">
              <ArrowUpDown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Değişim Oranı Hesaplayıcı
            </h2>
            <p className="text-slate-600">Artış ve azalış oranlarını hesaplayın</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Eski Değer</label>
              <Input type="number" value={oldValue} onChange={(e) => setOldValue(e.target.value)} className="h-14" placeholder="1000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Yeni Değer</label>
              <Input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="h-14" placeholder="1200" />
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-600">
            <ArrowUpDown className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in">
              <div className={`p-6 rounded-2xl border-2 text-center ${result.isIncrease ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'}`}>
                {result.isIncrease ? <TrendingUp className="h-10 w-10 mx-auto text-green-600 mb-3" /> : <TrendingDown className="h-10 w-10 mx-auto text-red-600 mb-3" />}
                <p className="text-sm font-semibold text-slate-600 mb-2">{result.isIncrease ? 'Artış Oranı' : 'Azalış Oranı'}</p>
                <p className={`text-5xl font-bold ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                  %{Math.abs(result.percentChange).toLocaleString('tr-TR', {maximumFractionDigits: 2})}
                </p>
                <p className="text-sm text-slate-500 mt-2">{Math.abs(result.change).toLocaleString('tr-TR', {maximumFractionDigits: 2})} birim {result.isIncrease ? 'artış' : 'azalış'}</p>
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
                  <span><strong>Eski Değer:</strong> Başlangıç değerini girin (örneğin, eski fiyat, önceki miktar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">2.</span>
                  <span><strong>Yeni Değer:</strong> Güncel değeri girin (örneğin, yeni fiyat, şu anki miktar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">3.</span>
                  <span><strong>Hesapla:</strong> Butona tıklayın ve değişim oranını görün</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-cyan-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-100">
              <Lightbulb className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Örnek Kullanımlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">📈 Fiyat Artışı</p>
                  <p className="text-sm text-slate-700 mb-2">Ürün fiyatı 100₺'den 120₺'ye çıktı</p>
                  <p className="text-xs text-slate-600"><strong>Sonuç:</strong> %20 artış</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200">
                  <p className="font-semibold text-red-900 mb-2">📉 İndirim Hesaplama</p>
                  <p className="text-sm text-slate-700 mb-2">Ürün fiyatı 500₺'den 400₺'ye düştü</p>
                  <p className="text-xs text-slate-600"><strong>Sonuç:</strong> %20 azalış</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">💰 Maaş Zammı</p>
                  <p className="text-sm text-slate-700 mb-2">Maaş 10.000₺'den 12.500₺'ye çıktı</p>
                  <p className="text-xs text-slate-600"><strong>Sonuç:</strong> %25 artış</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">📊 Satış Performansı</p>
                  <p className="text-sm text-slate-700 mb-2">Satışlar 1000 adetten 1500 adete yükseldi</p>
                  <p className="text-xs text-slate-600"><strong>Sonuç:</strong> %50 artış</p>
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
                  <span><strong>Değişim Oranı Formülü:</strong> ((Yeni Değer - Eski Değer) / Eski Değer) × 100</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Pozitif sonuç <strong className="text-green-600">artışı</strong>, negatif sonuç <strong className="text-red-600">azalışı</strong> gösterir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Eski değer sıfır olamaz (matematiksel olarak tanımsız)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>İki değerin de aynı birimde olması gerekir (₺, $, adet vb.)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İlginç Bilgiler */}
      <Card className="border-2 border-indigo-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Info className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">İlginç Bilgiler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                  <p className="font-semibold text-indigo-900 mb-2">🎯 Finansta Kullanımı</p>
                  <p className="text-sm text-slate-700">Borsa yatırımcıları hisse senedi performansını ölçmek için değişim oranını kullanır</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">📊 Ekonomide</p>
                  <p className="text-sm text-slate-700">Enflasyon oranları, değişim oranı formülü ile hesaplanır</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">💼 İş Dünyasında</p>
                  <p className="text-sm text-slate-700">Şirketler büyüme oranlarını raporlarken bu hesaplamayı kullanır</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">🔍 Dikkat!</p>
                  <p className="text-sm text-slate-700">%100 artış = değerin ikiye katlanması demektir</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
