"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Percent, DollarSign, Home, Info, Lightbulb, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) return

    const interest = p * r * t
    const total = p + interest
    const monthly = total / (t * 12)

    setResult({ interest, total, monthly })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-purple-400 hover:bg-purple-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-purple-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      <Card className="border-2 border-purple-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg mb-4">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Basit Faiz Hesaplayıcı
            </h2>
            <p className="text-slate-600">Faiz ve toplam geri ödeme hesaplama</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Ana Para (₺)</label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-14" placeholder="10000" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Yıllık Faiz Oranı (%)</label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="h-14" placeholder="10" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Süre (Yıl)</label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="h-14" placeholder="2" />
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-600">
            <Percent className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 grid md:grid-cols-3 gap-4 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Faiz</p>
                <p className="text-3xl font-bold text-purple-600">₺{result.interest.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-pink-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Geri Ödeme</p>
                <p className="text-3xl font-bold text-pink-600">₺{result.total.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-rose-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Aylık Ödeme</p>
                <p className="text-3xl font-bold text-rose-600">₺{result.monthly.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır */}
      <Card className="border-2 border-purple-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">1.</span>
                  <span><strong>Ana Para:</strong> Borç aldığınız veya yatırdığınız başlangıç miktarını girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">2.</span>
                  <span><strong>Faiz Oranı:</strong> Yıllık faiz oranını yüzde (%) olarak girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">3.</span>
                  <span><strong>Süre:</strong> Kaç yıl boyunca faiz işleyeceğini girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">4.</span>
                  <span><strong>Hesapla:</strong> Toplam faiz, toplam geri ödeme ve aylık ödeme tutarını görün</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-pink-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-pink-100">
              <Lightbulb className="h-5 w-5 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Örnek Kullanımlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">💰 Kısa Vadeli Kredi</p>
                  <p className="text-sm text-slate-700 mb-2">10.000₺ borç, %15 faiz, 1 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> 1.500₺</p>
                  <p className="text-xs text-slate-600"><strong>Geri Ödeme:</strong> 11.500₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
                  <p className="font-semibold text-pink-900 mb-2">🏦 Tasarruf Hesabı</p>
                  <p className="text-sm text-slate-700 mb-2">50.000₺ birikim, %8 faiz, 3 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> 12.000₺</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Değer:</strong> 62.000₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200">
                  <p className="font-semibold text-rose-900 mb-2">📱 Taksitli Alışveriş</p>
                  <p className="text-sm text-slate-700 mb-2">5.000₺ telefon, %12 faiz, 2 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> 1.200₺</p>
                  <p className="text-xs text-slate-600"><strong>Aylık:</strong> ~258₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                  <p className="font-semibold text-indigo-900 mb-2">💳 Kişisel Kredi</p>
                  <p className="text-sm text-slate-700 mb-2">25.000₺ kredi, %18 faiz, 5 yıl</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> 22.500₺</p>
                  <p className="text-xs text-slate-600"><strong>Geri Ödeme:</strong> 47.500₺</p>
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
                  <span><strong>Basit Faiz Formülü:</strong> Faiz = Ana Para × Faiz Oranı × Süre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Basit faizde <strong>sadece ana para</strong> üzerinden faiz hesaplanır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Faiz her dönem aynı tutarda eklenir (bileşik faiz gibi büyümez)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Genelde <strong>kısa vadeli krediler</strong> ve mevduatlarda kullanılır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Bileşik faizden <strong>daha az getiri</strong> sağlar</span>
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
                  <p className="font-semibold text-indigo-900 mb-2">📜 Tarihçe</p>
                  <p className="text-sm text-slate-700">Basit faiz hesaplaması binlerce yıldır kullanılıyor - antik Mezopotamya'dan kalma kayıtlar var!</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">⚖️ Hukuki Açıdan</p>
                  <p className="text-sm text-slate-700">Birçok ülkede tüketici kredilerinde faiz hesaplama yöntemi yasalarca düzenlenir</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">🎓 Eğitim</p>
                  <p className="text-sm text-slate-700">Basit faiz, finansal okur-yazarlık eğitiminde ilk öğretilen konulardan biridir</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">💡 İpucu</p>
                  <p className="text-sm text-slate-700">Uzun vadeli yatırımlarda bileşik faiz çok daha avantajlıdır!</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
