"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Home, BookOpen, Lightbulb, AlertCircle, Info, Briefcase, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

const SeverancePayCalculator = () => {
  const [startDay, setStartDay] = useState("")
  const [startMonth, setStartMonth] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endDay, setEndDay] = useState("")
  const [endMonth, setEndMonth] = useState("")
  const [endYear, setEndYear] = useState("")
  const [monthlySalary, setMonthlySalary] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const sd = parseInt(startDay), sm = parseInt(startMonth), sy = parseInt(startYear)
    const ed = parseInt(endDay), em = parseInt(endMonth), ey = parseInt(endYear)
    const salary = parseFloat(monthlySalary)
    
    if (isNaN(sd) || isNaN(sm) || isNaN(sy) || isNaN(ed) || isNaN(em) || isNaN(ey) || isNaN(salary)) return
    
    const startDate = new Date(sy, sm - 1, sd)
    const endDate = new Date(ey, em - 1, ed)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Calculate years and remaining days
    const totalYears = totalDays / 365
    const fullYears = Math.floor(totalYears)
    const remainingDays = totalDays % 365
    const remainingMonths = Math.floor(remainingDays / 30)
    
    // Turkish severance pay calculation
    // Kıdem tazminatı = (Brüt Maaş / 30) × 30 gün × Çalışma Yılı
    // Basically: 1 month salary per year
    const dailySalary = salary / 30
    const severancePayRaw = dailySalary * 30 * totalYears // This gives: salary × years
    
    // 2024 kıdem tazminatı tavanı
    const maxCeiling = 35661.50
    const ceilingAmount = maxCeiling * totalYears
    const actualPay = Math.min(severancePayRaw, ceilingAmount)
    
    setResult({
      years: totalYears.toFixed(2),
      fullYears,
      months: remainingMonths,
      totalDays,
      severancePay: severancePayRaw.toFixed(2),
      actualPay: actualPay.toFixed(2),
      dailySalary: dailySalary.toFixed(2),
      isCapped: severancePayRaw > ceilingAmount
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Link href="/">
        <Button variant="outline" className="mb-4 hover:scale-105 transition-transform">
          <Home className="w-4 h-4 mr-2" />
          Ana Sayfaya Dön
        </Button>
      </Link>

      <Card className="border-2 border-green-100/50 shadow-xl">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Kıdem Tazminatı Hesaplayıcı
            </h2>
            <p className="text-slate-600">İşten ayrılma tazminatınızı hesaplayın</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                İşe Başlama Tarihi
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  type="number"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  placeholder="Gün"
                  className="h-12"
                />
                <Input
                  type="number"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  placeholder="Ay"
                  className="h-12"
                />
                <Input
                  type="number"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  placeholder="Yıl"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                İşten Ayrılma Tarihi
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  type="number"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  placeholder="Gün"
                  className="h-12"
                />
                <Input
                  type="number"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  placeholder="Ay"
                  className="h-12"
                />
                <Input
                  type="number"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  placeholder="Yıl"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Brüt Aylık Maaş (₺)
              </label>
              <Input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="h-12"
                placeholder="örn: 25000"
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-all">
            <Briefcase className="mr-2" />
            Tazminatı Hesapla
          </Button>

          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
              {result.isCapped && (
                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
                  <p className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Tavan Uygulandı
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Kıdem tazminatı tavanı (₺{(35661.50).toLocaleString('tr-TR')}) nedeniyle ödeme sınırlandırılmıştır.
                  </p>
                </div>
              )}

              <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center">
                <p className="text-sm font-semibold text-slate-600 mb-2">Kıdem Tazminatı</p>
                <p className="text-6xl font-bold text-green-600 mb-2">
                  ₺{parseFloat(result.actualPay).toLocaleString('tr-TR')}
                </p>
                <p className="text-xl text-emerald-600">{result.years} yıl hizmet</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border-2 border-green-100 text-center">
                  <p className="text-sm text-slate-600">Toplam Gün</p>
                  <p className="text-3xl font-bold text-green-600">{result.totalDays}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-emerald-100 text-center">
                  <p className="text-sm text-slate-600">Yıl</p>
                  <p className="text-3xl font-bold text-emerald-600">{result.fullYears}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-green-100 text-center">
                  <p className="text-sm text-slate-600">Ay</p>
                  <p className="text-3xl font-bold text-green-600">{result.months}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-emerald-100 text-center">
                  <p className="text-sm text-slate-600">Günlük Ücret</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    ₺{parseFloat(result.dailySalary).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Hesaplama Detayı
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ham Tutar (Tavan Öncesi):</span>
                    <span className="font-bold text-green-600">
                      ₺{parseFloat(result.severancePay).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tavan Limiti (2024):</span>
                    <span className="font-bold text-emerald-600">
                      ₺{(35661.50 * parseFloat(result.years)).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="h-px bg-green-200 my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">Ödenecek Tutar:</span>
                    <span className="font-bold text-green-600 text-lg">
                      ₺{parseFloat(result.actualPay).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-green-100/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Nasıl Kullanılır?</h3>
                <p className="text-sm text-slate-600">
                  İşe başlama ve ayrılma tarihlerini gün/ay/yıl formatında girin. Son brüt maaşınızı yazın. 
                  Sistem kıdem tazminatınızı hesaplar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-100/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-emerald-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Örnek Kullanım</h3>
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Örnek:</strong> 01/01/2019 - 31/12/2024, ₺30.000 maaş
                </p>
                <p className="text-sm text-slate-600">
                  Sonuç: <strong>6 yıl × ₺30.000 = ₺180.000</strong> (Tavan altında)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Önemli Bilgiler</h3>
                <p className="text-sm text-slate-600">
                  Formül: (Brüt Maaş ÷ 30) × 30 gün × Çalışma Yılı. Kıdem tazminatı tavanı her yıl güncellenir. 
                  En az 1 yıl çalışma gerekir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-100/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-3">
              <Info className="w-5 h-5 text-emerald-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-2">İlginç Bilgiler</h3>
                <p className="text-sm text-slate-600">
                  Kıdem tazminatı Türkiye'ye özgü bir uygulamadır. İşçi lehine fesih, emeklilik, 
                  askerlik gibi durumlarda ödenir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hukuki Uyarı */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Not:</strong> Bu hesaplama araçları, genel bilgiler sağlamak amacıyla tasarlanmıştır ve bireysel durumlara göre değişiklik gösterebilir. Hukuki tavsiye niteliği taşımaz.
        </p>
      </div>
    </div>
  )
}

export { SeverancePayCalculator }