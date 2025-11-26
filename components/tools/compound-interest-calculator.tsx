"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Home, Info, Lightbulb, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [frequency, setFrequency] = useState("12") // Monthly
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    const n = parseFloat(frequency)
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || t <= 0) return

    const amount = p * Math.pow(1 + r / n, n * t)
    const interest = amount - p
    const monthly = amount / (t * 12)

    setResult({ interest, total: amount, monthly })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Back to Home Button */}
      <Link href="/">
        <Button variant="outline" className="group hover:border-indigo-400 hover:bg-indigo-50 transition-all">
          <Home className="h-4 w-4 mr-2 group-hover:text-indigo-600" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      <Card className="border-2 border-indigo-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Bileşik Faiz Hesaplayıcı
            </h2>
            <p className="text-slate-600">Bileşik faiz ile kazanç hesaplama</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Bileşik Dönem</label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="h-14"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Yıllık</SelectItem>
                  <SelectItem value="2">6 Aylık</SelectItem>
                  <SelectItem value="4">3 Aylık</SelectItem>
                  <SelectItem value="12">Aylık</SelectItem>
                  <SelectItem value="365">Günlük</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-indigo-500 to-blue-600">
            <TrendingUp className="mr-2" /> Hesapla
          </Button>

          {result && (
            <div className="mt-8 grid md:grid-cols-3 gap-4 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Faiz</p>
                <p className="text-3xl font-bold text-indigo-600">₺{result.interest.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Toplam Tutar</p>
                <p className="text-3xl font-bold text-blue-600">₺{result.total.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-200 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-cyan-600 mb-2" />
                <p className="text-sm font-semibold text-slate-600 mb-1">Aylık Ödeme</p>
                <p className="text-3xl font-bold text-cyan-600">₺{result.monthly.toLocaleString('tr-TR', {maximumFractionDigits: 2})}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nasıl Kullanılır */}
      <Card className="border-2 border-indigo-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nasıl Kullanılır?</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">1.</span>
                  <span><strong>Ana Para:</strong> Yatırım yapmak istediğiniz başlangıç tutarını girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">2.</span>
                  <span><strong>Faiz Oranı:</strong> Yıllık bileşik faiz oranını (%) girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">3.</span>
                  <span><strong>Süre:</strong> Yatırımın kaç yıl süreceğini girin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">4.</span>
                  <span><strong>Bileşik Dönem:</strong> Faizin ne sıklıkla hesaplanacağını seçin (aylık, yıllık vb.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">5.</span>
                  <span><strong>Hesapla:</strong> Toplam kazancınızı ve nihai tutarı görün</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Örnek Kullanımlar */}
      <Card className="border-2 border-blue-100/50 shadow-lg">
        <CardContent className="pt-6 pb-6 px-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Lightbulb className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Örnek Kullanımlar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200">
                  <p className="font-semibold text-indigo-900 mb-2">💼 Emeklilik Fonu</p>
                  <p className="text-sm text-slate-700 mb-2">100.000₺, %10 faiz, 20 yıl, Yıllık</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> ~573.000₺</p>
                  <p className="text-xs text-slate-600"><strong>Nihai Değer:</strong> ~673.000₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">🎯 Kısa Vadeli Yatırım</p>
                  <p className="text-sm text-slate-700 mb-2">50.000₺, %12 faiz, 3 yıl, Aylık</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> ~21.500₺</p>
                  <p className="text-xs text-slate-600"><strong>Nihai Değer:</strong> ~71.500₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200">
                  <p className="font-semibold text-cyan-900 mb-2">🏦 Mevduat Hesabı</p>
                  <p className="text-sm text-slate-700 mb-2">25.000₺, %8 faiz, 5 yıl, 3 Aylık</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> ~12.100₺</p>
                  <p className="text-xs text-slate-600"><strong>Nihai Değer:</strong> ~37.100₺</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">📈 Uzun Vade</p>
                  <p className="text-sm text-slate-700 mb-2">10.000₺, %15 faiz, 10 yıl, Günlük</p>
                  <p className="text-xs text-slate-600"><strong>Toplam Faiz:</strong> ~34.900₺</p>
                  <p className="text-xs text-slate-600"><strong>Nihai Değer:</strong> ~44.900₺</p>
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
                  <span><strong>Bileşik Faiz Formülü:</strong> A = P(1 + r/n)^(nt) - Ana para üzerinden faiz, faiz üzerinden de faiz!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Her dönem kazanılan faiz <strong>ana paraya eklenir</strong> ve sonraki dönem üzerinden de faiz hesaplanır</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Bileşik dönem ne kadar sık olursa, <strong>kazanç o kadar yüksek</strong> olur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Uzun vadede basit faizden <strong>çok daha fazla getiri</strong> sağlar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Yatırım fonları, banka mevduatları ve kredilerde yaygın kullanılır</span>
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
                  <p className="font-semibold text-emerald-900 mb-2">🌟 Einstein'ın Sözü</p>
                  <p className="text-sm text-slate-700">"Bileşik faiz dünyanın 8. harikasıdır. Onu anlayan kazanır, anlamayan öder."</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">📊 72 Kuralı</p>
                  <p className="text-sm text-slate-700">Paranızın ikiye katlanma süresini bulmak için: 72 / Faiz Oranı = Süre (yıl)</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">💎 Warren Buffett</p>
                  <p className="text-sm text-slate-700">Servetinin çoğunu bileşik faizin gücüyle kazandı - erken başlamak çok önemli!</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">⚡ Zaman = Para</p>
                  <p className="text-sm text-slate-700">20 yaşında yatırıma başlamak, 30 yaşında başlamaktan çok daha avantajlıdır!</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
